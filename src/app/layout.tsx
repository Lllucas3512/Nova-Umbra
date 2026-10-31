import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://umbrastudio.com.br"
  ),
  title: "Umbra Digital Studio — Ideias ganham forma digital",
  description:
    "Estratégia, design e tecnologia. Sites institucionais e landing pages sob medida para o seu negócio.",
  icons: {
    icon: "/brand/favicon.png",
    shortcut: "/brand/favicon.png",
    apple: "/brand/favicon.png",
  },
  openGraph: {
    title: "Umbra Digital Studio — Ideias ganham forma digital",
    description:
      "Estratégia, design e tecnologia. Sites institucionais e landing pages sob medida para o seu negócio.",
    type: "website",
    locale: "pt_BR",
    siteName: "Umbra Digital Studio",
    images: [
      {
        url: "/brand/og-image.png",
        width: 1733,
        height: 907,
        alt: "Umbra Digital Studio — Ideias ganham forma digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Umbra Digital Studio — Ideias ganham forma digital",
    description:
      "Estratégia, design e tecnologia. Sites institucionais e landing pages sob medida para o seu negócio.",
    images: ["/brand/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}

