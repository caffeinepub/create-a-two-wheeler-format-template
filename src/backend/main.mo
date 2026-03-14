import Map "mo:core/Map";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";

actor {
  type VehicleType = {
    #motorcycle;
    #scooter;
    #bike;
  };

  type FuelType = {
    #petrol;
    #electric;
  };

  type VehicleCondition = {
    discBrakesFront : ?Text;
    discBrakesRear : ?Text;
    radiator : ?Text;
    silencer : ?Text;
    silencerCover : ?Text;
    bodyTypeScooter : ?Text;
    forkBend : ?Text;
    tyre1Life : ?Text;
    tyre2Life : ?Text;
    frontScoop : ?Text;
    speedometerPanel : ?Text;
    handleBar : ?Text;
    indicators : ?Text;
    fuelTank : ?Text;
    fuelTankCondition : ?Text;
    paintCondition : ?Text;
    sideCovers : ?Text;
    mudGuardFront : ?Text;
    mudGuardRear : ?Text;
    tailLamp : ?Text;
    mainStand : ?Text;
    sideStand : ?Text;
    alloyOrWheelRim : ?Text;
    frontShockAbsorber : ?Text;
    rearShockAbsorberType : ?Text;
    rearShockAbsorber : ?Text;
    tailLight : ?Text;
    horn : ?Text;
    frontRHIndicator : ?Text;
    frontLHIndicator : ?Text;
    rearRHIndicator : ?Text;
    rearLHIndicator : ?Text;
    battery : ?Text;
    ignition : ?Text;
    fuelGauge : ?Text;
    speedometerTachometer : ?Text;
    selfStart : ?Text;
    headLight : ?Text;
    keys : ?Text;
    remoteKeyWorking : ?Text;
    switches : ?Text;
    engineCondition : ?Text;
    acceleratorCondition : ?Text;
    brakesCondition : ?Text;
    engineFunction : ?Text;
    clutchCondition : ?Text;
    gearShiftLever : ?Text;
    rearBrakeLever : ?Text;
    cubicCapacityCC : ?Text;
  };

  type TwoWheeler = {
    vehicleType : VehicleType;
    brand : Text;
    model : Text;
    variant : ?Text;
    color : Text;
    registrationNumber : Text;
    chassisNumber : Text;
    engineNumber : Text;
    manufacturingYear : Nat;
    engineOrBatteryCapacity : Nat;
    fuelType : FuelType;
    odometer : Nat;
    ownerName : Text;
    contactNumber : Text;
    notes : Text;
    vehicleCondition : VehicleCondition;
  };

  let twoWheelerRecords = Map.empty<Text, TwoWheeler>();

  func compareByYear(a : TwoWheeler, b : TwoWheeler) : Order.Order {
    Nat.compare(a.manufacturingYear, b.manufacturingYear);
  };

  public shared func addTwoWheeler(record : TwoWheeler) : async () {
    if (twoWheelerRecords.containsKey(record.registrationNumber)) {
      Runtime.trap("A two-wheeler with this registration number already exists.");
    };
    twoWheelerRecords.add(record.registrationNumber, record);
  };

  public query func getTwoWheeler(registrationNumber : Text) : async TwoWheeler {
    switch (twoWheelerRecords.get(registrationNumber)) {
      case (null) { Runtime.trap("No record found for given registration number") };
      case (?record) { record };
    };
  };

  public query func getAllTwoWheelersByYear() : async [TwoWheeler] {
    twoWheelerRecords.values().toArray().sort(compareByYear);
  };

  public shared func updateTwoWheeler(registrationNumber : Text, updatedRecord : TwoWheeler) : async () {
    if (not twoWheelerRecords.containsKey(registrationNumber)) {
      Runtime.trap("No record found for given registration number");
    };
    twoWheelerRecords.add(registrationNumber, updatedRecord);
  };

  public shared func removeTwoWheeler(registrationNumber : Text) : async () {
    if (not twoWheelerRecords.containsKey(registrationNumber)) {
      Runtime.trap("No record found for given registration number");
    };
    twoWheelerRecords.remove(registrationNumber);
  };
};
