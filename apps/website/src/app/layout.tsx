import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Republic",
  description: "A batteries-included web framework designed for human-led, AI-assisted development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
