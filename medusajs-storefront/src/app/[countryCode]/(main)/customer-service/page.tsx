import { Container, Title, Text, Accordion, AccordionItem, AccordionControl, AccordionPanel } from '@mantine/core';

export default function CustomerServiceFAQ() {
  return (
    <Container size="md" p="xl" mt={50}>
      <Title order={1} mt="md">Customer Service FAQ</Title>
      <Text size="lg" mt="md">
        Welcome to our Customer Service FAQ page. Here you will find answers to the most common questions.
      </Text>
      <Accordion mt="md" multiple>
        <AccordionItem value="contact">
          <AccordionControl>How can I contact customer service?</AccordionControl>
          <AccordionPanel>
            You can reach our customer service team via email at (mbk email).
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="return-policy">
          <AccordionControl>What is your return policy?</AccordionControl>
          <AccordionPanel>
            We offer a 30-day return policy for unused items. Please visit our Returns page for more details.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="track-order">
          <AccordionControl>How can I track my order?</AccordionControl>
          <AccordionPanel>
            Once your order has shipped, you will receive an email with a tracking number. You can also track your order in your account.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="international-shipping">
          <AccordionControl>Do you offer international shipping?</AccordionControl>
          <AccordionPanel>
            Yes, we ship to select countries. Please check our Shipping Information page for more details.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="change-order">
          <AccordionControl>How can I change or cancel my order?</AccordionControl>
          <AccordionPanel>
            If you need to change or cancel your order, please contact us as soon as possible. Once an order is processed, we may not be able to make changes.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Container>
  );
}

