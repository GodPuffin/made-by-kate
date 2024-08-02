"use client"

import { Customer, Region } from "@medusajs/medusa"
import React, { useEffect, useMemo } from "react"
import { useFormState } from "react-dom"
import { updateCustomerBillingAddress } from "@modules/account/actions"
import { TextInput, Select, Grid } from '@mantine/core'
import AccountInfo from "../account-info"

type MyInformationProps = {
  customer: Omit<Customer, "password_hash">
  regions: Region[]
}

const ProfileBillingAddress: React.FC<MyInformationProps> = ({
  customer,
  regions,
}) => {
  const regionOptions = useMemo(() => {
    return (
      regions
        ?.map((region) => {
          return region.countries.map((country) => ({
            value: country.iso_2,
            label: country.display_name,
          }))
        })
        .flat() || []
    )
  }, [regions])

  const [successState, setSuccessState] = React.useState(false)

  const [state, formAction] = useFormState(updateCustomerBillingAddress, {
    error: false,
    success: false,
  })

  const clearState = () => {
    setSuccessState(false)
  }

  useEffect(() => {
    setSuccessState(state.success)
  }, [state])

  const currentInfo = useMemo(() => {
    if (!customer.billing_address) {
      return "No billing address"
    }

    const country =
      regionOptions?.find(
        (country) => country.value === customer.billing_address.country_code
      )?.label || customer.billing_address.country_code?.toUpperCase()

    return (
      <div className="flex flex-col font-semibold">
        <span>
          {customer.billing_address.first_name}{" "}
          {customer.billing_address.last_name}
        </span>
        <span>{customer.billing_address.company}</span>
        <span>
          {customer.billing_address.address_1}
          {customer.billing_address.address_2
            ? `, ${customer.billing_address.address_2}`
            : ""}
        </span>
        <span>
          {customer.billing_address.postal_code},{" "}
          {customer.billing_address.city}
        </span>
        <span>{country}</span>
      </div>
    )
  }, [customer, regionOptions])

  return (
    <form action={formAction} onReset={() => clearState()} className="w-full">
      <AccountInfo
        label="Billing address"
        currentInfo={currentInfo}
        isSuccess={successState}
        isError={!!state.error}
        clearState={clearState}
      >
        <Grid gutter="md">
          <Grid.Col span={6}>
            <TextInput
              label="First name"
              name="billing_address.first_name"
              defaultValue={customer.billing_address?.first_name || undefined}
              required
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              label="Last name"
              name="billing_address.last_name"
              defaultValue={customer.billing_address?.last_name || undefined}
              required
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              label="Company"
              name="billing_address.company"
              defaultValue={customer.billing_address?.company || undefined}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              label="Address"
              name="billing_address.address_1"
              defaultValue={customer.billing_address?.address_1 || undefined}
              required
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              label="Apartment, suite, etc."
              name="billing_address.address_2"
              defaultValue={customer.billing_address?.address_2 || undefined}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="Postal code"
              name="billing_address.postal_code"
              defaultValue={customer.billing_address?.postal_code || undefined}
              required
            />
          </Grid.Col>
          <Grid.Col span={8}>
            <TextInput
              label="City"
              name="billing_address.city"
              defaultValue={customer.billing_address?.city || undefined}
              required
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              label="Province"
              name="billing_address.province"
              defaultValue={customer.billing_address?.province || undefined}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Select
              label="Country"
              name="billing_address.country_code"
              defaultValue={customer.billing_address?.country_code || undefined}
              data={[{ value: "", label: "-" }, ...regionOptions]}
              required
            />
          </Grid.Col>
        </Grid>
      </AccountInfo>
    </form>
  )
}

export default ProfileBillingAddress