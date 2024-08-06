"use client"

import { LineItem, Region } from "@medusajs/medusa"
import { Heading } from "@medusajs/ui"
import { Table, TableThead, TableTr, TableTh, TableTbody } from '@mantine/core'
import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  items?: Omit<LineItem, "beforeInsert">[]
  region?: Region
}

const ItemsTemplate = ({ items, region }: ItemsTemplateProps) => {
  return (
    <div>
      <div className="pb-3 flex items-center">
        <Heading className="text-[2rem] leading-[2.75rem]">Cart</Heading>
      </div>
      <Table>
        <TableThead>
          <TableTr>
            <TableTh>Item</TableTh>
            <TableTh></TableTh>
            <TableTh>Quantity</TableTh>
            <TableTh className="hidden small:table-cell">Price</TableTh>
            <TableTh style={{ textAlign: 'right' }}>Total</TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>
          {items && region
            ? items
                .sort((a, b) => {
                  return a.created_at > b.created_at ? -1 : 1
                })
                .map((item) => (
                  <Item key={item.id} item={item} region={region} />
                ))
            : Array.from(Array(5).keys()).map((i) => (
                <SkeletonLineItem key={i} />
              ))}
        </TableTbody>
      </Table>
    </div>
  )
}

export default ItemsTemplate