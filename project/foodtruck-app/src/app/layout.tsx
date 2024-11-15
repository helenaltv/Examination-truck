// project/foodtruck-app/src/app/layout.tsx
import "./globals.css";
import React from "react";
import CartIcon from "../components/CartIcon";
import { CartProvider } from "../context/CartContext";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>Yum Yum Gim Mi Sum</title>
        <meta name="description" content="Yum Yum Gim Mi Sum Food Truck App" />
      </head>
      <body>
        <CartProvider>
          <div className="app-layout">
            <header className="app-header">
              <Link href="/" className="logo-link">
                <h1>Yum Yum Gim Mi Sum</h1>
              </Link>
              <nav>
                <ul>
                  <li>
                    <Link href="/"></Link>
                  </li>
                  <li>
                    <Link href="/cart"></Link>
                  </li>
                  <li>
                    <Link href="/preparing-order"></Link>
                  </li>
                </ul>
              </nav>
              <CartIcon />
            </header>
            <main>{children}</main>
            <footer className="app-footer">
              <p>© 2024 Yum Yum Gim Mi Sum Food Truck</p>
            </footer>
          </div>
        </CartProvider>
      </body>
    </html>
  );
};

export default Layout;
