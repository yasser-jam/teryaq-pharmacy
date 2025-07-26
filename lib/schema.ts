import z from "zod";

const requiredString = () => {
    return z.string().trim().nonempty()
}

export const PHARMACY_SCHEMEA = z.object({
    pharmacyName: requiredString(),
    licenseNumber: requiredString(),
    phoneNumber: requiredString(),
    managerPassword: requiredString(),
})

export const MASTER_PRODUCT_SCHEMA = z.object({
  tradeName: z.string().min(1, 'Trade name is required'),
  scientificName: z.string().min(1, 'Scientific name is required'),
  concentration: z.string().optional(),
  size: z.string().optional(),
  refPurchasePrice: z.number().optional(),
  refSellingPrice: z.number().min(0, 'Price must be positive'),
  notes: z.string().optional(),
  tax: z.number().optional(),
  barcode: z.string().optional(),
  productType: z.enum(['MASTER', 'PHARMACY']),
  requiresPrescription: z.boolean(),
  type: z.string().optional(),
  form: z.string().optional(),
  manufacturer: z.string().min(1, 'Manufacturer is required'),
  categories: z.array(z.string()),
});

export const CATEGORY_SCHEMA = z.object({
  name: requiredString(),
});

export const TYPE_SCHEMA = z.object({
  name: requiredString(),
});

export const MANUFACTURER_SCHEMA = z.object({
  name: requiredString(),
});

export const EMPLOYEE_SCHEMA = z.object({
  id: z.number().optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  dateOfHire: z.string().min(1, 'Date of hire is required'),
  roleName: z.string().min(1, 'Role name is required'),
  pharmacyId: z.number().optional(),
  workingHours: z.array(
    z.object({
      dayOfWeek: z.enum(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']),
      shifts: z.array(
        z.object({
          startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
          endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
          description: z.string().optional(),
        })
      ),
    })
  ),
});

export type Employee = z.infer<typeof EMPLOYEE_SCHEMA>;

// Role and Permission Types
export interface Permission {
  id: number;
  name: string;
  description: string;
  resource: string;
  action: string;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
  active: boolean;
  systemGenerated: boolean;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
  active: boolean;
  system: boolean;
  systemGenerated: boolean;
}

// Schema for role creation/update
export const ROLE_SCHEMA = z.object({
  name: z.string().min(1, 'Role name is required'),
  description: z.string().min(1, 'Role description is required'),
  permissions: z.array(z.number()).min(1, 'At least one permission is required'),
  active: z.boolean().default(true),
});

export type RoleFormData = z.infer<typeof ROLE_SCHEMA>;