"use client"

// import { Metadata } from "next"
import "styles/globals.css"
import "styles/mantine.css"
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import { theme } from '../theme';
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { MedusaProvider } from "medusa-react";
import { QueryClient } from '@tanstack/react-query';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

// export const metadata: Metadata = {
//   metadataBase: new URL(BASE_URL),
// }

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MedusaProvider
          baseUrl={process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"}
          queryClientProviderProps={{ client: new QueryClient() }}
        >
          <MantineProvider theme={theme} defaultColorScheme="light">
            <Notifications autoClose={4000} limit={3} />
            {props.children}
          </MantineProvider>
        </MedusaProvider>
      </body>
    </html>
  );
}
