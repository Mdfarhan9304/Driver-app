import React, { createContext, useContext, useState } from 'react';
import { DocumentUploadResult } from '../../services/documentService';

type FormDataType = {
  firstName: string;
  lastName: string;
  email: string;
  vehicleName: string;
  vehicleNumber: string;
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  upiId: string;
  documents: {
    drivingLicense: DocumentUploadResult[];
    aadharCard: DocumentUploadResult[];
    profilePicture: DocumentUploadResult[];
  };
};

type ContextType = {
  formData: FormDataType;
  updateField: <K extends keyof FormDataType>(key: K, value: FormDataType[K]) => void;
};

const defaultContext: ContextType = {
  formData: {
    firstName: '',
    lastName: '',
    email: '',
    vehicleNumber: '',
    vehicleName: '',
    accountHolderName: '',
    bankName: '',
    ifscCode: '',
    accountNumber: '',
    upiId: '',
    documents: {
      drivingLicense: [],
      aadharCard: [],
      profilePicture: [],
    },
  },
  updateField: () => { },
};

const FormDataContext = createContext<ContextType>(defaultContext);

export const FormDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<FormDataType>(defaultContext.formData);

  const updateField: ContextType['updateField'] = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <FormDataContext.Provider value={{ formData, updateField }}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => useContext(FormDataContext);
