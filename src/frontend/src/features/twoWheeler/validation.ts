interface FormData {
  vehicleType: string;
  brand: string;
  model: string;
  variant: string;
  registrationNumber: string;
  manufacturingYear: string;
  color: string;
  engineOrBatteryCapacity: string;
  fuelType: string;
  odometer: string;
  ownerName: string;
  contactNumber: string;
  notes: string;
  chassisNumber: string;
  engineNumber: string;
}

export function validateTwoWheelerForm(data: FormData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.vehicleType) errors.vehicleType = "Vehicle type is required";
  if (!data.brand.trim()) errors.brand = "Brand is required";
  if (!data.model.trim()) errors.model = "Model is required";
  if (!data.registrationNumber.trim())
    errors.registrationNumber = "Registration number is required";
  if (!data.color.trim()) errors.color = "Color is required";
  if (!data.fuelType) errors.fuelType = "Fuel type is required";
  if (!data.ownerName.trim()) errors.ownerName = "Owner name is required";
  if (!data.contactNumber.trim())
    errors.contactNumber = "Contact number is required";
  if (!data.chassisNumber.trim())
    errors.chassisNumber = "Chassis number is required";
  if (!data.engineNumber.trim())
    errors.engineNumber = "Engine number is required";

  if (!data.manufacturingYear) {
    errors.manufacturingYear = "Manufacturing year is required";
  } else {
    const year = Number.parseInt(data.manufacturingYear, 10);
    if (Number.isNaN(year)) {
      errors.manufacturingYear = "Manufacturing year must be a valid number";
    } else if (year < 1900 || year > new Date().getFullYear() + 1) {
      errors.manufacturingYear = `Manufacturing year must be between 1900 and ${new Date().getFullYear() + 1}`;
    }
  }

  if (!data.engineOrBatteryCapacity) {
    errors.engineOrBatteryCapacity = "Engine/Battery capacity is required";
  } else {
    const capacity = Number.parseInt(data.engineOrBatteryCapacity, 10);
    if (Number.isNaN(capacity) || capacity < 0) {
      errors.engineOrBatteryCapacity = "Capacity must be a non-negative number";
    }
  }

  if (!data.odometer) {
    errors.odometer = "Odometer reading is required";
  } else {
    const odometer = Number.parseInt(data.odometer, 10);
    if (Number.isNaN(odometer) || odometer < 0) {
      errors.odometer = "Odometer must be a non-negative number";
    }
  }

  return errors;
}
