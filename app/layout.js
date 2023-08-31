import "./globals.css";
import { Raleway } from "next/font/google";

const raleway = Raleway({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${raleway.className}`}>
        {/* 原本加上px-3 */}
        <div className="container mx-auto my-0 ">{children}</div>
      </body>
    </html>
  );
}
