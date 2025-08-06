export interface Medicine {
  id: number;
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

export interface MedicineRecord {
  id: number;
  tradeName: string;
  scientificName: string;
  typeId: number;
  formId: number;
  manufacturerId: number;
  categoryIds: number[];
  translations: MedicineTranslation[];
}

export interface SaleItemRecord {
  id: number,
  stockItemId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  discountType: string;
  subTotal: number;
}

export interface SaleRecord {
  id: number;
  customerId: number;
  customerName: string;
  invoiceDate: string;
  totalAmount: number;
  paymentType: string;
  paymentMethod: string;
  currency: string;
  discount: number;
  discountType: string;
  paidAmount: number;
  remainingAmount: number;
  status: string;
  items: SaleItemRecord[];
}