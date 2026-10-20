"use client";

import { Button, Card, Switch } from "@heroui/react";
import { ExtensionAvatar } from "@/components/card/extension-avatar";
import type { Extension } from "@/lib/types";

type ExtensionCardProps = {
  extension: Extension;
  disabled?: boolean;
  onToggle: (extension: Extension) => void;
  onRemove: (id: string) => void;
};

export function ExtensionCard({
  extension,
  disabled = false,
  onToggle,
  onRemove,
}: ExtensionCardProps) {
  return (
    <Card className="flex w-full flex-col gap-6 rounded-2xl border border-line bg-surface p-5">
      <div className="flex flex-1 items-start gap-4">
        <ExtensionAvatar name={extension.name} src={extension.avatarUrl} />
        <div className="flex flex-col gap-2">
          <Card.Title className="text-xl font-medium text-ink">
            {extension.name}
          </Card.Title>
          <Card.Description className="text-ink-muted">
            {extension.description}
          </Card.Description>
        </div>
      </div>

      <Card.Footer className="items-center justify-between p-0">
        <Button
          variant="outline"
          isDisabled={disabled}
          aria-label={`Remove ${extension.name}`}
          onPress={() => onRemove(extension.id)}
          className="rounded-full"
        >
          Remove
        </Button>

        <Switch
          isSelected={extension.status === "active"}
          isDisabled={disabled}
          onChange={() => onToggle(extension)}
          aria-label={`Toggle ${extension.name}`}
        >
          <Switch.Content>
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
          </Switch.Content>
        </Switch>
      </Card.Footer>
    </Card>
  );
}
