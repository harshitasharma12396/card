import type { Metadata, Viewport } from "next";
import { Gilda_Display, Instrument_Serif, Figtree, Tiro_Devanagari_Hindi, Noto_Sans_Devanagari } from "next/font/google";
import { invite } from "@/content/invite";
import "./globals.css";

const gilda = Gilda_Display({
  variable: "--font-gilda",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const tiro = Tiro_Devanagari_Hindi({
  variable: "--font-tiro",
  subsets: ["devanagari", "latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

/* Hindi body and label text (Figtree has no Devanagari). */
const notoDeva = Noto_Sans_Devanagari({
  variable: "--font-noto-deva",
  subsets: ["devanagari"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: invite.meta.title,
  description: invite.meta.description,
  openGraph: {
    title: invite.meta.title,
    description: invite.meta.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f3b9cc",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${gilda.variable} ${instrument.variable} ${figtree.variable} ${tiro.variable} ${notoDeva.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
