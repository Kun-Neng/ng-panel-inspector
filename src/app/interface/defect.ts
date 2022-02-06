import { DEFECT_SOURCE } from "../defect-source";

export interface Defect {
  uuid: string;
  x: number;
  y: number;
  severity: number;
  isSelected: boolean;
  sourceFrom?: DEFECT_SOURCE;
}
