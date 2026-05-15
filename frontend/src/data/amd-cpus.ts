import { Product } from "./components";

const AMD_CPU_IMAGE = '/amd-cpu.png';

const getAMDPerformance = (model: string) => {
  let score = 0;
  let recommendation = "Aún vigente";

  // === Ryzen 9000 (Zen 5 - AM5) ===
  if (model.includes('9 9')) { score = 95; recommendation = "Tope de Gama"; }
  // === Ryzen 7000 X3D ===
  else if (model.includes('X3D') && model.includes('7')) { score = 92; recommendation = "Mejor Gaming"; }
  // === Ryzen 7000 (Zen 4 - AM5) ===
  else if (model.includes('9 7950')) { score = 88; recommendation = "Tope de Gama"; }
  else if (model.includes('9 7900')) { score = 85; recommendation = "Tope de Gama"; }
  else if (model.includes('7 7800')) { score = 78; recommendation = "Excelente Rendimiento"; }
  else if (model.includes('7 7700')) { score = 75; recommendation = "Excelente Rendimiento"; }
  else if (model.includes('5 7600')) { score = 68; recommendation = "Excelente Rendimiento"; }
  else if (model.includes('5 7500')) { score = 65; recommendation = "Mejor Calidad/Precio"; }
  else if (model.includes('3 7300')) { score = 45; recommendation = "Aún vigente"; }
  // === Ryzen 5000 (Zen 3 - AM4) ===
  else if (model.includes('X3D') && model.includes('5')) { score = 80; recommendation = "Mejor Gaming (AM4)"; }
  else if (model.includes('9 5950')) { score = 72; recommendation = "Muy recomendado"; }
  else if (model.includes('9 5900')) { score = 68; recommendation = "Muy recomendado"; }
  else if (model.includes('7 5800')) { score = 62; recommendation = "Muy recomendado"; }
  else if (model.includes('7 5700')) { score = 58; recommendation = "Mejor Calidad/Precio"; }
  else if (model.includes('5 5600')) { score = 52; recommendation = "Mejor Calidad/Precio"; }
  else if (model.includes('5 5500')) { score = 48; recommendation = "Mejor Calidad/Precio"; }
  else if (model.includes('3 5300') || model.includes('5 4500') || model.includes('5 4600')) { score = 35; recommendation = "Aún vigente"; }
  // === Ryzen 3000 (Zen 2 - AM4) ===
  else if (model.includes('9 3950')) { score = 50; recommendation = "Próximo a actualizar"; }
  else if (model.includes('9 3900')) { score = 45; recommendation = "Próximo a actualizar"; }
  else if (model.includes('7 3800')) { score = 40; recommendation = "Próximo a actualizar"; }
  else if (model.includes('7 3700')) { score = 38; recommendation = "Próximo a actualizar"; }
  else if (model.includes('5 3600')) { score = 32; recommendation = "Próximo a actualizar"; }
  else if (model.includes('3 3300') || model.includes('3 3100')) { score = 22; recommendation = "Próximo a actualizar"; }
  // === Athlon ===
  else if (model.includes('Athlon')) { score = 10; recommendation = "Uso Básico"; }
  else { score = 30; recommendation = "Aún vigente"; }

  if (model.includes('X3D')) score = Math.min(score + 5, 100);
  return { score, recommendation };
};

const cpu = (
  model: string, price: number, cores: string, threads: string,
  baseClock: string, boostClock: string, socket: string
): Product => {
  const { score, recommendation } = getAMDPerformance(model);
  const isAthlon = model.includes('Athlon');
  const fullName = isAthlon ? `AMD ${model}` : `AMD Ryzen ${model}`;
  return {
    id: `cpu-amd-${model.toLowerCase().replace(/ /g, '-').replace(/\(/g,'').replace(/\)/g,'')}`,
    name: fullName, category: 'CPU', priceUSD: price, image: AMD_CPU_IMAGE, brand: 'AMD',
    performanceScore: score, recommendation,
    specs: { Cores: cores, Threads: threads, BaseClock: baseClock, BoostClock: boostClock, Socket: socket }
  };
};

