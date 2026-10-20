import { Logo } from "@/components/card/logo";
import { ThemeSwitcher } from "@/components/theme-components/theme-switcher";

export function Header() {
  return (
    <header className="flex items-center justify-between rounded-2xl border border-line bg-surface px-3 py-3 md:px-4">
      <Logo className="h-8 w-auto text-ink md:h-10" />
      <ThemeSwitcher />
    </header>
  );
}
