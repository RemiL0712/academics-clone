import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

export const metadata: Metadata = {
  title: "GenScript.online",
  description: "Online academic support service",
  icons: {
    icon: "/favicon.ico",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--gs-bg)] text-[var(--gs-dark)]">
        {/* Google reCAPTCHA script */}
        <Script
          src="https://www.google.com/recaptcha/api.js"
          strategy="afterInteractive"
        />

        <div className="flex min-h-screen flex-col">
          <Header />

          <main className="flex-1">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}

