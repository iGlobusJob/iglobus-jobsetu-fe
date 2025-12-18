// Form values (frontend only)
export interface VendorRegisterValues {
  organizationName: string;
  primaryFirstName: string;
  primaryLastName: string;
  email: string;
  password: string;
  mobile: string;
  location: string;
  gstin: string;
  panCard: string;
  category: 'IT' | 'Non-IT';
  logoImage: File | null;
  termsAccepted: boolean;
}
// Payload sent to backend
export interface RegisterVendorPayload {
  organizationName: string;
  primaryContact: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
  mobile: string;
  location: string;
  gstin: string;
  panCard: string;
}

// Backend response
export interface VendorRegisterResponse {
  success: boolean;
  message: string;
}
