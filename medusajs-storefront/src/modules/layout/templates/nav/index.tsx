"use client";
import { useState, useEffect, useMemo } from "react";
import { useProducts } from "medusa-react";
import { Product } from "@medusajs/medusa";
import { AppShell, Burger, Group, ActionIcon, Button, Title, useMantineColorScheme, Select, rem, Stack, Indicator, Container, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Cart, Region } from '@medusajs/medusa';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import ReactCountryFlag from "react-country-flag";
import { updateRegion } from "app/actions";
import { useParams, usePathname } from "next/navigation";
import { IconHome, IconShoppingBag, IconUser, IconSearch, IconSunMoon, IconLocation, IconQuestionMark, IconBrandInstagram, IconLineHeight } from '@tabler/icons-react';
import { Spotlight, SpotlightActionData } from '@mantine/spotlight';
import { Text, Center } from '@mantine/core';
import { useRouter } from 'next/navigation';

type CountryOption = {
  value: string;
  label: string;
  country: string;
  region: string;
};

export default function Nav({ children, regions, cart }: { children: React.ReactNode; regions: Region[] | null; cart: Cart | null }) {
  const { products, isLoading } = useProducts();

  const [opened, { toggle }] = useDisclosure(false);
  const { toggleColorScheme } = useMantineColorScheme();
  const [current, setCurrent] = useState<string | null>(null);
  const { countryCode } = useParams();
  const currentPath = usePathname().split(`/${countryCode}`)[1];

  const options: CountryOption[] = useMemo(() => {
    return regions
      ?.flatMap((r) =>
        r.countries.map((c) => ({
          value: c.iso_2,
          label: c.display_name,
          country: c.iso_2,
          region: r.id,
        }))
      )
      .sort((a, b) => a.label.localeCompare(b.label)) || [];
  }, [regions]);

  useEffect(() => {
    if (countryCode) {
      const option = options?.find((o) => o.country === countryCode);
      setCurrent(option?.value || null);
    }
  }, [options, countryCode]);

  const handleChange = (value: string | null) => {
    const option = options.find((o) => o.value === value);
    if (option) {
      updateRegion(option.country, currentPath);
    }
  };

  const handleButtonClick = () => {
    if (opened) toggle();
  };

  const [productToAction, setProductToAction] = useState<SpotlightActionData[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (products) {
      setProductToAction(products.map((product) => ({
        id: product.id ?? '',
        label: product.title ?? '',
        description: product.description || undefined,
        onClick: () => router.push(`/products/${product.handle}`),
        searchableContent: [
          product.title,
          product.description,
          ...(product.collection?.title ? [product.collection.title] : []),
          product.type?.value,
          ...(product.tags?.map(tag => tag.value) || [])
        ].filter(Boolean).join(' ').toLowerCase(),
        children: (
          <Group wrap="nowrap" w="100%">
            <Center>
              <img
                src={product.thumbnail ?? ''}
                alt={product.title}
                width={50}
                height={50}
                style={{
                  objectFit: 'cover',
                  borderRadius: '20%',
                  maxWidth: '100%',
                  maxHeight: '100%',
                }}
              />
            </Center>
            <div style={{ flex: 1 }}>
              <Text>{product.title}</Text>
              {product.description && (
                <Text opacity={0.6} size="xs">
                  {product.description}
                </Text>
              )}
            </div>
          </Group>
        ),
      })));
    }
  }, [products]);

  return (
    <>
      <Spotlight
        actions={productToAction}
        searchProps={{
          placeholder: "Search products...",
        }}
        shortcut="mod + K"
        filter={(query, actions) =>
          actions.filter((action) => {
            if ('searchableContent' in action && typeof action.searchableContent === 'string') {
              return action.searchableContent.toLowerCase().includes(query.toLowerCase());
            }
            return false;
          })
        }
        limit={5}
      />
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: !opened, mobile: !opened } }}
        padding="md"
        transitionDuration={300}
        transitionTimingFunction="ease"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            {/* <Group> */}
            <Button variant="subtle" component={LocalizedClientLink} href="/" size="lg" onClick={handleButtonClick}>
              <Title>
                MbK
              </Title>
            </Button>
            {/* <Burger opened={opened} onClick={toggle} size="xs" />
            </Group> */}
            <Group justify="flex-end" flex="1">
              <Group ml="xl" gap="sm">
                {/* {process.env.FEATURE_SEARCH_ENABLED && ( */}
                  <Tooltip label="mod + K" openDelay={1000}>
                    <ActionIcon variant="subtle" onClick={() => Spotlight.open()} size="xl">
                      <IconSearch />
                    </ActionIcon>
                  </Tooltip>
                {/* )} */}
                {/* <ActionIcon variant="subtle" component={LocalizedClientLink} href="/" size="xl" onClick={handleButtonClick}>
                  <IconHome />
                </ActionIcon> */}
                <ActionIcon variant="subtle" component={LocalizedClientLink} href="/account" size="xl" onClick={handleButtonClick}>
                  <IconUser />
                </ActionIcon>
                {cart && cart.items.length > 0 ? (
                  <Indicator offset={7} label={cart.items.length} size={16}>
                    <ActionIcon variant="subtle" component={LocalizedClientLink} href="/cart" size="xl" onClick={handleButtonClick}>
                      <IconShoppingBag />
                    </ActionIcon>
                  </Indicator>
                ) : (
                  <ActionIcon variant="subtle" component={LocalizedClientLink} href="/cart" size="xl" onClick={handleButtonClick}>
                    <IconShoppingBag />
                  </ActionIcon>
                )}
              </Group>
            </Group>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <Title fz={40}>
            Made By Kate
          </Title>
          <Button variant="light" h={80} size="lg" mt="md" fullWidth leftSection={<IconQuestionMark />} onClick={() => { handleButtonClick(); }} component={LocalizedClientLink} href="/about">
            About Me
          </Button>
          <Button variant="light" h={80} size="lg" mt="md" fullWidth leftSection={<IconBrandInstagram />} onClick={() => { handleButtonClick(); }} component="a" href="https://www.instagram.com/madebykate.__/" target="_blank">
            Instagram
          </Button>
          <Button variant="light" h={80} size="lg" mt="md" fullWidth leftSection={<IconSunMoon />} onClick={() => { toggleColorScheme(); }} component="span">
            Toggle Dark/Light
          </Button>
          <Stack
            justify="flex-end"
            h="100%"
          >
            <Select
              data={options}
              value={current}
              onChange={handleChange}
              placeholder="Select a country"
              label="Shipping to"
              leftSection={
                <ReactCountryFlag
                  svg
                  style={{
                    width: rem(16),
                    height: rem(16),
                  }}
                  countryCode={current || ''}
                />
              }
              size="lg"
              comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
            />
          </Stack>
        </AppShell.Navbar>
        <AppShell.Main>
          {children}
        </AppShell.Main>
      </AppShell>
    </>
  );
}