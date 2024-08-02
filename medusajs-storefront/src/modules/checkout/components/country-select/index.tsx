import { forwardRef, useMemo } from "react";
import { Select } from '@mantine/core';
import { Region } from "@medusajs/medusa";

const CountrySelect = forwardRef<
  HTMLInputElement,
  {
    region?: Region;
    placeholder?: string;
    defaultValue?: string;
    [key: string]: any;
  }
>(({ placeholder = "Country", region, defaultValue, ...props }, ref) => {

  const countryOptions = useMemo(() => {
    if (!region) {
      return [];
    }

    return region.countries.map((country) => ({
      value: country.iso_2,
      label: country.display_name,
    }));
  }, [region]);

  return (
    <Select
      label="Country"
      ref={ref}
      placeholder={placeholder}
      data={countryOptions}
      defaultValue={defaultValue}
      {...props}
    />
  );
});

CountrySelect.displayName = "CountrySelect";

export default CountrySelect;
