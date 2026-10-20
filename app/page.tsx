"use client";

import { ThemeSwitcher } from "./components/theme-components/theme-switcher";

export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="mb-4 text-2xl font-bold">My Next.js App</h1>

      <ThemeSwitcher />
    </main>
  );
}
