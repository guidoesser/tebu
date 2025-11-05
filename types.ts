export interface BookingData {
  fullName: string;
  email: string;
  service: string;
  date: string;
  time: string;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  service?: string;
  date?: string;
  time?: string;
}