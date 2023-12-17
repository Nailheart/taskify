import localFont from "next/font/local";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const popins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const calSans = localFont({
  src: "./CalSans-SemiBold.woff2",
  weight: "500",
  variable: "--font-cal-sans",
});

export { inter, popins, calSans };
