'use client';

import React, { useState } from 'react';
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { Center, HoverCard, Box, Group, Image, Text, Badge, AspectRatio, Popover } from "@mantine/core";
import { getProductPrice } from '@lib/util/get-product-price';
import { ProductPreviewType } from 'types/global';

type CheapestPrice = ReturnType<typeof getProductPrice>['cheapestPrice'];

export default function ProductPreviewClient({ productPreview, cheapestPrice }: { productPreview: ProductPreviewType, cheapestPrice?: CheapestPrice }) {
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
    );
}