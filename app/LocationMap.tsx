type LocationMapProps = {
  className?: string;
};

export function LocationMap({ className }: LocationMapProps) {
  return (
    <div className={`location-map${className ? ` ${className}` : ""}`}>
      <iframe
        title="Map of our office location"
        src="https://www.google.com/maps?q=Precision%20Vision%20Institute%2C%203940%20Buford%20Hwy%20Ste%20A104%2C%20Duluth%2C%20GA%2030096&output=embed"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
