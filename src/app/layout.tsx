import ProviderMain from "@/redux/provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body>
          <ProviderMain>
                {children}
          </ProviderMain>
        </body>
    </html>
  )
}
