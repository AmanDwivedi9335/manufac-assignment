export interface WineDataItem {
    Alcohol: number;
    "Malic Acid": number;
    Ash: number;
    "Alcalinity of ash": number;
    Magnesium: number;
    "Total phenols": number;
    Flavanoids: number | string; // Allow for both number and string
    "Nonflavanoid phenols": number | string; // Allow for both number and string
    Proanthocyanins: number | string; // Allow for both number and string
    "Color intensity": number | string; // Allow for both number and string
    Hue: number;
    "OD280/OD315 of diluted wines": number | string; // Allow for both number and string
    Unknown: number;
  }