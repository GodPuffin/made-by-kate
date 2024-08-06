import { Center, Box, AspectRatio, Skeleton } from "@mantine/core"
import { Container } from "@medusajs/ui"
import productPreview from "@modules/products/components/product-preview"
import { transform } from "lodash"

const SkeletonProductPreview = () => {
  return (
    <div className="animate-pulse">
      <Container className="aspect-[3/4] w-full bg-gray-100 bg-ui-bg-subtle rounded-50" />
      <div className="flex justify-between text-base-regular mt-2">
        <div className="w-2/5 h-6 bg-gray-100"></div>
        <div className="w-1/5 h-6 bg-gray-100"></div>
      </div>
    </div>
  )
}

export default SkeletonProductPreview
