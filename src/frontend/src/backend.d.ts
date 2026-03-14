import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface VehicleCondition {
    headLight?: string;
    tailLamp?: string;
    switches?: string;
    bodyTypeScooter?: string;
    silencerCover?: string;
    forkBend?: string;
    horn?: string;
    remoteKeyWorking?: string;
    keys?: string;
    fuelTankCondition?: string;
    engineCondition?: string;
    silencer?: string;
    acceleratorCondition?: string;
    discBrakesRear?: string;
    rearShockAbsorber?: string;
    rearLHIndicator?: string;
    rearRHIndicator?: string;
    frontLHIndicator?: string;
    frontRHIndicator?: string;
    cubicCapacityCC?: string;
    brakesCondition?: string;
    rearBrakeLever?: string;
    discBrakesFront?: string;
    speedometerTachometer?: string;
    tyre2Life?: string;
    tailLight?: string;
    rearShockAbsorberType?: string;
    fuelTank?: string;
    mudGuardFront?: string;
    frontShockAbsorber?: string;
    gearShiftLever?: string;
    mainStand?: string;
    indicators?: string;
    frontScoop?: string;
    sideCovers?: string;
    handleBar?: string;
    paintCondition?: string;
    selfStart?: string;
    mudGuardRear?: string;
    battery?: string;
    alloyOrWheelRim?: string;
    speedometerPanel?: string;
    engineFunction?: string;
    fuelGauge?: string;
    radiator?: string;
    tyre1Life?: string;
    ignition?: string;
    sideStand?: string;
    clutchCondition?: string;
}
export interface TwoWheeler {
    engineNumber: string;
    model: string;
    vehicleType: VehicleType;
    ownerName: string;
    color: string;
    manufacturingYear: bigint;
    registrationNumber: string;
    odometer: bigint;
    vehicleCondition: VehicleCondition;
    fuelType: FuelType;
    notes: string;
    chassisNumber: string;
    contactNumber: string;
    brand: string;
    engineOrBatteryCapacity: bigint;
    variant?: string;
}
export enum FuelType {
    petrol = "petrol",
    electric = "electric"
}
export enum VehicleType {
    motorcycle = "motorcycle",
    bike = "bike",
    scooter = "scooter"
}
export interface backendInterface {
    addTwoWheeler(record: TwoWheeler): Promise<void>;
    getAllTwoWheelersByYear(): Promise<Array<TwoWheeler>>;
    getTwoWheeler(registrationNumber: string): Promise<TwoWheeler>;
    removeTwoWheeler(registrationNumber: string): Promise<void>;
    updateTwoWheeler(registrationNumber: string, updatedRecord: TwoWheeler): Promise<void>;
}
