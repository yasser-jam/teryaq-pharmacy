export interface Medicine {
  tradeName: string;
  scientificName: string;
  concentration?: string;
  size: string;
  notes?: string;
  tax?: number;
  barcodes: string[];
  requiresPrescription: boolean;
  typeId?: number;
  formId?: number;
  manufacturerId?: number;
  categoryIds?: number[];
  translations?: MedicineTranslation[];
}

export interface MedicineTranslation {
  tradeName: string;
  scientificName: string;
  languageCode: string;
}

export interface Manufacturer {
  id: number
  name: string
}

export interface Type {
  id: number;
  name: string;
}

export interface Form {
  id: number;
  name: string;
}