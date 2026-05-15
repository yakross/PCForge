import { Product } from "./components";

const PSU_IMAGE = 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=600&h=600';

const ps = (
  id: string, name: string, brand: string, price: number,
  score: number, rec: string,
  wattage: string, efficiency: string, modular: string, atx3: boolean
): Product => ({
  id, name, category: 'PSU', priceUSD: price, image: PSU_IMAGE, brand,
  performanceScore: score, recommendation: rec,
  specs: { Wattage: wattage, Efficiency: efficiency, Modular: modular, ATX3_0: atx3 ? 'Sí' : 'No' }
});

export const psus: Product[] = [
  // ==========================================================
  // Ultra High End (1200W+)
  // ==========================================================
  ps('ps-cors-ax1600i', 'Corsair AX1600i Digital Titanium', 'Corsair', 609.99, 100, 'Tope de Gama', '1600W', '80+ Titanium', 'Totalmente', false),
  ps('ps-sea-px1600', 'Seasonic PRIME PX-1600', 'Seagate', 529.99, 99, 'Tope de Gama', '1600W', '80+ Platinum', 'Totalmente', true),
  ps('ps-cors-hx1500i', 'Corsair HX1500i Platinum', 'Corsair', 399.99, 97, 'Tope de Gama', '1500W', '80+ Platinum', 'Totalmente', false),
  ps('ps-msi-ai1300', 'MSI MEG Ai1300P PCIE5', 'MSI', 359.99, 96, 'Tope de Gama', '1300W', '80+ Platinum', 'Totalmente', true),
  ps('ps-therm-gf3-1650', 'Thermaltake Toughpower GF3 1650W', 'Thermaltake', 299.99, 94, 'Tope de Gama', '1650W', '80+ Gold', 'Totalmente', true),

  // ==========================================================
  // High End (850W - 1000W)
  // ==========================================================
  ps('ps-cors-rm1000x', 'Corsair RM1000x (2021)', 'Corsair', 189.99, 90, 'Excelente Rendimiento', '1000W', '80+ Gold', 'Totalmente', false),
  ps('ps-cors-rm1000e', 'Corsair RM1000e (2023)', 'Corsair', 159.99, 88, 'Excelente Rendimiento', '1000W', '80+ Gold', 'Totalmente', true),
  ps('ps-sea-gx1000', 'Seasonic Focus GX-1000', 'Seasonic', 179.99, 90, 'Excelente Rendimiento', '1000W', '80+ Gold', 'Totalmente', false),
  ps('ps-evga-1000g6', 'EVGA SuperNOVA 1000 G6', 'EVGA', 199.99, 91, 'Excelente Rendimiento', '1000W', '80+ Gold', 'Totalmente', false),
  ps('ps-bq-sp12-1000', 'be quiet! Straight Power 12 1000W', 'be quiet!', 199.99, 92, 'Excelente Rendimiento', '1000W', '80+ Platinum', 'Totalmente', true),

  ps('ps-cors-rm850x', 'Corsair RM850x (2021)', 'Corsair', 129.99, 85, 'Excelente Rendimiento', '850W', '80+ Gold', 'Totalmente', false),
  ps('ps-cors-rm850e', 'Corsair RM850e (2023)', 'Corsair', 119.99, 84, 'Excelente Rendimiento', '850W', '80+ Gold', 'Totalmente', true),
  ps('ps-msi-a850g', 'MSI MPG A850G PCIE5', 'MSI', 129.99, 85, 'Excelente Rendimiento', '850W', '80+ Gold', 'Totalmente', true),
  ps('ps-cool-v850', 'Cooler Master V850 Gold V2', 'Cooler Master', 139.99, 83, 'Excelente Rendimiento', '850W', '80+ Gold', 'Totalmente', false),

  // ==========================================================
  // Mid Range (650W - 750W)
  // ==========================================================
  ps('ps-cors-rm750x', 'Corsair RM750x (2021)', 'Corsair', 119.99, 78, 'Muy recomendado', '750W', '80+ Gold', 'Totalmente', false),
  ps('ps-sea-gx750', 'Seasonic Focus GX-750', 'Seasonic', 109.99, 78, 'Muy recomendado', '750W', '80+ Gold', 'Totalmente', false),
  ps('ps-evga-750gt', 'EVGA SuperNOVA 750 GT', 'EVGA', 99.99, 75, 'Muy recomendado', '750W', '80+ Gold', 'Totalmente', false),
  ps('ps-cors-rm650', 'Corsair RM650 (2023)', 'Corsair', 89.99, 70, 'Muy recomendado', '650W', '80+ Gold', 'Totalmente', false),
  ps('ps-msi-a650bn', 'MSI MAG A650BN', 'MSI', 59.99, 60, 'Mejor Calidad/Precio', '650W', '80+ Bronze', 'No', false),

  // ==========================================================
  // Entry Level (450W - 550W)
  // ==========================================================
  ps('ps-cors-cx550', 'Corsair CX550 (2023)', 'Corsair', 54.99, 50, 'Mejor Calidad/Precio', '550W', '80+ Bronze', 'No', false),
  ps('ps-evga-500w1', 'EVGA 500 W1', 'EVGA', 44.99, 30, 'Uso Básico', '500W', '80+ White', 'No', false),
  ps('ps-therm-smart-500', 'Thermaltake Smart 500W', 'Thermaltake', 39.99, 25, 'Uso Básico', '500W', '80+ White', 'No', false),
];
