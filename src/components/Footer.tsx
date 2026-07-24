"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-center gap-2 text-xs text-text-secondary">
        <Image src="/logo.png" alt="Climato" width={20} height={20} />
        <p>Climato &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
