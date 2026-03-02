import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, onClose }) {
  const dialogRef = useRef();

  useEffect(() => {
    const modal = dialogRef.current;

    if (open) {
      modal.showModal();
    }

    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="bg-main rounded-xl border-none p-4 shadow-2xl backdrop:bg-black/70 m-auto max-w-160 w-full"
    >
      {children}
    </dialog>,
    document.getElementById("modal"),
  );
}
