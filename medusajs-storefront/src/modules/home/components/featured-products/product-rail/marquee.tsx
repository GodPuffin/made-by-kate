"use client";

import React, { useEffect, useState } from "react";
import { useElementSize, useViewportSize } from "@mantine/hooks";
import { Box, Text } from "@mantine/core";
import { IconStar } from "@tabler/icons-react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

interface ScrollMarqueeProps {
  text: string;
  desktopFontSize?: number;
  mobileFontSize?: number;
}

const ScrollMarquee: React.FC<ScrollMarqueeProps> = ({
  text,
  desktopFontSize = 70,
  mobileFontSize = 45,
}) => {
  const { ref: containerRef, width: containerWidth } = useElementSize();
  const { ref: contentRef, width: contentWidth } = useElementSize();
  const { width: viewportWidth } = useViewportSize();
  const [fontSize, setFontSize] = useState(desktopFontSize);
  const [loopWidth, setLoopWidth] = useState(0);

  useEffect(() => {
    setFontSize(viewportWidth < 768 ? mobileFontSize : desktopFontSize);
  }, [viewportWidth, mobileFontSize, desktopFontSize]);

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocityY = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocityY, {
    damping: 50,
    stiffness: 400,
  });

  useAnimationFrame(() => {
    const baseSpeed = 0.5;
    const scrollEffect = Math.min(Math.abs(smoothVelocity.get()) / 300, 0.75);
    const currentVelocity = baseSpeed + scrollEffect;
    baseX.set(baseX.get() - currentVelocity);
  });

  const wrappedX = useTransform(baseX, (x) => {
    const wrapped = x % loopWidth;
    return wrapped;
  });

  useEffect(() => {
    if (contentWidth > 0) {
      setLoopWidth(contentWidth / 2);
    }
  }, [contentWidth]);

  const createContent = () => {
    const items = [];
    const repetitions =
      Math.ceil((containerWidth * 4) / ((text.length + 1) * fontSize * 0.5)) +
      2;
    for (let i = 0; i < repetitions; i += 1) {
      items.push(
        <Text
          key={`text-${i}`}
          component="span"
          fz={fontSize}
          style={{ verticalAlign: "middle" }}
        >
          {text}
        </Text>,
      );
      items.push(
        <IconStar
          key={`icon-${i}`}
          size={fontSize}
          style={{
            verticalAlign: "middle",
            marginLeft: "0.5em",
            marginRight: "0.5em",
          }}
        />,
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
          position: "relative",
          width: "100%",
          overflow: "hidden",
          whiteSpace: "nowrap",
          height: `${fontSize * 1.2}px`,
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
        mb="xl"
      >
        <motion.div
          ref={contentRef}
          style={{
            position: "absolute",
            display: "inline-flex",
            alignItems: "center",
            willChange: "transform",
            transform: "translateY(-50%)",
            left: 0,
            x: wrappedX,
          }}
        >
          {createContent()}
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default ScrollMarquee;
