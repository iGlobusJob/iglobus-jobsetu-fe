export interface VendorContact {
  firstName: string;
  lastName: string;
}

export interface Vendor {
  id: string;
  organizationName: string;
  email: string;
  mobile: string;
  location: string;
  status: 'registered' | 'active' | 'inactive';
  emailStatus?: string;
  mobileStatus?: string;
  gstin?: string;
  panCard?: string;
  primaryContact?: VendorContact;
  secondaryContact?: VendorContact;
  createdAt: string;
  updatedAt: string;
  logo: string;
  category: 'IT' | 'Non-IT ';
}
