// Form values (frontend only)
export interface ClientRegisterValues {
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
  isTermsAndConditionsAgreed: boolean;
}
// Payload sent to backend
export interface RegisterClientPayload {
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
  isTermsAndConditionsAgreed: boolean;
}

// Backend response
export interface ClientRegisterResponse {
  success: boolean;
  message: string;
}
