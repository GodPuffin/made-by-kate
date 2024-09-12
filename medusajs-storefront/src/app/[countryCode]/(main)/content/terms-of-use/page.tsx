import { Container, Title, Text } from '@mantine/core';

export default function TermsOfUse() {
  return (
    <Container size="md" p="xl" mt={50}>
      <Title order={1} mt="md">Terms of Use</Title>
      <Text size="lg" mt="md">
        Welcome to the Made by Kate Store. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions.
      </Text>
      <Text size="lg" mt="md">
        <Title order={2} mt="md">1. Acceptance of Terms</Title>
        <Text>
          By using our services, you confirm that you accept these terms and that you agree to comply with them. If you do not agree to these terms, you must not use our services.
        </Text>
      </Text>
      <Text size="lg" mt="md">
        <Title order={2} mt="md">2. Changes to Terms</Title>
        <Text>
          We may revise these terms from time to time. Any changes will be posted on this page, and it is your responsibility to review these terms periodically.
        </Text>
      </Text>
      <Text size="lg" mt="md">
        <Title order={2} mt="md">3. User Responsibilities</Title>
        <Text>
          You agree to use our services only for lawful purposes and in a manner that does not infringe the rights of, restrict, or inhibit anyone else&apos;s use of the services.
        </Text>
      </Text>
      <Text size="lg" mt="md">
        <Title order={2} mt="md">4. Intellectual Property</Title>
        <Text>
          All content, trademarks, and other intellectual property on our website are owned by or licensed to us. You may not reproduce, distribute, or create derivative works from any content without our express written permission.
        </Text>
      </Text>
      <Text size="lg" mt="md">
        <Title order={2} mt="md">5. Limitation of Liability</Title>
        <Text>
          To the fullest extent permitted by law, we will not be liable for any loss or damage arising from your use of our services.
        </Text>
      </Text>
      <Text size="lg" mt="md">
        <Title order={2} mt="md">6. Governing Law</Title>
        <Text>
          These terms are governed by the laws of the jurisdiction in which we operate, and any disputes will be resolved in the courts of that jurisdiction.
        </Text>
      </Text>
      <Text size="lg" mt="xl">
        If you have any questions about these Terms of Use, please contact us at (mbk email).
      </Text>
    </Container>
  );
}
