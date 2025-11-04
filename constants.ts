import { type Service } from './types';

export const SERVICES: Service[] = [
  { id: 'consultation', name: 'Erstberatung', duration: 30 },
  { id: 'checkup', name: 'Routineuntersuchung', duration: 45 },
  { id: 'specialist', name: 'Spezialistensitzung', duration: 60 },
  { id: 'followup', name: 'Folgetermin', duration: 20 },
];