import { Product } from "./components";

const MOTHERBOARD_IMAGE = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600&h=600';

const mb = (
  id: string, name: string, brand: string, price: number,
  score: number, rec: string,
  socket: string, chipset: string, formFactor: string, ramSlots: string, maxRam: string
): Product => ({
  id, name, category: 'Motherboard', priceUSD: price, image: MOTHERBOARD_IMAGE, brand,
  performanceScore: score, recommendation: rec,
  specs: { Socket: socket, Chipset: chipset, FormFactor: formFactor, RAMSlots: ramSlots, MaxRAM: maxRam }
});

export const motherboards: Product[] = [
  // ==========================================================
  // Intel LGA 1851 (Core Ultra 200S)
  // ==========================================================
  mb('mb-as-z890-e', 'ASUS ROG Strix Z890-E Gaming WiFi', 'ASUS', 549.99, 98, 'Tope de Gama', 'LGA1851', 'Z890', 'ATX', '4', '192GB'),
  mb('mb-gi-z890-aorus', 'Gigabyte Z890 AORUS Master', 'Gigabyte', 499.99, 96, 'Tope de Gama', 'LGA1851', 'Z890', 'ATX', '4', '192GB'),
  mb('mb-ms-z890-ace', 'MSI MEG Z890 ACE', 'MSI', 649.99, 99, 'Tope de Gama', 'LGA1851', 'Z890', 'ATX', '4', '192GB'),
  mb('mb-as-z890-prime', 'ASUS Prime Z890-A WiFi', 'ASUS', 299.99, 85, 'Excelente Rendimiento', 'LGA1851', 'Z890', 'ATX', '4', '192GB'),

  // ==========================================================
  // Intel LGA 1700 (12th, 13th, 14th Gen)
  // ==========================================================
  mb('mb-as-z790-hero', 'ASUS ROG Maximus Z790 Hero', 'ASUS', 629.99, 95, 'Tope de Gama', 'LGA1700', 'Z790', 'ATX', '4', '192GB'),
  mb('mb-ms-z790-tom', 'MSI MAG Z790 Tomahawk WiFi', 'MSI', 259.99, 88, 'Excelente Rendimiento', 'LGA1700', 'Z790', 'ATX', '4', '192GB'),
  mb('mb-gi-z790-elite', 'Gigabyte Z790 AORUS Elite AX', 'Gigabyte', 239.99, 85, 'Excelente Rendimiento', 'LGA1700', 'Z790', 'ATX', '4', '192GB'),
  mb('mb-asr-z790-taichi', 'ASRock Z790 Taichi', 'ASRock', 479.99, 92, 'Tope de Gama', 'LGA1700', 'Z790', 'E-ATX', '4', '192GB'),
  mb('mb-as-b760-f', 'ASUS ROG Strix B760-F Gaming WiFi', 'ASUS', 219.99, 75, 'Muy recomendado', 'LGA1700', 'B760', 'ATX', '4', '192GB'),
  mb('mb-ms-b760-m', 'MSI PRO B760M-P DDR4', 'MSI', 99.99, 50, 'Mejor Calidad/Precio', 'LGA1700', 'B760', 'mATX', '4', '128GB'),
  mb('mb-gi-h610-s2', 'Gigabyte H610M S2H', 'Gigabyte', 79.99, 30, 'Uso Básico', 'LGA1700', 'H610', 'mATX', '2', '64GB'),

  // ==========================================================
  // AMD AM5 (Ryzen 7000, 9000)
  // ==========================================================
  mb('mb-as-x670e-e', 'ASUS ROG Strix X670E-E Gaming WiFi', 'ASUS', 489.99, 96, 'Tope de Gama', 'AM5', 'X670E', 'ATX', '4', '192GB'),
  mb('mb-gi-x670e-aorus', 'Gigabyte X670E AORUS Master', 'Gigabyte', 449.99, 94, 'Tope de Gama', 'AM5', 'X670E', 'ATX', '4', '192GB'),
  mb('mb-ms-x670e-carbon', 'MSI MPG X670E Carbon WiFi', 'MSI', 429.99, 92, 'Tope de Gama', 'AM5', 'X670E', 'ATX', '4', '192GB'),
  mb('mb-as-b650-e', 'ASUS ROG Strix B650-E Gaming WiFi', 'ASUS', 349.99, 88, 'Excelente Rendimiento', 'AM5', 'B650E', 'ATX', '4', '192GB'),
  mb('mb-ms-b650-tom', 'MSI MAG B650 Tomahawk WiFi', 'MSI', 219.99, 82, 'Excelente Rendimiento', 'AM5', 'B650', 'ATX', '4', '192GB'),
  mb('mb-gi-b650-gaming', 'Gigabyte B650 Gaming X AX', 'Gigabyte', 189.99, 78, 'Muy recomendado', 'AM5', 'B650', 'ATX', '4', '192GB'),
  mb('mb-asr-b650-pg', 'ASRock B650 PG Lightning', 'ASRock', 169.99, 75, 'Muy recomendado', 'AM5', 'B650', 'ATX', '4', '192GB'),
  mb('mb-as-a620-m', 'ASUS TUF Gaming A620M-Plus', 'ASUS', 129.99, 55, 'Mejor Calidad/Precio', 'AM5', 'A620', 'mATX', '4', '128GB'),

  // ==========================================================
  // AMD AM4 (Ryzen 3000, 5000)
  // ==========================================================
  mb('mb-as-x570-e', 'ASUS ROG Strix X570-E Gaming WiFi II', 'ASUS', 329.99, 80, 'Excelente Rendimiento (AM4)', 'AM4', 'X570', 'ATX', '4', '128GB'),
  mb('mb-ms-b550-tom', 'MSI MAG B550 Tomahawk', 'MSI', 169.99, 72, 'Muy recomendado', 'AM4', 'B550', 'ATX', '4', '128GB'),
  mb('mb-gi-b550-elite', 'Gigabyte B550 AORUS Elite V2', 'Gigabyte', 159.99, 70, 'Muy recomendado', 'AM4', 'B550', 'ATX', '4', '128GB'),
  mb('mb-as-b550-f', 'ASUS ROG Strix B550-F Gaming WiFi II', 'ASUS', 189.99, 74, 'Muy recomendado', 'AM4', 'B550', 'ATX', '4', '128GB'),
  mb('mb-asr-b550-steel', 'ASRock B550 Steel Legend', 'ASRock', 149.99, 68, 'Muy recomendado', 'AM4', 'B550', 'ATX', '4', '128GB'),
  mb('mb-gi-a520-m', 'Gigabyte A520M S2H', 'Gigabyte', 69.99, 30, 'Uso Básico', 'AM4', 'A520', 'mATX', '2', '64GB'),
  mb('mb-ms-a320-m', 'MSI A320M-A PRO', 'MSI', 59.99, 20, 'Uso Básico', 'AM4', 'A320', 'mATX', '2', '64GB'),
];
