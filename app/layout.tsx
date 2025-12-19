import "./globals.css";
import { Luxurious_Roman } from "next/font/google";

const luxuriousRoman = Luxurious_Roman({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-luxury",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${luxuriousRoman.variable} bg-white text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
