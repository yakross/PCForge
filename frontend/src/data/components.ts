import { intelCPUs } from './intel-cpus';
import { amdCPUs } from './amd-cpus';
import { gpus } from './gpus';
import { ramModules } from './ram';
import { storageDevices } from './storage';
import { motherboards } from './motherboards';
import { psus } from './psus';
import { cases } from './cases';

export type Category = 'CPU' | 'GPU' | 'Motherboard' | 'RAM' | 'Storage' | 'PSU' | 'Case';

export interface Product {
  id: string;
  name: string;
  category: Category;
  priceUSD: number;
  image: string;
  specs: Record<string, string>;
  brand: string;
  performanceScore?: number;
  recommendation?: string;
}

export const componentsData: Product[] = [
  ...intelCPUs,
  ...amdCPUs,
  ...gpus,
  ...ramModules,
  ...storageDevices,
  ...motherboards,
  ...psus,
  ...cases
];
