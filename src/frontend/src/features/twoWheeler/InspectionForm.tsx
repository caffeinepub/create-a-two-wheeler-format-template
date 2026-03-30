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

interface PartsState {
  visor: Condition;
  headLamp: Condition;
  fairing: Condition;
  frontPanel: Condition;
  hubNose: Condition;
  legShield: Condition;
  mudguardFront: Condition;
  shockerLeft: Condition;
  shockerRight: Condition;
  indicatorLt: Condition;
  indicatorRt: Condition;
  rearMirrorLeft: Condition;
  rearMirrorRight: Condition;
  fuelTank: Condition;
  leftSideCover: Condition;
  leftRunningBoard: Condition;
  leftSideRearCowl: Condition;
  gearShiftLever: Condition;
  footBrake: Condition;
  leftFootRestFront: Condition;
  leftFootRestRear: Condition;
  chainCover: Condition;
  leftRearShocker: Condition;
  sareeGuard: Condition;
  engineHead: Condition;
  tailLamp: Condition;
  leftRearIndicator: Condition;
  rightRearIndicator: Condition;
  rearCowl: Condition;
  silencer: Condition;
  rightRearShocker: Condition;
  rightFootRestRear: Condition;
  rightFootRestFront: Condition;
  rightRunningBoard: Condition;
  rightRearCowl: Condition;
  rightSideCover: Condition;
}

const defaultParts: PartsState = {
  visor: "",
  headLamp: "",
  fairing: "",
  frontPanel: "",
  hubNose: "",
  legShield: "",
  mudguardFront: "",
  shockerLeft: "",
  shockerRight: "",
  indicatorLt: "",
  indicatorRt: "",
  rearMirrorLeft: "",
  rearMirrorRight: "",
  fuelTank: "",
  leftSideCover: "",
  leftRunningBoard: "",
  leftSideRearCowl: "",
  gearShiftLever: "",
  footBrake: "",
  leftFootRestFront: "",
  leftFootRestRear: "",
  chainCover: "",
  leftRearShocker: "",
  sareeGuard: "",
  engineHead: "",
  tailLamp: "",
  leftRearIndicator: "",
  rightRearIndicator: "",
  rearCowl: "",
  silencer: "",
  rightRearShocker: "",
  rightFootRestRear: "",
  rightFootRestFront: "",
  rightRunningBoard: "",
  rightRearCowl: "",
  rightSideCover: "",
};

const allIntactParts: PartsState = {
  visor: "Intact",
  headLamp: "Intact",
  fairing: "Intact",
  frontPanel: "Intact",
  hubNose: "Intact",
  legShield: "Intact",
  mudguardFront: "Intact",
  shockerLeft: "Intact",
  shockerRight: "Intact",
  indicatorLt: "Intact",
  indicatorRt: "Intact",
  rearMirrorLeft: "Intact",
  rearMirrorRight: "Intact",
  fuelTank: "Intact",
  leftSideCover: "Intact",
  leftRunningBoard: "Intact",
  leftSideRearCowl: "Intact",
  gearShiftLever: "Intact",
  footBrake: "Intact",
  leftFootRestFront: "Intact",
  leftFootRestRear: "Intact",
  chainCover: "Intact",
  leftRearShocker: "Intact",
  sareeGuard: "Intact",
  engineHead: "Intact",
  tailLamp: "Intact",
  leftRearIndicator: "Intact",
  rightRearIndicator: "Intact",
  rearCowl: "Intact",
  silencer: "Intact",
  rightRearShocker: "Intact",
  rightFootRestRear: "Intact",
  rightFootRestFront: "Intact",
  rightRunningBoard: "Intact",
  rightRearCowl: "Intact",
  rightSideCover: "Intact",
};

