import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { FuelType, VehicleType } from "../../backend";
import type { VehicleCondition } from "../../backend";
import { useCreateTwoWheeler } from "./useTwoWheelers";
import { validateTwoWheelerForm } from "./validation";

interface Page1Data {
  vehicleType: VehicleType | "";
  brand: string;
  model: string;
  variant: string;
  registrationNumber: string;
  manufacturingYear: string;
  color: string;
  engineOrBatteryCapacity: string;
  fuelType: FuelType | "";
  chassisNumber: string;
  engineNumber: string;
  odometer: string;
  ownerName: string;
  contactNumber: string;
  notes: string;
}

type ConditionKey = keyof VehicleCondition;

const initialPage1: Page1Data = {
  vehicleType: "",
  brand: "",
  model: "",
  variant: "",
  registrationNumber: "",
  manufacturingYear: "",
  color: "",
  engineOrBatteryCapacity: "",
  fuelType: "",
  chassisNumber: "",
  engineNumber: "",
  odometer: "",
  ownerName: "",
  contactNumber: "",
  notes: "",
};

const initialCondition: VehicleCondition = {};

const bodyConditionFields: { key: ConditionKey; label: string }[] = [
  { key: "discBrakesFront", label: "Disc Brakes - Front" },
  { key: "discBrakesRear", label: "Disc Brakes - Rear" },
  { key: "radiator", label: "Radiator" },
  { key: "silencer", label: "Silencer" },
  { key: "silencerCover", label: "Silencer Cover" },
  { key: "bodyTypeScooter", label: "Body Type (If Scooter)" },
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

const electricalFields: { key: ConditionKey; label: string }[] = [
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

const engineFields: { key: ConditionKey; label: string }[] = [
  { key: "engineCondition", label: "Condition" },
  { key: "acceleratorCondition", label: "Accelerator Condition" },
  { key: "brakesCondition", label: "Brakes Condition" },
  { key: "engineFunction", label: "Engine Function" },
  { key: "clutchCondition", label: "Clutch Condition" },
  { key: "gearShiftLever", label: "Gear Shift Lever" },
  { key: "rearBrakeLever", label: "Rear Brake Lever" },
  { key: "cubicCapacityCC", label: "Cubic Capacity (CC)" },
];

export function TwoWheelerForm() {
  const [page, setPage] = useState<1 | 2>(1);
  const [page1, setPage1] = useState<Page1Data>(initialPage1);
  const [condition, setCondition] =
    useState<VehicleCondition>(initialCondition);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const createMutation = useCreateTwoWheeler();

  const handlePage1Change = (field: keyof Page1Data, value: string) => {
    setPage1((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleConditionChange = (key: ConditionKey, value: string) => {
    setCondition((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    const validationErrors = validateTwoWheelerForm({ ...page1 });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setPage(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(false);
    try {
      await createMutation.mutateAsync({
        vehicleType: page1.vehicleType as VehicleType,
        brand: page1.brand,
        model: page1.model,
        variant: page1.variant || undefined,
        registrationNumber: page1.registrationNumber,
        manufacturingYear: BigInt(page1.manufacturingYear),
        color: page1.color,
        engineOrBatteryCapacity: BigInt(page1.engineOrBatteryCapacity),
        fuelType: page1.fuelType as FuelType,
        chassisNumber: page1.chassisNumber,
        engineNumber: page1.engineNumber,
        odometer: BigInt(page1.odometer),
        ownerName: page1.ownerName,
        contactNumber: page1.contactNumber,
        notes: page1.notes,
        vehicleCondition: condition,
      });
      setPage1(initialPage1);
      setCondition(initialCondition);
      setErrors({});
      setPage(1);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      setErrors({
        submit:
          error instanceof Error ? error.message : "Failed to save record",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center gap-3">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
            page === 1
              ? "bg-primary text-primary-foreground"
              : "bg-primary/20 text-primary"
          }`}
        >
          1
        </div>
        <div
          className={`h-1 flex-1 rounded-full ${page === 2 ? "bg-primary" : "bg-border"}`}
        />
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
            page === 2
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          2
        </div>
        <span className="text-sm font-medium text-muted-foreground">
          Step {page} of 2
        </span>
      </div>

      {showSuccess && (
        <Alert className="border-green-600 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>
            Vehicle record saved successfully!
          </AlertDescription>
        </Alert>
      )}

      {errors.submit && (
        <Alert variant="destructive" data-ocid="form.error_state">
          <AlertDescription>{errors.submit}</AlertDescription>
        </Alert>
      )}

      {page === 1 && (
        <div className="space-y-4" data-ocid="form.page">
          <h3 className="text-base font-semibold text-foreground">
            Vehicle Details
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="vehicleType">
                Vehicle Type <span className="text-destructive">*</span>
              </Label>
              <Select
                value={page1.vehicleType}
                onValueChange={(v) => handlePage1Change("vehicleType", v)}
              >
                <SelectTrigger id="vehicleType" data-ocid="vehicle.select">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={VehicleType.motorcycle}>
                    Motorcycle
                  </SelectItem>
                  <SelectItem value={VehicleType.scooter}>Scooter</SelectItem>
                  <SelectItem value={VehicleType.bike}>Bike</SelectItem>
                </SelectContent>
              </Select>
              {errors.vehicleType && (
                <p
                  className="text-sm text-destructive"
                  data-ocid="vehicle.error_state"
                >
                  {errors.vehicleType}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="fuelType">
                Fuel Type <span className="text-destructive">*</span>
              </Label>
              <Select
                value={page1.fuelType}
                onValueChange={(v) => handlePage1Change("fuelType", v)}
              >
                <SelectTrigger id="fuelType" data-ocid="fuel.select">
                  <SelectValue placeholder="Select fuel type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={FuelType.petrol}>Petrol</SelectItem>
                  <SelectItem value={FuelType.electric}>Electric</SelectItem>
                </SelectContent>
              </Select>
              {errors.fuelType && (
                <p
                  className="text-sm text-destructive"
                  data-ocid="fuel.error_state"
                >
                  {errors.fuelType}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="brand">
                Brand <span className="text-destructive">*</span>
              </Label>
              <Input
                id="brand"
                data-ocid="brand.input"
                value={page1.brand}
                onChange={(e) => handlePage1Change("brand", e.target.value)}
                placeholder="e.g., Honda, Yamaha"
              />
              {errors.brand && (
                <p className="text-sm text-destructive">{errors.brand}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">
                Model <span className="text-destructive">*</span>
              </Label>
              <Input
                id="model"
                data-ocid="model.input"
                value={page1.model}
                onChange={(e) => handlePage1Change("model", e.target.value)}
                placeholder="e.g., CBR 150R"
              />
              {errors.model && (
                <p className="text-sm text-destructive">{errors.model}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="variant">Variant (Optional)</Label>
            <Input
              id="variant"
              data-ocid="variant.input"
              value={page1.variant}
              onChange={(e) => handlePage1Change("variant", e.target.value)}
              placeholder="e.g., ABS, Special Edition"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="registrationNumber">
                Registration Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="registrationNumber"
                data-ocid="reg.input"
                value={page1.registrationNumber}
                onChange={(e) =>
                  handlePage1Change("registrationNumber", e.target.value)
                }
                placeholder="e.g., DL01AB1234"
              />
              {errors.registrationNumber && (
                <p className="text-sm text-destructive">
                  {errors.registrationNumber}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="manufacturingYear">
                Manufacturing Year <span className="text-destructive">*</span>
              </Label>
              <Input
                id="manufacturingYear"
                data-ocid="year.input"
                type="number"
                value={page1.manufacturingYear}
                onChange={(e) =>
                  handlePage1Change("manufacturingYear", e.target.value)
                }
                placeholder="e.g., 2023"
              />
              {errors.manufacturingYear && (
                <p className="text-sm text-destructive">
                  {errors.manufacturingYear}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="color">
                Color <span className="text-destructive">*</span>
              </Label>
              <Input
                id="color"
                data-ocid="color.input"
                value={page1.color}
                onChange={(e) => handlePage1Change("color", e.target.value)}
                placeholder="e.g., Red, Black"
              />
              {errors.color && (
                <p className="text-sm text-destructive">{errors.color}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="engineOrBatteryCapacity">
                Engine CC / Battery Capacity{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="engineOrBatteryCapacity"
                data-ocid="capacity.input"
                type="number"
                value={page1.engineOrBatteryCapacity}
                onChange={(e) =>
                  handlePage1Change("engineOrBatteryCapacity", e.target.value)
                }
                placeholder="e.g., 150"
              />
              {errors.engineOrBatteryCapacity && (
                <p className="text-sm text-destructive">
                  {errors.engineOrBatteryCapacity}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="chassisNumber">
                Chassis Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="chassisNumber"
                data-ocid="chassis.input"
                value={page1.chassisNumber}
                onChange={(e) =>
                  handlePage1Change("chassisNumber", e.target.value)
                }
                placeholder="e.g., ME4KC09GXJA000001"
                className="font-mono text-sm"
              />
              {errors.chassisNumber && (
                <p className="text-sm text-destructive">
                  {errors.chassisNumber}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="engineNumber">
                Engine Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="engineNumber"
                data-ocid="engine.input"
                value={page1.engineNumber}
                onChange={(e) =>
                  handlePage1Change("engineNumber", e.target.value)
                }
                placeholder="e.g., KC09E1000001"
                className="font-mono text-sm"
              />
              {errors.engineNumber && (
                <p className="text-sm text-destructive">
                  {errors.engineNumber}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="odometer">
              Odometer (km) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="odometer"
              data-ocid="odometer.input"
              type="number"
              value={page1.odometer}
              onChange={(e) => handlePage1Change("odometer", e.target.value)}
              placeholder="e.g., 5000"
            />
            {errors.odometer && (
              <p className="text-sm text-destructive">{errors.odometer}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ownerName">
                Owner Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="ownerName"
                data-ocid="owner.input"
                value={page1.ownerName}
                onChange={(e) => handlePage1Change("ownerName", e.target.value)}
                placeholder="Full name"
              />
              {errors.ownerName && (
                <p className="text-sm text-destructive">{errors.ownerName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactNumber">
                Contact Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="contactNumber"
                data-ocid="contact.input"
                value={page1.contactNumber}
                onChange={(e) =>
                  handlePage1Change("contactNumber", e.target.value)
                }
                placeholder="e.g., +91 9876543210"
              />
              {errors.contactNumber && (
                <p className="text-sm text-destructive">
                  {errors.contactNumber}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              data-ocid="notes.textarea"
              value={page1.notes}
              onChange={(e) => handlePage1Change("notes", e.target.value)}
              placeholder="Additional information..."
              rows={3}
            />
          </div>

          <Button
            type="button"
            className="w-full"
            data-ocid="form.primary_button"
            onClick={handleNext}
          >
            Next — Vehicle Condition
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      {page === 2 && (
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          data-ocid="condition.panel"
        >
          {/* BODY CONDITION */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary">
                Body Condition
              </h3>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {bodyConditionFields.map(({ key, label }) => (
                <div key={key} className="space-y-1">
                  <Label
                    htmlFor={key}
                    className="text-xs text-muted-foreground"
                  >
                    {label}
                  </Label>
                  <Input
                    id={key}
                    value={condition[key] ?? ""}
                    onChange={(e) => handleConditionChange(key, e.target.value)}
                    placeholder="e.g., Good, Average, NA"
                    className="h-8 text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ELECTRICALS */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary">
                Electricals &amp; Features
              </h3>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {electricalFields.map(({ key, label }) => (
                <div key={key} className="space-y-1">
                  <Label
                    htmlFor={`e_${key}`}
                    className="text-xs text-muted-foreground"
                  >
                    {label}
                  </Label>
                  <Input
                    id={`e_${key}`}
                    value={condition[key] ?? ""}
                    onChange={(e) => handleConditionChange(key, e.target.value)}
                    placeholder="e.g., Working, Faulty, NA"
                    className="h-8 text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ENGINE */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary">
                Engine
              </h3>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {engineFields.map(({ key, label }) => (
                <div key={key} className="space-y-1">
                  <Label
                    htmlFor={`eng_${key}`}
                    className="text-xs text-muted-foreground"
                  >
                    {label}
                  </Label>
                  <Input
                    id={`eng_${key}`}
                    value={condition[key] ?? ""}
                    onChange={(e) => handleConditionChange(key, e.target.value)}
                    placeholder="e.g., Good, Poor, NA"
                    className="h-8 text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              data-ocid="form.secondary_button"
              onClick={() => setPage(1)}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button
              type="submit"
              className="flex-1"
              data-ocid="form.submit_button"
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Vehicle Record"
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
