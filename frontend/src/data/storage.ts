import { Product } from "./components";

const STORAGE_IMAGE = '/storage-drive.png';

const st = (
  id: string, name: string, brand: string, price: number,
  score: number, rec: string,
  capacity: string, type: string, formFactor: string, read: string, write: string, iface: string
): Product => ({
  id, name, category: 'Storage', priceUSD: price, image: STORAGE_IMAGE, brand,
  performanceScore: score, recommendation: rec,
  specs: { Capacity: capacity, Type: type, FormFactor: formFactor, ReadSpeed: read, WriteSpeed: write, Interface: iface }
});

export const storageDevices: Product[] = [
  // ==========================================================
  // NVMe M.2 PCIe 5.0 — Ultra Premium
  // ==========================================================
  st('st-sam-990evo-4t', 'Samsung 990 EVO Plus 4TB', 'Samsung', 349.99, 98, 'Tope de Gama', '4TB', 'NVMe SSD', 'M.2 2280', '7250 MB/s', '6300 MB/s', 'PCIe 5.0 x4'),
  st('st-sam-990pro-4t', 'Samsung 990 PRO 4TB', 'Samsung', 319.99, 96, 'Tope de Gama', '4TB', 'NVMe SSD', 'M.2 2280', '7450 MB/s', '6900 MB/s', 'PCIe 4.0 x4'),
  st('st-sam-990pro-2t', 'Samsung 990 PRO 2TB', 'Samsung', 169.99, 94, 'Tope de Gama', '2TB', 'NVMe SSD', 'M.2 2280', '7450 MB/s', '6900 MB/s', 'PCIe 4.0 x4'),
  st('st-sam-990pro-1t', 'Samsung 990 PRO 1TB', 'Samsung', 109.99, 92, 'Tope de Gama', '1TB', 'NVMe SSD', 'M.2 2280', '7450 MB/s', '6900 MB/s', 'PCIe 4.0 x4'),

  st('st-wd-sn850x-4t', 'WD Black SN850X 4TB', 'Western Digital', 299.99, 96, 'Tope de Gama', '4TB', 'NVMe SSD', 'M.2 2280', '7300 MB/s', '6600 MB/s', 'PCIe 4.0 x4'),
  st('st-wd-sn850x-2t', 'WD Black SN850X 2TB', 'Western Digital', 149.99, 94, 'Tope de Gama', '2TB', 'NVMe SSD', 'M.2 2280', '7300 MB/s', '6600 MB/s', 'PCIe 4.0 x4'),
  st('st-wd-sn850x-1t', 'WD Black SN850X 1TB', 'Western Digital', 89.99, 92, 'Tope de Gama', '1TB', 'NVMe SSD', 'M.2 2280', '7300 MB/s', '6300 MB/s', 'PCIe 4.0 x4'),

  st('st-sea-fir-530-4t', 'Seagate FireCuda 530 4TB', 'Seagate', 329.99, 95, 'Tope de Gama', '4TB', 'NVMe SSD', 'M.2 2280', '7300 MB/s', '6900 MB/s', 'PCIe 4.0 x4'),
  st('st-sea-fir-530-2t', 'Seagate FireCuda 530 2TB', 'Seagate', 179.99, 93, 'Tope de Gama', '2TB', 'NVMe SSD', 'M.2 2280', '7300 MB/s', '6900 MB/s', 'PCIe 4.0 x4'),
  st('st-sea-fir-530-1t', 'Seagate FireCuda 530 1TB', 'Seagate', 109.99, 91, 'Tope de Gama', '1TB', 'NVMe SSD', 'M.2 2280', '7300 MB/s', '6000 MB/s', 'PCIe 4.0 x4'),

  st('st-cru-t700-4t', 'Crucial T700 4TB', 'Crucial', 399.99, 99, 'Tope de Gama', '4TB', 'NVMe SSD', 'M.2 2280', '12400 MB/s', '11800 MB/s', 'PCIe 5.0 x4'),
  st('st-cru-t700-2t', 'Crucial T700 2TB', 'Crucial', 229.99, 98, 'Tope de Gama', '2TB', 'NVMe SSD', 'M.2 2280', '12400 MB/s', '11800 MB/s', 'PCIe 5.0 x4'),
  st('st-cru-t700-1t', 'Crucial T700 1TB', 'Crucial', 149.99, 96, 'Tope de Gama', '1TB', 'NVMe SSD', 'M.2 2280', '11700 MB/s', '9500 MB/s', 'PCIe 5.0 x4'),

  st('st-cors-mp700p-2t', 'Corsair MP700 PRO 2TB', 'Corsair', 249.99, 97, 'Tope de Gama', '2TB', 'NVMe SSD', 'M.2 2280', '12400 MB/s', '11800 MB/s', 'PCIe 5.0 x4'),
  st('st-cors-mp700p-1t', 'Corsair MP700 PRO 1TB', 'Corsair', 159.99, 95, 'Tope de Gama', '1TB', 'NVMe SSD', 'M.2 2280', '11700 MB/s', '9600 MB/s', 'PCIe 5.0 x4'),

  // ==========================================================
  // NVMe M.2 PCIe 4.0 — High Performance
  // ==========================================================
  st('st-sam-980pro-2t', 'Samsung 980 PRO 2TB', 'Samsung', 129.99, 85, 'Excelente Rendimiento', '2TB', 'NVMe SSD', 'M.2 2280', '7000 MB/s', '5100 MB/s', 'PCIe 4.0 x4'),
  st('st-sam-980pro-1t', 'Samsung 980 PRO 1TB', 'Samsung', 79.99, 82, 'Excelente Rendimiento', '1TB', 'NVMe SSD', 'M.2 2280', '7000 MB/s', '5000 MB/s', 'PCIe 4.0 x4'),

  st('st-cru-p5plus-2t', 'Crucial P5 Plus 2TB', 'Crucial', 119.99, 82, 'Excelente Rendimiento', '2TB', 'NVMe SSD', 'M.2 2280', '6600 MB/s', '5000 MB/s', 'PCIe 4.0 x4'),
  st('st-cru-p5plus-1t', 'Crucial P5 Plus 1TB', 'Crucial', 69.99, 80, 'Excelente Rendimiento', '1TB', 'NVMe SSD', 'M.2 2280', '6600 MB/s', '5000 MB/s', 'PCIe 4.0 x4'),

  st('st-king-fury-2t', 'Kingston FURY Renegade 2TB', 'Kingston', 139.99, 88, 'Excelente Rendimiento', '2TB', 'NVMe SSD', 'M.2 2280', '7300 MB/s', '7000 MB/s', 'PCIe 4.0 x4'),
  st('st-king-fury-1t', 'Kingston FURY Renegade 1TB', 'Kingston', 84.99, 85, 'Excelente Rendimiento', '1TB', 'NVMe SSD', 'M.2 2280', '7300 MB/s', '6000 MB/s', 'PCIe 4.0 x4'),

  st('st-sk-p41-2t', 'SK hynix Platinum P41 2TB', 'SK hynix', 139.99, 88, 'Excelente Rendimiento', '2TB', 'NVMe SSD', 'M.2 2280', '7000 MB/s', '6500 MB/s', 'PCIe 4.0 x4'),
  st('st-sk-p41-1t', 'SK hynix Platinum P41 1TB', 'SK hynix', 79.99, 85, 'Excelente Rendimiento', '1TB', 'NVMe SSD', 'M.2 2280', '7000 MB/s', '6500 MB/s', 'PCIe 4.0 x4'),

  // ==========================================================
  // NVMe M.2 PCIe 3.0 / Budget NVMe
  // ==========================================================
  st('st-sam-970evo-2t', 'Samsung 970 EVO Plus 2TB', 'Samsung', 99.99, 68, 'Muy recomendado', '2TB', 'NVMe SSD', 'M.2 2280', '3500 MB/s', '3300 MB/s', 'PCIe 3.0 x4'),
  st('st-sam-970evo-1t', 'Samsung 970 EVO Plus 1TB', 'Samsung', 59.99, 65, 'Muy recomendado', '1TB', 'NVMe SSD', 'M.2 2280', '3500 MB/s', '3300 MB/s', 'PCIe 3.0 x4'),
  st('st-sam-970evo-500', 'Samsung 970 EVO Plus 500GB', 'Samsung', 39.99, 58, 'Aún vigente', '500GB', 'NVMe SSD', 'M.2 2280', '3500 MB/s', '3200 MB/s', 'PCIe 3.0 x4'),

  st('st-wd-sn770-2t', 'WD Black SN770 2TB', 'Western Digital', 99.99, 72, 'Muy recomendado', '2TB', 'NVMe SSD', 'M.2 2280', '5150 MB/s', '4850 MB/s', 'PCIe 4.0 x4'),
  st('st-wd-sn770-1t', 'WD Black SN770 1TB', 'Western Digital', 54.99, 70, 'Muy recomendado', '1TB', 'NVMe SSD', 'M.2 2280', '5150 MB/s', '4900 MB/s', 'PCIe 4.0 x4'),
  st('st-wd-sn770-500', 'WD Black SN770 500GB', 'Western Digital', 34.99, 62, 'Aún vigente', '500GB', 'NVMe SSD', 'M.2 2280', '5000 MB/s', '4000 MB/s', 'PCIe 4.0 x4'),

  st('st-king-nv2-2t', 'Kingston NV2 2TB', 'Kingston', 79.99, 60, 'Mejor Calidad/Precio', '2TB', 'NVMe SSD', 'M.2 2280', '3500 MB/s', '2800 MB/s', 'PCIe 4.0 x4'),
  st('st-king-nv2-1t', 'Kingston NV2 1TB', 'Kingston', 44.99, 55, 'Mejor Calidad/Precio', '1TB', 'NVMe SSD', 'M.2 2280', '3500 MB/s', '2100 MB/s', 'PCIe 4.0 x4'),
  st('st-king-nv2-500', 'Kingston NV2 500GB', 'Kingston', 27.99, 48, 'Mejor Calidad/Precio', '500GB', 'NVMe SSD', 'M.2 2280', '3500 MB/s', '2100 MB/s', 'PCIe 4.0 x4'),
  st('st-king-nv2-250', 'Kingston NV2 250GB', 'Kingston', 19.99, 35, 'Uso Básico', '250GB', 'NVMe SSD', 'M.2 2280', '3000 MB/s', '1300 MB/s', 'PCIe 4.0 x4'),

  st('st-cru-p3plus-2t', 'Crucial P3 Plus 2TB', 'Crucial', 89.99, 62, 'Mejor Calidad/Precio', '2TB', 'NVMe SSD', 'M.2 2280', '5000 MB/s', '4200 MB/s', 'PCIe 4.0 x4'),
  st('st-cru-p3plus-1t', 'Crucial P3 Plus 1TB', 'Crucial', 49.99, 58, 'Mejor Calidad/Precio', '1TB', 'NVMe SSD', 'M.2 2280', '5000 MB/s', '3600 MB/s', 'PCIe 4.0 x4'),
  st('st-cru-p3plus-500', 'Crucial P3 Plus 500GB', 'Crucial', 29.99, 50, 'Mejor Calidad/Precio', '500GB', 'NVMe SSD', 'M.2 2280', '4700 MB/s', '1900 MB/s', 'PCIe 4.0 x4'),

  st('st-tg-mp44l-2t', 'TeamGroup MP44L 2TB', 'TeamGroup', 79.99, 60, 'Mejor Calidad/Precio', '2TB', 'NVMe SSD', 'M.2 2280', '5000 MB/s', '4500 MB/s', 'PCIe 4.0 x4'),
  st('st-tg-mp44l-1t', 'TeamGroup MP44L 1TB', 'TeamGroup', 44.99, 55, 'Mejor Calidad/Precio', '1TB', 'NVMe SSD', 'M.2 2280', '5000 MB/s', '4500 MB/s', 'PCIe 4.0 x4'),

  st('st-lex-nm790-2t', 'Lexar NM790 2TB', 'Lexar', 99.99, 72, 'Muy recomendado', '2TB', 'NVMe SSD', 'M.2 2280', '7400 MB/s', '6500 MB/s', 'PCIe 4.0 x4'),
  st('st-lex-nm790-1t', 'Lexar NM790 1TB', 'Lexar', 54.99, 68, 'Muy recomendado', '1TB', 'NVMe SSD', 'M.2 2280', '7400 MB/s', '6500 MB/s', 'PCIe 4.0 x4'),

  // ==========================================================
  // SATA SSD 2.5" — Mainstream
  // ==========================================================
  st('st-sam-870evo-4t', 'Samsung 870 EVO 4TB', 'Samsung', 249.99, 55, 'Aún vigente', '4TB', 'SATA SSD', '2.5"', '560 MB/s', '530 MB/s', 'SATA III'),
  st('st-sam-870evo-2t', 'Samsung 870 EVO 2TB', 'Samsung', 129.99, 52, 'Aún vigente', '2TB', 'SATA SSD', '2.5"', '560 MB/s', '530 MB/s', 'SATA III'),
  st('st-sam-870evo-1t', 'Samsung 870 EVO 1TB', 'Samsung', 69.99, 48, 'Aún vigente', '1TB', 'SATA SSD', '2.5"', '560 MB/s', '530 MB/s', 'SATA III'),
  st('st-sam-870evo-500', 'Samsung 870 EVO 500GB', 'Samsung', 39.99, 42, 'Aún vigente', '500GB', 'SATA SSD', '2.5"', '560 MB/s', '530 MB/s', 'SATA III'),
  st('st-sam-870evo-250', 'Samsung 870 EVO 250GB', 'Samsung', 24.99, 35, 'Próximo a actualizar', '250GB', 'SATA SSD', '2.5"', '560 MB/s', '530 MB/s', 'SATA III'),

  st('st-cru-mx500-4t', 'Crucial MX500 4TB', 'Crucial', 229.99, 50, 'Aún vigente', '4TB', 'SATA SSD', '2.5"', '560 MB/s', '510 MB/s', 'SATA III'),
  st('st-cru-mx500-2t', 'Crucial MX500 2TB', 'Crucial', 109.99, 48, 'Aún vigente', '2TB', 'SATA SSD', '2.5"', '560 MB/s', '510 MB/s', 'SATA III'),
  st('st-cru-mx500-1t', 'Crucial MX500 1TB', 'Crucial', 59.99, 45, 'Aún vigente', '1TB', 'SATA SSD', '2.5"', '560 MB/s', '510 MB/s', 'SATA III'),
  st('st-cru-mx500-500', 'Crucial MX500 500GB', 'Crucial', 34.99, 40, 'Próximo a actualizar', '500GB', 'SATA SSD', '2.5"', '560 MB/s', '510 MB/s', 'SATA III'),

  st('st-wd-blue-sa510-2t', 'WD Blue SA510 2TB', 'Western Digital', 109.99, 48, 'Aún vigente', '2TB', 'SATA SSD', '2.5"', '560 MB/s', '520 MB/s', 'SATA III'),
  st('st-wd-blue-sa510-1t', 'WD Blue SA510 1TB', 'Western Digital', 54.99, 45, 'Aún vigente', '1TB', 'SATA SSD', '2.5"', '560 MB/s', '520 MB/s', 'SATA III'),
  st('st-wd-blue-sa510-500', 'WD Blue SA510 500GB', 'Western Digital', 29.99, 38, 'Próximo a actualizar', '500GB', 'SATA SSD', '2.5"', '560 MB/s', '510 MB/s', 'SATA III'),

  st('st-king-a400-960', 'Kingston A400 960GB', 'Kingston', 44.99, 38, 'Próximo a actualizar', '960GB', 'SATA SSD', '2.5"', '500 MB/s', '450 MB/s', 'SATA III'),
  st('st-king-a400-480', 'Kingston A400 480GB', 'Kingston', 24.99, 32, 'Próximo a actualizar', '480GB', 'SATA SSD', '2.5"', '500 MB/s', '450 MB/s', 'SATA III'),
  st('st-king-a400-240', 'Kingston A400 240GB', 'Kingston', 14.99, 22, 'Uso Básico', '240GB', 'SATA SSD', '2.5"', '500 MB/s', '350 MB/s', 'SATA III'),
  st('st-king-a400-120', 'Kingston A400 120GB', 'Kingston', 9.99, 12, 'Uso Básico', '120GB', 'SATA SSD', '2.5"', '500 MB/s', '320 MB/s', 'SATA III'),

  st('st-tg-cx2-2t', 'TeamGroup CX2 2TB', 'TeamGroup', 79.99, 42, 'Aún vigente', '2TB', 'SATA SSD', '2.5"', '540 MB/s', '490 MB/s', 'SATA III'),
  st('st-tg-cx2-1t', 'TeamGroup CX2 1TB', 'TeamGroup', 44.99, 38, 'Próximo a actualizar', '1TB', 'SATA SSD', '2.5"', '540 MB/s', '490 MB/s', 'SATA III'),

  // ==========================================================
  // HDD — Hard Disk Drives
  // ==========================================================
  st('st-sea-bar-8t', 'Seagate Barracuda 8TB', 'Seagate', 129.99, 35, 'Almacenamiento Masivo', '8TB', 'HDD', '3.5"', '190 MB/s', '190 MB/s', 'SATA III'),
  st('st-sea-bar-4t', 'Seagate Barracuda 4TB', 'Seagate', 79.99, 30, 'Almacenamiento Masivo', '4TB', 'HDD', '3.5"', '190 MB/s', '190 MB/s', 'SATA III'),
  st('st-sea-bar-2t', 'Seagate Barracuda 2TB', 'Seagate', 54.99, 25, 'Almacenamiento Masivo', '2TB', 'HDD', '3.5"', '190 MB/s', '190 MB/s', 'SATA III'),
  st('st-sea-bar-1t', 'Seagate Barracuda 1TB', 'Seagate', 39.99, 20, 'Uso Básico', '1TB', 'HDD', '3.5"', '190 MB/s', '190 MB/s', 'SATA III'),

  st('st-sea-iron-20t', 'Seagate IronWolf Pro 20TB', 'Seagate', 449.99, 50, 'Tope de Gama', '20TB', 'HDD', '3.5"', '272 MB/s', '272 MB/s', 'SATA III'),
  st('st-sea-iron-12t', 'Seagate IronWolf Pro 12TB', 'Seagate', 279.99, 45, 'Almacenamiento Masivo', '12TB', 'HDD', '3.5"', '250 MB/s', '250 MB/s', 'SATA III'),
  st('st-sea-iron-8t', 'Seagate IronWolf 8TB', 'Seagate', 189.99, 40, 'Almacenamiento Masivo', '8TB', 'HDD', '3.5"', '210 MB/s', '210 MB/s', 'SATA III'),
  st('st-sea-iron-4t', 'Seagate IronWolf 4TB', 'Seagate', 99.99, 32, 'Almacenamiento Masivo', '4TB', 'HDD', '3.5"', '180 MB/s', '180 MB/s', 'SATA III'),

  st('st-wd-blk-6t', 'WD Black 6TB', 'Western Digital', 179.99, 38, 'Almacenamiento Masivo', '6TB', 'HDD', '3.5"', '227 MB/s', '227 MB/s', 'SATA III'),
  st('st-wd-blk-4t', 'WD Black 4TB', 'Western Digital', 119.99, 35, 'Almacenamiento Masivo', '4TB', 'HDD', '3.5"', '227 MB/s', '227 MB/s', 'SATA III'),
  st('st-wd-blk-2t', 'WD Black 2TB', 'Western Digital', 79.99, 28, 'Almacenamiento Masivo', '2TB', 'HDD', '3.5"', '164 MB/s', '164 MB/s', 'SATA III'),
  st('st-wd-blk-1t', 'WD Black 1TB', 'Western Digital', 54.99, 22, 'Uso Básico', '1TB', 'HDD', '3.5"', '164 MB/s', '164 MB/s', 'SATA III'),

  st('st-wd-blue-4t', 'WD Blue 4TB', 'Western Digital', 69.99, 30, 'Almacenamiento Masivo', '4TB', 'HDD', '3.5"', '175 MB/s', '175 MB/s', 'SATA III'),
  st('st-wd-blue-2t', 'WD Blue 2TB', 'Western Digital', 49.99, 25, 'Almacenamiento Masivo', '2TB', 'HDD', '3.5"', '175 MB/s', '175 MB/s', 'SATA III'),
  st('st-wd-blue-1t', 'WD Blue 1TB', 'Western Digital', 34.99, 18, 'Uso Básico', '1TB', 'HDD', '3.5"', '175 MB/s', '175 MB/s', 'SATA III'),

  st('st-wd-red-8t', 'WD Red Plus 8TB', 'Western Digital', 189.99, 42, 'Almacenamiento Masivo', '8TB', 'HDD', '3.5"', '215 MB/s', '215 MB/s', 'SATA III'),
  st('st-wd-red-6t', 'WD Red Plus 6TB', 'Western Digital', 139.99, 38, 'Almacenamiento Masivo', '6TB', 'HDD', '3.5"', '185 MB/s', '185 MB/s', 'SATA III'),
  st('st-wd-red-4t', 'WD Red Plus 4TB', 'Western Digital', 99.99, 32, 'Almacenamiento Masivo', '4TB', 'HDD', '3.5"', '185 MB/s', '185 MB/s', 'SATA III'),

  st('st-tosh-p300-4t', 'Toshiba P300 4TB', 'Toshiba', 74.99, 28, 'Almacenamiento Masivo', '4TB', 'HDD', '3.5"', '190 MB/s', '190 MB/s', 'SATA III'),
  st('st-tosh-p300-2t', 'Toshiba P300 2TB', 'Toshiba', 49.99, 22, 'Uso Básico', '2TB', 'HDD', '3.5"', '190 MB/s', '190 MB/s', 'SATA III'),
  st('st-tosh-p300-1t', 'Toshiba P300 1TB', 'Toshiba', 34.99, 18, 'Uso Básico', '1TB', 'HDD', '3.5"', '190 MB/s', '190 MB/s', 'SATA III'),

  // ==========================================================
  // ADATA
  // ==========================================================
  st('st-adata-leg960-2t', 'ADATA Legend 960 MAX 2TB', 'ADATA', 149.99, 90, 'Excelente Rendimiento', '2TB', 'NVMe SSD', 'M.2 2280', '7400 MB/s', '6800 MB/s', 'PCIe 4.0 x4'),
  st('st-adata-leg960-1t', 'ADATA Legend 960 MAX 1TB', 'ADATA', 84.99, 85, 'Excelente Rendimiento', '1TB', 'NVMe SSD', 'M.2 2280', '7400 MB/s', '6000 MB/s', 'PCIe 4.0 x4'),
  st('st-adata-leg850-2t', 'ADATA Legend 850 Lite 2TB', 'ADATA', 99.99, 72, 'Muy recomendado', '2TB', 'NVMe SSD', 'M.2 2280', '5000 MB/s', '4200 MB/s', 'PCIe 4.0 x4'),
  st('st-adata-leg850-1t', 'ADATA Legend 850 Lite 1TB', 'ADATA', 54.99, 68, 'Muy recomendado', '1TB', 'NVMe SSD', 'M.2 2280', '5000 MB/s', '4200 MB/s', 'PCIe 4.0 x4'),
  st('st-adata-leg710-1t', 'ADATA Legend 710 1TB', 'ADATA', 42.99, 50, 'Mejor Calidad/Precio', '1TB', 'NVMe SSD', 'M.2 2280', '2400 MB/s', '1800 MB/s', 'PCIe 3.0 x4'),
  st('st-adata-leg710-512', 'ADATA Legend 710 512GB', 'ADATA', 27.99, 42, 'Mejor Calidad/Precio', '512GB', 'NVMe SSD', 'M.2 2280', '2400 MB/s', '1800 MB/s', 'PCIe 3.0 x4'),
  st('st-adata-su800-1t', 'ADATA Ultimate SU800 1TB', 'ADATA', 54.99, 42, 'Aún vigente', '1TB', 'SATA SSD', '2.5"', '560 MB/s', '520 MB/s', 'SATA III'),
  st('st-adata-su800-512', 'ADATA Ultimate SU800 512GB', 'ADATA', 32.99, 38, 'Próximo a actualizar', '512GB', 'SATA SSD', '2.5"', '560 MB/s', '520 MB/s', 'SATA III'),
  st('st-adata-su650-480', 'ADATA Ultimate SU650 480GB', 'ADATA', 24.99, 30, 'Uso Básico', '480GB', 'SATA SSD', '2.5"', '520 MB/s', '450 MB/s', 'SATA III'),

  // ==========================================================
  // Sabrent
  // ==========================================================
  st('st-sab-rkt5-2t', 'Sabrent Rocket 4 Plus-G 2TB', 'Sabrent', 179.99, 92, 'Tope de Gama', '2TB', 'NVMe SSD', 'M.2 2280', '7100 MB/s', '6600 MB/s', 'PCIe 4.0 x4'),
  st('st-sab-rkt5-1t', 'Sabrent Rocket 4 Plus-G 1TB', 'Sabrent', 99.99, 88, 'Excelente Rendimiento', '1TB', 'NVMe SSD', 'M.2 2280', '7100 MB/s', '6600 MB/s', 'PCIe 4.0 x4'),
  st('st-sab-rkt-2t', 'Sabrent Rocket Q4 2TB', 'Sabrent', 119.99, 70, 'Muy recomendado', '2TB', 'NVMe SSD', 'M.2 2280', '4900 MB/s', '3500 MB/s', 'PCIe 4.0 x4'),
  st('st-sab-rkt-1t', 'Sabrent Rocket Q4 1TB', 'Sabrent', 64.99, 65, 'Muy recomendado', '1TB', 'NVMe SSD', 'M.2 2280', '4900 MB/s', '3500 MB/s', 'PCIe 4.0 x4'),

  // ==========================================================
  // PNY
  // ==========================================================
  st('st-pny-cs3150-2t', 'PNY CS3150 2TB', 'PNY', 169.99, 95, 'Tope de Gama', '2TB', 'NVMe SSD', 'M.2 2280', '12000 MB/s', '10000 MB/s', 'PCIe 5.0 x4'),
  st('st-pny-cs3150-1t', 'PNY CS3150 1TB', 'PNY', 99.99, 92, 'Tope de Gama', '1TB', 'NVMe SSD', 'M.2 2280', '12000 MB/s', '10000 MB/s', 'PCIe 5.0 x4'),
  st('st-pny-cs3140-2t', 'PNY CS3140 2TB', 'PNY', 129.99, 85, 'Excelente Rendimiento', '2TB', 'NVMe SSD', 'M.2 2280', '7500 MB/s', '6850 MB/s', 'PCIe 4.0 x4'),
  st('st-pny-cs3140-1t', 'PNY CS3140 1TB', 'PNY', 69.99, 82, 'Excelente Rendimiento', '1TB', 'NVMe SSD', 'M.2 2280', '7500 MB/s', '5650 MB/s', 'PCIe 4.0 x4'),
  st('st-pny-cs2241-1t', 'PNY CS2241 1TB', 'PNY', 49.99, 58, 'Mejor Calidad/Precio', '1TB', 'NVMe SSD', 'M.2 2280', '5000 MB/s', '3800 MB/s', 'PCIe 4.0 x4'),
  st('st-pny-cs900-1t', 'PNY CS900 1TB', 'PNY', 44.99, 38, 'Próximo a actualizar', '1TB', 'SATA SSD', '2.5"', '535 MB/s', '515 MB/s', 'SATA III'),
  st('st-pny-cs900-500', 'PNY CS900 500GB', 'PNY', 24.99, 32, 'Uso Básico', '500GB', 'SATA SSD', '2.5"', '535 MB/s', '515 MB/s', 'SATA III'),

  // ==========================================================
  // Silicon Power
  // ==========================================================
  st('st-sp-xs70-2t', 'Silicon Power XS70 2TB', 'Silicon Power', 109.99, 82, 'Excelente Rendimiento', '2TB', 'NVMe SSD', 'M.2 2280', '7300 MB/s', '6800 MB/s', 'PCIe 4.0 x4'),
  st('st-sp-xs70-1t', 'Silicon Power XS70 1TB', 'Silicon Power', 59.99, 78, 'Muy recomendado', '1TB', 'NVMe SSD', 'M.2 2280', '7300 MB/s', '6800 MB/s', 'PCIe 4.0 x4'),
  st('st-sp-ud90-2t', 'Silicon Power UD90 2TB', 'Silicon Power', 79.99, 62, 'Mejor Calidad/Precio', '2TB', 'NVMe SSD', 'M.2 2280', '5000 MB/s', '4800 MB/s', 'PCIe 4.0 x4'),
  st('st-sp-ud90-1t', 'Silicon Power UD90 1TB', 'Silicon Power', 44.99, 58, 'Mejor Calidad/Precio', '1TB', 'NVMe SSD', 'M.2 2280', '5000 MB/s', '4800 MB/s', 'PCIe 4.0 x4'),
  st('st-sp-a55-1t', 'Silicon Power Ace A55 1TB', 'Silicon Power', 39.99, 35, 'Próximo a actualizar', '1TB', 'SATA SSD', '2.5"', '500 MB/s', '450 MB/s', 'SATA III'),
  st('st-sp-a55-512', 'Silicon Power Ace A55 512GB', 'Silicon Power', 22.99, 30, 'Uso Básico', '512GB', 'SATA SSD', '2.5"', '500 MB/s', '450 MB/s', 'SATA III'),

  // ==========================================================
  // Mushkin
  // ==========================================================
  st('st-mush-v8-2t', 'Mushkin Vortex 2TB', 'Mushkin', 119.99, 82, 'Excelente Rendimiento', '2TB', 'NVMe SSD', 'M.2 2280', '7415 MB/s', '6800 MB/s', 'PCIe 4.0 x4'),
  st('st-mush-v8-1t', 'Mushkin Vortex 1TB', 'Mushkin', 69.99, 78, 'Muy recomendado', '1TB', 'NVMe SSD', 'M.2 2280', '7415 MB/s', '6800 MB/s', 'PCIe 4.0 x4'),
  st('st-mush-src-1t', 'Mushkin Source 2 1TB', 'Mushkin', 39.99, 35, 'Próximo a actualizar', '1TB', 'SATA SSD', '2.5"', '560 MB/s', '515 MB/s', 'SATA III'),

  // ==========================================================
  // Patriot
  // ==========================================================
  st('st-pat-vp4300-2t', 'Patriot Viper VP4300 2TB', 'Patriot', 139.99, 85, 'Excelente Rendimiento', '2TB', 'NVMe SSD', 'M.2 2280', '7400 MB/s', '6800 MB/s', 'PCIe 4.0 x4'),
  st('st-pat-vp4300-1t', 'Patriot Viper VP4300 1TB', 'Patriot', 79.99, 82, 'Excelente Rendimiento', '1TB', 'NVMe SSD', 'M.2 2280', '7400 MB/s', '5500 MB/s', 'PCIe 4.0 x4'),
  st('st-pat-p210-1t', 'Patriot P210 1TB', 'Patriot', 42.99, 35, 'Próximo a actualizar', '1TB', 'SATA SSD', '2.5"', '520 MB/s', '430 MB/s', 'SATA III'),
  st('st-pat-p210-512', 'Patriot P210 512GB', 'Patriot', 24.99, 30, 'Uso Básico', '512GB', 'SATA SSD', '2.5"', '520 MB/s', '430 MB/s', 'SATA III'),

  // ==========================================================
  // More Toshiba / Seagate HDD lines
  // ==========================================================
  st('st-tosh-n300-8t', 'Toshiba N300 NAS 8TB', 'Toshiba', 189.99, 42, 'Almacenamiento Masivo', '8TB', 'HDD', '3.5"', '254 MB/s', '254 MB/s', 'SATA III'),
  st('st-tosh-n300-6t', 'Toshiba N300 NAS 6TB', 'Toshiba', 139.99, 38, 'Almacenamiento Masivo', '6TB', 'HDD', '3.5"', '248 MB/s', '248 MB/s', 'SATA III'),
  st('st-tosh-n300-4t', 'Toshiba N300 NAS 4TB', 'Toshiba', 99.99, 32, 'Almacenamiento Masivo', '4TB', 'HDD', '3.5"', '204 MB/s', '204 MB/s', 'SATA III'),
  st('st-tosh-x300-8t', 'Toshiba X300 Performance 8TB', 'Toshiba', 159.99, 40, 'Almacenamiento Masivo', '8TB', 'HDD', '3.5"', '270 MB/s', '270 MB/s', 'SATA III'),
  st('st-tosh-x300-4t', 'Toshiba X300 Performance 4TB', 'Toshiba', 89.99, 32, 'Almacenamiento Masivo', '4TB', 'HDD', '3.5"', '250 MB/s', '250 MB/s', 'SATA III'),

  st('st-sea-exos-18t', 'Seagate Exos X18 18TB', 'Seagate', 349.99, 55, 'Tope de Gama', '18TB', 'HDD', '3.5"', '270 MB/s', '270 MB/s', 'SATA III'),
  st('st-sea-exos-16t', 'Seagate Exos X16 16TB', 'Seagate', 299.99, 52, 'Almacenamiento Masivo', '16TB', 'HDD', '3.5"', '261 MB/s', '261 MB/s', 'SATA III'),
  st('st-sea-exos-12t', 'Seagate Exos X16 12TB', 'Seagate', 229.99, 48, 'Almacenamiento Masivo', '12TB', 'HDD', '3.5"', '261 MB/s', '261 MB/s', 'SATA III'),

  st('st-wd-gold-18t', 'WD Gold Enterprise 18TB', 'Western Digital', 389.99, 55, 'Tope de Gama', '18TB', 'HDD', '3.5"', '272 MB/s', '272 MB/s', 'SATA III'),
  st('st-wd-gold-14t', 'WD Gold Enterprise 14TB', 'Western Digital', 299.99, 50, 'Almacenamiento Masivo', '14TB', 'HDD', '3.5"', '269 MB/s', '269 MB/s', 'SATA III'),
  st('st-wd-purple-8t', 'WD Purple Surveillance 8TB', 'Western Digital', 169.99, 38, 'Almacenamiento Masivo', '8TB', 'HDD', '3.5"', '185 MB/s', '185 MB/s', 'SATA III'),
  st('st-wd-purple-4t', 'WD Purple Surveillance 4TB', 'Western Digital', 89.99, 30, 'Almacenamiento Masivo', '4TB', 'HDD', '3.5"', '185 MB/s', '185 MB/s', 'SATA III'),
];
