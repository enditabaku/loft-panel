import "@/css/outfit.css";
import "@/css/simple-datatables.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/style.css";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <NextTopLoader color="#e9a063" showSpinner={false} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
