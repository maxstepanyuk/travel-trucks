"use client";

import Link from "next/link";
import css from "./Header.module.css";
import Container from "../Container/Container";
import clsx from "clsx";
import { usePathname } from "next/navigation";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Catalog", href: "/catalog" },
];

export default function Heder() {
  const pathname = usePathname();

  return (
    <Container>
      <header className={css.header}>
        <Link href="/" className={css.headerLink}>
          <svg width={136} height={16}>
            <use href="/logo.svg" />
          </svg>
        </Link>
        <nav>
          <ul className={css.navigationList}>
            {navItems.map((item) => {
              const isActive = item.href === pathname;
              return (
                <li key={item.name}>
                  <Link
                    className={clsx(
                      css.headerLink,
                      css.navigationLink,
                      isActive && css.navigationLinkActive,
                    )}
                    href={item.href}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
    </Container>
  );
}
