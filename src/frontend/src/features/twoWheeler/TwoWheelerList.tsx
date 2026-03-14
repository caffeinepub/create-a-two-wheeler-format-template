import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Bike, Eye } from "lucide-react";
import type { TwoWheeler } from "../../backend";

interface TwoWheelerListProps {
  records: TwoWheeler[];
  isLoading: boolean;
  onSelectRecord: (record: TwoWheeler) => void;
}

export function TwoWheelerList({
  records,
  isLoading,
  onSelectRecord,
}: TwoWheelerListProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Records</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (records.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <img
              src="/assets/generated/two-wheeler-icon.dim_256x256.png"
              alt="No records"
              className="mb-4 h-32 w-32 opacity-50"
            />
            <h3 className="mb-2 text-lg font-semibold">
              No vehicles registered yet
            </h3>
            <p className="text-sm text-muted-foreground">
              Add your first vehicle using the form on the left.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bike className="h-5 w-5" />
          Vehicle Records ({records.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {records.map((record) => (
            <div
              key={record.registrationNumber}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50"
            >
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <h3 className="font-semibold">
                    {record.brand} {record.model}
                  </h3>
                  <Badge variant="outline" className="text-xs">
                    {record.vehicleType}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span>{record.registrationNumber}</span>
                  <span>•</span>
                  <span>{Number(record.manufacturingYear)}</span>
                  <span>•</span>
                  <span className="capitalize">{record.fuelType}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSelectRecord(record)}
                className="ml-2"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
