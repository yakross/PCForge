import { Product } from "./components";

const CASE_IMAGE = 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=600&h=600';

const cs = (
  id: string, name: string, brand: string, price: number,
  score: number, rec: string,
  type: string, color: string, sidePanel: string, fans: string
): Product => ({
  id, name, category: 'Case', priceUSD: price, image: CASE_IMAGE, brand,
  performanceScore: score, recommendation: rec,
  specs: { Type: type, Color: color, SidePanel: sidePanel, FansIncluded: fans }
});

export const cases: Product[] = [
  // ==========================================================
  // Premium Cases (Lian Li, Hyte, Corsair 7000)
  // ==========================================================
  cs('cs-ll-o11dx', 'Lian Li PC-O11 Dynamic EVO XL', 'Lian Li', 234.99, 98, 'Tope de Gama', 'Full Tower', 'Negro', 'Vidrio Templado', '0'),
  cs('cs-ll-o11dv', 'Lian Li O11 Vision', 'Lian Li', 139.99, 95, 'Tope de Gama', 'Mid Tower', 'Chrome', 'Vidrio Templado (3 lados)', '0'),
  cs('cs-hy-y70', 'Hyte Y70 Touch', 'Hyte', 359.99, 99, 'Tope de Gama', 'Mid Tower', 'Rojo/Negro', 'Vidrio + Pantalla 4K', '0'),
  cs('cs-cors-7000d', 'Corsair 7000D AIRFLOW', 'Corsair', 244.99, 92, 'Excelente Rendimiento', 'Full Tower', 'Blanco', 'Vidrio Templado', '3'),
  cs('cs-phan-nv7', 'Phanteks NV7', 'Phanteks', 219.99, 94, 'Excelente Rendimiento', 'Full Tower', 'Negro', 'Vidrio Templado', '0'),

  // ==========================================================
  // High Airflow / Popular (Mid Tower)
  // ==========================================================
  cs('cs-ll-216', 'Lian Li LANCOOL 216', 'Lian Li', 99.99, 90, 'Excelente Rendimiento', 'Mid Tower', 'Negro', 'Vidrio Templado', '3'),
  cs('cs-nz-h9-flow', 'NZXT H9 Flow', 'NZXT', 159.99, 88, 'Excelente Rendimiento', 'Mid Tower', 'Blanco', 'Vidrio Templado', '4'),
  cs('cs-nz-h7-flow', 'NZXT H7 Flow (2024)', 'NZXT', 129.99, 85, 'Excelente Rendimiento', 'Mid Tower', 'Negro', 'Vidrio Templado', '3'),
  cs('cs-frac-torr', 'Fractal Design Torrent', 'Fractal Design', 189.99, 92, 'Excelente Rendimiento', 'Mid Tower', 'Negro', 'Vidrio Templado', '5'),
  cs('cs-frac-north', 'Fractal Design North', 'Fractal Design', 139.99, 88, 'Estética Premium', 'Mid Tower', 'Carbón/Nogal', 'Malla/Madera', '2'),
  cs('cs-cors-4000d', 'Corsair 4000D Airflow', 'Corsair', 89.99, 82, 'Muy recomendado', 'Mid Tower', 'Negro', 'Vidrio Templado', '2'),
  cs('cs-cors-5000d', 'Corsair 5000D Airflow', 'Corsair', 149.99, 85, 'Muy recomendado', 'Mid Tower', 'Blanco', 'Vidrio Templado', '2'),

  // ==========================================================
  // Budget / mATX
  // ==========================================================
  cs('cs-nz-h5-flow', 'NZXT H5 Flow', 'NZXT', 89.99, 78, 'Muy recomendado', 'Mid Tower', 'Negro', 'Vidrio Templado', '2'),
  cs('cs-cool-q300l', 'Cooler Master MasterBox Q300L', 'Cooler Master', 39.99, 50, 'Mejor Calidad/Precio', 'mATX', 'Negro', 'Acrílico', '1'),
  cs('cs-deep-cc560', 'Deepcool CC560', 'Deepcool', 54.99, 65, 'Mejor Calidad/Precio', 'Mid Tower', 'Negro', 'Vidrio Templado', '4'),
  cs('cs-mon-x3', 'Montech X3 Mesh', 'Montech', 59.99, 68, 'Mejor Calidad/Precio', 'Mid Tower', 'Negro', 'Vidrio Templado', '6'),
  cs('cs-therm-v200', 'Thermaltake V200 TG RGB', 'Thermaltake', 74.99, 60, 'Mejor Calidad/Precio', 'Mid Tower', 'Negro', 'Vidrio Templado', '3'),

  // ==========================================================
  // SFF / ITX
  // ==========================================================
  cs('cs-frac-terra', 'Fractal Design Terra', 'Fractal Design', 179.99, 90, 'Estética Premium', 'Mini ITX', 'Jade', 'Aluminio', '0'),
  cs('cs-cool-nr200p', 'Cooler Master MasterBox NR200P', 'Cooler Master', 109.99, 85, 'Muy recomendado', 'Mini ITX', 'Blanco', 'Vidrio/Malla', '2'),
  cs('cs-ssupd-mesh', 'SSUPD Meshlicious', 'SSUPD', 159.99, 82, 'Excelente Rendimiento', 'Mini ITX', 'Negro', 'Malla', '0'),
];