export const amdCPUs: Product[] = [
  // =====================================================
  // Ryzen 9000 Series (Zen 5 - AM5)
  // =====================================================
  cpu('9 9950X', 649.99, '16', '32', '4.3 GHz', '5.7 GHz', 'AM5'),
  cpu('9 9950X3D', 699.99, '16', '32', '4.3 GHz', '5.7 GHz', 'AM5'),
  cpu('9 9900X', 499.99, '12', '24', '4.4 GHz', '5.6 GHz', 'AM5'),
  cpu('9 9900X3D', 549.99, '12', '24', '4.4 GHz', '5.5 GHz', 'AM5'),
  cpu('7 9800X3D', 479.99, '8', '16', '4.7 GHz', '5.2 GHz', 'AM5'),
  cpu('7 9700X', 359.99, '8', '16', '3.8 GHz', '5.5 GHz', 'AM5'),
  cpu('5 9600X', 279.99, '6', '12', '3.9 GHz', '5.4 GHz', 'AM5'),
  cpu('5 9600', 229.99, '6', '12', '3.9 GHz', '5.2 GHz', 'AM5'),

  // =====================================================
  // Ryzen 7000 Series (Zen 4 - AM5)
  // =====================================================
  cpu('9 7950X', 549.99, '16', '32', '4.5 GHz', '5.7 GHz', 'AM5'),
  cpu('9 7950X3D', 599.99, '16', '32', '4.2 GHz', '5.7 GHz', 'AM5'),
  cpu('9 7900X', 449.99, '12', '24', '4.7 GHz', '5.6 GHz', 'AM5'),
  cpu('9 7900X3D', 499.99, '12', '24', '4.4 GHz', '5.6 GHz', 'AM5'),
  cpu('9 7900', 399.99, '12', '24', '3.7 GHz', '5.4 GHz', 'AM5'),

  cpu('7 7800X3D', 399.99, '8', '16', '4.2 GHz', '5.0 GHz', 'AM5'),
  cpu('7 7700X', 349.99, '8', '16', '4.5 GHz', '5.4 GHz', 'AM5'),
  cpu('7 7700', 299.99, '8', '16', '3.8 GHz', '5.3 GHz', 'AM5'),

  cpu('5 7600X', 249.99, '6', '12', '4.7 GHz', '5.3 GHz', 'AM5'),
  cpu('5 7600', 219.99, '6', '12', '3.8 GHz', '5.1 GHz', 'AM5'),
  cpu('5 7500F', 179.99, '6', '12', '3.7 GHz', '5.0 GHz', 'AM5'),

  cpu('3 7300X', 129.99, '4', '8', '4.0 GHz', '5.0 GHz', 'AM5'),

  // =====================================================
  // Ryzen 5000 Series (Zen 3 - AM4)
  // =====================================================
  cpu('9 5950X', 399.99, '16', '32', '3.4 GHz', '4.9 GHz', 'AM4'),
  cpu('9 5900X', 349.99, '12', '24', '3.7 GHz', '4.8 GHz', 'AM4'),
  cpu('9 5900', 329.99, '12', '24', '3.0 GHz', '4.7 GHz', 'AM4'),

  cpu('7 5800X3D', 299.99, '8', '16', '3.4 GHz', '4.5 GHz', 'AM4'),
  cpu('7 5800X', 249.99, '8', '16', '3.8 GHz', '4.7 GHz', 'AM4'),
  cpu('7 5800', 229.99, '8', '16', '3.4 GHz', '4.6 GHz', 'AM4'),
  cpu('7 5700X', 199.99, '8', '16', '3.4 GHz', '4.6 GHz', 'AM4'),
  cpu('7 5700X3D', 229.99, '8', '16', '3.0 GHz', '4.1 GHz', 'AM4'),
  cpu('7 5700G', 209.99, '8', '16', '3.8 GHz', '4.6 GHz', 'AM4'),

  cpu('5 5600X', 179.99, '6', '12', '3.7 GHz', '4.6 GHz', 'AM4'),
  cpu('5 5600', 149.99, '6', '12', '3.5 GHz', '4.4 GHz', 'AM4'),
  cpu('5 5600G', 159.99, '6', '12', '3.9 GHz', '4.4 GHz', 'AM4'),
  cpu('5 5500', 119.99, '6', '12', '3.6 GHz', '4.2 GHz', 'AM4'),

  cpu('5 4600G', 109.99, '6', '12', '3.7 GHz', '4.2 GHz', 'AM4'),
  cpu('5 4500', 89.99, '6', '12', '3.6 GHz', '4.1 GHz', 'AM4'),
  cpu('3 5300G', 99.99, '4', '8', '4.0 GHz', '4.2 GHz', 'AM4'),

  // =====================================================
  // Ryzen 3000 Series (Zen 2 - AM4)
  // =====================================================
  cpu('9 3950X', 349.99, '16', '32', '3.5 GHz', '4.7 GHz', 'AM4'),
  cpu('9 3900X', 289.99, '12', '24', '3.8 GHz', '4.6 GHz', 'AM4'),
  cpu('9 3900XT', 299.99, '12', '24', '3.8 GHz', '4.7 GHz', 'AM4'),

  cpu('7 3800X', 219.99, '8', '16', '3.9 GHz', '4.5 GHz', 'AM4'),
  cpu('7 3800XT', 229.99, '8', '16', '3.9 GHz', '4.7 GHz', 'AM4'),
  cpu('7 3700X', 189.99, '8', '16', '3.6 GHz', '4.4 GHz', 'AM4'),

  cpu('5 3600X', 159.99, '6', '12', '3.8 GHz', '4.4 GHz', 'AM4'),
  cpu('5 3600', 129.99, '6', '12', '3.6 GHz', '4.2 GHz', 'AM4'),
  cpu('5 3600XT', 149.99, '6', '12', '3.8 GHz', '4.5 GHz', 'AM4'),
  cpu('5 3500X', 109.99, '6', '6', '3.6 GHz', '4.1 GHz', 'AM4'),

  cpu('3 3300X', 89.99, '4', '8', '3.8 GHz', '4.3 GHz', 'AM4'),
  cpu('3 3100', 69.99, '4', '8', '3.6 GHz', '3.9 GHz', 'AM4'),

  // =====================================================
  // AMD Athlon (Budget - AM4)
  // =====================================================
  cpu('Athlon 3000G', 49.99, '2', '4', '3.5 GHz', '3.5 GHz', 'AM4'),
  cpu('Athlon Gold 3150G', 59.99, '4', '4', '3.5 GHz', '3.9 GHz', 'AM4'),
  cpu('Athlon Silver 3050GE', 39.99, '2', '4', '3.4 GHz', '3.4 GHz', 'AM4'),
  cpu('Athlon Gold PRO 4150GE', 69.99, '4', '4', '3.3 GHz', '3.8 GHz', 'AM4'),
];
