"use client"

import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Radio, Group, Stack, Text, Center } from "@mantine/core"
import ErrorMessage from "@modules/checkout/components/error-message"
import { Cart } from "@medusajs/medusa"
import { CheckCircleSolid, CreditCard } from "@medusajs/icons"
import { Container, Heading, Tooltip, clx } from "@medusajs/ui"
import { CardElement } from "@stripe/react-stripe-js"
import { StripeCardElementOptions } from "@stripe/stripe-js"

import Divider from "@modules/common/components/divider"
import Spinner from "@modules/common/icons/spinner"
import PaymentContainer from "@modules/checkout/components/payment-container"
import { setPaymentMethod } from "@modules/checkout/actions"
import { paymentInfoMap } from "@lib/constants"
import { StripeContext } from "@modules/checkout/components/payment-wrapper"
import { Button } from "@mantine/core"

const Payment = ({
  cart,
}: {
  cart: Omit<Cart, "refundable_amount" | "refunded_total"> | null
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cardBrand, setCardBrand] = useState<string | null>(null)
  const [cardComplete, setCardComplete] = useState(false)

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "payment"

  const isStripe = cart?.payment_session?.provider_id === "stripe"
  const stripeReady = useContext(StripeContext)

  const paymentReady =
    cart?.payment_session && cart?.shipping_methods.length !== 0

  const useOptions: StripeCardElementOptions = useMemo(() => {
    return {
      style: {
        base: {
          // fontFamily: 'inherit',
          // fontSize: '1rem',
          // lineHeight: '1.5',
          // color: 'var(--mantine-color-text)',
          // '::placeholder': {
          //   color: 'var(--mantine-color-placeholder)',
          // },
        },
      },
      // classes: {
      //   base: 'mantine-Input-input mantine-Input-input--base',
      //   focus: 'mantine-Input-input--focus',
      //   invalid: 'mantine-Input-input--invalid',
      // },
    }
  }, [])

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const set = async (providerId: string) => {
    setIsLoading(true)
    await setPaymentMethod(providerId)
      .catch((err) => setError(err.toString()))
      .finally(() => {
        if (providerId === "paypal") return
        setIsLoading(false)
      })
  }

  const handleChange = (providerId: string) => {
    setError(null)
    set(providerId)
  }

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    })
  }

  const handleSubmit = () => {
    setIsLoading(true)
    router.push(pathname + "?" + createQueryString("step", "review"), {
      scroll: false,
    })
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
          className={clx(
            "flex flex-row text-3xl-regular gap-x-2 items-baseline",
            {
              "opacity-50 pointer-events-none select-none":
                !isOpen && !paymentReady,
            }
          )}
        >
          Payment
          {!isOpen && paymentReady && <CheckCircleSolid />}
        </Heading>
        {!isOpen && paymentReady && (
          <Text>
            <button
              onClick={handleEdit}
            >
              Edit
            </button>
          </Text>
        )}
      </div>
      <div>
        {cart?.payment_sessions?.length ? (
          <div className={isOpen ? "block" : "hidden"}>
            <Radio.Group
              value={cart.payment_session?.provider_id || ""}
              onChange={(value: string) => handleChange(value)}
              label="Select a payment method"
            >
              <Stack>
                {cart.payment_sessions
                  .sort((a, b) => (a.provider_id > b.provider_id ? 1 : -1))
                  .map((paymentSession) => (
                    <Radio.Card
                      key={paymentSession.id}
                      value={paymentSession.provider_id}
                      radius="md"
                      p="md"
                    >
                      <Group wrap="nowrap" align="flex-start">
                        <Center mt="sm" ml="lg">
                          <Radio.Indicator />
                        </Center>
                        <div>
                          <Text>{paymentInfoMap[paymentSession.provider_id]?.title}</Text>
                          <Text size="sm" c="dimmed">
                            Payment by {paymentSession.provider_id}
                          </Text>
                        </div>
                      </Group>
                    </Radio.Card>
                  ))}
              </Stack>
            </Radio.Group>

            {isStripe && stripeReady && (
              <div className="mt-5 transition-all duration-150 ease-in-out">
                <Text className="txt-medium-plus mb-1">
                  Enter your card details:
                </Text>

                <div className="p-10">
                  <CardElement
                    options={useOptions as StripeCardElementOptions}
                    onChange={(e) => {
                      setCardBrand(
                        e.brand &&
                        e.brand.charAt(0).toUpperCase() + e.brand.slice(1)
                      )
                      setError(e.error?.message || null)
                      setCardComplete(e.complete)
                    }}
                  />
                </div>
              </div>
            )}

            <ErrorMessage error={error} />

            <Button
              variant="outline"
              className="mt-6"
              onClick={handleSubmit}
              loading={isLoading}
              disabled={(isStripe && !cardComplete) || !cart.payment_session}
            >
              Continue to review
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-16">
            <Spinner />
          </div>
        )}

        <div className={isOpen ? "hidden" : "block"}>
          {cart && paymentReady && cart.payment_session && (
            <div className="flex items-start gap-x-1 w-full">
              <div className="flex flex-col w-1/3">
                <Text className="txt-medium-plus mb-1">
                  Payment method
                </Text>
                <Text className="txt-medium">
                  {paymentInfoMap[cart.payment_session.provider_id]?.title ||
                    cart.payment_session.provider_id}
                </Text>
                {process.env.NODE_ENV === "development" &&
                  !Object.hasOwn(
                    paymentInfoMap,
                    cart.payment_session.provider_id
                  ) && (
                    <Tooltip content="You can add a user-friendly name and icon for this payment provider in 'src/modules/checkout/components/payment/index.tsx'" />
                  )}
              </div>
              <div className="flex flex-col w-1/3">
                <Text className="txt-medium-plus mb-1">
                  Payment details
                </Text>
                <div className="flex gap-2 txt-medium items-center">
                  {/* <Container className="flex items-center h-7 w-fit p-2">
                    {paymentInfoMap[cart.payment_session.provider_id]?.icon || (
                      <CreditCard />
                    )}
                  </Container> */}
                  <Text>
                    {cart.payment_session.provider_id === "stripe" && cardBrand
                      ? cardBrand
                      : "Another step will appear"}
                  </Text>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Divider className="mt-8" />
    </div>
  )
}

export default Payment