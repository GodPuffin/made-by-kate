"use client";
import { useState, useEffect, useMemo } from "react";
import { AppShell, Burger, Group, ActionIcon, Button, Title, useMantineColorScheme, Select, rem, Stack, Indicator } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Cart, Region } from '@medusajs/medusa';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import ReactCountryFlag from "react-country-flag";
import { updateRegion } from "app/actions";
import { useParams, usePathname } from "next/navigation";
import { IconHome, IconShoppingBag, IconUser, IconSearch, IconSunMoon, IconLocation, IconQuestionMark, IconBrandInstagram } from '@tabler/icons-react';

type CountryOption = {
  value: string;
  label: string;
  country: string;
  region: string;
};

export default function Nav({ children, regions, cart }: { children: React.ReactNode; regions: Region[] | null; cart: Cart | null }) {
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

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: !opened, mobile: !opened } }}
      padding="md"
      transitionDuration={300}
      transitionTimingFunction="ease"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} size="sm" />
          <Group justify="flex-end" flex="1">
            <Group ml="xl" gap="sm">
              {process.env.FEATURE_SEARCH_ENABLED && (
                <ActionIcon variant="subtle" component={LocalizedClientLink} href="/search" size="xl" onClick={handleButtonClick}>
                  <IconSearch />
                </ActionIcon>
              )}
              <ActionIcon variant="subtle" component={LocalizedClientLink} href="/" size="xl" onClick={handleButtonClick}>
                <IconHome />
              </ActionIcon>
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
        <Button variant="light" h={80} size="lg" mt="md" fullWidth leftSection={<IconSunMoon />} onClick={() => { toggleColorScheme(); handleButtonClick(); }} component="span">
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
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}