import { PortData } from './port-data';

export interface Machine {
  name: string;
  id: number;
  owner_id: number;
  ports: PortData[];
}
