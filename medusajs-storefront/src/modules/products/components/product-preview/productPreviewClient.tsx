'use client';

import React, { useState } from 'react';
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { Center, Box, Image, AspectRatio } from "@mantine/core";
import { getProductPrice } from '@lib/util/get-product-price';
import { ProductPreviewType } from 'types/global';
import { motion } from 'framer-motion';

type CheapestPrice = ReturnType<typeof getProductPrice>['cheapestPrice'];

export default function ProductPreviewClient({ productPreview, cheapestPrice, index }: { productPreview: ProductPreviewType, cheapestPrice?: CheapestPrice, index?: number }) {
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
        <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
                delay: index ? index * 0.2 : 0.3,
                duration: 0.8,
                ease: "easeInOut",
            }}
        >
            <LocalizedClientLink href={`/products/${productPreview.handle}`}>
                <Center>
                    <Box style={{ zIndex: 1 }}>
                        <AspectRatio
                            ratio={300 / 450}
                            style={{
                                transform,
                                transition: 'transform 0.3s ease-out',
                            }}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Image
                                src={productPreview.thumbnail ?? ''}
                                alt={productPreview.title}
                                radius={50}
                            />
                        </AspectRatio>
                    </Box>
                </Center>
            </LocalizedClientLink>
        </motion.div>
    );
}