import { create } from 'zustand';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  note: string;
}

interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  note: string;
  eventSlug?: string;
}

interface FormStore {
  contactForm: ContactFormData;
  setContactForm: (data: Partial<ContactFormData>) => void;
  clearContactForm: () => void;

  registrationForm: RegistrationFormData;
  setRegistrationForm: (data: Partial<RegistrationFormData>) => void;
  clearRegistrationForm: () => void;
}

const initialContactForm: ContactFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  note: '',
};

const initialRegistrationForm: RegistrationFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  note: '',
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
