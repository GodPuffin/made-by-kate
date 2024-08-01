'use client';

import React from "react"
import { Container, Grid, Title, Text, Flex, Center } from "@mantine/core"
import UnderlineLink from "@modules/common/components/interactive-link"
import AccountNav from "../components/account-nav"
import { Customer } from "@medusajs/medusa"

interface AccountLayoutProps {
  customer: Omit<Customer, "password_hash"> | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <Container fluid>
      <Container>
        <Grid py="xl">
          <Grid.Col span={{ base: 12, lg: 3 }}>
            {customer && <AccountNav customer={customer} />}
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 9 }} flex={1}>
            {children}
          </Grid.Col>
        </Grid>
        <Flex
          direction="row"
          align="end"
          justify="space-between"
          py="xl"
          gap="lg"
        >
          <div className="hidden small:block">
            <Title order={3}>Got questions?</Title>
            <Text>
              You can find frequently asked questions and answers on our
              customer service page.
            </Text>
          </div>
          <div>
            <UnderlineLink href="/customer-service">
              Customer Service
            </UnderlineLink>
          </div>
        </Flex>
      </Container>
    </Container>
  )
}

export default AccountLayout
