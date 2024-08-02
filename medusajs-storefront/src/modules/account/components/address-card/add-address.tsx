"use client"

import { Region } from "@medusajs/medusa"
import { Plus } from "@medusajs/icons"
import { Heading } from "@medusajs/ui"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom"

import useToggleState from "@lib/hooks/use-toggle-state"
import CountrySelect from "@modules/checkout/components/country-select"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { addCustomerShippingAddress } from "@modules/account/actions"
import { Button, Modal, Paper, TextInput } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"

const AddAddress = ({ region }: { region: Region }) => {
  const [successState, setSuccessState] = useState(false)
  const [opened, { open, close }] = useDisclosure(false);

  const [formState, formAction] = useFormState(addCustomerShippingAddress, {
    success: false,
    error: null,
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

  return (
    <>
      <Paper withBorder shadow="sm">
        <button
          className="p-5 min-h-[220px] h-full w-full flex flex-col justify-between"
          onClick={open}
        >
          <span className="text-base-semi">New address</span>
          <Plus />
        </button>
      </Paper>

      <Modal opened={opened} onClose={handleClose} title="Add address">
        <form action={formAction}>
          <Modal.Body>
            <div className="flex flex-col gap-y-2">
              <div className="grid grid-cols-2 gap-x-2">
                <TextInput
                  label="First name"
                  name="first_name"
                  required
                  autoComplete="given-name"
                />
                <TextInput
                  label="Last name"
                  name="last_name"
                  required
                  autoComplete="family-name"
                />
              </div>
              <TextInput
                label="Company"
                name="company"
                autoComplete="organization"
              />
              <TextInput
                label="Address"
                name="address_1"
                required
                autoComplete="address-line1"
              />
              <TextInput
                label="Apartment, suite, etc."
                name="address_2"
                autoComplete="address-line2"
              />
              <div className="grid grid-cols-[144px_1fr] gap-x-2">
                <TextInput
                  label="Postal code"
                  name="postal_code"
                  required
                  autoComplete="postal-code"
                />
                <TextInput
                  label="City"
                  name="city"
                  required
                  autoComplete="locality"
                />
              </div>
              <TextInput
                label="Province / State"
                name="province"
                autoComplete="address-level1"
              />
              <CountrySelect
                region={region}
                name="country_code"
                required
                autoComplete="country"
              />
              <TextInput label="Phone" name="phone" autoComplete="phone" />
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

export default AddAddress
