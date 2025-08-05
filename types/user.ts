export interface User {
  id: string;
  phoneNumber: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  age?: number;
  isVerified: boolean;
  isRegistered: boolean;
  isPhoneNumberVerified: boolean;
  isOnline: boolean;
  profilePicture: string | null;
  drivingLicense: {
    front: string;
    back: string;
  } | null;
  aadhaar: {
    front: string;
    back: string;
  } | null;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  emergencyContact?: {
    name: string;
    phoneNumber: string;
    relationship: string;
  };
  bankDetails?: {
    accountHolderName: string | null;
    bankName: string | null;
    accountNumber: string | null;
    ifscCode: string | null;
    upiId?: string | null;
  };
  vehicleName: string | null;
  vehicleNumber: string | null;
  createdAt: string;
  updatedAt?: string;
}
