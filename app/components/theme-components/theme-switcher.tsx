// app/components/theme-switcher.tsx
"use client";

import Image from "next/image";
import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function ThemeSwitcher() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const { resolvedTheme, setTheme } = useTheme();

  // Same size as the real button, so the header doesn't jump on load
  if (!mounted) return <div className="size-11" aria-hidden />;

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      isIconOnly
      variant="secondary"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onPress={() => setTheme(isDark ? "light" : "dark")}
      className="size-11 rounded-lg bg-control"
    >
      <Image
        src={isDark ? "/images/icon-sun.svg" : "/images/icon-moon.svg"}
        alt=""
        width={22}
        height={22}
      />
    </Button>
  );
}
