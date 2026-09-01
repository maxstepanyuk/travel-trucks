import Link from "next/link";

import css from "./Header.module.css";

export default function Heder() {
  return (
    <header>
      <div className="container">
        <Link href="/" className={css.logo}>
        </Link>
      </div>
    </header>
  );
}
