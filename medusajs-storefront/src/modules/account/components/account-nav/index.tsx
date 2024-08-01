"use client"

import { Customer } from "@medusajs/medusa"
import { NavLink, Text } from '@mantine/core';
import { useParams, usePathname } from "next/navigation"

import { IconArrowBackUp, IconChevronRight, IconGlobe, IconUser, IconMapPin, IconPackage, IconLogout2 } from '@tabler/icons-react';
import { signOut } from "@modules/account/actions"

import LocalizedClientLink from "@modules/common/components/localized-client-link";

const AccountNav = ({
  customer,
}: {
  customer: Omit<Customer, "password_hash"> | null
}) => {
  const route = usePathname()
  const { countryCode } = useParams()

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <div>
      <div className="small:hidden">
        {route !== `/${countryCode}/account` ? (
          <NavLink
            component={LocalizedClientLink}
            href="/account"
            label="Account"
            leftSection={<IconArrowBackUp size={20} />}
          />
        ) : (
          <>
            <div className="text-xl-semi mb-4 px-8">
              Hello {customer?.first_name}
            </div>
            <div className="text-base-regular">
              <ul>
                <li>
                  <NavLink
                    component={LocalizedClientLink}
                    href="/account/profile"
                    label="Profile"
                    leftSection={<IconUser size={20} />}
                    rightSection={<IconChevronRight size="0.8rem" />}
                  />
                </li>
                <li>
                  <NavLink
                    component={LocalizedClientLink}
                    href="/account/addresses"
                    label="Addresses"
                    leftSection={<IconMapPin size={20} />}
                    rightSection={<IconChevronRight size="0.8rem" />}
                  />
                </li>
                <li>
                  <NavLink
                    component={LocalizedClientLink}
                    href="/account/orders"
                    label="Orders"
                    leftSection={<IconPackage size={20} />}
                    rightSection={<IconChevronRight size="0.8rem" />}
                  />
                </li>
                <li>
                  <NavLink
                    component="button"
                    label="Log out"
                    onClick={handleLogout}
                    leftSection={<IconLogout2 size={20} />}
                    rightSection={<IconChevronRight size="0.8rem" />}
                  />
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="hidden small:block">
        <div>
          <div className="pb-4">
            <Text size="lg" className="text-base-semi">Account</Text>
          </div>
          <div>
            <ul className="flex flex-col gap-y-4">
              <li>
                <NavLink
                  component={LocalizedClientLink}
                  href="/account"
                  label="Overview"
                  leftSection={<IconGlobe size={20} />}
                />
              </li>
              <li>
                <NavLink
                  component={LocalizedClientLink}
                  href="/account/profile"
                  label="Profile"
                  leftSection={<IconUser size={20} />}
                />
              </li>
              <li>
                <NavLink
                  component={LocalizedClientLink}
                  href="/account/addresses"
                  label="Addresses"
                  leftSection={<IconMapPin size={20} />}
                />
              </li>
              <li>
                <NavLink
                  component={LocalizedClientLink}
                  href="/account/orders"
                  label="Orders"
                  leftSection={<IconPackage size={20} />}
                />
              </li>
              <li>
                <NavLink
                  onClick={handleLogout}
                  label="Log out"
                  leftSection={<IconLogout2 size={20} />}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountNav
