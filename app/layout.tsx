import React from "react";

export default async function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en" className="bg-white text-black">
        <body>
            {children}
        </body>
      </html>
    );
  }