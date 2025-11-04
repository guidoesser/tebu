export interface Service {
  id: string;
  name: string;
  duration: number; // in minutes
}

export interface BookingData {
  name: string;
  email: string;
  serviceId: string;
  date: string;
  time: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  serviceId?: string;
  date?: string;
  time?: string;
}
