"use client"
import { useState, useEffect, useMemo } from "react"
import { Select, rem } from '@mantine/core'
import { Region } from "@medusajs/medusa"
import ReactCountryFlag from "react-country-flag"
import { StateType } from "@lib/hooks/use-toggle-state"
import { updateRegion } from "app/actions"
import { useParams, usePathname } from "next/navigation"

type CountryOption = {
  value: string
  label: string
  country: string
  region: string
}

type CountrySelectProps = {
  toggleState: StateType
  regions: Region[]
}

const CountrySelect = ({ toggleState, regions }: CountrySelectProps) => {
  const [current, setCurrent] = useState<string | null>(null)
  const { countryCode } = useParams()
  const currentPath = usePathname().split(`/${countryCode}`)[1]
  const { close } = toggleState

  const options: CountryOption[] = useMemo(() => {
    return regions
      ?.flatMap((r) =>
        r.countries.map((c) => ({
          value: c.iso_2,
          label: c.display_name,
          country: c.iso_2,
          region: r.id,
        }))
      )
      .sort((a, b) => a.label.localeCompare(b.label))
  }, [regions])

  useEffect(() => {
    if (countryCode) {
      const option = options?.find((o) => o.country === countryCode)
      setCurrent(option?.value || null)
    }
  }, [options, countryCode])

  const handleChange = (value: string | null) => {
    const option = options.find((o) => o.value === value)
    if (option) {
      updateRegion(option.country, currentPath)
      close()
    }
  }

  return (
    <Select
      data={options}
      value={current}
      onChange={handleChange}
      placeholder="Select a country"
      label="Shipping to"
      leftSection={
        <ReactCountryFlag
          svg
          style={{
            width: rem(16),
            height: rem(16),
          }}
          countryCode={current || ''}
        />
      }
      // leftSectionProps={{
      //   style: { 
      //     pointerEvents: 'none',
      //     opacity: current ? 1 : 0 // Hide the flag when no country is selected
      //   }
      // }}
    />
  )
}

export default CountrySelect