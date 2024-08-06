"use client"

import { useState, useEffect } from "react"
import { Radio, Group, Stack, Text, Button, Center } from "@mantine/core"
import { CheckCircleSolid } from "@medusajs/icons"
import { Cart } from "@medusajs/medusa"
import { PricedShippingOption } from "@medusajs/medusa/dist/types/pricing"
import { formatAmount } from "@lib/util/prices"

import Divider from "@modules/common/components/divider"
import Spinner from "@modules/common/icons/spinner"
import ErrorMessage from "@modules/checkout/components/error-message"
import { setShippingMethod } from "@modules/checkout/actions"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Heading } from "@medusajs/ui"

type ShippingProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
  availableShippingMethods: PricedShippingOption[] | null
}

const Shipping: React.FC<ShippingProps> = ({
  cart,
  availableShippingMethods,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<string | null>(null)

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "delivery"

  const handleEdit = () => {
    router.push(pathname + "?step=delivery", { scroll: false })
  }

  const handleSubmit = () => {
    setIsLoading(true)
    router.push(pathname + "?step=payment", { scroll: false })
  }

  const set = async (id: string) => {
    setIsLoading(true)
    await setShippingMethod(id)
      .then(() => {
        setIsLoading(false)
      })
      .catch((err) => {
        setError(err.toString())
        setIsLoading(false)
      })
  }

  const handleChange = (value: string) => {
    setSelectedShippingMethod(value)
    set(value)
  }

  useEffect(() => {
    setIsLoading(false)
    setError(null)
  }, [isOpen])

  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={`flex flex-row text-3xl-regular gap-x-2 items-baseline ${!isOpen && cart.shipping_methods.length === 0 ? "opacity-50 pointer-events-none select-none" : ""}`}
        >
          Delivery
          {!isOpen && cart.shipping_methods.length > 0 && <CheckCircleSolid />}
        </Heading>
        {!isOpen &&
          cart?.shipping_address &&
          cart?.billing_address &&
          cart?.email && (
            <Text>
              <button onClick={handleEdit}>Edit</button>
            </Text>
          )}
      </div>
      {isOpen ? (
        <div>
          <div className="pb-8">
            <Radio.Group
              value={selectedShippingMethod}
              onChange={handleChange}
              label="Select a shipping method"
            >
              <Stack>
                {availableShippingMethods ? (
                  availableShippingMethods.map((option) => (
                    <Radio.Card key={option.id} value={option.id} radius="md" p="md">
                      <Group wrap="nowrap" align="flex-start">
                        <Center mt="sm" ml="lg">
                        <Radio.Indicator />
                        </Center>
                        <div>
                          <Text>{option.name}</Text>
                          <Text size="sm">
                            {formatAmount({
                              amount: option.amount!,
                              region: cart?.region,
                              includeTaxes: false,
                            })}
                          </Text>
                        </div>
                      </Group>
                    </Radio.Card>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center px-4 py-8">
                    <Spinner />
                  </div>
                )}
              </Stack>
            </Radio.Group>
          </div>

          <ErrorMessage error={error} />

          <Button
            variant="outline"
            onClick={handleSubmit}
            loading={isLoading}
            disabled={!selectedShippingMethod}
          >
            Continue to payment
          </Button>
        </div>
      ) : (
        <div>
          <div className="text-small-regular">
            {cart && cart.shipping_methods.length > 0 && (
              <div className="flex flex-col w-1/3">
                <Text className="txt-medium-plus mb-1">Method</Text>
                <Text className="txt-medium">
                  {cart.shipping_methods[0].shipping_option.name} (
                  {formatAmount({
                    amount: cart.shipping_methods[0].price,
                    region: cart.region,
                    includeTaxes: false,
                  })
                    .replace(/,/g, "")
                    .replace(/\./g, ",")}
                  )
                </Text>
              </div>
            )}
          </div>
        </div>
      )}
      <Divider className="mt-8" />
    </div>
  )
}

export default Shipping
