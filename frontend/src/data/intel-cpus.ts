import { Product } from "./components";

const INTEL_CPU_IMAGE = '/intel-cpu.png';

const getPerformanceData = (model: string) => {
  let baseScore = 0;
  let recommendation = "Aún vigente";

  // === Intel Core Ultra (Arrow Lake) ===
  if (model.includes('Ultra 9')) { baseScore = 98; recommendation = "Tope de Gama"; }
  else if (model.includes('Ultra 7')) { baseScore = 88; recommendation = "Tope de Gama"; }
  else if (model.includes('Ultra 5')) { baseScore = 75; recommendation = "Excelente Rendimiento"; }

  // === 14th Gen ===
  else if (model.includes('i9-14')) {
    baseScore = 85;
    recommendation = model.includes('KS') ? "Tope de Gama" : "Tope de Gama";
  }
  else if (model.includes('i7-14')) { baseScore = 75; recommendation = "Excelente Rendimiento"; }
  else if (model.includes('i5-14')) { baseScore = 60; recommendation = "Excelente Rendimiento"; }
  else if (model.includes('i3-14')) { baseScore = 40; recommendation = "Muy recomendado"; }

  // === 13th Gen ===
  else if (model.includes('i9-13')) { baseScore = 80; recommendation = "Muy recomendado"; }
  else if (model.includes('i7-13')) { baseScore = 70; recommendation = "Muy recomendado"; }
  else if (model.includes('i5-13')) { baseScore = 55; recommendation = "Muy recomendado"; }
  else if (model.includes('i3-13')) { baseScore = 35; recommendation = "Aún vigente"; }

  // === 12th Gen ===
  else if (model.includes('i9-12')) { baseScore = 65; recommendation = "Aún vigente"; }
  else if (model.includes('i7-12')) { baseScore = 55; recommendation = "Aún vigente"; }
  else if (model.includes('i5-12')) { baseScore = 45; recommendation = "Aún vigente"; }
  else if (model.includes('i3-12')) { baseScore = 30; recommendation = "Próximo a actualizar"; }

  // === 10th/11th Gen ===
  else if (model.includes('i9-11') || model.includes('i9-10')) { baseScore = 45; recommendation = "Próximo a actualizar"; }
  else if (model.includes('i7-11') || model.includes('i7-10')) { baseScore = 38; recommendation = "Próximo a actualizar"; }
  else if (model.includes('i5-11') || model.includes('i5-10')) { baseScore = 30; recommendation = "Próximo a actualizar"; }
  else if (model.includes('i3-10')) { baseScore = 20; recommendation = "Próximo a actualizar"; }

  // === Celeron / Pentium / N-Series ===
  else if (model.includes('N')) { baseScore = 10; recommendation = "Uso Básico"; }
  else if (model.includes('Celeron')) { baseScore = 8; recommendation = "Uso Básico"; }
  else if (model.includes('Pentium')) { baseScore = 12; recommendation = "Uso Básico"; }

  // Modifiers
  if (model.includes('KS')) baseScore = Math.min(baseScore + 3, 100);
  else if (model.includes('K') && !model.includes('KF')) baseScore = Math.min(baseScore + 2, 100);

  return { score: baseScore, recommendation };
};

const cpu = (
  model: string, price: number, cores: string, threads: string,
  baseClock: string, boostClock: string, socket: string = 'LGA1700'
): Product => {
  const { score, recommendation } = getPerformanceData(model);
  const isUltra = model.includes('Ultra');
  const isCeleron = model.includes('Celeron') || model.includes('Pentium') || model.includes('N');
  const fullName = isUltra ? `Intel Core ${model}` : isCeleron ? `Intel ${model}` : `Intel Core ${model}`;
  return {
    id: `cpu-intel-${model.toLowerCase().replace(/ /g, '-').replace(/\(/g,'').replace(/\)/g,'')}`,
    name: fullName, category: 'CPU', priceUSD: price, image: INTEL_CPU_IMAGE, brand: 'Intel',
    performanceScore: score, recommendation,
    specs: { Cores: cores, Threads: threads, BaseClock: baseClock, BoostClock: boostClock, Socket: socket }
  };
};

