import React from 'react';
import { ProductPreviewType } from "types/global";
import { Region } from "@medusajs/medusa";
import { retrievePricedProductById } from "@lib/data";
import { getProductPrice } from "@lib/util/get-product-price";
import ProductPreviewClient from './productPreviewClient';

async function ProductPreview({
  productPreview,
  isFeatured,
  region,
}: {
  productPreview: ProductPreviewType;
  isFeatured?: boolean;
  region: Region;
}) {
  const pricedProduct = await retrievePricedProductById({
    id: productPreview.id,
    regionId: region.id,
  });

  if (!pricedProduct) {
    return null;
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
    region,
  });

  return (
    <ProductPreviewClient 
      productPreview={productPreview}
      cheapestPrice={cheapestPrice}
    />
  );
}

export default ProductPreview;