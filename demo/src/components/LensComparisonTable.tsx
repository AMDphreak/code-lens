import { For } from "solid-js";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { LENS_ROWS } from "~/data";

export function LensComparisonTable() {
  return (
    <div class="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Lens</TableHead>
            <TableHead>Also called</TableHead>
            <TableHead>Foregrounds</TableHead>
            <TableHead>Trade-off</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <For each={LENS_ROWS}>
            {(row) => (
              <TableRow>
                <TableCell class="font-medium">{row.lens}</TableCell>
                <TableCell>{row.also}</TableCell>
                <TableCell>{row.foregrounds}</TableCell>
                <TableCell class="text-muted-foreground">{row.tradeoff}</TableCell>
              </TableRow>
            )}
          </For>
        </TableBody>
      </Table>
    </div>
  );
}
