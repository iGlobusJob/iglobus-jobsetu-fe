export interface ClientContact {
  firstName: string;
  lastName: string;
}

export interface Client {
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
  primaryContact?: ClientContact;
  secondaryContact?: ClientContact;
  createdAt: string;
  updatedAt: string;
  logo: string;
  category: 'IT' | 'Non-IT ';
}
