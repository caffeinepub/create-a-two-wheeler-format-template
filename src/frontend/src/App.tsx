import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bike, Car, Truck } from "lucide-react";
import { useState } from "react";
import { CarInspectionForm } from "./features/twoWheeler/CarInspectionForm";
import { InspectionForm } from "./features/twoWheeler/InspectionForm";
import { Letterhead } from "./features/twoWheeler/Letterhead";
import { PickupInspectionForm } from "./features/twoWheeler/PickupInspectionForm";
import { RecordsList } from "./features/twoWheeler/RecordsList";
import { TruckTrailerInspectionForm } from "./features/twoWheeler/TruckTrailerInspectionForm";

function App() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);
  const [activeTab, setActiveTab] = useState("car");

  const title =
    activeTab === "car"
      ? "Car Pre-Inspection Report"
      : activeTab === "pickup"
        ? "Pick-Up Pre-Inspection Report"
        : activeTab === "truck"
          ? "Truck / Trailer Pre-Inspection Report"
          : "Two-Wheeler Inspection Report";

  return (
    <div className="min-h-screen bg-background">
      {/* Screen-only nav bar */}
      <div className="no-print bg-primary text-primary-foreground py-2 px-6 flex items-center justify-between">
        <span className="text-xs font-semibold tracking-widest uppercase">
          Vehicle Inspector
        </span>
        <span className="text-xs opacity-70">
          Surveyor &amp; Loss Assessor Portal
        </span>
      </div>

      {/* Main content - print container */}
      <main className="print-container mx-auto max-w-5xl px-4 sm:px-8 py-6">
        {/* Letterhead */}
        <Letterhead title={title} />

        {/* Tabs for form selection */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="no-print"
        >
          <TabsList className="mb-6 w-full sm:w-auto">
            <TabsTrigger
              value="two-wheeler"
              className="flex items-center gap-2"
              data-ocid="form.two_wheeler.tab"
            >
              <Bike className="h-4 w-4" />
              Two-Wheeler
            </TabsTrigger>
            <TabsTrigger
              value="car"
              className="flex items-center gap-2"
              data-ocid="form.car.tab"
            >
              <Car className="h-4 w-4" />
              Car
            </TabsTrigger>
            <TabsTrigger
              value="pickup"
              className="flex items-center gap-2"
              data-ocid="form.pickup.tab"
            >
              <Truck className="h-4 w-4" />
              Pick-Up
            </TabsTrigger>
            <TabsTrigger
              value="truck"
              className="flex items-center gap-2"
              data-ocid="form.truck.tab"
            >
              <Truck className="h-4 w-4" />
              Truck / Trailer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="two-wheeler">
            <InspectionForm />
          </TabsContent>

          <TabsContent value="car">
            <CarInspectionForm />
          </TabsContent>

          <TabsContent value="pickup">
            <PickupInspectionForm />
          </TabsContent>

          <TabsContent value="truck">
            <TruckTrailerInspectionForm />
          </TabsContent>
        </Tabs>

        {/* Saved Records - hidden during print */}
        <section className="no-print mt-10">
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary border-b border-primary/40 pb-1 mb-4">
            Saved Vehicle Records
          </h2>
          <RecordsList />
        </section>
      </main>

      {/* Footer */}
      <footer className="no-print mt-10 border-t border-border bg-card py-4">
        <p className="text-center text-xs text-muted-foreground">
          © {year}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>

      <Toaster position="top-right" />
    </div>
  );
}

export default App;
