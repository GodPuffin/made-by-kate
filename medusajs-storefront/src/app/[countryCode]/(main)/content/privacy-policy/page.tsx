import { Container, Title, Text, List, ListItem, rem } from '@mantine/core';
import { IconChevronCompactRight } from '@tabler/icons-react';

export default function PrivacyPolicy() {
    return (
        <Container size="md" p="xl" mt={50}>
            <Title order={1} mt="md">Privacy Policy</Title>
            <Text size="lg" mt="md">
                At Made by Kate, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit our website or make a purchase.
            </Text>
            <Title order={2} mt="md">Information We Collect</Title>
            <List
                withPadding
                icon={
                    <IconChevronCompactRight style={{ width: rem(16), height: rem(16) }} />
                }
            >
                <ListItem>Personal identification information (name, email, phone number, etc.)</ListItem>
                <ListItem>Payment information (credit card details, billing address, etc.)</ListItem>
                <ListItem>Order history and preferences</ListItem>
            </List>
            <Title order={2} mt="md">How We Use Your Information</Title>
            <Text>
                We may use the information we collect from you in the following ways:
            </Text>
            <List
                withPadding
                icon={
                    <IconChevronCompactRight style={{ width: rem(16), height: rem(16) }} />
                }
            >
                <ListItem>To process your transactions and manage your orders.</ListItem>
                <ListItem>To improve our website and customer service.</ListItem>
                <ListItem>To send periodic emails regarding your order or other products and services.</ListItem>
            </List>
            <Title order={2} mt="md">Data Protection</Title>
            <Text>
                We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems.
            </Text>
            <Title order={2} mt="md">Your Rights</Title>
            <Text>
                You have the right to request access to the personal information we hold about you, to request corrections to that information, and to request the deletion of your personal information.
            </Text>
            <Title order={2} mt="md">Changes to This Privacy Policy</Title>
            <Text>
                We may update this Privacy Policy from time to time. We will notify you about significant changes in the way we treat personal information by sending a notice to the primary email address specified in your account or by placing a prominent notice on our site.
            </Text>
            <Text size="lg" mt="xl">
                If you have any questions about this Privacy Policy, please contact us at (mbk email).
            </Text>
        </Container>
    );
}
