'use client';

import React, { useState } from 'react';
import { Center, Image, AspectRatio } from "@mantine/core";
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import { useMediaQuery } from '@mantine/hooks';

export default function ProductCard() {
  const isMobile = useMediaQuery('(max-width: 56.25em)');
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    const middleX = width / 2;
    const middleY = height / 2;
    const offsetX = ((x - middleX) / middleX) * 12;
    const offsetY = ((y - middleY) / middleY) * 12;
    const rotateX = -offsetY;
    const rotateY = offsetX;
    setTransform(`
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.05, 1.05, 1.05)
    `);
  };

  const handleMouseLeave = () => {
    setTransform('');
  };

  return (
    <LocalizedClientLink href="/store">
    <Center>
        <AspectRatio
          ratio={300 / 450}
          style={{
            transform,
            transition: 'transform 0.3s ease-out',
            zIndex: 1,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            w={isMobile ? 200 : 300}
            h={isMobile ? 300 : 450}
            src='https://i.imgur.com/yvvfd2J.jpeg'
            alt='Made By Kate'
            radius={isMobile ? "lg" : 50}
          />
        </AspectRatio>
    </Center>
    </LocalizedClientLink>
  );
}