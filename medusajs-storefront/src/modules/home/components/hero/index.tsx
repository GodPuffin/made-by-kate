'use client';

import { Title } from "@mantine/core";
import { useMediaQuery } from '@mantine/hooks';
import classes from './hero.module.css';
import { ProductCard } from './ProductCard/ProductCard';

const Hero = () => {
  const isMobile = useMediaQuery('(max-width: 56.25em)');

  return (
    <>
      <Title
        className={classes.madeby}
        fz={isMobile ? 80 : 150}
        ta="center"
        style={{ transform: !isMobile ? 'translate(-165px, 65px)' : 'none' }}
      >
        Made by
      </Title>
        <ProductCard
          title="test"
          img={
            new URL(
              'https://store.locomotive.ca/cdn/shop/files/Pro-de-l_Internet-Brass-tShirt_02.jpg?v=1705691448'
            )
          }
        />
      <Title
        className={classes.kate}
        fz={isMobile ? 80 : 150}
        ta="center"
        style={{ transform: !isMobile ? 'translate(320px, -160px)' : 'none' }}
      >
        Kate
      </Title>
    </>
  );
}

export default Hero
