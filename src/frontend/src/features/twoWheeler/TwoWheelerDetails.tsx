import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  FileText,
  Fuel,
  Gauge,
  Hash,
  Phone,
  Settings,
  User,
  X,
} from "lucide-react";
import type { TwoWheeler, VehicleCondition } from "../../backend";

interface TwoWheelerDetailsProps {
  record: TwoWheeler;
  onClose: () => void;
}

interface ConditionSectionProps {
  title: string;
  fields: { key: keyof VehicleCondition; label: string }[];
  condition: VehicleCondition;
}

function ConditionSection({ title, fields, condition }: ConditionSectionProps) {
  const filledFields = fields.filter((f) => condition[f.key]);
  if (filledFields.length === 0) return null;
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <h4 className="text-xs font-bold uppercase tracking-widest text-primary">
          {title}
        </h4>
        <div className="h-px flex-1 bg-border" />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {filledFields.map(({ key, label }) => (
          <div
            key={key}
            className="flex justify-between rounded-md bg-muted/40 px-3 py-2"
          >
            <span className="text-xs text-muted-foreground">{label}</span>
            <span className="text-xs font-medium">{condition[key]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const bodyConditionFields: { key: keyof VehicleCondition; label: string }[] = [
  { key: "discBrakesFront", label: "Disc Brakes - Front" },
  { key: "discBrakesRear", label: "Disc Brakes - Rear" },
  { key: "radiator", label: "Radiator" },
  { key: "silencer", label: "Silencer" },
  { key: "silencerCover", label: "Silencer Cover" },
  { key: "bodyTypeScooter", label: "Body Type (Scooter)" },
  { key: "forkBend", label: "Fork Bend" },
  { key: "tyre1Life", label: "Tyre 1 Life" },
  { key: "tyre2Life", label: "Tyre 2 Life" },
  { key: "frontScoop", label: "Front Scoop" },
  { key: "speedometerPanel", label: "Speedometer Panel" },
  { key: "handleBar", label: "Handle Bar" },
  { key: "indicators", label: "Indicators" },
  { key: "fuelTank", label: "Fuel Tank" },
  { key: "fuelTankCondition", label: "Fuel Tank Condition" },
  { key: "paintCondition", label: "Paint Condition" },
  { key: "sideCovers", label: "Side Covers (LH, RH)" },
  { key: "mudGuardFront", label: "Mud Guard - Front" },
  { key: "mudGuardRear", label: "Mud Guard - Rear" },
  { key: "tailLamp", label: "Tail Lamp" },
  { key: "mainStand", label: "Main Stand" },
  { key: "sideStand", label: "Side Stand" },
  { key: "alloyOrWheelRim", label: "Alloy or Wheel Rim" },
  { key: "frontShockAbsorber", label: "Front Shock Absorber" },
  { key: "rearShockAbsorberType", label: "Rear Shock Absorber Type" },
  { key: "rearShockAbsorber", label: "Rear Shock Absorber" },
];

const electricalFields: { key: keyof VehicleCondition; label: string }[] = [
  { key: "tailLight", label: "Tail Light" },
  { key: "horn", label: "Horn" },
  { key: "frontRHIndicator", label: "Front RH Indicator" },
  { key: "frontLHIndicator", label: "Front LH Indicator" },
  { key: "rearRHIndicator", label: "Rear RH Indicator" },
  { key: "rearLHIndicator", label: "Rear LH Indicator" },
  { key: "battery", label: "Battery" },
  { key: "ignition", label: "Ignition" },
  { key: "fuelGauge", label: "Fuel Gauge" },
  { key: "speedometerTachometer", label: "Speedometer / Tachometer" },
  { key: "selfStart", label: "Self Start" },
  { key: "headLight", label: "Head Light" },
  { key: "keys", label: "Keys" },
  { key: "remoteKeyWorking", label: "Remote Key Working" },
  { key: "switches", label: "Switches" },
];

const engineFields: { key: keyof VehicleCondition; label: string }[] = [
  { key: "engineCondition", label: "Condition" },
  { key: "acceleratorCondition", label: "Accelerator Condition" },
  { key: "brakesCondition", label: "Brakes Condition" },
  { key: "engineFunction", label: "Engine Function" },
  { key: "clutchCondition", label: "Clutch Condition" },
  { key: "gearShiftLever", label: "Gear Shift Lever" },
  { key: "rearBrakeLever", label: "Rear Brake Lever" },
  { key: "cubicCapacityCC", label: "Cubic Capacity (CC)" },
];

export function TwoWheelerDetails({ record, onClose }: TwoWheelerDetailsProps) {
  const hasCondition = Object.values(record.vehicleCondition).some(Boolean);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="mb-2">
              {record.brand} {record.model}
            </CardTitle>
            <div className="flex gap-2">
              <Badge variant="outline">{record.vehicleType}</Badge>
              <Badge variant="secondary" className="capitalize">
                {record.fuelType}
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            data-ocid="details.close_button"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Registration & Year */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              Registration Number
            </div>
            <p className="font-medium">{record.registrationNumber}</p>
          </div>
          <div>
            <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Manufacturing Year
            </div>
            <p className="font-medium">{Number(record.manufacturingYear)}</p>
          </div>
        </div>

        <Separator />

        {/* Chassis & Engine Number */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
              <Hash className="h-4 w-4" />
              Chassis Number
            </div>
            <p className="font-mono text-sm font-medium">
              {record.chassisNumber}
            </p>
          </div>
          <div>
            <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
              <Settings className="h-4 w-4" />
              Engine Number
            </div>
            <p className="font-mono text-sm font-medium">
              {record.engineNumber}
            </p>
          </div>
        </div>

        <Separator />

        {/* Variant & Color */}
        <div className="grid gap-4 sm:grid-cols-2">
          {record.variant && (
            <div>
              <div className="mb-1 text-sm text-muted-foreground">Variant</div>
              <p className="font-medium">{record.variant}</p>
            </div>
          )}
          <div>
            <div className="mb-1 text-sm text-muted-foreground">Color</div>
            <p className="font-medium">{record.color}</p>
          </div>
        </div>

        <Separator />

        {/* Engine/Battery & Odometer */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
              <Fuel className="h-4 w-4" />
              {record.fuelType === "electric"
                ? "Battery Capacity"
                : "Engine CC"}
            </div>
            <p className="font-medium">
              {Number(record.engineOrBatteryCapacity)}
            </p>
          </div>
          <div>
            <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
              <Gauge className="h-4 w-4" />
              Odometer
            </div>
            <p className="font-medium">
              {Number(record.odometer).toLocaleString()} km
            </p>
          </div>
        </div>

        <Separator />

        {/* Owner Details */}
        <div className="space-y-3">
          <h4 className="font-semibold">Owner Information</h4>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                Owner Name
              </div>
              <p className="font-medium">{record.ownerName}</p>
            </div>
            <div>
              <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                Contact Number
              </div>
              <p className="font-medium">{record.contactNumber}</p>
            </div>
          </div>
        </div>

        {/* Notes */}
        {record.notes && (
          <>
            <Separator />
            <div>
              <div className="mb-2 text-sm text-muted-foreground">Notes</div>
              <p className="whitespace-pre-wrap text-sm">{record.notes}</p>
            </div>
          </>
        )}

        {/* Vehicle Condition */}
        {hasCondition && (
          <>
            <Separator />
            <div className="space-y-4">
              <h4 className="font-semibold">Vehicle Condition</h4>
              <ConditionSection
                title="Body Condition"
                fields={bodyConditionFields}
                condition={record.vehicleCondition}
              />
              <ConditionSection
                title="Electricals &amp; Features"
                fields={electricalFields}
                condition={record.vehicleCondition}
              />
              <ConditionSection
                title="Engine"
                fields={engineFields}
                condition={record.vehicleCondition}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
