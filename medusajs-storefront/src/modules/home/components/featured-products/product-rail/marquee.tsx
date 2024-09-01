'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useElementSize } from '@mantine/hooks';
import { Box, Text } from '@mantine/core';
import { IconStar } from '@tabler/icons-react';
import { motion } from 'framer-motion';

interface ScrollMarqueeProps {
  text: string;
  baseSpeed?: number;
  scrollInfluence?: number;
  fontSize?: number;
}

const ScrollMarquee: React.FC<ScrollMarqueeProps> = ({
  text,
  baseSpeed = 50,
  scrollInfluence = 0.1,
  fontSize = 70,
}) => {
  const { ref: containerRef, width: containerWidth } = useElementSize();
  const { ref: contentRef, width: contentWidth } = useElementSize();
  const lastScrollY = useRef(0);
  const scrollOffset = useRef(0);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollDiff = window.scrollY - lastScrollY.current;
      lastScrollY.current = window.scrollY;
      scrollOffset.current += scrollDiff * scrollInfluence;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollInfluence]);

  useEffect(() => {
    if (!contentWidth) return;
    let animationFrameId: number;
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const movement = (elapsed * baseSpeed) / 1000 + scrollOffset.current;
      const position = -(movement % contentWidth);
      setTranslateX(position);
      if (-position >= contentWidth / 2) {
        startTime = timestamp;
        scrollOffset.current = 0;
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [baseSpeed, contentWidth]);

  const createContent = () => {
    const items = [];
    const repetitions = Math.ceil((containerWidth * 2) / ((text.length + 1) * fontSize * 0.5)) + 1;
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
          height: `${fontSize * 1.5}px`,
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
        mb="xl"
      >
        <div
          ref={contentRef}
          style={{
            position: 'absolute',
            top: '50%',
            transform: `translateX(${translateX}px) translateY(-50%)`,
            display: 'inline-flex',
            alignItems: 'center',
            willChange: 'transform',
          }}
        >
          {createContent()}
        </div>
      </Box>
    </motion.div>
  );
};

export default ScrollMarquee;