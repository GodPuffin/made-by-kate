'use client';

import { Center, Flex, Title } from "@mantine/core";
import { useMediaQuery } from '@mantine/hooks';
import classes from './hero.module.css';
import ProductCard from './ProductCard/ProductCard';
import { motion } from "framer-motion";

const Hero = () => {
  const isMobile = useMediaQuery('(max-width: 56.25em)');

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
      <Title
        className={classes.madeby}
        fz={isMobile ? 80 : 150}
        ta="center"
        style={{ transform: !isMobile ? 'translate(-165px, 65px)' : 'none' }}
      >
        Made by
      </Title>
      <ProductCard />
      <Center
      >
        <Title
          className={classes.kate}
          fz={isMobile ? 80 : 150}
          ta={!isMobile ? "center" : "end"}
          w={300}
          style={{
            transform: !isMobile ? 'translate(320px, -160px)' : '',
          }}
        >
          Kate
        </Title>
      </Center>
    </motion.div>
  );
}

export default Hero
