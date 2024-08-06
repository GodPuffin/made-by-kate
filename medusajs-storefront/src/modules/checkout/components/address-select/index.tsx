import React, { useState, useEffect } from 'react';
import { Combobox, Group, Input, InputBase, Text, useCombobox, Stack } from '@mantine/core';
import { Address, AddressPayload, Cart } from "@medusajs/medusa";
import { omit } from "lodash";
import { cartUpdate } from "@modules/checkout/actions";
import compareAddresses from "@lib/util/compare-addresses";

type AddressSelectProps = {
  addresses: Address[];
  cart: Omit<Cart, "refundable_amount" | "refunded_total"> | null;
};

function AddressOptionComponent({ address }: { address: Address }) {
  return (
    <Group>
      <div>
        <Text fw={500}>
          {address.first_name} {address.last_name}
        </Text>
        {address.company && (
          <Text size="sm" c="dimmed">
            {address.company}
          </Text>
        )}
        <Stack gap={0} mt="xs">
          <Text size="sm">
            {address.address_1}
            {address.address_2 && `, ${address.address_2}`}
          </Text>
          <Text size="sm">
            {address.postal_code}, {address.city}
          </Text>
          <Text size="sm">
            {address.province && `${address.province}, `}
            {address.country_code?.toUpperCase()}
          </Text>
        </Stack>
      </div>
    </Group>
  );
}

const AddressSelect = ({ addresses, cart }: AddressSelectProps) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  useEffect(() => {
    // Initialize selectedAddress based on cart's shipping address
    const initAddress = addresses.find((a) => compareAddresses(a, cart?.shipping_address));
    setSelectedAddress(initAddress || null);
  }, [addresses, cart?.shipping_address]);

  const handleSelect = async (id: string) => {
    const newAddress = addresses.find((a) => a.id === id);
    if (newAddress) {
      setSelectedAddress(newAddress); // Update local state immediately
      
      // Update cart
      await cartUpdate({
        shipping_address: omit(newAddress, [
          "id",
          "created_at",
          "updated_at",
          "country",
          "deleted_at",
          "metadata",
          "customer_id",
        ]) as AddressPayload,
      });
    }
  };

  const options = addresses.map((address) => (
    <Combobox.Option value={address.id} key={address.id}>
      <AddressOptionComponent address={address} />
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        handleSelect(val);
        combobox.closeDropdown();
      }}
      shadow='sm'
      transitionProps={{ duration: 200, transition: 'pop' }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
          multiline
        >
          {selectedAddress ? (
            <Text>{selectedAddress.address_1}</Text>
          ) : (
            <Input.Placeholder>Choose an address</Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default AddressSelect;