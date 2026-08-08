import Image from "next/image";
import type { ReactNode } from "react";

type OfficeExteriorProps = {
  className?: string;
  children?: ReactNode;
  priority?: boolean;
  sizes: string;
};

export function OfficeExterior({ className, children, priority = false, sizes }: OfficeExteriorProps) {
  return (
    <div className={`office-exterior${className ? ` ${className}` : ""}`}>
      <Image
        src="/precision-vision-exterior.png"
        alt="Precision Vision Institute's brick storefront with its white exterior sign at 3940 Buford Highway in Duluth"
        fill
        priority={priority}
        sizes={sizes}
      />
      {children}
    </div>
  );
}
