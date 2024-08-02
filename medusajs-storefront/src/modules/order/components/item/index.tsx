import { LineItem, Region } from "@medusajs/medusa"
import { Text } from "@mantine/core"

import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import Thumbnail from "@modules/products/components/thumbnail"

type ItemProps = {
  item: Omit<LineItem, "beforeInsert">
  region: Region
}

const Item = ({ item, region }: ItemProps) => {
  return (
    <tr className="w-full">
      <td className="!pl-0 p-4 w-24">
        <div className="flex w-16">
          <Thumbnail thumbnail={item.thumbnail} size="square" />
        </div>
      </td>

      <td className="text-left">
        <Text className="txt-medium-plus">{item.title}</Text>
        <LineItemOptions variant={item.variant} />
      </td>

      <td className="!pr-0">
        <span className="!pr-0 flex flex-col items-end h-full justify-center">
          <span className="flex gap-x-1 ">
            <Text>{item.quantity}x </Text>
            <LineItemUnitPrice item={item} region={region} style="tight" />
          </span>

          <LineItemPrice item={item} region={region} style="tight" />
        </span>
      </td>
    </tr>
  )
}

export default Item
