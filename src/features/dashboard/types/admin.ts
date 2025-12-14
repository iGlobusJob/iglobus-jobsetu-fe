export interface VendorContact {
  firstName?: string;
  lastName?: string;
}

export interface AdminUpdateVendor {
  vendorId: string;
  organizationName?: string;
  logo: string;
  mobile?: string;
  location?: string;
  gstin?: string;
  panCard?: string;
  category?: string;
  primaryContact?: VendorContact;
  secondaryContact?: VendorContact;
  status?: 'registered' | 'active' | 'inactive';
}

export interface CreateAdminInput {
  username: string;
  password: string;
  role: 'admin';
}

export interface CreateRecruiterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
