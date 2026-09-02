import Link from "next/link";

import css from "./Header.module.css";
import Container from "../Container/Container";
import clsx from "clsx";

export default function Heder() {
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
            <li>
              <Link
                className={clsx(
                  css.navigationLink,
                  css.navigationLinkActive,
                  css.headerLink,
                )}
                href="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={clsx(css.navigationLink, css.headerLink)}
                href="/catalog"
              >
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </Container>
  );
}
