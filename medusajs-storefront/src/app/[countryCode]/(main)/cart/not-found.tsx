import { Container, Title, Text, Button } from '@mantine/core';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "404",
  description: "Something went wrong",
}

export default function NotFound() {

  return (
    <Container size="md" h="700px" p="xl" ta="center" mt={200}>
      <Title order={1}>404 - Page Not Found</Title>
      <Text size="xl" mt="xl" pb="xl">
        Oops! The page you are looking for does not exist.
      </Text>
      <Button size="xl" radius="lg" component={Link} href="/">
        Go to Home
      </Button>
    </Container>
  );
}