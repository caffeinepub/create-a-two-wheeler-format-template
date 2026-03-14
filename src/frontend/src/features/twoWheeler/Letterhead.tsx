interface LetterheadProps {
  title?: string;
}

export function Letterhead({
  title = "Vehicle Inspection Report",
}: LetterheadProps) {
  return (
    <div className="letterhead border-b-2 border-primary pb-4 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        {/* Left: Name & Title */}
        <div>
          <h1
            className="font-display text-2xl font-bold tracking-wide text-primary"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            DINESH KUMAR JANGIR
          </h1>
          <p className="text-sm font-semibold text-foreground/80 mt-0.5">
            Surveyor &amp; Loss Assessor
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground mt-1">
            <span>
              Licence No.:{" "}
              <strong className="text-foreground">SLA-121529</strong>
            </span>
            <span>
              Validity: <strong className="text-foreground">26.01.2029</strong>
            </span>
          </div>
        </div>

        {/* Right: Contact */}
        <div className="text-xs text-right space-y-0.5">
          <p className="text-foreground font-medium">Mob. No.: 94132-24766</p>
          <p className="text-muted-foreground">
            10-RE-40, Tilak Nagar, Bhilwara (Raj.)
          </p>
          <p className="text-muted-foreground">dk24766@gmail.com</p>
        </div>
      </div>

      <div className="mt-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary/70 border border-primary/30 inline-block px-6 py-1">
          {title}
        </p>
      </div>
    </div>
  );
}
