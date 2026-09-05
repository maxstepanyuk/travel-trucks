"use client";

import { useEffect, type ReactNode } from "react";
import css from "./ModalStatic.module.css";

interface ModalProps {
  children: ReactNode;
}

export default function ModalStatic({ children }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className={css.backdrop} role="dialog" aria-modal="true">
      <div className={css.modal}>{children}</div>
    </div>
  );
}
