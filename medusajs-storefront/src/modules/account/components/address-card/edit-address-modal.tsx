"use client"

import React, { useEffect, useState } from "react"
import { clx, Heading } from "@medusajs/ui"
import { Address, Region } from "@medusajs/medusa"

import CountrySelect from "@modules/checkout/components/country-select"
import {
  deleteCustomerShippingAddress,
  updateCustomerShippingAddress,
} from "@modules/account/actions"
import { useFormState } from "react-dom"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { IconEdit, IconTrash, IconTruckDelivery } from "@tabler/icons-react"
import { Loader, Modal, Text, Button, TextInput, Paper } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"

type EditAddressProps = {
  region: Region
  address: Address
  isActive?: boolean
}

const EditAddress: React.FC<EditAddressProps> = ({
  region,
  address,
  isActive = false,
}) => {
  const [removing, setRemoving] = useState(false)
  const [successState, setSuccessState] = useState(false)
  const [opened, { open, close }] = useDisclosure(false);

  const [formState, formAction] = useFormState(updateCustomerShippingAddress, {
    success: false,
    error: null,
    addressId: address.id,
  })

  const handleClose = () => {
    setSuccessState(false)
    close()
  }

  useEffect(() => {
    if (successState) {
      close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successState])

  useEffect(() => {
    if (formState.success) {
      setSuccessState(true)
    }
  }, [formState])

  const removeAddress = async () => {
    setRemoving(true)
    await deleteCustomerShippingAddress(address.id)
    setRemoving(false)
  }

  return (
    <>
      <Paper shadow="sm" withBorder p="lg" className={"min-h-[220px] h-full w-full flex flex-col justify-between transition-colors"}>
          <div className="flex flex-col">
            <Heading className="text-left text-base-semi">
              {address.first_name} {address.last_name}
            </Heading>
            {address.company && (
              <Text className="txt-compact-small">
                {address.company}
              </Text>
            )}
            <Text className="flex flex-col text-left text-base-regular mt-2">
              <span>
                {address.address_1}
                {address.address_2 && <span>, {address.address_2}</span>}
              </span>
              <span>
                {address.postal_code}, {address.city}
              </span>
              <span>
                {address.province && `${address.province}, `}
                {address.country_code?.toUpperCase()}
              </span>
            </Text>
          </div>
          <div className="flex items-center gap-x-4">
            <button
              className="text-small-regular flex items-center gap-x-2"
              onClick={open}
            >
              <IconEdit size={20} />
              Edit
            </button>
            <button
              className="text-small-regular flex items-center gap-x-2"
              onClick={removeAddress}
            >
              {removing ? <Loader size={20} /> : <IconTrash size={20} />}
              Remove
            </button>
            {isActive && (
              <IconTruckDelivery size={20}/>
            )}
          </div>
      </Paper>

      <Modal opened={opened} onClose={handleClose} title="Edit address">
        <form action={formAction}>
          <Modal.Body>
            <div className="grid grid-cols-1 gap-y-2">
              <div className="grid grid-cols-2 gap-x-2">
                <TextInput
                  label="First name"
                  name="first_name"
                  required
                  autoComplete="given-name"
                  defaultValue={address.first_name || undefined}
                />
                <TextInput
                  label="Last name"
                  name="last_name"
                  required
                  autoComplete="family-name"
                  defaultValue={address.last_name || undefined}
                />
              </div>
              <TextInput
                label="Company"
                name="company"
                autoComplete="organization"
                defaultValue={address.company || undefined}
              />
              <TextInput
                label="Address"
                name="address_1"
                required
                autoComplete="address-line1"
                defaultValue={address.address_1 || undefined}
              />
              <TextInput
                label="Apartment, suite, etc."
                name="address_2"
                autoComplete="address-line2"
                defaultValue={address.address_2 || undefined}
              />
              <div className="grid grid-cols-[144px_1fr] gap-x-2">
                <TextInput
                  label="Postal code"
                  name="postal_code"
                  required
                  autoComplete="postal-code"
                  defaultValue={address.postal_code || undefined}
                />
                <TextInput
                  label="City"
                  name="city"
                  required
                  autoComplete="locality"
                  defaultValue={address.city || undefined}
                />
              </div>
              <TextInput
                label="Province / State"
                name="province"
                autoComplete="address-level1"
                defaultValue={address.province || undefined}
              />
              <CountrySelect
                name="country_code"
                region={region}
                required
                autoComplete="country"
                defaultValue={address.country_code || undefined}
              />
              <TextInput
                label="Phone"
                name="phone"
                autoComplete="phone"
                defaultValue={address.phone || undefined}
              />
            </div>
            {formState.error && (
              <div className="text-rose-500 text-small-regular py-2">
                {formState.error}
              </div>
            )}
            <div className="flex gap-3 mt-6">
              <Button
                type="reset"
                variant="outline"
                onClick={close}
              >
                Cancel
              </Button>
              <SubmitButton>Save</SubmitButton>
            </div>
          </Modal.Body>
        </form>
      </Modal>
    </>
  )
}

export default EditAddress
