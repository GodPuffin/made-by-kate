'use client';

import { Center, Flex, Title } from "@mantine/core";
import { useMediaQuery } from '@mantine/hooks';
import classes from './hero.module.css';
import ProductCard from './ProductCard/ProductCard';

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
      <ProductCard/>
      <Center
      >
        <Title
          className={classes.kate}
          fz={isMobile ? 80 : 150}
          ta="center"
          w={300}
          style={{
            transform: !isMobile ? 'translate(320px, -160px)' : 'translate(70px, 0px)',

           }}
        >
          Kate
        </Title>
      </Center>
    </>
  );
}

export default Hero
