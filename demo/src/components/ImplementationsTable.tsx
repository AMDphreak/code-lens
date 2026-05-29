import { For } from "solid-js";
import type { DeliveryLayer, GlassLensTier, ImplementationStatus } from "@code-lens/core";
import { Badge } from "~/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { registry } from "~/data";
import { cn } from "~/lib/utils";

function statusVariant(status: ImplementationStatus): "default" | "secondary" | "outline" {
  if (status === "shipped") return "default";
  if (status === "wip") return "secondary";
  return "outline";
}

function glassClass(tier: GlassLensTier): string {
  switch (tier) {
    case "full":
    case "webview":
    case "native":
      return "text-sky-800 dark:text-sky-300";
    case "fallback":
      return "text-amber-800 dark:text-amber-300";
    default:
      return "text-muted-foreground";
  }
}

export function ImplementationsTable() {
  return (
    <div class="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Platform</TableHead>
            <TableHead>Implementation</TableHead>
            <TableHead>Package</TableHead>
            <TableHead>Delivery</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Glass lens</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <For each={registry.implementations}>
            {(row) => (
              <TableRow title={row.notes}>
                <TableCell>{row.platform}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <code class="font-mono text-xs">{row.pkg}</code>
                </TableCell>
                <TableCell>
                  <span class="font-mono text-xs capitalize text-muted-foreground">
                    {row.delivery}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant(row.status)}>{row.status}</Badge>
                </TableCell>
                <TableCell>
                  <span class={cn("font-mono text-xs capitalize", glassClass(row.glassLens))}>
                    {row.glassLens}
                  </span>
                </TableCell>
              </TableRow>
            )}
          </For>
        </TableBody>
      </Table>
    </div>
  );
}