const ALL_PARTS: { key: keyof PartsState; label: string }[] = [
  { key: "visor", label: "Wiser / Visor" },
  { key: "headLamp", label: "Head Lamp" },
  { key: "fairing", label: "Fairing" },
  { key: "frontPanel", label: "Front Panel" },
  { key: "hubNose", label: "Hub Nose" },
  { key: "legShield", label: "Leg Shield" },
  { key: "mudguardFront", label: "Mudguard" },
  { key: "shockerLeft", label: "Shocker Left" },
  { key: "shockerRight", label: "Shocker Right" },
  { key: "indicatorLt", label: "Indicator Lt" },
  { key: "indicatorRt", label: "Indicator Rt" },
  { key: "rearMirrorLeft", label: "Rear View Mirror Left" },
  { key: "rearMirrorRight", label: "Rear View Mirror Right" },
  { key: "fuelTank", label: "Fuel Tank" },
  { key: "leftSideCover", label: "Left Side Cover" },
  { key: "leftRunningBoard", label: "Left Running Board" },
  { key: "leftSideRearCowl", label: "Left Side Rear Cowl" },
  { key: "gearShiftLever", label: "Gear Shift Lever" },
  { key: "footBrake", label: "Foot Brake" },
  { key: "leftFootRestFront", label: "Left Foot Rest Front" },
  { key: "leftFootRestRear", label: "Left Foot Rest Rear" },
  { key: "chainCover", label: "Chain Cover" },
  { key: "leftRearShocker", label: "Left Rear Shocker" },
  { key: "sareeGuard", label: "Saree Guard" },
  { key: "engineHead", label: "Engine Head" },
  { key: "tailLamp", label: "Tail Lamp" },
  { key: "leftRearIndicator", label: "Left Rear Indicator" },
  { key: "rightRearIndicator", label: "Right Rear Indicator" },
  { key: "rearCowl", label: "Rear Cowl" },
  { key: "silencer", label: "Silencer" },
  { key: "rightRearShocker", label: "Right Rear Shocker" },
  { key: "rightFootRestRear", label: "Right Foot Rest Rear" },
  { key: "rightFootRestFront", label: "Right Foot Rest Front" },
  { key: "rightRunningBoard", label: "Right Running Board" },
  { key: "rightRearCowl", label: "Right Rear Cowl" },
  { key: "rightSideCover", label: "Right Side Cover" },
];

type ConditionOption = {
  value: Exclude<Condition, "">;
  label: string;
  activeClass: string;
  inactiveClass: string;
};

