"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [{ title: "Home", href: "/" }];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="max-w-container w-full bg-background">
      <div className="flex h-20 items-end justify-between border-b-2 px-2 py-4 md:h-24 md:px-4">
        <nav className="flex items-center gap-4 text-sm">
          {navLinks.map(({ title, href }) => (
            <Link
              className={pathname === href ? "font-bold" : ""}
              key={href}
              href={href}
            >
              {title}
            </Link>
          ))}
        </nav>

        <Link href={"/"} className="font-bold">
          @Next CMS Integration
        </Link>
      </div>
    </header>
  );
}
