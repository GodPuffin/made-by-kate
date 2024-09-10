'use client';

import { Image as MedusaImage } from "@medusajs/medusa"
import { Image } from "@mantine/core"
import { motion } from "framer-motion"

type ImageGalleryProps = {
  images: MedusaImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className="flex items-start relative">
      <div className="flex flex-col flex-1 small:mx-16 gap-y-4">
        {images.map((image, index) => {
          return (
            <motion.div
              initial={{ opacity: 0.0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}

              key={image.id}
              className="relative aspect-[29/34] w-full overflow-hidden rounded-3xl"
              id={image.id}
            >
              <Image
                src={image.url}
                // priority={index <= 2 ? true : false}
                className="absolute inset-0"
                alt={`Product image ${index + 1}`}
                fit="fill"
                sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                style={{
                  objectFit: "cover",
                }}
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery
