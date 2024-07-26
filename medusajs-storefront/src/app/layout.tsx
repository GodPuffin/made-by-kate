import { Metadata } from "next"
import "styles/globals.css"
import "styles/mantine.css"
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { theme } from '../../theme';
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Notifications autoClose={4000} limit={3} />
            {props.children}
        </MantineProvider>
      </body>
    </html>
  );
}
