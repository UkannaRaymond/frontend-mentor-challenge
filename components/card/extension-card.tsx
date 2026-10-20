"use client";

import { Button, Card, Switch } from "@heroui/react";
import { ExtensionAvatar } from "@/components/card/extension-avatar";
import type { Extension } from "@/lib/types";

type ExtensionCardProps = {
  extension: Extension;
  disabled?: boolean;
  onToggleAction: (extension: Extension) => void;
  onRemoveAction: (id: string) => void;
};

export function ExtensionCard({
  extension,
  disabled = false,
  onToggleAction,
  onRemoveAction,
}: ExtensionCardProps) {
  return (
    <Card className="flex w-full flex-col gap-6 rounded-2xl border border-line bg-surface p-5">
      <div className="flex flex-1 items-start gap-4">
        <ExtensionAvatar name={extension.name} src={extension.avatarUrl} />
        <div className="flex flex-col gap-2">
          <Card.Title className="text-xl font-bold text-ink">
            {extension.name}
          </Card.Title>
          <Card.Description className="text-ink-muted text-base">
            {extension.description}
          </Card.Description>
        </div>
      </div>

      <Card.Footer className="items-center justify-between p-0">
        <Button
          variant="outline"
          isDisabled={disabled}
          aria-label={`Remove ${extension.name}`}
          onPress={() => onRemoveAction(extension.id)}
          className="rounded-full border-line-strong bg-surface text-ink dark:bg-transparent
             hover:bg-accent! hover:text-accent-foreground! hover:border-accent!"
        >
          Remove
        </Button>

        <Switch
          isSelected={extension.status === "active"}
          isDisabled={disabled}
          onChange={() => onToggleAction(extension)}
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
