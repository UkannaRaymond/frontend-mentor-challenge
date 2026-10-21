"use client";

import { Button } from "@heroui/react";
import { ExtensionCard } from "@/components/card/extension-card";
import {
  useExtensions,
  useRemoveExtension,
  useToggleExtension,
} from "@/lib/extensions";
import { useFilterStore } from "@/lib/filter-store";
import type { Extension, Filter } from "@/lib/types";

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export function ExtensionList() {
  const filter = useFilterStore((s) => s.filter);
  const setFilter = useFilterStore((s) => s.setFilter);

  const { data, isPending, isError, refetch } = useExtensions(filter);
  const toggle = useToggleExtension();
  const remove = useRemoveExtension();

  function handleToggle(extension: Extension) {
    toggle.mutate({
      id: extension.id,
      status: extension.status === "active" ? "inactive" : "active",
    });
  }

  function isBusy(id: string) {
    return (
      (toggle.isPending && toggle.variables?.id === id) ||
      (remove.isPending && remove.variables === id)
    );
  }

  return (
    <section className="mt-10 flex flex-col gap-6">
      <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
        <h2 className="text-3xl font-bold text-ink">Extensions List</h2>

        <div className="flex gap-3">
          {filters.map(({ value, label }) => (
            <Button
              key={value}
              variant={filter === value ? "primary" : "outline"}
              aria-pressed={filter === value}
              onPress={() => setFilter(value)}
              className={
                filter === value
                  ? "rounded-full px-5 hover:bg-[hsl(3,71%,56%)]! dark:hover:bg-[hsl(3,86%,64%)]!"
                  : "rounded-full border-line-strong bg-surface px-5 text-ink hover:bg-control! dark:border-line dark:bg-control dark:hover:bg-line!"
              }
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {isPending ? (
        <ul
          aria-busy="true"
          aria-label="Loading extensions"
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {Array.from({ length: 6 }, (_, i) => (
            <li
              key={i}
              className="h-44 animate-pulse rounded-2xl border border-line bg-surface"
            />
          ))}
        </ul>
      ) : isError ? (
        <div role="alert" className="flex flex-col items-center gap-4 py-10">
          <p className="text-ink">Couldn&apos;t load extensions.</p>
          <Button variant="primary" onPress={() => refetch()}>
            Try again
          </Button>
        </div>
      ) : data.length === 0 ? (
        <p className="py-10 text-center text-ink-muted">
          {filter === "all"
            ? "No extensions installed."
            : `No ${filter} extensions.`}
        </p>
      ) : (
        <ul className={`grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3`}>
          {data.map((extension) => (
            <li key={extension.id} className="flex">
              <ExtensionCard
                extension={extension}
                disabled={isBusy(extension.id)}
                onToggleAction={handleToggle}
                onRemoveAction={(id) => remove.mutate(id)}
              />
            </li>
          ))}
        </ul>
      )}

      {(toggle.isError || remove.isError) && (
        <p role="alert" className="text-center text-sm text-ink">
          Something went wrong. Please try again.
        </p>
      )}
    </section>
  );
}
