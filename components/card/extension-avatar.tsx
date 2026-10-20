"use client";

import { useState } from "react";
import Image from "next/image";

export function ExtensionAvatar({ name, src }: { name: string; src: string }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        aria-hidden
        className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-control text-lg font-bold text-ink"
      >
        {name.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt=""
      width={48}
      height={48}
      onError={() => setFailed(true)}
      unoptimized
      className="size-12 shrink-0 rounded-xl object-cover"
    />
  );
}
