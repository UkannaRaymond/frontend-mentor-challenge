"use client";

import { useState } from "react";
import Image from "next/image";

// Soft tints in the spirit of the design's icon tiles
const TINTS = [
  "bg-[#c4dcc4]",
  "bg-[#a9d6e3]",
  "bg-[#ffd0d0]",
  "bg-[#f1bde6]",
  "bg-[#d3bff0]",
  "bg-[#a8c7f5]",
  "bg-[#8dd5f2]",
  "bg-[#b9b6fb]",
  "bg-[#8ff0d9]",
  "bg-[#ffd5b5]",
  "bg-[#8eeaf5]",
  "bg-[#b8f7b8]",
];

function tintFor(name: string) {
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return TINTS[hash % TINTS.length];
}

export function ExtensionAvatar({ name, src }: { name: string; src: string }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        aria-hidden
        className={`flex size-12 shrink-0 items-center justify-center rounded-xl text-lg font-bold text-[hsl(227,75%,14%)] ${tintFor(name)}`}
      >
        {name.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <Image
      src={encodeURI(src)}
      alt=""
      width={48}
      height={48}
      loading="lazy"
      onError={() => setFailed(true)}
      className="size-12 shrink-0 rounded-xl object-cover"
    />
  );
}
