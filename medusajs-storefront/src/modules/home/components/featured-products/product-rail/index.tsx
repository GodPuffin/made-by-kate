import { Region } from "@medusajs/medusa"

import ProductPreview from "@modules/products/components/product-preview"
import { ProductCollectionWithPreviews } from "types/global"
import ScrollMarquee from "./marquee"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function ProductRail({
  collection,
  region,
}: {
  collection: ProductCollectionWithPreviews
  region: Region
}) {
  const { products } = collection

  if (!products) {
    return null
  }

  return (
    <div className="content-container">
        <LocalizedClientLink href={`/collections/${collection.handle}`}>
          <ScrollMarquee text={collection.title}/>
        </LocalizedClientLink>
      <ul className="grid grid-cols-2 small:grid-cols-4 small:gap-x-10 small:gap-y-10 gap-x-5 gap-y-5">
        {products &&
          products.map((product) => (
            <li key={product.id}>
              <ProductPreview
                productPreview={product}
                region={region}
                isFeatured
              />
            </li>
          ))}
      </ul>
    </div>
  )
}
