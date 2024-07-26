"use client";

import { AppShell, Burger, Group, ActionIcon, Button, Title, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import { IconHome, IconShoppingBag, IconUser, IconSearch } from '@tabler/icons-react';
import Link from 'next/link';

export default function Nav({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="flex-end" flex="1">
            <Group ml="xl" gap="sm">
              {process.env.FEATURE_SEARCH_ENABLED && (
                <ActionIcon variant="subtle" component={LocalizedClientLink} href="/search" size="xl" visibleFrom="sm">
                  <IconSearch />
                </ActionIcon>
              )}
              <ActionIcon variant="subtle" component={LocalizedClientLink} href="/" size="xl" visibleFrom="sm">
                <IconHome />
              </ActionIcon>
              <ActionIcon variant="subtle" component={LocalizedClientLink} href="/account" size="xl" visibleFrom="sm">
                <IconUser />
              </ActionIcon>
              <ActionIcon variant="subtle" component={LocalizedClientLink} href="/cart" size="xl">
                <IconShoppingBag />
              </ActionIcon>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="lg" onMouseLeave={() => opened && toggle()}>
        <Title fz={50}>
          Made By Kate
        </Title>
        <Button variant="light" size="xl" mt="lg" fullWidth leftSection={<IconHome />} component={Link} href="/">
          Home
        </Button>
        {process.env.FEATURE_SEARCH_ENABLED && (
          <Button variant="light" size="xl" mt="lg" fullWidth leftSection={<IconSearch />} component={Link} href="/search">
            Search
          </Button>
        )}
        <Button variant="light" size="xl" mt="lg" fullWidth leftSection={<IconUser />} component={Link} href="/account">
          Account
        </Button>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}