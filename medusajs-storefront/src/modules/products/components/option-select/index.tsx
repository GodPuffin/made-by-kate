import { ProductOption } from "@medusajs/medusa"
import { clx } from "@medusajs/ui"
import React from "react"

import { onlyUnique } from "@lib/util/only-unique"
import { Button } from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"

type OptionSelectProps = {
  option: ProductOption
  current: string
  updateOption: (option: Record<string, string>) => void
  title: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
}) => {
  const filteredOptions = option.values.map((v) => v.value).filter(onlyUnique)

  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-sm">Select {title}</span>
      <div className="flex flex-wrap justify-between gap-2">
        {filteredOptions.map((v) => {
          return (
            <Button
              onClick={() => updateOption({ [option.id]: v })}
              key={v}
              className="border-ui-border-base border text-small-regular h-10 rounded-rounded p-2 flex-1"
              variant={v === current ? "light" : "subtle"}
              // rightSection={v === current ? <IconCheck size={20}/> : ''}
              fw={v === current ? 900 : 400}
            >
              {v}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
