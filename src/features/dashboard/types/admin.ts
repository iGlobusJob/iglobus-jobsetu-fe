export interface ClientContact {
  firstName?: string;
  lastName?: string;
}

export interface AdminUpdateClient {
  clientId: string;
  organizationName?: string;
  logo: string;
  mobile?: string;
  location?: string;
  gstin?: string;
  panCard?: string;
  category?: string;
  primaryContact?: ClientContact;
  secondaryContact?: ClientContact;
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
