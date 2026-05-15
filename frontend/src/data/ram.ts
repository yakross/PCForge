import { Product } from "./components";

const RAM_IMAGE = '/ram-module.png';

const ram = (
  id: string, name: string, brand: string, price: number,
  score: number, rec: string,
  type: string, speed: string, modules: string, capacity: string, latency: string, rgb: boolean
): Product => ({
  id, name, category: 'RAM', priceUSD: price, image: RAM_IMAGE, brand,
  performanceScore: score, recommendation: rec,
  specs: { Type: type, Speed: speed, Modules: modules, Capacity: capacity, Latency: latency, RGB: rgb ? 'Sí' : 'No' }
});

export const ramModules: Product[] = [
  // ==========================================================
  // === DDR5 — Corsair ===
  // ==========================================================
  ram('ram-c-dom-96-7200', 'Corsair Dominator Titanium RGB 96GB (2x48GB) DDR5-7200', 'Corsair', 549.99, 95, 'Tope de Gama', 'DDR5', '7200 MHz', '2x48GB', '96GB', 'CL34', true),
  ram('ram-c-dom-64-7200', 'Corsair Dominator Platinum RGB 64GB (2x32GB) DDR5-7200', 'Corsair', 389.99, 90, 'Tope de Gama', 'DDR5', '7200 MHz', '2x32GB', '64GB', 'CL34', true),
  ram('ram-c-dom-32-7200', 'Corsair Dominator Platinum RGB 32GB (2x16GB) DDR5-7200', 'Corsair', 219.99, 85, 'Tope de Gama', 'DDR5', '7200 MHz', '2x16GB', '32GB', 'CL34', true),
  ram('ram-c-ven-64-6400', 'Corsair Vengeance RGB 64GB (2x32GB) DDR5-6400', 'Corsair', 289.99, 82, 'Excelente Rendimiento', 'DDR5', '6400 MHz', '2x32GB', '64GB', 'CL32', true),
  ram('ram-c-ven-32-6400', 'Corsair Vengeance RGB 32GB (2x16GB) DDR5-6400', 'Corsair', 139.99, 78, 'Excelente Rendimiento', 'DDR5', '6400 MHz', '2x16GB', '32GB', 'CL32', true),
  ram('ram-c-ven-32-6000', 'Corsair Vengeance RGB 32GB (2x16GB) DDR5-6000', 'Corsair', 119.99, 75, 'Muy recomendado', 'DDR5', '6000 MHz', '2x16GB', '32GB', 'CL30', true),
  ram('ram-c-ven-32-5600', 'Corsair Vengeance 32GB (2x16GB) DDR5-5600', 'Corsair', 89.99, 68, 'Muy recomendado', 'DDR5', '5600 MHz', '2x16GB', '32GB', 'CL36', false),
  ram('ram-c-ven-16-5600', 'Corsair Vengeance 16GB (2x8GB) DDR5-5600', 'Corsair', 54.99, 58, 'Aún vigente', 'DDR5', '5600 MHz', '2x8GB', '16GB', 'CL36', false),
  ram('ram-c-ven-16-4800', 'Corsair Vengeance 16GB (2x8GB) DDR5-4800', 'Corsair', 42.99, 48, 'Aún vigente', 'DDR5', '4800 MHz', '2x8GB', '16GB', 'CL40', false),

  // ==========================================================
  // === DDR5 — G.Skill ===
  // ==========================================================
  ram('ram-gs-tz5-64-8000', 'G.Skill Trident Z5 Royal RGB 64GB (2x32GB) DDR5-8000', 'G.Skill', 599.99, 98, 'Tope de Gama', 'DDR5', '8000 MHz', '2x32GB', '64GB', 'CL38', true),
  ram('ram-gs-tz5-64-7600', 'G.Skill Trident Z5 RGB 64GB (2x32GB) DDR5-7600', 'G.Skill', 449.99, 92, 'Tope de Gama', 'DDR5', '7600 MHz', '2x32GB', '64GB', 'CL36', true),
  ram('ram-gs-tz5-32-7600', 'G.Skill Trident Z5 RGB 32GB (2x16GB) DDR5-7600', 'G.Skill', 199.99, 88, 'Tope de Gama', 'DDR5', '7600 MHz', '2x16GB', '32GB', 'CL36', true),
  ram('ram-gs-tz5-64-6400', 'G.Skill Trident Z5 RGB 64GB (2x32GB) DDR5-6400', 'G.Skill', 279.99, 82, 'Excelente Rendimiento', 'DDR5', '6400 MHz', '2x32GB', '64GB', 'CL32', true),
  ram('ram-gs-tz5-32-6400', 'G.Skill Trident Z5 RGB 32GB (2x16GB) DDR5-6400', 'G.Skill', 149.99, 78, 'Excelente Rendimiento', 'DDR5', '6400 MHz', '2x16GB', '32GB', 'CL32', true),
  ram('ram-gs-tz5-32-6000', 'G.Skill Trident Z5 RGB 32GB (2x16GB) DDR5-6000', 'G.Skill', 119.99, 75, 'Muy recomendado', 'DDR5', '6000 MHz', '2x16GB', '32GB', 'CL30', true),
  ram('ram-gs-fl5-32-6000', 'G.Skill Flare X5 32GB (2x16GB) DDR5-6000', 'G.Skill', 99.99, 72, 'Muy recomendado', 'DDR5', '6000 MHz', '2x16GB', '32GB', 'CL30', false),
  ram('ram-gs-rip5-32-5600', 'G.Skill Ripjaws S5 32GB (2x16GB) DDR5-5600', 'G.Skill', 79.99, 65, 'Muy recomendado', 'DDR5', '5600 MHz', '2x16GB', '32GB', 'CL30', false),
  ram('ram-gs-rip5-16-5600', 'G.Skill Ripjaws S5 16GB (2x8GB) DDR5-5600', 'G.Skill', 44.99, 55, 'Aún vigente', 'DDR5', '5600 MHz', '2x8GB', '16GB', 'CL30', false),

  // ==========================================================
  // === DDR5 — Kingston ===
  // ==========================================================
  ram('ram-k-ren-96-7200', 'Kingston FURY Renegade RGB 96GB (2x48GB) DDR5-7200', 'Kingston', 499.99, 92, 'Tope de Gama', 'DDR5', '7200 MHz', '2x48GB', '96GB', 'CL38', true),
  ram('ram-k-ren-64-6400', 'Kingston FURY Renegade RGB 64GB (2x32GB) DDR5-6400', 'Kingston', 329.99, 82, 'Excelente Rendimiento', 'DDR5', '6400 MHz', '2x32GB', '64GB', 'CL32', true),
  ram('ram-k-ren-32-6400', 'Kingston FURY Renegade RGB 32GB (2x16GB) DDR5-6400', 'Kingston', 159.99, 78, 'Excelente Rendimiento', 'DDR5', '6400 MHz', '2x16GB', '32GB', 'CL32', true),
  ram('ram-k-beast-32-6000r', 'Kingston FURY Beast RGB 32GB (2x16GB) DDR5-6000', 'Kingston', 109.99, 72, 'Muy recomendado', 'DDR5', '6000 MHz', '2x16GB', '32GB', 'CL30', true),
  ram('ram-k-beast-32-5600', 'Kingston FURY Beast 32GB (2x16GB) DDR5-5600', 'Kingston', 84.99, 65, 'Muy recomendado', 'DDR5', '5600 MHz', '2x16GB', '32GB', 'CL36', false),
  ram('ram-k-beast-16-5600', 'Kingston FURY Beast 16GB (2x8GB) DDR5-5600', 'Kingston', 49.99, 55, 'Aún vigente', 'DDR5', '5600 MHz', '2x8GB', '16GB', 'CL36', false),
  ram('ram-k-beast-16-4800', 'Kingston FURY Beast 16GB (2x8GB) DDR5-4800', 'Kingston', 39.99, 45, 'Aún vigente', 'DDR5', '4800 MHz', '2x8GB', '16GB', 'CL38', false),

  // ==========================================================
  // === DDR5 — Crucial ===
  // ==========================================================
  ram('ram-cr-pro-oc-32-6000', 'Crucial Pro Overclocking 32GB (2x16GB) DDR5-6000', 'Crucial', 99.99, 72, 'Muy recomendado', 'DDR5', '6000 MHz', '2x16GB', '32GB', 'CL36', false),
  ram('ram-cr-pro-32-5600', 'Crucial Pro 32GB (2x16GB) DDR5-5600', 'Crucial', 69.99, 62, 'Mejor Calidad/Precio', 'DDR5', '5600 MHz', '2x16GB', '32GB', 'CL46', false),
  ram('ram-cr-16-5600', 'Crucial 16GB (2x8GB) DDR5-5600', 'Crucial', 39.99, 52, 'Mejor Calidad/Precio', 'DDR5', '5600 MHz', '2x8GB', '16GB', 'CL46', false),
  ram('ram-cr-16-4800', 'Crucial 16GB (2x8GB) DDR5-4800', 'Crucial', 34.99, 45, 'Mejor Calidad/Precio', 'DDR5', '4800 MHz', '2x8GB', '16GB', 'CL40', false),
  ram('ram-cr-8-4800', 'Crucial 8GB (1x8GB) DDR5-4800', 'Crucial', 19.99, 30, 'Uso Básico', 'DDR5', '4800 MHz', '1x8GB', '8GB', 'CL40', false),

  // ==========================================================
  // === DDR5 — TeamGroup ===
  // ==========================================================
  ram('ram-tg-delta-64-7200', 'TeamGroup T-Force Delta RGB 64GB (2x32GB) DDR5-7200', 'TeamGroup', 329.99, 88, 'Tope de Gama', 'DDR5', '7200 MHz', '2x32GB', '64GB', 'CL34', true),
  ram('ram-tg-delta-32-7200', 'TeamGroup T-Force Delta RGB 32GB (2x16GB) DDR5-7200', 'TeamGroup', 154.99, 85, 'Tope de Gama', 'DDR5', '7200 MHz', '2x16GB', '32GB', 'CL34', true),
  ram('ram-tg-delta-32-6400', 'TeamGroup T-Force Delta RGB 32GB (2x16GB) DDR5-6400', 'TeamGroup', 119.99, 78, 'Excelente Rendimiento', 'DDR5', '6400 MHz', '2x16GB', '32GB', 'CL32', true),
  ram('ram-tg-delta-32-6000', 'TeamGroup T-Force Delta RGB 32GB (2x16GB) DDR5-6000', 'TeamGroup', 99.99, 72, 'Muy recomendado', 'DDR5', '6000 MHz', '2x16GB', '32GB', 'CL30', true),
  ram('ram-tg-vulcan-32-5600', 'TeamGroup T-Force Vulcan 32GB (2x16GB) DDR5-5600', 'TeamGroup', 69.99, 62, 'Mejor Calidad/Precio', 'DDR5', '5600 MHz', '2x16GB', '32GB', 'CL36', false),
  ram('ram-tg-vulcan-16-5600', 'TeamGroup T-Force Vulcan 16GB (2x8GB) DDR5-5600', 'TeamGroup', 39.99, 52, 'Mejor Calidad/Precio', 'DDR5', '5600 MHz', '2x8GB', '16GB', 'CL36', false),

  // ==========================================================
  // === DDR5 — Lexar ===
  // ==========================================================
  ram('ram-lex-ares-32-6400', 'Lexar ARES RGB 32GB (2x16GB) DDR5-6400', 'Lexar', 109.99, 75, 'Muy recomendado', 'DDR5', '6400 MHz', '2x16GB', '32GB', 'CL32', true),
  ram('ram-lex-ares-32-6000', 'Lexar ARES RGB 32GB (2x16GB) DDR5-6000', 'Lexar', 89.99, 70, 'Muy recomendado', 'DDR5', '6000 MHz', '2x16GB', '32GB', 'CL30', true),
  ram('ram-lex-thor-32-5600', 'Lexar Thor 32GB (2x16GB) DDR5-5600', 'Lexar', 64.99, 60, 'Mejor Calidad/Precio', 'DDR5', '5600 MHz', '2x16GB', '32GB', 'CL36', false),

  // ==========================================================
  // === DDR4 — Corsair ===
  // ==========================================================
  ram('ram-c-vrgb4-64-3600', 'Corsair Vengeance RGB Pro SL 64GB (2x32GB) DDR4-3600', 'Corsair', 149.99, 55, 'Aún vigente', 'DDR4', '3600 MHz', '2x32GB', '64GB', 'CL18', true),
  ram('ram-c-vrgb4-32-3600', 'Corsair Vengeance RGB Pro 32GB (2x16GB) DDR4-3600', 'Corsair', 79.99, 50, 'Aún vigente', 'DDR4', '3600 MHz', '2x16GB', '32GB', 'CL18', true),
  ram('ram-c-vrgb4-32-3200', 'Corsair Vengeance RGB Pro 32GB (2x16GB) DDR4-3200', 'Corsair', 64.99, 45, 'Aún vigente', 'DDR4', '3200 MHz', '2x16GB', '32GB', 'CL16', true),
  ram('ram-c-vlpx4-32-3200', 'Corsair Vengeance LPX 32GB (2x16GB) DDR4-3200', 'Corsair', 54.99, 42, 'Próximo a actualizar', 'DDR4', '3200 MHz', '2x16GB', '32GB', 'CL16', false),
  ram('ram-c-vlpx4-16-3200', 'Corsair Vengeance LPX 16GB (2x8GB) DDR4-3200', 'Corsair', 39.99, 38, 'Próximo a actualizar', 'DDR4', '3200 MHz', '2x8GB', '16GB', 'CL16', false),
  ram('ram-c-vlpx4-16-2666', 'Corsair Vengeance LPX 16GB (2x8GB) DDR4-2666', 'Corsair', 29.99, 28, 'Próximo a actualizar', 'DDR4', '2666 MHz', '2x8GB', '16GB', 'CL16', false),
  ram('ram-c-val4-8-2666', 'Corsair ValueSelect 8GB (1x8GB) DDR4-2666', 'Corsair', 17.99, 15, 'Uso Básico', 'DDR4', '2666 MHz', '1x8GB', '8GB', 'CL18', false),

  // ==========================================================
  // === DDR4 — G.Skill ===
  // ==========================================================
  ram('ram-gs-tz4-64-3600', 'G.Skill Trident Z Neo RGB 64GB (2x32GB) DDR4-3600', 'G.Skill', 159.99, 55, 'Aún vigente', 'DDR4', '3600 MHz', '2x32GB', '64GB', 'CL16', true),
  ram('ram-gs-tz4-32-3600', 'G.Skill Trident Z RGB 32GB (2x16GB) DDR4-3600', 'G.Skill', 84.99, 50, 'Aún vigente', 'DDR4', '3600 MHz', '2x16GB', '32GB', 'CL16', true),
  ram('ram-gs-tz4-32-3200', 'G.Skill Trident Z RGB 32GB (2x16GB) DDR4-3200', 'G.Skill', 69.99, 45, 'Aún vigente', 'DDR4', '3200 MHz', '2x16GB', '32GB', 'CL16', true),
  ram('ram-gs-rip4-32-3200', 'G.Skill Ripjaws V 32GB (2x16GB) DDR4-3200', 'G.Skill', 49.99, 42, 'Próximo a actualizar', 'DDR4', '3200 MHz', '2x16GB', '32GB', 'CL16', false),
  ram('ram-gs-rip4-16-3600', 'G.Skill Ripjaws V 16GB (2x8GB) DDR4-3600', 'G.Skill', 39.99, 40, 'Próximo a actualizar', 'DDR4', '3600 MHz', '2x8GB', '16GB', 'CL18', false),
  ram('ram-gs-rip4-16-3200', 'G.Skill Ripjaws V 16GB (2x8GB) DDR4-3200', 'G.Skill', 32.99, 38, 'Próximo a actualizar', 'DDR4', '3200 MHz', '2x8GB', '16GB', 'CL16', false),
  ram('ram-gs-rip4-8-3200', 'G.Skill Ripjaws V 8GB (1x8GB) DDR4-3200', 'G.Skill', 18.99, 20, 'Uso Básico', 'DDR4', '3200 MHz', '1x8GB', '8GB', 'CL16', false),

  // ==========================================================
  // === DDR4 — Kingston ===
  // ==========================================================
  ram('ram-k-fb4-64-3600', 'Kingston FURY Beast RGB 64GB (2x32GB) DDR4-3600', 'Kingston', 139.99, 55, 'Aún vigente', 'DDR4', '3600 MHz', '2x32GB', '64GB', 'CL18', true),
  ram('ram-k-fb4-32-3600', 'Kingston FURY Beast RGB 32GB (2x16GB) DDR4-3600', 'Kingston', 74.99, 50, 'Aún vigente', 'DDR4', '3600 MHz', '2x16GB', '32GB', 'CL18', true),
  ram('ram-k-fb4-32-3200', 'Kingston FURY Beast 32GB (2x16GB) DDR4-3200', 'Kingston', 59.99, 42, 'Próximo a actualizar', 'DDR4', '3200 MHz', '2x16GB', '32GB', 'CL16', false),
  ram('ram-k-fb4-16-3200', 'Kingston FURY Beast 16GB (2x8GB) DDR4-3200', 'Kingston', 34.99, 38, 'Próximo a actualizar', 'DDR4', '3200 MHz', '2x8GB', '16GB', 'CL16', false),
  ram('ram-k-fb4-16-2666', 'Kingston FURY Beast 16GB (2x8GB) DDR4-2666', 'Kingston', 27.99, 28, 'Próximo a actualizar', 'DDR4', '2666 MHz', '2x8GB', '16GB', 'CL16', false),
  ram('ram-k-val4-8-2666', 'Kingston ValueRAM 8GB (1x8GB) DDR4-2666', 'Kingston', 14.99, 12, 'Uso Básico', 'DDR4', '2666 MHz', '1x8GB', '8GB', 'CL19', false),
  ram('ram-k-val4-4-2666', 'Kingston ValueRAM 4GB (1x4GB) DDR4-2666', 'Kingston', 9.99, 8, 'Uso Básico', 'DDR4', '2666 MHz', '1x4GB', '4GB', 'CL19', false),

  // ==========================================================
  // === DDR4 — TeamGroup ===
  // ==========================================================
  ram('ram-tg-delta4-32-3600', 'TeamGroup T-Force Delta RGB 32GB (2x16GB) DDR4-3600', 'TeamGroup', 69.99, 50, 'Aún vigente', 'DDR4', '3600 MHz', '2x16GB', '32GB', 'CL18', true),
  ram('ram-tg-delta4-16-3200', 'TeamGroup T-Force Delta RGB 16GB (2x8GB) DDR4-3200', 'TeamGroup', 39.99, 38, 'Próximo a actualizar', 'DDR4', '3200 MHz', '2x8GB', '16GB', 'CL16', true),
  ram('ram-tg-vulcan4-16-3200', 'TeamGroup T-Force Vulcan Z 16GB (2x8GB) DDR4-3200', 'TeamGroup', 27.99, 35, 'Próximo a actualizar', 'DDR4', '3200 MHz', '2x8GB', '16GB', 'CL16', false),
  ram('ram-tg-elite4-8-2666', 'TeamGroup Elite 8GB (1x8GB) DDR4-2666', 'TeamGroup', 13.99, 12, 'Uso Básico', 'DDR4', '2666 MHz', '1x8GB', '8GB', 'CL19', false),

  // ==========================================================
  // === DDR4 — Crucial ===
  // ==========================================================
  ram('ram-cr-bx4-32-3200', 'Crucial Ballistix 32GB (2x16GB) DDR4-3200', 'Crucial', 54.99, 42, 'Próximo a actualizar', 'DDR4', '3200 MHz', '2x16GB', '32GB', 'CL16', false),
  ram('ram-cr-bx4-16-3200', 'Crucial Ballistix 16GB (2x8GB) DDR4-3200', 'Crucial', 34.99, 38, 'Próximo a actualizar', 'DDR4', '3200 MHz', '2x8GB', '16GB', 'CL16', false),
  ram('ram-cr-bx4-16-3600', 'Crucial Ballistix RGB 16GB (2x8GB) DDR4-3600', 'Crucial', 44.99, 42, 'Aún vigente', 'DDR4', '3600 MHz', '2x8GB', '16GB', 'CL16', true),
  ram('ram-cr-val4-8-2666', 'Crucial 8GB (1x8GB) DDR4-2666', 'Crucial', 14.99, 12, 'Uso Básico', 'DDR4', '2666 MHz', '1x8GB', '8GB', 'CL19', false),
  ram('ram-cr-val4-4-2666', 'Crucial 4GB (1x4GB) DDR4-2666', 'Crucial', 8.99, 5, 'Uso Básico', 'DDR4', '2666 MHz', '1x4GB', '4GB', 'CL19', false),
];
