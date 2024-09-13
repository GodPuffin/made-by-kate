'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useElementSize, useViewportSize } from '@mantine/hooks';
import { Box, Text } from '@mantine/core';
import { IconStar } from '@tabler/icons-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ScrollMarqueeProps {
  text: string;
  baseSpeed?: number;
  scrollInfluence?: number;
  desktopFontSize?: number;
  mobileFontSize?: number;
}

const ScrollMarquee: React.FC<ScrollMarqueeProps> = ({
  text,
  baseSpeed = 50,
  scrollInfluence = 0.1,
  desktopFontSize = 70,
  mobileFontSize = 40,
}) => {
  const { ref: containerRef, width: containerWidth } = useElementSize();
  const { ref: contentRef, width: contentWidth } = useElementSize();
  const { width: viewportWidth } = useViewportSize();
  const [fontSize, setFontSize] = useState(desktopFontSize);

  useEffect(() => {
    setFontSize(viewportWidth < 768 ? mobileFontSize : desktopFontSize);
  }, [viewportWidth, mobileFontSize, desktopFontSize]);

  const { scrollY } = useScroll();
  const baseX = useTransform(scrollY, (value) => value * scrollInfluence);
  const x = useSpring(baseX, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const createContent = () => {
    const items = [];
    const repetitions = Math.ceil((containerWidth * 3) / ((text.length + 1) * fontSize * 0.5)) + 1;
    for (let i = 0; i < repetitions; i += 1) {
      items.push(
        <Text key={`text-${i}`} component="span" fz={fontSize} style={{ verticalAlign: 'middle' }}>
          {text}
        </Text>
      );
      items.push(
        <IconStar
          key={`icon-${i}`}
          size={fontSize}
          style={{ verticalAlign: 'middle', marginLeft: '0.5em', marginRight: '0.5em' }}
        />
      );
    }
    return items;
  };

  return (
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
    >
      <Box
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          height: `${fontSize * 1.2}px`,
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
        mb="xl"
      >
        <motion.div
          ref={contentRef}
          style={{
            position: 'absolute',
            display: 'inline-flex',
            alignItems: 'center',
            willChange: 'transform',
            x,
            transform: 'translateY(-50%)',
            left: '-100%',
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: contentWidth / baseSpeed,
              ease: "linear",
            },
          }}
        >
          {createContent()}
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default ScrollMarquee;