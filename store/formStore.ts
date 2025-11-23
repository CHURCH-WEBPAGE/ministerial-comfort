import { create } from 'zustand';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

interface RegistrationFormData {
  name: string;
  email: string;
  mobile: string;
  eventSlug?: string;
}

interface FormStore {
  // Contact form
  contactForm: ContactFormData;
  setContactForm: (data: Partial<ContactFormData>) => void;
  clearContactForm: () => void;
  
  // Registration form
  registrationForm: RegistrationFormData;
  setRegistrationForm: (data: Partial<RegistrationFormData>) => void;
  clearRegistrationForm: () => void;
}

const initialContactForm: ContactFormData = {
  firstName: '',
  lastName: '',
  email: '',
  message: '',
};

const initialRegistrationForm: RegistrationFormData = {
  name: '',
  email: '',
  mobile: '',
  eventSlug: '',
};

export const useFormStore = create<FormStore>((set) => ({
  contactForm: initialContactForm,
  setContactForm: (data) =>
    set((state) => ({
      contactForm: { ...state.contactForm, ...data },
    })),
  clearContactForm: () => set({ contactForm: initialContactForm }),

  registrationForm: initialRegistrationForm,
  setRegistrationForm: (data) =>
    set((state) => ({
      registrationForm: { ...state.registrationForm, ...data },
    })),
  clearRegistrationForm: () => set({ registrationForm: initialRegistrationForm }),
}));

