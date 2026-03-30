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
import {
  CheckSquare,
  FileDown,
  ImagePlus,
  Loader2,
  Printer,
  Save,
  Upload,
  X,
} from "lucide-react";
import { type FormEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { FuelType, type TwoWheeler, VehicleType } from "../../backend";
import { useCreateTwoWheeler } from "./useTwoWheelers";

type Condition = "Intact" | "Missing" | "Damaged" | "NA" | "";

interface TruckPartsState {
  headlightLeft: Condition;
  headlightRight: Condition;
  fogLampLeft: Condition;
  fogLampRight: Condition;
  indicatorLightLeft: Condition;
  indicatorLightRight: Condition;
  frontBumper: Condition;
  grill: Condition;
  fenderMudguardsRight: Condition;
  fenderMudguardsLeft: Condition;
  cowl: Condition;
  bonnet: Condition;
  rearLightLeft: Condition;
  rearLightRight: Condition;
  silencer: Condition;
  rearBumper: Condition;
  rightDoor: Condition;
  leftDoor: Condition;
  leftSideBody: Condition;
  rightSideBody: Condition;
  chassisFrame: Condition;
  fuelTank: Condition;
  rearViewMirrorLeft: Condition;
  rearViewMirrorRight: Condition;
  rearBody: Condition;
  loadBodyFlooring: Condition;
  cabinCondition: Condition;
  backGate: Condition;
  trailerBody: Condition;
  floor: Condition;
  tyresRim: Condition;
  frontWindShieldGlass: Condition;
  leftWindowGlasses: Condition;
  rightWindowGlasses: Condition;
  cabinGlassBack: Condition;
}

const defaultParts: TruckPartsState = {
  headlightLeft: "",
  headlightRight: "",
  fogLampLeft: "",
  fogLampRight: "",
  indicatorLightLeft: "",
  indicatorLightRight: "",
  frontBumper: "",
  grill: "",
  fenderMudguardsRight: "",
  fenderMudguardsLeft: "",
  cowl: "",
  bonnet: "",
  rearLightLeft: "",
  rearLightRight: "",
  silencer: "",
  rearBumper: "",
  rightDoor: "",
  leftDoor: "",
  leftSideBody: "",
  rightSideBody: "",
  chassisFrame: "",
  fuelTank: "",
  rearViewMirrorLeft: "",
  rearViewMirrorRight: "",
  rearBody: "",
  loadBodyFlooring: "",
  cabinCondition: "",
  backGate: "",
  trailerBody: "",
  floor: "",
  tyresRim: "",
  frontWindShieldGlass: "",
  leftWindowGlasses: "",
  rightWindowGlasses: "",
  cabinGlassBack: "",
};

const ALL_TRUCK_PARTS: { key: keyof TruckPartsState; label: string }[] = [
  { key: "headlightLeft", label: "Headlight - Left" },
  { key: "headlightRight", label: "Headlight - Right" },
  { key: "fogLampLeft", label: "Foglamp - Left" },
  { key: "fogLampRight", label: "Foglamp - Right" },
  { key: "indicatorLightLeft", label: "Indicator Light Left" },
  { key: "indicatorLightRight", label: "Indicator Light Right" },
  { key: "frontBumper", label: "Front Bumper" },
  { key: "grill", label: "Grill" },
  { key: "fenderMudguardsRight", label: "Fender / Mudguards Right" },
  { key: "fenderMudguardsLeft", label: "Fender / Mudguards Left" },
  { key: "cowl", label: "Cowl" },
  { key: "bonnet", label: "Bonnet" },
  { key: "rearLightLeft", label: "Rear Light - Left" },
  { key: "rearLightRight", label: "Rear Light - Right" },
  { key: "silencer", label: "Silencer" },
  { key: "rearBumper", label: "Rear Bumper" },
  { key: "rightDoor", label: "Right Door" },
  { key: "leftDoor", label: "Left Door" },
  { key: "leftSideBody", label: "Left Side Body" },
  { key: "rightSideBody", label: "Right Side Body" },
  { key: "chassisFrame", label: "Chassis Frame" },
  { key: "fuelTank", label: "Fuel Tank" },
  { key: "rearViewMirrorLeft", label: "Rear View Mirror Left" },
  { key: "rearViewMirrorRight", label: "Rear View Mirror Right" },
  { key: "rearBody", label: "Rear Body" },
  { key: "loadBodyFlooring", label: "Load Body Flooring" },
  { key: "cabinCondition", label: "Cabin Condition" },
  { key: "backGate", label: "Back Gate" },
  { key: "trailerBody", label: "Trailer Body" },
  { key: "floor", label: "Floor" },
  { key: "tyresRim", label: "Tyres / Rim" },
  { key: "frontWindShieldGlass", label: "Front Wind Shield Glass" },
  { key: "leftWindowGlasses", label: "Left Window Glasses" },
  { key: "rightWindowGlasses", label: "Right Window Glasses" },
  { key: "cabinGlassBack", label: "Cabin Glass Back" },
];

const CONDITION_OPTIONS = [
  {
    value: "Intact",
    label: "Intact",
    activeClass: "bg-green-600 text-white border-green-600",
    inactiveClass:
      "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
  },
  {
    value: "Missing",
    label: "Missing",
    activeClass: "bg-yellow-500 text-white border-yellow-500",
    inactiveClass:
      "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100",
  },
  {
    value: "Damaged",
    label: "Damaged",
    activeClass: "bg-red-500 text-white border-red-500",
    inactiveClass: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
  },
  {
    value: "NA",
    label: "N/A",
    activeClass: "bg-gray-400 text-white border-gray-400",
    inactiveClass: "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100",
  },
];

function ConditionButtons({
  value,
  onChange,
  partKey,
}: {
  value: Condition;
  onChange: (v: Condition) => void;
  partKey: string;
}) {
  return (
    <div className="flex gap-1 flex-wrap">
      {CONDITION_OPTIONS.map((opt) => {
        const isActive = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(isActive ? "" : (opt.value as Condition))}
            data-ocid={`truck_parts.${partKey}.toggle`}
            className={`
              inline-flex items-center gap-0.5 px-2 py-1.5 rounded text-xs font-semibold
              border transition-all duration-150 select-none
              min-h-[36px] min-w-[52px] justify-center
              ${isActive ? opt.activeClass : opt.inactiveClass}
            `}
          >
            {isActive && <span className="text-xs">✓</span>}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

interface PhotoItem {
  id: string;
  data: string;
}

function conditionBadgeStyle(cond: Condition): string {
  if (cond === "Intact")
    return "background:#16a34a;color:#fff;padding:2px 8px;border-radius:4px;font-weight:600;";
  if (cond === "Missing")
    return "background:#ca8a04;color:#fff;padding:2px 8px;border-radius:4px;font-weight:600;";
  if (cond === "Damaged")
    return "background:#dc2626;color:#fff;padding:2px 8px;border-radius:4px;font-weight:600;";
  if (cond === "NA")
    return "background:#9ca3af;color:#fff;padding:2px 8px;border-radius:4px;font-weight:600;";
  return "color:#6b7280;";
}

function openPrintPopup(html: string) {
  const w = window.open("", "_blank", "width=900,height=700,scrollbars=yes");
  if (!w) return;
  w.document.open();
  w.document.write(html);
  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 600);
}

interface TruckPrintData {
  regNumber: string;
  odometer: string;
  chassisNumber: string;
  engineNumber: string;
  ownerName: string;
  insuranceCompany: string;
  color: string;
  modelYear: string;
  fuelType: string;
  brand: string;
  model: string;
  engineCC: string;
  variant: string;
  vehicleSubType: string;
  notes: string;
  parts: TruckPartsState;
  vehiclePhotos: PhotoItem[];
  inspectionDate: string;
  inspectionTime: string;
  remarks: string;
  surveyorSignatureImage: string | null;
  inspectionPlace: string;
}

function buildTruckPrintHTML(data: TruckPrintData): string {
  const {
    regNumber,
    odometer,
    chassisNumber,
    engineNumber,
    ownerName,
    insuranceCompany,
    color,
    modelYear,
    fuelType,
    brand,
    model,
    engineCC,
    variant,
    vehicleSubType,
    notes,
    parts,
    vehiclePhotos,
    inspectionDate,
    inspectionTime,
    inspectionPlace,
    remarks,
    surveyorSignatureImage,
  } = data;

  const partsRows = ALL_TRUCK_PARTS.map((p, idx) => {
    const cond = parts[p.key] || "\u2014";
    const badgeStyle = conditionBadgeStyle(parts[p.key]);
    const bg = idx % 2 === 0 ? "#fff" : "#f8fafc";
    return `<tr style="background:${bg}">
      <td style="padding:4px 8px;border:1px solid #e2e8f0;font-size:12px;color:#64748b;text-align:center;width:36px">${idx + 1}</td>
      <td style="padding:4px 8px;border:1px solid #e2e8f0;font-size:12px">${p.label}</td>
      <td style="padding:4px 8px;border:1px solid #e2e8f0;font-size:12px;text-align:center">
        <span style="${badgeStyle}">${cond}</span>
      </td>
    </tr>`;
  }).join("");

  const photosHTML =
    vehiclePhotos.length > 0
      ? `<div style="margin-top:24px">
        <h3 style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#1e293b;border-bottom:2px solid #1e293b;padding-bottom:4px;margin-bottom:12px">Vehicle Photos</h3>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">
          ${vehiclePhotos
            .map(
              (ph, i) =>
                `<div style="border:1px solid #e2e8f0;border-radius:6px;overflow:hidden">
            <img src="${ph.data}" alt="Photo ${i + 1}" style="width:100%;height:130px;object-fit:cover;display:block" />
            <div style="text-align:center;font-size:10px;color:#64748b;padding:3px">Photo ${i + 1}</div>
          </div>`,
            )
            .join("")}
        </div>
      </div>`
      : "";

  const surveyorSignHTML = surveyorSignatureImage
    ? `<img src="${surveyorSignatureImage}" alt="Surveyor Signature" style="max-width:200px;max-height:70px;object-fit:contain;display:block;margin-top:6px" />`
    : `<div style="border-bottom:2px solid #334155;width:200px;height:60px;margin-top:6px"></div>`;

  const dateDisplay = inspectionDate
    ? new Date(inspectionDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }) + (inspectionTime ? ` ${inspectionTime}` : "")
    : "_______________";

  const fuelLabel: Record<string, string> = {
    petrol: "Petrol",
    diesel: "Diesel",
    cng: "CNG",
    lpg: "LPG",
    electric: "Electric",
  };
  const fuelDisplay = fuelLabel[fuelType] || fuelType;
  const subTypeDisplay = vehicleSubType || "\u2014";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Truck/Trailer Pre-Inspection Report \u2014 ${regNumber || "New"}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; background: #fff; color: #1e293b; font-size: 13px; }
    .page { width: 210mm; min-height: 297mm; margin: 0 auto; padding: 16mm 14mm; }
    @media print {
      body { margin: 0; }
      .page { width: 100%; padding: 10mm; }
      @page { size: A4; margin: 0; }
    }
    table { border-collapse: collapse; width: 100%; }
    td, th { vertical-align: middle; }
  </style>
</head>
<body>
<div class="page">

  <!-- Letterhead -->
  <div style="text-align:center;border-bottom:3px double #1e293b;padding-bottom:10px;margin-bottom:14px">
    <div style="font-size:22px;font-weight:900;letter-spacing:2px;color:#1e293b">DINESH KUMAR JANGIR</div>
    <div style="font-size:13px;font-weight:600;color:#475569;margin-top:2px">Surveyor &amp; Loss Assessor</div>
    <div style="font-size:11px;color:#64748b;margin-top:4px">
      Licence No.: <strong>SLA-121529</strong> &nbsp;|&nbsp; Validity: <strong>26.01.2029</strong> &nbsp;|&nbsp; Mob.: <strong>94132-24766</strong>
    </div>
    <div style="font-size:11px;color:#64748b;margin-top:2px">
      10-RE-40, Tilak Nagar, Bhilwara (Raj.) &nbsp;|&nbsp; Email: dk24766@gmail.com
    </div>
  </div>

  <!-- Report title -->
  <div style="text-align:center;font-size:15px;font-weight:800;letter-spacing:1px;margin-bottom:14px;text-transform:uppercase">Truck / Trailer Pre-Inspection Report</div>

  <!-- Vehicle Details -->
  <h3 style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #1e293b;padding-bottom:4px;margin-bottom:8px">Vehicle Details</h3>
  <table style="margin-bottom:16px">
    <tbody>
      <tr>
        <td style="padding:3px 0;width:200px;font-size:12px;color:#64748b">Name of Insured</td>
        <td style="padding:3px 0;font-size:12px;font-weight:600">: ${ownerName || "\u2014"}</td>
        <td style="padding:3px 0;width:200px;font-size:12px;color:#64748b">Insurance Company</td>
        <td style="padding:3px 0;font-size:12px;font-weight:600">: ${insuranceCompany || "\u2014"}</td>
      </tr>
      <tr>
        <td style="padding:3px 0;font-size:12px;color:#64748b">Registration Number</td>
        <td style="padding:3px 0;font-size:12px;font-weight:600">: ${regNumber || "\u2014"}</td>
        <td style="padding:3px 0;font-size:12px;color:#64748b">Odometer Reading</td>
        <td style="padding:3px 0;font-size:12px;font-weight:600">: ${odometer ? `${odometer} km` : "\u2014"}</td>
      </tr>
      <tr>
        <td style="padding:3px 0;font-size:12px;color:#64748b">Chassis Number</td>
        <td style="padding:3px 0;font-size:12px;font-weight:600">: ${chassisNumber || "\u2014"}</td>
        <td style="padding:3px 0;font-size:12px;color:#64748b">Engine Number</td>
        <td style="padding:3px 0;font-size:12px;font-weight:600">: ${engineNumber || "\u2014"}</td>
      </tr>
      <tr>
        <td style="padding:3px 0;font-size:12px;color:#64748b">Colour</td>
        <td style="padding:3px 0;font-size:12px;font-weight:600">: ${color || "\u2014"}</td>
        <td style="padding:3px 0;font-size:12px;color:#64748b">Model Year</td>
        <td style="padding:3px 0;font-size:12px;font-weight:600">: ${modelYear || "\u2014"}</td>
      </tr>
      <tr>
        <td style="padding:3px 0;font-size:12px;color:#64748b">Fuel Type</td>
        <td style="padding:3px 0;font-size:12px;font-weight:600">: ${fuelDisplay}</td>
        <td style="padding:3px 0;font-size:12px;color:#64748b">Vehicle Sub-Type</td>
        <td style="padding:3px 0;font-size:12px;font-weight:600">: ${subTypeDisplay}</td>
      </tr>
      <tr>
        <td style="padding:3px 0;font-size:12px;color:#64748b">Brand</td>
        <td style="padding:3px 0;font-size:12px;font-weight:600">: ${brand || "\u2014"}</td>
        <td style="padding:3px 0;font-size:12px;color:#64748b">Model</td>
        <td style="padding:3px 0;font-size:12px;font-weight:600">: ${model || "\u2014"}</td>
      </tr>
      <tr>
        <td style="padding:3px 0;font-size:12px;color:#64748b">Variant</td>
        <td style="padding:3px 0;font-size:12px;font-weight:600">: ${variant || "\u2014"}</td>
        <td style="padding:3px 0;font-size:12px;color:#64748b">Engine CC / GVW</td>
        <td style="padding:3px 0;font-size:12px;font-weight:600">: ${engineCC || "\u2014"}</td>
      </tr>
      <tr>
        <td style="padding:3px 0;font-size:12px;color:#64748b">Inspection Date</td>
        <td style="padding:3px 0;font-size:12px;font-weight:600">: ${dateDisplay}</td>
        <td style="padding:3px 0;font-size:12px;color:#64748b">Inspection Place</td>
        <td style="padding:3px 0;font-size:12px;font-weight:600">: ${inspectionPlace || "\u2014"}</td>
      </tr>
      ${notes ? `<tr><td style="padding:3px 0;font-size:12px;color:#64748b">Notes</td><td colspan="3" style="padding:3px 0;font-size:12px;font-weight:600">: ${notes}</td></tr>` : ""}
    </tbody>
  </table>

  <!-- Parts Table -->
  <h3 style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #1e293b;padding-bottom:4px;margin-bottom:8px">Vehicle Condition Report</h3>
  <table style="margin-bottom:16px">
    <thead>
      <tr style="background:#1e293b;color:#fff">
        <th style="padding:5px 8px;border:1px solid #334155;font-size:11px;width:36px">#</th>
        <th style="padding:5px 8px;border:1px solid #334155;font-size:11px;text-align:left">Part Name</th>
        <th style="padding:5px 8px;border:1px solid #334155;font-size:11px;text-align:center;width:110px">Condition</th>
      </tr>
    </thead>
    <tbody>${partsRows}</tbody>
  </table>

  ${photosHTML}

  <!-- Remarks -->
  ${remarks ? `<div style="margin-top:16px"><strong style="font-size:12px">Remarks:</strong> <span style="font-size:12px">${remarks}</span></div>` : ""}

  <!-- Declaration -->
  <div style="margin-top:20px;padding:12px;border:1px solid #cbd5e1;border-radius:6px">
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">Declaration of Owner</div>
    <p style="font-size:10.5px;line-height:1.6;color:#334155">
      I hereby confirm and declare that above mentioned identification of my vehicle as well as that of damage to the vehicle as noted by the inspection official is correct. Nothing has been hidden / undisclosed. I further confirm and declare that the motor vehicle proposed for insurance after a break in cover has not met with any accident giving rise to any claim by a third party for injury or death caused to any person or damages to any property/insured vehicle during the period following the expiry of the previous insurance, till the moment it is proposed for insurance.
      I also agree that damages mentioned above shall be excluded / adjusted in the event of any claim being lodged.
    </p>
  </div>

  <!-- Signature Block -->
  <div style="margin-top:20px;display:flex;justify-content:flex-end;align-items:flex-start;gap:20px">
    <div style="flex:1;max-width:260px">
      <div style="font-size:11px;font-weight:700;margin-bottom:4px">Name &amp; Sign of Surveyor</div>
      ${surveyorSignHTML}
      <div style="font-size:11px;margin-top:6px;color:#334155">DINESH KUMAR JANGIR</div>
    </div>
  </div>

  <!-- Stamp -->
  <div style="margin-top:20px;text-align:right">
    <div style="display:inline-block;border:1px dashed #94a3b8;padding:12px 30px;text-align:center;min-width:120px">
      <div style="font-size:10px;color:#94a3b8">Stamp</div>
    </div>
  </div>

</div>
</body>
</html>`;
}

export function TruckTrailerInspectionForm() {
  const { mutateAsync: createRecord, isPending } = useCreateTwoWheeler();

  // Vehicle details
  const [regNumber, setRegNumber] = useState("");
  const [odometer, setOdometer] = useState("");
  const [chassisNumber, setChassisNumber] = useState("");
  const [engineNumber, setEngineNumber] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [insuranceCompany, setInsuranceCompany] = useState("");
  const [color, setColor] = useState("");
  const [modelYear, setModelYear] = useState("");
  const [fuelType, setFuelType] = useState<string>("diesel");
  const [vehicleSubType, setVehicleSubType] = useState<string>("truck");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [variant, setVariant] = useState("");
  const [engineCC, setEngineCC] = useState("");
  const [notes, setNotes] = useState("");

  // Parts
  const [parts, setParts] = useState<TruckPartsState>(defaultParts);

  // Photos
  const [vehiclePhotos, setVehiclePhotos] = useState<PhotoItem[]>([]);
  const photoInputRef = useRef<HTMLInputElement>(null);

  // Signature
  const [surveyorSignatureImage, setSurveyorSignatureImage] = useState<
    string | null
  >(null);
  const surveyorSignatureInputRef = useRef<HTMLInputElement>(null);

  // Inspection info
  const [inspectionDate, setInspectionDate] = useState("");
  const [inspectionTime, setInspectionTime] = useState("");
  const [inspectionPlace, setInspectionPlace] = useState("");
  const [remarks, setRemarks] = useState("");

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    for (const file of Array.from(files)) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const data = ev.target?.result as string;
        setVehiclePhotos((prev) => [
          ...prev,
          { id: Math.random().toString(36).slice(2), data },
        ]);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const removePhoto = (id: string) => {
    setVehiclePhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSurveyorSignatureUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setSurveyorSignatureImage(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const markAllIntact = () => {
    const filled: TruckPartsState = {} as TruckPartsState;
    for (const k of Object.keys(defaultParts) as (keyof TruckPartsState)[]) {
      filled[k] = "Intact";
    }
    setParts(filled);
  };

  const getPrintData = (): TruckPrintData => ({
    regNumber,
    odometer,
    chassisNumber,
    engineNumber,
    ownerName,
    insuranceCompany,
    color,
    modelYear,
    fuelType,
    vehicleSubType,
    brand,
    model,
    engineCC,
    variant,
    notes,
    parts,
    vehiclePhotos,
    inspectionDate,
    inspectionTime,
    inspectionPlace,
    remarks,
    surveyorSignatureImage,
  });

  const buildRecord = (): TwoWheeler => ({
    registrationNumber: regNumber.trim(),
    odometer: BigInt(odometer || 0),
    chassisNumber: chassisNumber.trim(),
    engineNumber: engineNumber.trim(),
    ownerName: ownerName.trim(),
    contactNumber: insuranceCompany.trim(),
    color: color.trim(),
    manufacturingYear: BigInt(modelYear || new Date().getFullYear()),
    fuelType: (fuelType === "electric"
      ? FuelType.electric
      : FuelType.petrol) as FuelType,
    brand: brand.trim(),
    model: model.trim(),
    vehicleType: VehicleType.motorcycle,
    engineOrBatteryCapacity: BigInt(engineCC || 0),
    variant: variant.trim() || undefined,
    notes: remarks || notes,
    vehicleCondition: {
      headLight: parts.headlightLeft || undefined,
      frontScoop: parts.bonnet || undefined,
      bodyTypeScooter: parts.frontBumper || undefined,
      speedometerPanel: undefined,
      alloyOrWheelRim: parts.tyresRim || undefined,
      fuelGauge: undefined,
      mudGuardFront: parts.fenderMudguardsLeft || undefined,
      frontShockAbsorber: undefined,
      rearShockAbsorber: undefined,
      frontLHIndicator: parts.indicatorLightLeft || undefined,
      frontRHIndicator: parts.indicatorLightRight || undefined,
      handleBar: undefined,
      remoteKeyWorking: undefined,
      fuelTank: parts.fuelTank || undefined,
      sideCovers: parts.leftSideBody || undefined,
      mainStand: undefined,
      mudGuardRear: parts.fenderMudguardsRight || undefined,
      gearShiftLever: undefined,
      discBrakesFront: undefined,
      brakesCondition: undefined,
      rearBrakeLever: undefined,
      silencerCover: parts.silencer || undefined,
      rearShockAbsorberType: undefined,
      sideStand: undefined,
      engineFunction: undefined,
      tailLamp: parts.rearLightLeft || undefined,
      rearLHIndicator: undefined,
      rearRHIndicator: undefined,
      forkBend: undefined,
      silencer: parts.silencer || undefined,
      discBrakesRear: undefined,
      clutchCondition: undefined,
      acceleratorCondition: undefined,
      selfStart: undefined,
      ignition: undefined,
      paintCondition: undefined,
    },
  });

  const handlePrint = () => {
    createRecord(buildRecord())
      .then(() => toast.success("Record auto-saved."))
      .catch(() => {});
    const html = buildTruckPrintHTML(getPrintData());
    openPrintPopup(html);
  };

  const handleDownloadPDF = () => {
    createRecord(buildRecord())
      .then(() => toast.success("Record auto-saved."))
      .catch(() => {});
    const html = buildTruckPrintHTML(getPrintData());
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `truck-trailer-preinspection-${regNumber || "vehicle"}.pdf`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 200);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!regNumber.trim()) {
      toast.error("Registration Number is required.");
      return;
    }
    try {
      const record: TwoWheeler = {
        registrationNumber: regNumber.trim(),
        odometer: BigInt(odometer || 0),
        chassisNumber: chassisNumber.trim(),
        engineNumber: engineNumber.trim(),
        ownerName: ownerName.trim(),
        contactNumber: insuranceCompany.trim(),
        color: color.trim(),
        manufacturingYear: BigInt(modelYear || new Date().getFullYear()),
        fuelType: (fuelType === "electric"
          ? FuelType.electric
          : FuelType.petrol) as FuelType,
        brand: brand.trim(),
        model: model.trim(),
        vehicleType: VehicleType.motorcycle,
        engineOrBatteryCapacity: BigInt(engineCC || 0),
        variant: variant.trim() || undefined,
        notes: remarks || notes,
        vehicleCondition: {
          headLight: parts.headlightLeft || undefined,
          frontScoop: parts.bonnet || undefined,
          bodyTypeScooter: parts.frontBumper || undefined,
          speedometerPanel: undefined,
          alloyOrWheelRim: parts.tyresRim || undefined,
          fuelGauge: undefined,
          mudGuardFront: parts.fenderMudguardsLeft || undefined,
          frontShockAbsorber: undefined,
          rearShockAbsorber: undefined,
          frontLHIndicator: parts.indicatorLightLeft || undefined,
          frontRHIndicator: parts.indicatorLightRight || undefined,
          handleBar: undefined,
          remoteKeyWorking: undefined,
          fuelTank: parts.fuelTank || undefined,
          sideCovers: parts.leftSideBody || undefined,
          mainStand: undefined,
          mudGuardRear: parts.fenderMudguardsRight || undefined,
          gearShiftLever: undefined,
          discBrakesFront: undefined,
          brakesCondition: undefined,
          rearBrakeLever: undefined,
          silencerCover: parts.silencer || undefined,
          rearShockAbsorberType: undefined,
          sideStand: undefined,
          engineFunction: undefined,
          tailLamp: parts.rearLightLeft || undefined,
          rearLHIndicator: undefined,
          rearRHIndicator: undefined,
          forkBend: undefined,
          silencer: parts.silencer || undefined,
          discBrakesRear: undefined,
          clutchCondition: undefined,
          acceleratorCondition: undefined,
          selfStart: undefined,
          ignition: undefined,
          paintCondition: undefined,
        },
      };
      await createRecord(record);
      toast.success("Truck/Trailer record saved successfully!");
      setRegNumber("");
      setOdometer("");
      setChassisNumber("");
      setEngineNumber("");
      setOwnerName("");
      setInsuranceCompany("");
      setColor("");
      setModelYear("");
      setFuelType("diesel");
      setVehicleSubType("truck");
      setBrand("");
      setModel("");
      setEngineCC("");
      setVariant("");
      setNotes("");
      setParts(defaultParts);
      setVehiclePhotos([]);
      setInspectionDate("");
      setInspectionTime("");
      setInspectionPlace("");
      setRemarks("");
      setSurveyorSignatureImage(null);
    } catch {
      toast.error("Failed to save record. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} id="truck-trailer-inspection-form">
      {/* Vehicle Details Section */}
      <div className="mb-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-primary border-b border-primary/40 pb-1 mb-4">
          Vehicle Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
          <div className="space-y-1">
            <Label htmlFor="truck-ownerName" className="text-xs font-semibold">
              Name of Insured
            </Label>
            <Input
              id="truck-ownerName"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className="h-8 text-sm"
              data-ocid="truck.owner.input"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="truck-regNumber" className="text-xs font-semibold">
              Registration Number *
            </Label>
            <Input
              id="truck-regNumber"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
              required
              placeholder="RJ-XX-XX-XXXX"
              className="h-8 text-sm"
              data-ocid="truck.reg_number.input"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="truck-odometer" className="text-xs font-semibold">
              Odometer Reading (km) *
            </Label>
            <Input
              id="truck-odometer"
              type="number"
              value={odometer}
              onChange={(e) => setOdometer(e.target.value)}
              required
              placeholder="e.g. 85000"
              className="h-8 text-sm"
              data-ocid="truck.odometer.input"
            />
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="truck-chassisNumber"
              className="text-xs font-semibold"
            >
              Chassis Number *
            </Label>
            <Input
              id="truck-chassisNumber"
              value={chassisNumber}
              onChange={(e) => setChassisNumber(e.target.value)}
              required
              className="h-8 text-sm"
              data-ocid="truck.chassis.input"
            />
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="truck-engineNumber"
              className="text-xs font-semibold"
            >
              Engine Number *
            </Label>
            <Input
              id="truck-engineNumber"
              value={engineNumber}
              onChange={(e) => setEngineNumber(e.target.value)}
              required
              className="h-8 text-sm"
              data-ocid="truck.engine.input"
            />
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="truck-insuranceCompany"
              className="text-xs font-semibold"
            >
              Insurance Company
            </Label>
            <Input
              id="truck-insuranceCompany"
              value={insuranceCompany}
              onChange={(e) => setInsuranceCompany(e.target.value)}
              className="h-8 text-sm"
              data-ocid="truck.insurance_company.input"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="truck-color" className="text-xs font-semibold">
              Colour
            </Label>
            <Input
              id="truck-color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="White, Red..."
              className="h-8 text-sm"
              data-ocid="truck.color.input"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="truck-modelYear" className="text-xs font-semibold">
              Model Year
            </Label>
            <Input
              id="truck-modelYear"
              type="number"
              value={modelYear}
              onChange={(e) => setModelYear(e.target.value)}
              placeholder="2020"
              className="h-8 text-sm"
              data-ocid="truck.model_year.input"
            />
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="truck-vehicleSubType"
              className="text-xs font-semibold"
            >
              Vehicle Sub-Type
            </Label>
            <Select
              value={vehicleSubType}
              onValueChange={(v) => setVehicleSubType(v)}
            >
              <SelectTrigger
                id="truck-vehicleSubType"
                className="h-8 text-sm"
                data-ocid="truck.vehicle_sub_type.select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="truck">Truck</SelectItem>
                <SelectItem value="trailer">Trailer</SelectItem>
                <SelectItem value="tanker">Tanker</SelectItem>
                <SelectItem value="tipper">Tipper</SelectItem>
                <SelectItem value="container">Container</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="truck-fuelType" className="text-xs font-semibold">
              Fuel Type
            </Label>
            <Select value={fuelType} onValueChange={(v) => setFuelType(v)}>
              <SelectTrigger
                id="truck-fuelType"
                className="h-8 text-sm"
                data-ocid="truck.fuel_type.select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="petrol">Petrol</SelectItem>
                <SelectItem value="diesel">Diesel</SelectItem>
                <SelectItem value="cng">CNG</SelectItem>
                <SelectItem value="lpg">LPG</SelectItem>
                <SelectItem value="electric">Electric</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="truck-brand" className="text-xs font-semibold">
              Brand *
            </Label>
            <Input
              id="truck-brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
              placeholder="Tata, Ashok Leyland, Eicher..."
              className="h-8 text-sm"
              data-ocid="truck.brand.input"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="truck-model" className="text-xs font-semibold">
              Model *
            </Label>
            <Input
              id="truck-model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
              placeholder="407, 1109, Pro 1009..."
              className="h-8 text-sm"
              data-ocid="truck.model.input"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="truck-variant" className="text-xs font-semibold">
              Variant (Optional)
            </Label>
            <Input
              id="truck-variant"
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
              placeholder="HX, SE..."
              className="h-8 text-sm"
              data-ocid="truck.variant.input"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="truck-engineCC" className="text-xs font-semibold">
              Engine CC / GVW
            </Label>
            <Input
              id="truck-engineCC"
              value={engineCC}
              onChange={(e) => setEngineCC(e.target.value)}
              placeholder="3783 cc / 7.5 T"
              className="h-8 text-sm"
              data-ocid="truck.engine_cc.input"
            />
          </div>
        </div>

        <div className="mt-3 space-y-1">
          <Label htmlFor="truck-notes" className="text-xs font-semibold">
            Notes
          </Label>
          <Textarea
            id="truck-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="text-sm"
            data-ocid="truck.notes.textarea"
          />
        </div>
      </div>

      {/* Vehicle Photos Section */}
      <div className="mb-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-primary border-b border-primary/40 pb-1 mb-4">
          Vehicle Photos
        </h2>

        <input
          ref={photoInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handlePhotoUpload}
        />

        <button
          type="button"
          onClick={() => photoInputRef.current?.click()}
          data-ocid="truck.photos.upload_button"
          className="no-print w-full border-2 border-dashed border-primary/30 rounded-lg py-6 px-4 flex flex-col items-center justify-center gap-2 hover:border-primary/60 hover:bg-primary/5 transition-all duration-150 cursor-pointer mb-4"
        >
          <ImagePlus className="h-7 w-7 text-primary/50" />
          <span className="text-sm font-medium text-muted-foreground">
            Click to add vehicle photos
          </span>
          <span className="text-xs text-muted-foreground/60">
            Multiple images supported (JPG, PNG, etc.)
          </span>
        </button>

        {vehiclePhotos.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {vehiclePhotos.map((photo, idx) => (
              <div
                key={photo.id}
                className="relative group rounded-lg overflow-hidden border border-border shadow-sm"
                style={{ height: 90 }}
                data-ocid={`truck.photos.item.${idx + 1}`}
              >
                <img
                  src={photo.data}
                  alt={`${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(photo.id)}
                  data-ocid={`truck.photos.delete_button.${idx + 1}`}
                  className="no-print absolute top-1 right-1 bg-black/60 hover:bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  title="Remove"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
                <div className="no-print absolute bottom-0 left-0 right-0 bg-black/30 text-white text-xs text-center py-0.5">
                  {idx + 1}
                </div>
              </div>
            ))}
          </div>
        )}

        {vehiclePhotos.length === 0 && (
          <p className="no-print text-xs text-muted-foreground/60 text-center">
            No photos added yet
          </p>
        )}
      </div>

      {/* Vehicle Condition Report */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary border-b border-primary/40 pb-1">
            Vehicle Condition Report
          </h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={markAllIntact}
            className="gap-1.5 text-xs font-semibold text-green-700 border-green-300 bg-green-50 hover:bg-green-100 hover:border-green-400"
            data-ocid="truck_parts.mark_all.button"
          >
            <CheckSquare className="h-3.5 w-3.5" />
            Mark All Intact
          </Button>
        </div>

        {/* Legend */}
        <div className="no-print flex gap-2 flex-wrap mb-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded bg-green-500" />
            Intact
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded bg-yellow-500" />
            Missing
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded bg-red-500" />
            Damaged
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded bg-gray-400" />
            N/A
          </span>
        </div>

        {/* Parts List */}
        <div className="space-y-0 rounded-lg border border-border overflow-hidden">
          {ALL_TRUCK_PARTS.map((part, idx) => (
            <div
              key={part.key}
              data-ocid={`truck_parts.item.${idx + 1}`}
              className={`
                flex items-center justify-between gap-3 px-3 py-2.5
                border-b border-border/50 last:border-b-0
                ${idx % 2 === 0 ? "bg-white" : "bg-muted/20"}
              `}
            >
              <div className="flex items-center gap-2 min-w-0 flex-shrink">
                <span className="text-xs text-muted-foreground font-mono w-6 text-right flex-shrink-0">
                  {idx + 1}.
                </span>
                <span className="text-sm font-medium truncate">
                  {part.label}
                </span>
              </div>
              <ConditionButtons
                value={parts[part.key]}
                onChange={(v) =>
                  setParts((prev) => ({ ...prev, [part.key]: v }))
                }
                partKey={part.key}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Declaration Section */}
      <div className="mb-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-primary border-b border-primary/40 pb-1 mb-4">
          Declaration &amp; Signature
        </h2>

        <div className="bg-muted/30 rounded-lg border border-border p-4 mb-4">
          <p className="text-xs leading-relaxed text-foreground/80">
            <strong>Declaration of Owner —</strong> I hereby confirm and declare
            that above mentioned identification of my vehicle as well as that of
            damage to the vehicle as noted by the inspection official is
            correct. Nothing has been hidden / undisclosed. I further confirm
            and declare that the motor vehicle proposed for insurance after a
            break in cover has not met with any accident giving rise to any
            claim by a third party for injury or death caused to any person or
            damages to any property/insured vehicle during the period following
            the expiry of the previous insurance, till the moment it is proposed
            for insurance. I also agree that damages mentioned above shall be
            excluded / adjusted in the event of any claim being lodged.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-4">
          <div className="space-y-1">
            <Label
              htmlFor="truck-inspectionDate"
              className="text-xs font-semibold"
            >
              Inspection Date
            </Label>
            <div className="flex gap-2">
              <Input
                id="truck-inspectionDate"
                type="date"
                value={inspectionDate}
                onChange={(e) => setInspectionDate(e.target.value)}
                className="h-8 text-sm flex-1"
                data-ocid="truck.inspection_date.input"
              />
              <Input
                id="truck-inspectionTime"
                type="time"
                value={inspectionTime}
                onChange={(e) => setInspectionTime(e.target.value)}
                className="h-8 text-sm w-28"
                data-ocid="truck.inspection_time.input"
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label
              htmlFor="truck-inspectionPlace"
              className="text-xs font-semibold"
            >
              Inspection Place
            </Label>
            <Input
              id="truck-inspectionPlace"
              value={inspectionPlace}
              onChange={(e) => setInspectionPlace(e.target.value)}
              placeholder="City / Location"
              className="h-8 text-sm"
              data-ocid="truck.inspection_place.input"
            />
          </div>
        </div>

        <div className="space-y-1 mb-4">
          <Label htmlFor="truck-remarks" className="text-xs font-semibold">
            Remarks
          </Label>
          <Textarea
            id="truck-remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            rows={2}
            placeholder="Any additional remarks..."
            className="text-sm"
            data-ocid="truck.remarks.textarea"
          />
        </div>

        {/* Surveyor Signature Upload */}
        <div className="space-y-2 mb-4">
          <Label className="text-xs font-semibold">Surveyor Signature</Label>
          <input
            ref={surveyorSignatureInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleSurveyorSignatureUpload}
          />
          {surveyorSignatureImage ? (
            <div className="flex items-center gap-3">
              <img
                src={surveyorSignatureImage}
                alt="Surveyor Signature"
                className="max-h-16 max-w-[200px] object-contain border border-border rounded"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSurveyorSignatureImage(null)}
                className="text-xs text-red-600 border-red-200 hover:bg-red-50"
                data-ocid="truck.surveyor_signature.delete_button"
              >
                <X className="h-3 w-3 mr-1" /> Remove
              </Button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => surveyorSignatureInputRef.current?.click()}
              data-ocid="truck.surveyor_signature.upload_button"
              className="flex items-center gap-2 px-4 py-2 border border-dashed border-primary/30 rounded-lg text-sm text-muted-foreground hover:border-primary/60 hover:bg-primary/5 transition-all"
            >
              <Upload className="h-4 w-4" />
              Click to upload surveyor signature
            </button>
          )}
        </div>

        {/* Sign columns */}
        <div className="grid grid-cols-1 gap-4 pt-3 border-t border-border/50 max-w-xs ml-auto">
          <div className="text-xs font-semibold text-center">
            Name &amp; Sign of Surveyor
            <div className="mt-6 border-b-2 border-foreground/40 mx-4" />
            <p className="mt-1 text-muted-foreground font-normal">
              DINESH KUMAR JANGIR
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="no-print flex flex-wrap items-center gap-3 pt-4 border-t border-border">
        <Button
          type="submit"
          disabled={isPending}
          className="gap-2"
          data-ocid="truck.form.submit_button"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {isPending ? "Saving..." : "Save Truck/Trailer Record"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={handlePrint}
          className="gap-2"
          data-ocid="truck.form.print_button"
        >
          <Printer className="h-4 w-4" />
          Print
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={handleDownloadPDF}
          className="gap-2"
          data-ocid="truck.form.pdf_button"
        >
          <FileDown className="h-4 w-4" />
          Download PDF
        </Button>
      </div>
    </form>
  );
}
