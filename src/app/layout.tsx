import "./globals.css";
import { AppProviders } from "./providers";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Token Table App",
  description:
    "Explore real-time crypto token data with live sorting, charts, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white text-black dark:bg-gray-950 dark:text-white transition-colors duration-300`}
      >
        {/* AppProviders already wraps ThemeProvider */}
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
