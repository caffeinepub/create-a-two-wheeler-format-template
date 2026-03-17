import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, FileText, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { TwoWheeler } from "../../backend";
import { useActor } from "../../hooks/useActor";
import { useTwoWheelers } from "./useTwoWheelers";

function useDeleteTwoWheeler() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (regNum: string) => {
      if (!actor) throw new Error("Actor not initialized");
      await actor.removeTwoWheeler(regNum);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["twoWheelers"] });
      toast.success("Record deleted");
    },
    onError: () => toast.error("Failed to delete record"),
  });
}

function RecordDetail({ record }: { record: TwoWheeler }) {
  return (
    <div className="text-sm space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="text-xs text-muted-foreground">Registration</p>
          <p className="font-semibold">{record.registrationNumber}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Owner / Insured</p>
          <p className="font-semibold">{record.ownerName || "—"}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Brand / Model</p>
          <p>
            {record.brand} {record.model}
            {record.variant ? ` (${record.variant})` : ""}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Vehicle Type</p>
          <p className="capitalize">{record.vehicleType}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Chassis No.</p>
          <p>{record.chassisNumber || "—"}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Engine No.</p>
          <p>{record.engineNumber || "—"}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Colour</p>
          <p>{record.color || "—"}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Year</p>
          <p>{record.manufacturingYear.toString()}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Fuel Type</p>
          <p className="capitalize">{record.fuelType}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Odometer</p>
          <p>{record.odometer.toString()} km</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Engine CC</p>
          <p>{record.engineOrBatteryCapacity.toString()} cc</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Insurance Company</p>
          <p>{record.contactNumber || "—"}</p>
        </div>
      </div>
      {record.notes && (
        <div>
          <p className="text-xs text-muted-foreground">Notes</p>
          <p className="text-sm">{record.notes}</p>
        </div>
      )}
    </div>
  );
}

export function RecordsList() {
  const { data: records = [], isLoading } = useTwoWheelers();
  const { mutate: deleteRecord, isPending: isDeleting } = useDeleteTwoWheeler();
  const [viewRecord, setViewRecord] = useState<TwoWheeler | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-2" data-ocid="records.loading_state">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div
        className="text-center py-10 text-muted-foreground border border-dashed border-border rounded"
        data-ocid="records.empty_state"
      >
        <FileText className="h-10 w-10 mx-auto mb-3 opacity-30" />
        <p className="text-sm">No vehicle records saved yet.</p>
        <p className="text-xs mt-1">Fill the form above and save a record.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table data-ocid="records.table">
        <TableHeader>
          <TableRow className="bg-primary/5">
            <TableHead className="text-xs font-semibold">#</TableHead>
            <TableHead className="text-xs font-semibold">Reg. No.</TableHead>
            <TableHead className="text-xs font-semibold">Owner</TableHead>
            <TableHead className="text-xs font-semibold">Brand/Model</TableHead>
            <TableHead className="text-xs font-semibold">Year</TableHead>
            <TableHead className="text-xs font-semibold text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record, idx) => (
            <TableRow
              key={record.registrationNumber}
              data-ocid={`records.item.${idx + 1}`}
            >
              <TableCell className="text-xs text-muted-foreground">
                {idx + 1}
              </TableCell>
              <TableCell className="text-xs font-semibold">
                {record.registrationNumber}
              </TableCell>
              <TableCell className="text-xs">
                {record.ownerName || "—"}
              </TableCell>
              <TableCell className="text-xs">
                {record.brand} {record.model}
              </TableCell>
              <TableCell className="text-xs">
                {record.manufacturingYear.toString()}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  {/* View Dialog */}
                  <Dialog
                    open={
                      viewRecord?.registrationNumber ===
                      record.registrationNumber
                    }
                    onOpenChange={(open) => !open && setViewRecord(null)}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => setViewRecord(record)}
                        data-ocid={`records.edit_button.${idx + 1}`}
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle className="text-sm">
                          {record.registrationNumber} — {record.brand}{" "}
                          {record.model}
                        </DialogTitle>
                      </DialogHeader>
                      {viewRecord && <RecordDetail record={viewRecord} />}
                    </DialogContent>
                  </Dialog>

                  {/* Delete Alert */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                        disabled={isDeleting}
                        data-ocid={`records.delete_button.${idx + 1}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent data-ocid="records.dialog">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Record?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete the record for{" "}
                          <strong>{record.registrationNumber}</strong>. This
                          action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel data-ocid="records.cancel_button">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() =>
                            deleteRecord(record.registrationNumber)
                          }
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          data-ocid="records.confirm_button"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
