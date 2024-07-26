import React, { useState } from 'react';
import { Image, Box, HoverCard, Text, Badge, Group, Center } from '@mantine/core';
import styles from './ProductCard.module.css';

export function ProductCard({ title, img }: { title: string; img: URL }) {
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    const x = clientX - left;
    const y = clientY - top;

    const middleX = width / 2;
    const middleY = height / 2;

    const offsetX = ((x - middleX) / middleX) * 10;
    const offsetY = ((y - middleY) / middleY) * 10;

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
    <Center>
      <HoverCard
        shadow="md"
        transitionProps={{ transition: 'fade', duration: 500 }}
      >
        <HoverCard.Target>
          <Box style={{ zIndex: 1 }}>
            <Box
              className={styles.productCard}
              style={{ transform }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <Image
                h={450}
                w={300}
                src={img}
                alt={title}
                radius={50}
                className={styles.productImage}
              />
            </Box>
          </Box>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Group>
            <Text fz="h4">Brown T-Shirt</Text>
            <Badge variant="outline" size="lg">
              $35
            </Badge>
          </Group>
        </HoverCard.Dropdown>
      </HoverCard>
    </Center>
  );
}
