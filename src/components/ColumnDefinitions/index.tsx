export interface Data {
  symbol: string;
  sector: string;
  securityType: string;
  lastUpdated: number;
  lastSalePrice: number;
}

export interface Column {
  id: keyof Data;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

export const columns: readonly Column[] = [
  { id: "symbol", label: "Symbol", minWidth: 100 },
  { id: "lastSalePrice", label: "Last Sale Price", minWidth: 170 },
  { id: "lastUpdated", label: "Last Updated", minWidth: 170 },
  { id: "sector", label: "Sector", minWidth: 170 },
  { id: "securityType", label: "Security Type", minWidth: 170 },
];
