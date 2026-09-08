import type { MetadataRoute } from "next";
import { CLINIC } from "./site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${CLINIC.name} | Specialty Eye Care in Duluth, GA`,
    short_name: "Precision Vision",
    description:
      "Specialty eye care for keratoconus, severe dry eye, complex corneas, post-surgical vision, and progressive myopia in Duluth, Georgia.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fbfd",
    theme_color: "#082f4b",
    icons: [
      { src: "/icon.png", sizes: "256x256", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
