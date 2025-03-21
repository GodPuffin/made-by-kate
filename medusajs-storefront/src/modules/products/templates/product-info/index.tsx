import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: PricedProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-medium"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <Heading level="h2" className="text-3xl leading-10">
          {product.title}
        </Heading>

        <Text className="text-medium">
          {product.description}
        </Text>
      </div>
    </div>
  )
}

export default ProductInfo
