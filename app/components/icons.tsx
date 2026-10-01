import { BatteryCharging, Cpu, EvCharger, Fan, SolarPanel, ThermometerSun, type LucideIcon } from "lucide-react";
import type { ServiceKey } from "../lib/content";

export const serviceIcons: Record<ServiceKey, LucideIcon> = {
  zonnepanelen: SolarPanel,
  thuisbatterij: BatteryCharging,
  omvormer: Cpu,
  laadpaal: EvCharger,
  pvt: ThermometerSun,
  warmtepomp: Fan,
};