export const intelCPUs: Product[] = [
  // =====================================================
  // Intel Core Ultra 200S (Arrow Lake - LGA1851)
  // =====================================================
  cpu('Ultra 9 285K', 589.99, '24 (8P+16E)', '24', '3.7 GHz', '5.7 GHz', 'LGA1851'),
  cpu('Ultra 9 285KF', 564.99, '24 (8P+16E)', '24', '3.7 GHz', '5.7 GHz', 'LGA1851'),
  cpu('Ultra 7 265K', 394.99, '20 (8P+12E)', '20', '3.9 GHz', '5.5 GHz', 'LGA1851'),
  cpu('Ultra 7 265KF', 369.99, '20 (8P+12E)', '20', '3.9 GHz', '5.5 GHz', 'LGA1851'),
  cpu('Ultra 7 265', 334.99, '20 (8P+12E)', '20', '2.4 GHz', '5.3 GHz', 'LGA1851'),
  cpu('Ultra 7 265F', 309.99, '20 (8P+12E)', '20', '2.4 GHz', '5.3 GHz', 'LGA1851'),
  cpu('Ultra 5 245K', 309.99, '14 (6P+8E)', '14', '4.2 GHz', '5.2 GHz', 'LGA1851'),
  cpu('Ultra 5 245KF', 284.99, '14 (6P+8E)', '14', '4.2 GHz', '5.2 GHz', 'LGA1851'),
  cpu('Ultra 5 235', 254.99, '14 (6P+8E)', '14', '3.4 GHz', '5.0 GHz', 'LGA1851'),
  cpu('Ultra 5 235F', 229.99, '14 (6P+8E)', '14', '3.4 GHz', '5.0 GHz', 'LGA1851'),
  cpu('Ultra 5 225', 224.99, '10 (6P+4E)', '10', '3.5 GHz', '4.9 GHz', 'LGA1851'),
  cpu('Ultra 5 225F', 199.99, '10 (6P+4E)', '10', '3.5 GHz', '4.9 GHz', 'LGA1851'),

  // =====================================================
  // 14th Gen Core (Raptor Lake Refresh - LGA1700)
  // =====================================================
  cpu('i9-14900KS', 689.99, '24 (8P+16E)', '32', '3.2 GHz', '6.2 GHz'),
  cpu('i9-14900K', 589.99, '24 (8P+16E)', '32', '3.2 GHz', '6.0 GHz'),
  cpu('i9-14900KF', 564.99, '24 (8P+16E)', '32', '3.2 GHz', '6.0 GHz'),
  cpu('i9-14900', 549.99, '24 (8P+16E)', '32', '2.0 GHz', '5.8 GHz'),
  cpu('i9-14900F', 524.99, '24 (8P+16E)', '32', '2.0 GHz', '5.8 GHz'),
  cpu('i9-14900T', 499.99, '24 (8P+16E)', '32', '1.1 GHz', '5.5 GHz'),

  cpu('i7-14700K', 409.99, '20 (8P+12E)', '28', '3.4 GHz', '5.6 GHz'),
  cpu('i7-14700KF', 384.99, '20 (8P+12E)', '28', '3.4 GHz', '5.6 GHz'),
  cpu('i7-14700', 384.99, '20 (8P+12E)', '28', '2.1 GHz', '5.4 GHz'),
  cpu('i7-14700F', 359.99, '20 (8P+12E)', '28', '2.1 GHz', '5.4 GHz'),
  cpu('i7-14700T', 339.99, '20 (8P+12E)', '28', '1.3 GHz', '5.2 GHz'),

  cpu('i5-14600K', 319.99, '14 (6P+8E)', '20', '3.5 GHz', '5.3 GHz'),
  cpu('i5-14600KF', 294.99, '14 (6P+8E)', '20', '3.5 GHz', '5.3 GHz'),
  cpu('i5-14600', 264.99, '14 (6P+8E)', '20', '2.7 GHz', '5.2 GHz'),
  cpu('i5-14500', 255.99, '14 (6P+8E)', '20', '2.6 GHz', '5.0 GHz'),
  cpu('i5-14400', 221.99, '10 (6P+4E)', '16', '2.5 GHz', '4.7 GHz'),
  cpu('i5-14400F', 196.99, '10 (6P+4E)', '16', '2.5 GHz', '4.7 GHz'),
  cpu('i5-14400T', 189.99, '10 (6P+4E)', '16', '1.3 GHz', '4.5 GHz'),

  cpu('i3-14100', 134.99, '4 (4P+0E)', '8', '3.5 GHz', '4.7 GHz'),
  cpu('i3-14100F', 109.99, '4 (4P+0E)', '8', '3.5 GHz', '4.7 GHz'),
  cpu('i3-14100T', 119.99, '4 (4P+0E)', '8', '2.7 GHz', '4.4 GHz'),

  // =====================================================
  // 13th Gen Core (Raptor Lake - LGA1700)
  // =====================================================
  cpu('i9-13900KS', 699.99, '24 (8P+16E)', '32', '3.2 GHz', '6.0 GHz'),
  cpu('i9-13900K', 569.99, '24 (8P+16E)', '32', '3.0 GHz', '5.8 GHz'),
  cpu('i9-13900KF', 544.99, '24 (8P+16E)', '32', '3.0 GHz', '5.8 GHz'),
  cpu('i9-13900', 529.99, '24 (8P+16E)', '32', '2.0 GHz', '5.6 GHz'),
  cpu('i9-13900F', 504.99, '24 (8P+16E)', '32', '2.0 GHz', '5.6 GHz'),
  cpu('i9-13900T', 479.99, '24 (8P+16E)', '32', '1.1 GHz', '5.3 GHz'),

  cpu('i7-13700K', 385.99, '16 (8P+8E)', '24', '3.4 GHz', '5.4 GHz'),
  cpu('i7-13700KF', 360.99, '16 (8P+8E)', '24', '3.4 GHz', '5.4 GHz'),
  cpu('i7-13700', 359.99, '16 (8P+8E)', '24', '2.1 GHz', '5.2 GHz'),
  cpu('i7-13700F', 334.99, '16 (8P+8E)', '24', '2.1 GHz', '5.2 GHz'),
  cpu('i7-13700T', 319.99, '16 (8P+8E)', '24', '1.4 GHz', '4.8 GHz'),

  cpu('i5-13600K', 295.99, '14 (6P+8E)', '20', '3.5 GHz', '5.1 GHz'),
  cpu('i5-13600KF', 270.99, '14 (6P+8E)', '20', '3.5 GHz', '5.1 GHz'),
  cpu('i5-13500', 232.99, '14 (6P+8E)', '20', '2.5 GHz', '4.8 GHz'),
  cpu('i5-13400', 221.99, '10 (6P+4E)', '16', '2.5 GHz', '4.6 GHz'),
  cpu('i5-13400F', 196.99, '10 (6P+4E)', '16', '2.5 GHz', '4.6 GHz'),
  cpu('i5-13400T', 189.99, '10 (6P+4E)', '16', '1.3 GHz', '4.4 GHz'),

  cpu('i3-13100', 134.99, '4 (4P+0E)', '8', '3.4 GHz', '4.5 GHz'),
  cpu('i3-13100F', 109.99, '4 (4P+0E)', '8', '3.4 GHz', '4.5 GHz'),
  cpu('i3-13100T', 119.99, '4 (4P+0E)', '8', '2.5 GHz', '4.2 GHz'),

  // =====================================================
  // 12th Gen Core (Alder Lake - LGA1700)
  // =====================================================
  cpu('i9-12900KS', 450.99, '16 (8P+8E)', '24', '3.4 GHz', '5.5 GHz'),
  cpu('i9-12900K', 375.99, '16 (8P+8E)', '24', '3.2 GHz', '5.2 GHz'),
  cpu('i9-12900KF', 350.99, '16 (8P+8E)', '24', '3.2 GHz', '5.2 GHz'),
  cpu('i9-12900', 330.99, '16 (8P+8E)', '24', '2.4 GHz', '5.1 GHz'),
  cpu('i9-12900F', 315.99, '16 (8P+8E)', '24', '2.4 GHz', '5.1 GHz'),

  cpu('i7-12700K', 275.99, '12 (8P+4E)', '20', '3.6 GHz', '5.0 GHz'),
  cpu('i7-12700KF', 250.99, '12 (8P+4E)', '20', '3.6 GHz', '5.0 GHz'),
  cpu('i7-12700', 245.99, '12 (8P+4E)', '20', '2.1 GHz', '4.9 GHz'),
  cpu('i7-12700F', 220.99, '12 (8P+4E)', '20', '2.1 GHz', '4.9 GHz'),

  cpu('i5-12600K', 215.99, '10 (6P+4E)', '16', '3.7 GHz', '4.9 GHz'),
  cpu('i5-12600KF', 190.99, '10 (6P+4E)', '16', '3.7 GHz', '4.9 GHz'),
  cpu('i5-12500', 185.99, '6 (6P+0E)', '12', '3.0 GHz', '4.6 GHz'),
  cpu('i5-12400', 160.99, '6 (6P+0E)', '12', '2.5 GHz', '4.4 GHz'),
  cpu('i5-12400F', 135.99, '6 (6P+0E)', '12', '2.5 GHz', '4.4 GHz'),

  cpu('i3-12100', 125.99, '4 (4P+0E)', '8', '3.3 GHz', '4.3 GHz'),
  cpu('i3-12100F', 95.99, '4 (4P+0E)', '8', '3.3 GHz', '4.3 GHz'),

  // =====================================================
  // 11th Gen Core (Rocket Lake - LGA1200)
  // =====================================================
  cpu('i9-11900K', 299.99, '8', '16', '3.5 GHz', '5.3 GHz', 'LGA1200'),
  cpu('i9-11900KF', 279.99, '8', '16', '3.5 GHz', '5.3 GHz', 'LGA1200'),
  cpu('i9-11900', 269.99, '8', '16', '2.5 GHz', '5.2 GHz', 'LGA1200'),
  cpu('i9-11900F', 249.99, '8', '16', '2.5 GHz', '5.2 GHz', 'LGA1200'),

  cpu('i7-11700K', 229.99, '8', '16', '3.6 GHz', '5.0 GHz', 'LGA1200'),
  cpu('i7-11700KF', 209.99, '8', '16', '3.6 GHz', '5.0 GHz', 'LGA1200'),
  cpu('i7-11700', 199.99, '8', '16', '2.5 GHz', '4.9 GHz', 'LGA1200'),
  cpu('i7-11700F', 189.99, '8', '16', '2.5 GHz', '4.9 GHz', 'LGA1200'),

  cpu('i5-11600K', 179.99, '6', '12', '3.9 GHz', '4.9 GHz', 'LGA1200'),
  cpu('i5-11600KF', 159.99, '6', '12', '3.9 GHz', '4.9 GHz', 'LGA1200'),
  cpu('i5-11400', 139.99, '6', '12', '2.6 GHz', '4.4 GHz', 'LGA1200'),
  cpu('i5-11400F', 119.99, '6', '12', '2.6 GHz', '4.4 GHz', 'LGA1200'),

  // =====================================================
  // 10th Gen Core (Comet Lake - LGA1200)
  // =====================================================
  cpu('i9-10900K', 249.99, '10', '20', '3.7 GHz', '5.3 GHz', 'LGA1200'),
  cpu('i9-10900KF', 229.99, '10', '20', '3.7 GHz', '5.3 GHz', 'LGA1200'),
  cpu('i9-10900', 219.99, '10', '20', '2.8 GHz', '5.2 GHz', 'LGA1200'),
  cpu('i9-10900F', 209.99, '10', '20', '2.8 GHz', '5.2 GHz', 'LGA1200'),

  cpu('i7-10700K', 189.99, '8', '16', '3.8 GHz', '5.1 GHz', 'LGA1200'),
  cpu('i7-10700KF', 169.99, '8', '16', '3.8 GHz', '5.1 GHz', 'LGA1200'),
  cpu('i7-10700', 159.99, '8', '16', '2.9 GHz', '4.8 GHz', 'LGA1200'),
  cpu('i7-10700F', 149.99, '8', '16', '2.9 GHz', '4.8 GHz', 'LGA1200'),

  cpu('i5-10600K', 149.99, '6', '12', '4.1 GHz', '4.8 GHz', 'LGA1200'),
  cpu('i5-10600KF', 129.99, '6', '12', '4.1 GHz', '4.8 GHz', 'LGA1200'),
  cpu('i5-10400', 109.99, '6', '12', '2.9 GHz', '4.3 GHz', 'LGA1200'),
  cpu('i5-10400F', 89.99, '6', '12', '2.9 GHz', '4.3 GHz', 'LGA1200'),

  cpu('i3-10100', 79.99, '4', '8', '3.6 GHz', '4.3 GHz', 'LGA1200'),
  cpu('i3-10100F', 64.99, '4', '8', '3.6 GHz', '4.3 GHz', 'LGA1200'),

  // =====================================================
  // Intel Pentium Gold & Celeron (Budget - LGA1700)
  // =====================================================
  cpu('Pentium Gold G7400', 64.99, '2 (2P+0E)', '4', '3.7 GHz', '3.7 GHz'),
  cpu('Pentium Gold G7400T', 59.99, '2 (2P+0E)', '4', '3.1 GHz', '3.1 GHz'),

  cpu('Celeron G6900', 42.99, '2 (2P+0E)', '2', '3.4 GHz', '3.4 GHz'),
  cpu('Celeron G6900T', 39.99, '2 (2P+0E)', '2', '2.8 GHz', '2.8 GHz'),

  // Intel Pentium Gold & Celeron (Budget - LGA1200)
  cpu('Pentium Gold G6400', 54.99, '2', '4', '4.0 GHz', '4.0 GHz', 'LGA1200'),
  cpu('Pentium Gold G6405', 59.99, '2', '4', '4.1 GHz', '4.1 GHz', 'LGA1200'),

  cpu('Celeron G5905', 34.99, '2', '2', '3.5 GHz', '3.5 GHz', 'LGA1200'),
  cpu('Celeron G5900', 29.99, '2', '2', '3.4 GHz', '3.4 GHz', 'LGA1200'),

  // =====================================================
  // Intel N-Series (Ultra-Budget / Embedded)
  // =====================================================
  cpu('N100', 49.99, '4 (0P+4E)', '4', '1.0 GHz', '3.4 GHz', 'BGA'),
  cpu('N200', 59.99, '4 (0P+4E)', '4', '1.0 GHz', '3.7 GHz', 'BGA'),
  cpu('N305', 79.99, '8 (0P+8E)', '8', '1.8 GHz', '3.8 GHz', 'BGA'),
];