const CONDITION_OPTIONS: ConditionOption[] = [
  {
    value: "Intact",
    label: "Intact",
    activeClass: "bg-green-500 text-white border-green-500",
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
            onClick={() => onChange(isActive ? "" : opt.value)}
            data-ocid={`parts.${partKey}.toggle`}
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

// ─── PDF / Print helper ──────────────────────────────────────────────────────

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

interface PrintData {
  regNumber: string;
  odometer: string;
  chassisNumber: string;
  engineNumber: string;
  ownerName: string;
  insuranceCompany: string;
  color: string;
  modelYear: string;
  fuelType: FuelType;
  brand: string;
  model: string;
  vehicleType: VehicleType;
  engineCC: string;
  variant: string;
  notes: string;
  parts: PartsState;
  vehiclePhotos: PhotoItem[];
  inspectionDate: string;
  inspectionTime: string;
  remarks: string;
  signatureImage: string | null;
  proposerName: string;
  inspectionPlace: string;
}

function buildPrintHTML(data: PrintData): string {
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
    vehicleType,
    engineCC,
    variant,
    notes,
    parts,
    vehiclePhotos,
    inspectionDate,
    inspectionTime,
    inspectionPlace,
    remarks,
    signatureImage,
    proposerName,
  } = data;

  const partsRows = ALL_PARTS.map((p, idx) => {
    const cond = parts[p.key] || "—";
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
              (
                ph,
                i,
              ) => `<div style="border:1px solid #e2e8f0;border-radius:6px;overflow:hidden">
            <img src="${ph.data}" alt="Photo ${i + 1}" style="width:100%;height:130px;object-fit:cover;display:block" />
            <div style="text-align:center;font-size:10px;color:#64748b;padding:3px">Photo ${i + 1}</div>
          </div>`,
            )
            .join("")}
        </div>
      </div>`
      : "";

  const signatureHTML = signatureImage
    ? `<img src="${signatureImage}" alt="Signature" style="max-width:200px;max-height:70px;object-fit:contain;display:block;margin-top:6px" />`
    : `<div style="border-bottom:2px solid #334155;width:200px;height:60px;margin-top:6px"></div>`;

  const dateDisplay = inspectionDate
    ? new Date(inspectionDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }) + (inspectionTime ? ` ${inspectionTime}` : "")
    : "_______________";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Vehicle Inspection Report — ${regNumber || "New"}</title>
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
  <div style="text-align:center;font-size:15px;font-weight:800;letter-spacing:1px;margin-bottom:14px;text-transform:uppercase">Vehicle Inspection Report</div>

  <!-- Vehicle Details -->
  <h3 style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #1e293b;padding-bottom:4px;margin-bottom:8px">Vehicle Details</h3>
  <table style="margin-bottom:16px">
    <tbody>
      <tr>
        <td style="padding:3px 0;width:200px;font-size:12px;color:#64748b">Registration Number</td>
        <td style="padding:3px 0;font-size:12px;font-weight:600">: ${regNumber || "—"}</td>
        <td style="padding:3px 0;width:200px;font-size:12px;color:#64748b">Odometer Reading</td>
        <td style="padding:3px 0;font-size:12px;font-weight:600">: ${odometer ? `${odometer} km` : "—"}</td>
      </tr>
      <tr>
        <td style="padding:3px 0;font-size:12px;color:#64748b">Chassis Number</td>
        <td style="padding:3px 0;font-size:12px;font-weight:600">: ${chassisNumber || "—"}</td>
        <td style="padding:3px 0;font-size:12px;color:#64748b">Engine Number</td>
        <td style="padding:3px 0;font-size:12px;font-weight:600">: ${engineNumber || "—"}</td>
      </tr>
      <tr>
        <td style="padding:3px 0;font-size:12px;color:#64748b">Name of Insured</td>
        <td style="padding:3px 0;font-size:12px;font-weight:600">: ${ownerName || "—"}</td>
        <td style="padding:3px 0;font-size:12px;color:#64748b">Insurance Company</td>
        <td style="padding:3px 0;font-size:12px;font-weight:600">: ${insuranceCompany || "—"}</td>
      </tr>
      <tr>
        <td style="padding:3px 0;font-size:12px;color:#64748b">Colour</td>
        <td style="padding:3px 0;font-size:12px;font-weight:600">: ${color || "—"}</td>
        <td style="padding:3px 0;font-size:12px;color:#64748b">Model Year</td>
        <td style="padding:3px 0;font-size:12px;font-weight:600">: ${modelYear || "—"}</td>
      </tr>
      <tr>
        <td style="padding:3px 0;font-size:12px;color:#64748b">Fuel Type</td>
        <td style="padding:3px 0;font-size:12px;font-weight:600">: ${fuelType}</td>
        <td style="padding:3px 0;font-size:12px;color:#64748b">Vehicle Type</td>
        <td style="padding:3px 0;font-size:12px;font-weight:600">: ${vehicleType}</td>
      </tr>
      <tr>
        <td style="padding:3px 0;font-size:12px;color:#64748b">Brand</td>
        <td style="padding:3px 0;font-size:12px;font-weight:600">: ${brand || "—"}</td>
        <td style="padding:3px 0;font-size:12px;color:#64748b">Model</td>
        <td style="padding:3px 0;font-size:12px;font-weight:600">: ${model || "—"}</td>
      </tr>
      <tr>
        <td style="padding:3px 0;font-size:12px;color:#64748b">Engine CC</td>
        <td style="padding:3px 0;font-size:12px;font-weight:600">: ${engineCC || "—"}</td>
        <td style="padding:3px 0;font-size:12px;color:#64748b">Variant</td>
        <td style="padding:3px 0;font-size:12px;font-weight:600">: ${variant || "—"}</td>
      </tr>
      <tr>
        <td style="padding:3px 0;font-size:12px;color:#64748b">Inspection Place</td>
        <td colspan="3" style="padding:3px 0;font-size:12px;font-weight:600">: ${inspectionPlace || "—"}</td>
      </tr>
      ${
        notes
          ? `<tr>
        <td style="padding:3px 0;font-size:12px;color:#64748b">Notes</td>
        <td colspan="3" style="padding:3px 0;font-size:12px;font-weight:600">: ${notes}</td>
      </tr>`
          : ""
      }
    </tbody>
  </table>

  <!-- Vehicle Condition Report -->
  <h3 style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #1e293b;padding-bottom:4px;margin-bottom:8px">Vehicle Condition Report</h3>
  <table style="margin-bottom:16px">
    <thead>
      <tr style="background:#1e293b;color:#fff">
        <th style="padding:5px 8px;border:1px solid #334155;font-size:12px;text-align:center;width:36px">#</th>
        <th style="padding:5px 8px;border:1px solid #334155;font-size:12px;text-align:left">Part Name</th>
        <th style="padding:5px 8px;border:1px solid #334155;font-size:12px;text-align:center;width:120px">Condition</th>
      </tr>
    </thead>
    <tbody>
      ${partsRows}
    </tbody>
  </table>

  ${photosHTML}

  <!-- Declaration -->
  <div style="margin-top:20px;border:1px solid #cbd5e1;border-radius:6px;padding:12px">
    <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-bottom:8px">Declaration of Owner</div>
    <p style="font-size:11px;line-height:1.6;color:#374151">
      I hereby confirm and declare that above mentioned identification of my vehicle as well as that of damage to the vehicle as noted by the inspection official is correct. Nothing has been hidden / undisclosed. I further confirm and declare that the motor vehicle proposed for insurance after a break in cover has not met with any accident giving rise to any claim by a third party for injury or death caused to any person or damages to any property/insured vehicle during the period following the expiry of the previous insurance, till the moment it is proposed for insurance.
    </p>
    <p style="font-size:11px;line-height:1.6;color:#374151;margin-top:6px">
      I also agree that damages mentioned above shall be excluded / adjusted in the event of any claim being lodged.
    </p>
  </div>

  <!-- Signature row -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:20px">
    <div>
      <div style="font-size:12px;font-weight:600;margin-bottom:4px">Name &amp; Sign of Proposer</div>
      <div style="border-bottom:2px solid #334155;height:60px;margin-bottom:6px"></div>
      <div style="font-size:12px;font-weight:600">${proposerName || ownerName || "_______________"}</div>
    </div>
    <div>
      <div style="font-size:12px;font-weight:600;margin-bottom:4px">Name &amp; Sign of Surveyor</div>
      ${signatureHTML}
      <div style="font-size:12px;font-weight:600;margin-top:6px">(DINESH KUMAR JANGIR)</div>
    </div>
  </div>

  <!-- Date / Remarks / Stamp row -->
  <div style="display:grid;grid-template-columns:1fr 1fr 120px;gap:16px;margin-top:20px;align-items:start">
    <div>
      <div style="font-size:11px;color:#64748b">Inspection Date</div>
      <div style="font-size:13px;font-weight:600;border-bottom:1px solid #94a3b8;padding-bottom:4px;margin-top:4px">${dateDisplay}</div>
    </div>
    <div>
      <div style="font-size:11px;color:#64748b">Remarks</div>
      <div style="font-size:12px;font-weight:600;border-bottom:1px solid #94a3b8;padding-bottom:4px;margin-top:4px;min-height:24px">${remarks || ""}</div>
    </div>
    <div style="text-align:center">
      <div style="font-size:11px;color:#64748b;margin-bottom:4px">Stamp</div>
      <div style="border:1px solid #94a3b8;border-radius:4px;height:70px;width:100px;margin:0 auto"></div>
    </div>
  </div>

</div>
</body>
</html>`;
}

function openPrintPopup(html: string): void {
  const popup = window.open(
    "",
    "_blank",
    "width=900,height=700,scrollbars=yes",
  );
  if (!popup) {
    alert("Popup blocked! Please allow popups for this site and try again.");
    return;
  }
  popup.document.open();
  popup.document.write(html);
  popup.document.close();
  // Give images time to load before printing
  popup.onload = () => popup.print();
  // Fallback if onload doesn't fire
  setTimeout(() => {
    try {
      popup.print();
    } catch {
      /* already printed */
    }
  }, 800);
}

// ─── Component ────────────────────────────────────────────────────────────────

export function InspectionForm() {
  const { mutateAsync: createRecord, isPending } = useCreateTwoWheeler();

  const [regNumber, setRegNumber] = useState("");
  const [odometer, setOdometer] = useState("");
  const [chassisNumber, setChassisNumber] = useState("");
  const [engineNumber, setEngineNumber] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [insuranceCompany, setInsuranceCompany] = useState("");
  const [color, setColor] = useState("");
  const [modelYear, setModelYear] = useState("");
  const [fuelType, setFuelType] = useState<FuelType>(FuelType.petrol);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [vehicleType, setVehicleType] = useState<VehicleType>(
    VehicleType.motorcycle,
  );
  const [engineCC, setEngineCC] = useState("");
  const [variant, setVariant] = useState("");
  const [notes, setNotes] = useState("");

  const [parts, setParts] = useState<PartsState>(defaultParts);

  const [vehiclePhotos, setVehiclePhotos] = useState<PhotoItem[]>([]);

  const [inspectionDate, setInspectionDate] = useState("");
  const [inspectionTime, setInspectionTime] = useState("");
  const [inspectionPlace, setInspectionPlace] = useState("");
  const [remarks, setRemarks] = useState("");
  const [signatureImage, setSignatureImage] = useState<string | null>(null);
  const [proposerName, setProposerName] = useState("");

  const signatureInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const setPart = (key: keyof PartsState, value: Condition) => {
    setParts((prev) => ({ ...prev, [key]: value }));
  };

  const markAllIntact = () => {
    setParts(allIntactParts);
  };

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result;
      if (typeof result === "string") {
        setSignatureImage(result);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const fileArray = Array.from(files);
    let loaded = 0;
    const results: PhotoItem[] = [];
    fileArray.forEach((file, idx) => {
      const id = `${Date.now()}-${idx}-${file.name}`;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result;
        if (typeof result === "string") {
          results[idx] = { id, data: result };
        }
        loaded++;
        if (loaded === fileArray.length) {
          setVehiclePhotos((prev) => [...prev, ...results.filter(Boolean)]);
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const removePhoto = (id: string) => {
    setVehiclePhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const getPrintData = (): PrintData => ({
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
    vehicleType,
    engineCC,
    variant,
    notes,
    parts,
    vehiclePhotos,
    inspectionDate,
    inspectionTime,
    inspectionPlace,
    remarks,
    signatureImage,
    proposerName,
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
    fuelType,
    brand: brand.trim(),
    model: model.trim(),
    vehicleType,
    engineOrBatteryCapacity: BigInt(engineCC || 0),
    variant: variant.trim() || undefined,
    notes: remarks || notes,
    vehicleCondition: {
      headLight: parts.headLamp || undefined,
      frontScoop: parts.visor || undefined,
      bodyTypeScooter: parts.fairing || undefined,
      speedometerPanel: parts.frontPanel || undefined,
      alloyOrWheelRim: parts.hubNose || undefined,
      fuelGauge: parts.legShield || undefined,
      mudGuardFront: parts.mudguardFront || undefined,
      frontShockAbsorber: parts.shockerLeft || undefined,
      rearShockAbsorber: parts.shockerRight || undefined,
      frontLHIndicator: parts.indicatorLt || undefined,
      frontRHIndicator: parts.indicatorRt || undefined,
      handleBar: parts.rearMirrorLeft || undefined,
      remoteKeyWorking: parts.rearMirrorRight || undefined,
      fuelTank: parts.fuelTank || undefined,
      sideCovers: parts.leftSideCover || undefined,
      mainStand: parts.leftRunningBoard || undefined,
      mudGuardRear: parts.leftSideRearCowl || undefined,
      gearShiftLever: parts.gearShiftLever || undefined,
      discBrakesFront: parts.footBrake || undefined,
      brakesCondition: parts.leftFootRestFront || undefined,
      rearBrakeLever: parts.leftFootRestRear || undefined,
      silencerCover: parts.chainCover || undefined,
      rearShockAbsorberType: parts.leftRearShocker || undefined,
      sideStand: parts.sareeGuard || undefined,
      engineFunction: parts.engineHead || undefined,
      tailLamp: parts.tailLamp || undefined,
      rearLHIndicator: parts.leftRearIndicator || undefined,
      rearRHIndicator: parts.rightRearIndicator || undefined,
      forkBend: parts.rearCowl || undefined,
      silencer: parts.silencer || undefined,
      discBrakesRear: parts.rightRearShocker || undefined,
      clutchCondition: parts.rightFootRestRear || undefined,
      acceleratorCondition: parts.rightFootRestFront || undefined,
      selfStart: parts.rightRunningBoard || undefined,
      ignition: parts.rightRearCowl || undefined,
      paintCondition: parts.rightSideCover || undefined,
    },
  });

  const handlePrint = () => {
    createRecord(buildRecord())
      .then(() => toast.success("Record auto-saved."))
      .catch(() => {});
    openPrintPopup(buildPrintHTML(getPrintData()));
  };

  const handleDownloadPDF = () => {
    createRecord(buildRecord())
      .then(() => toast.success("Record auto-saved."))
      .catch(() => {});
    openPrintPopup(buildPrintHTML(getPrintData()));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
        fuelType,
        brand: brand.trim(),
        model: model.trim(),
        vehicleType,
        engineOrBatteryCapacity: BigInt(engineCC || 0),
        variant: variant.trim() || undefined,
        notes: remarks || notes,
        vehicleCondition: {
          headLight: parts.headLamp || undefined,
          frontScoop: parts.visor || undefined,
          bodyTypeScooter: parts.fairing || undefined,
          speedometerPanel: parts.frontPanel || undefined,
          alloyOrWheelRim: parts.hubNose || undefined,
          fuelGauge: parts.legShield || undefined,
          mudGuardFront: parts.mudguardFront || undefined,
          frontShockAbsorber: parts.shockerLeft || undefined,
          rearShockAbsorber: parts.shockerRight || undefined,
          frontLHIndicator: parts.indicatorLt || undefined,
          frontRHIndicator: parts.indicatorRt || undefined,
          handleBar: parts.rearMirrorLeft || undefined,
          remoteKeyWorking: parts.rearMirrorRight || undefined,
          fuelTank: parts.fuelTank || undefined,
          sideCovers: parts.leftSideCover || undefined,
          mainStand: parts.leftRunningBoard || undefined,
          mudGuardRear: parts.leftSideRearCowl || undefined,
          gearShiftLever: parts.gearShiftLever || undefined,
          discBrakesFront: parts.footBrake || undefined,
          brakesCondition: parts.leftFootRestFront || undefined,
          rearBrakeLever: parts.leftFootRestRear || undefined,
          silencerCover: parts.chainCover || undefined,
          rearShockAbsorberType: parts.leftRearShocker || undefined,
          sideStand: parts.sareeGuard || undefined,
          engineFunction: parts.engineHead || undefined,
          tailLamp: parts.tailLamp || undefined,
          rearLHIndicator: parts.leftRearIndicator || undefined,
          rearRHIndicator: parts.rightRearIndicator || undefined,
          forkBend: parts.rearCowl || undefined,
          silencer: parts.silencer || undefined,
          discBrakesRear: parts.rightRearShocker || undefined,
          clutchCondition: parts.rightFootRestRear || undefined,
          acceleratorCondition: parts.rightFootRestFront || undefined,
          selfStart: parts.rightRunningBoard || undefined,
          ignition: parts.rightRearCowl || undefined,
          paintCondition: parts.rightSideCover || undefined,
        },
      };

      await createRecord(record);
      toast.success("Vehicle record saved successfully!");

      setRegNumber("");
      setOdometer("");
      setChassisNumber("");
      setEngineNumber("");
      setOwnerName("");
      setInsuranceCompany("");
      setColor("");
      setModelYear("");
      setFuelType(FuelType.petrol);
      setBrand("");
      setModel("");
      setVehicleType(VehicleType.motorcycle);
      setEngineCC("");
      setVariant("");
      setNotes("");
      setParts(defaultParts);
      setVehiclePhotos([]);
      setInspectionDate("");
      setInspectionPlace("");
      setRemarks("");
      setSignatureImage(null);
      setProposerName("");
    } catch {
      toast.error("Failed to save record. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} id="inspection-form">
      {/* Vehicle Details Section */}
      <div className="mb-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-primary border-b border-primary/40 pb-1 mb-4">
          Vehicle Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
          <div className="space-y-1">
            <Label htmlFor="regNumber" className="text-xs font-semibold">
              Registration Number *
            </Label>
            <Input
              id="regNumber"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
              required
              placeholder="RJ-XX-XX-XXXX"
              className="h-8 text-sm"
              data-ocid="vehicle.reg_number.input"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="odometer" className="text-xs font-semibold">
              Odometer Reading (km) *
            </Label>
            <Input
              id="odometer"
              type="number"
              value={odometer}
              onChange={(e) => setOdometer(e.target.value)}
              required
              placeholder="e.g. 12500"
              className="h-8 text-sm"
              data-ocid="vehicle.odometer.input"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="chassisNumber" className="text-xs font-semibold">
              Chassis Number *
            </Label>
            <Input
              id="chassisNumber"
              value={chassisNumber}
              onChange={(e) => setChassisNumber(e.target.value)}
              required
              className="h-8 text-sm"
              data-ocid="vehicle.chassis.input"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="engineNumber" className="text-xs font-semibold">
              Engine Number *
            </Label>
            <Input
              id="engineNumber"
              value={engineNumber}
              onChange={(e) => setEngineNumber(e.target.value)}
              required
              className="h-8 text-sm"
              data-ocid="vehicle.engine.input"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="ownerName" className="text-xs font-semibold">
              Name of Insured / Representative
            </Label>
            <Input
              id="ownerName"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className="h-8 text-sm"
              data-ocid="vehicle.owner.input"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="insuranceCompany" className="text-xs font-semibold">
              Insurance Company
            </Label>
            <Input
              id="insuranceCompany"
              value={insuranceCompany}
              onChange={(e) => setInsuranceCompany(e.target.value)}
              placeholder="Insurance Company Name"
              className="h-8 text-sm"
              data-ocid="vehicle.insurancecompany.input"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="color" className="text-xs font-semibold">
              Colour
            </Label>
            <Input
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-8 text-sm"
              data-ocid="vehicle.color.input"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="modelYear" className="text-xs font-semibold">
              Model Year
            </Label>
            <Input
              id="modelYear"
              type="number"
              value={modelYear}
              onChange={(e) => setModelYear(e.target.value)}
              placeholder="2024"
              min="1980"
              max="2030"
              className="h-8 text-sm"
              data-ocid="vehicle.year.input"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="fuelType" className="text-xs font-semibold">
              Fuel Type
            </Label>
            <Select
              value={fuelType}
              onValueChange={(v) => setFuelType(v as FuelType)}
            >
              <SelectTrigger
                id="fuelType"
                className="h-8 text-sm"
                data-ocid="vehicle.fuel.select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={FuelType.petrol}>Petrol</SelectItem>
                <SelectItem value={FuelType.electric}>Electric</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="brand" className="text-xs font-semibold">
              Brand *
            </Label>
            <Input
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
              placeholder="Honda, Hero, Bajaj..."
              className="h-8 text-sm"
              data-ocid="vehicle.brand.input"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="model" className="text-xs font-semibold">
              Model *
            </Label>
            <Input
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
              placeholder="Activa, Splendor..."
              className="h-8 text-sm"
              data-ocid="vehicle.model.input"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="vehicleType" className="text-xs font-semibold">
              Vehicle Type
            </Label>
            <Select
              value={vehicleType}
              onValueChange={(v) => setVehicleType(v as VehicleType)}
            >
              <SelectTrigger
                id="vehicleType"
                className="h-8 text-sm"
                data-ocid="vehicle.type.select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={VehicleType.motorcycle}>
                  Motorcycle
                </SelectItem>
                <SelectItem value={VehicleType.scooter}>Scooter</SelectItem>
                <SelectItem value={VehicleType.bike}>Bike</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="engineCC" className="text-xs font-semibold">
              Engine CC / Battery Capacity
            </Label>
            <Input
              id="engineCC"
              type="number"
              value={engineCC}
              onChange={(e) => setEngineCC(e.target.value)}
              placeholder="125"
              className="h-8 text-sm"
              data-ocid="vehicle.engine_cc.input"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="variant" className="text-xs font-semibold">
              Variant (Optional)
            </Label>
            <Input
              id="variant"
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
              className="h-8 text-sm"
              data-ocid="vehicle.variant.input"
            />
          </div>
        </div>

        <div className="mt-3 space-y-1">
          <Label htmlFor="notes" className="text-xs font-semibold">
            Notes
          </Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="text-sm"
            data-ocid="vehicle.notes.textarea"
          />
        </div>
      </div>

      {/* Vehicle Photos Section */}
      <div className="mb-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-primary border-b border-primary/40 pb-1 mb-4">
          Vehicle Photos
        </h2>

        {/* Hidden file input */}
        <input
          ref={photoInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handlePhotoUpload}
        />

        {/* Upload dropzone */}
        <button
          type="button"
          onClick={() => photoInputRef.current?.click()}
          data-ocid="vehicle.photos.upload_button"
          className="w-full border-2 border-dashed border-primary/30 rounded-lg py-6 px-4 flex flex-col items-center justify-center gap-2 hover:border-primary/60 hover:bg-primary/5 transition-all duration-150 cursor-pointer mb-4"
        >
          <ImagePlus className="h-7 w-7 text-primary/50" />
          <span className="text-sm font-medium text-muted-foreground">
            Click to add vehicle photos
          </span>
          <span className="text-xs text-muted-foreground/60">
            Multiple images supported (JPG, PNG, etc.)
          </span>
        </button>

        {/* Photo grid */}
        {vehiclePhotos.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {vehiclePhotos.map((photo, idx) => (
              <div
                key={photo.id}
                className="relative group rounded-lg overflow-hidden border border-border shadow-sm"
                style={{ height: 90 }}
                data-ocid={`vehicle.photos.item.${idx + 1}`}
              >
                <img
                  src={photo.data}
                  alt={`${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(photo.id)}
                  data-ocid={`vehicle.photos.delete_button.${idx + 1}`}
                  className="absolute top-1 right-1 bg-black/60 hover:bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  title="Remove"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/30 text-white text-xs text-center py-0.5">
                  {idx + 1}
                </div>
              </div>
            ))}
          </div>
        )}

        {vehiclePhotos.length === 0 && (
          <p className="text-xs text-muted-foreground/60 text-center">
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
            data-ocid="parts.mark_all.button"
          >
            <CheckSquare className="h-3.5 w-3.5" />
            Mark All Intact
          </Button>
        </div>

        {/* Legend */}
        <div className="flex gap-2 flex-wrap mb-3 text-xs text-muted-foreground">
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
          {ALL_PARTS.map((part, idx) => (
            <div
              key={part.key}
              data-ocid={`parts.item.${idx + 1}`}
              className={`
                flex items-center justify-between gap-3 px-3 py-2.5
                border-b border-border/50 last:border-b-0
                ${idx % 2 === 0 ? "bg-white" : "bg-muted/20"}
              `}
            >
              {/* Part number + name */}
              <div className="flex items-center gap-2 min-w-0 flex-shrink">
                <span className="text-xs text-muted-foreground font-mono w-6 text-right flex-shrink-0">
                  {idx + 1}
                </span>
                <span className="text-sm font-medium truncate">
                  {part.label}
                </span>
              </div>

              {/* Condition buttons */}
              <div className="flex-shrink-0">
                <ConditionButtons
                  value={parts[part.key]}
                  onChange={(v) => setPart(part.key, v)}
                  partKey={part.key}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Declaration Section */}
      <div className="mb-6 border border-border/60 rounded p-4 bg-muted/20">
        <h2 className="text-sm font-bold uppercase tracking-widest text-primary border-b border-primary/40 pb-1 mb-4">
          Declaration
        </h2>

        {/* Declaration of Owner box */}
        <div className="border border-foreground/30 rounded p-3 mb-4 bg-white">
          <p className="text-xs font-bold text-foreground mb-2 uppercase tracking-wide">
            Declaration of Owner
          </p>
          <p className="text-xs text-foreground/80 leading-relaxed">
            I hereby confirm and declare that above mentioned identification of
            my vehicle as well as that of damage to the vehicle as noted by the
            inspection official is correct. Nothing has been hidden /
            undisclosed. I further confirm and declare that the motor vehicle
            proposed for insurance after a break in cover has not met with any
            accident giving rise to any claim by a third party for injury or
            death caused to any person or damages to any property/insured
            vehicle during the period following the expiry of the previous
            insurance, till the moment it is proposed for insurance.
          </p>
          <p className="text-xs text-foreground/80 leading-relaxed mt-2">
            I also agree that damages mentioned above shall be excluded /
            adjusted in the event of any claim being lodged.
          </p>
        </div>

        {/* Two-column signature row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
          {/* Left: Proposer */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-foreground">
              Name &amp; Sign of Proposer
            </span>
            {/* Signature line */}
            <div
              className="border-b-2 border-foreground/40 mt-1"
              style={{ minHeight: 56 }}
            />
            {/* Editable proposer name */}
            <div className="space-y-1 mt-1">
              <Label
                htmlFor="proposerName"
                className="text-xs text-muted-foreground"
              >
                Name of Proposer
              </Label>
              <Input
                id="proposerName"
                value={proposerName || ownerName}
                onChange={(e) => setProposerName(e.target.value)}
                placeholder="Proposer name"
                className="h-8 text-sm"
                data-ocid="declaration.proposer.input"
              />
            </div>
          </div>

          {/* Right: Surveyor */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-foreground">
              Name &amp; Sign of Surveyor
            </span>
            {/* Hidden file input */}
            <input
              ref={signatureInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleSignatureUpload}
            />
            {signatureImage ? (
              <div className="flex flex-col gap-1">
                <div
                  className="border border-foreground/40 rounded overflow-hidden"
                  style={{ width: 200, height: 60 }}
                >
                  <img
                    src={signatureImage}
                    alt="Signature"
                    className="w-full h-full object-contain"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setSignatureImage(null)}
                  className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition-colors mt-0.5 self-start"
                  data-ocid="declaration.signature.delete_button"
                >
                  <X className="h-3 w-3" />
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  className="border border-foreground/40 rounded border-dashed flex items-center justify-center cursor-pointer hover:bg-muted/30 transition-colors"
                  style={{ width: 200, height: 60 }}
                  onClick={() => signatureInputRef.current?.click()}
                  title="Click to upload signature"
                >
                  <span className="text-xs text-muted-foreground">
                    Click to upload
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => signatureInputRef.current?.click()}
                  className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors mt-0.5 self-start"
                  data-ocid="declaration.signature.upload_button"
                >
                  <Upload className="h-3 w-3" />
                  Upload Signature
                </button>
              </div>
            )}
            <span className="text-xs font-semibold text-foreground/70 mt-1">
              (DINESH KUMAR JANGIR)
            </span>
          </div>
        </div>

        {/* Inspection Date & Place */}
        <div className="mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            <div className="space-y-1">
              <Label htmlFor="inspectionDate" className="text-xs font-semibold">
                Inspection Date
              </Label>
              <div className="flex gap-2">
                <Input
                  id="inspectionDate"
                  type="date"
                  value={inspectionDate}
                  onChange={(e) => setInspectionDate(e.target.value)}
                  className="h-8 text-sm flex-1"
                  data-ocid="declaration.date.input"
                />
                <Input
                  id="inspectionTime"
                  type="time"
                  value={inspectionTime}
                  onChange={(e) => setInspectionTime(e.target.value)}
                  className="h-8 text-sm w-28"
                  data-ocid="declaration.time.input"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="inspectionPlace"
                className="text-xs font-semibold"
              >
                Inspection Place
              </Label>
              <Input
                id="inspectionPlace"
                value={inspectionPlace}
                onChange={(e) => setInspectionPlace(e.target.value)}
                placeholder="City / Location"
                className="h-8 text-sm"
                data-ocid="declaration.place.input"
              />
            </div>
          </div>
        </div>

        <div className="space-y-1 mb-4">
          <Label htmlFor="remarks" className="text-xs font-semibold">
            Remarks
          </Label>
          <Textarea
            id="remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            rows={2}
            className="text-sm"
            data-ocid="declaration.remarks.textarea"
          />
        </div>

        {/* Stamp Box */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold">Stamp</span>
          <div
            className="border border-foreground/40 rounded flex items-center justify-center"
            style={{ width: 150, height: 80 }}
          >
            <span className="text-xs text-muted-foreground">Stamp</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 flex-wrap">
        <Button
          type="submit"
          disabled={isPending}
          className="gap-2"
          data-ocid="form.submit_button"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {isPending ? "Saving..." : "Save Vehicle Record"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="gap-2"
          onClick={handlePrint}
          data-ocid="form.print_button"
        >
          <Printer className="h-4 w-4" />
          Print
        </Button>
        <Button
          type="button"
          variant="outline"
          className="gap-2"
          onClick={handleDownloadPDF}
          data-ocid="form.pdf_button"
        >
          <FileDown className="h-4 w-4" />
          Download PDF
        </Button>
      </div>
    </form>
  );
}
