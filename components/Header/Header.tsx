import Link from "next/link";

import css from "./Header.module.css";

export default function Heder() {
  return (
    <header>
      <div className="container">
        <Link href="/" className={css.logo}>
          <svg width={136} height={16}>
            <use href="/logo.svg" />
          </svg>
        </Link>
      </div>
    </header>
  );
}
