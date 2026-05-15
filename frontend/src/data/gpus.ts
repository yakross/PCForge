import { Product } from "./components";

const NVIDIA_GPU_IMAGE = '/nvidia-gpu.png';
const AMD_GPU_IMAGE = '/amd-gpu.png';

const perf = (score: number, rec: string) => ({ performanceScore: score, recommendation: rec });

const gpu = (
  id: string, name: string, brand: string, price: number, image: string,
  score: number, rec: string,
  vram: string, core: string, boost: string, tdp: string, len: string
): Product => ({
  id, name, category: 'GPU', priceUSD: price, image, brand,
  performanceScore: score, recommendation: rec,
  specs: { VRAM: vram, CoreClock: core, BoostClock: boost, TDP: tdp, Length: len }
});

export const gpus: Product[] = [
  // ==========================================================
  // NVIDIA GeForce RTX 50 Series (Blackwell)
  // ==========================================================
  gpu('gpu-nv-5090', 'NVIDIA GeForce RTX 5090', 'NVIDIA', 1999.99, NVIDIA_GPU_IMAGE, 100, 'Tope de Gama', '32GB GDDR7', '2017 MHz', '2407 MHz', '575W', '340mm'),
  gpu('gpu-nv-5080', 'NVIDIA GeForce RTX 5080', 'NVIDIA', 999.99, NVIDIA_GPU_IMAGE, 92, 'Tope de Gama', '16GB GDDR7', '2291 MHz', '2617 MHz', '360W', '310mm'),
  gpu('gpu-nv-5070ti', 'NVIDIA GeForce RTX 5070 Ti', 'NVIDIA', 749.99, NVIDIA_GPU_IMAGE, 85, 'Excelente Rendimiento', '16GB GDDR7', '2252 MHz', '2452 MHz', '300W', '285mm'),
  gpu('gpu-nv-5070', 'NVIDIA GeForce RTX 5070', 'NVIDIA', 549.99, NVIDIA_GPU_IMAGE, 80, 'Excelente Rendimiento', '12GB GDDR7', '2162 MHz', '2512 MHz', '250W', '267mm'),
  gpu('gpu-nv-5060ti', 'NVIDIA GeForce RTX 5060 Ti', 'NVIDIA', 449.99, NVIDIA_GPU_IMAGE, 72, 'Muy recomendado', '16GB GDDR7', '2407 MHz', '2557 MHz', '180W', '240mm'),
  gpu('gpu-nv-5060', 'NVIDIA GeForce RTX 5060', 'NVIDIA', 299.99, NVIDIA_GPU_IMAGE, 65, 'Mejor Calidad/Precio', '8GB GDDR7', '2227 MHz', '2577 MHz', '150W', '240mm'),

  // ==========================================================
  // NVIDIA GeForce RTX 40 Series (Ada Lovelace)
  // ==========================================================
  gpu('gpu-nv-4090', 'NVIDIA GeForce RTX 4090', 'NVIDIA', 1599.99, NVIDIA_GPU_IMAGE, 95, 'Tope de Gama', '24GB GDDR6X', '2235 MHz', '2520 MHz', '450W', '336mm'),
  gpu('gpu-nv-4090d', 'NVIDIA GeForce RTX 4090 D', 'NVIDIA', 1499.99, NVIDIA_GPU_IMAGE, 93, 'Tope de Gama', '24GB GDDR6X', '2280 MHz', '2520 MHz', '425W', '336mm'),
  gpu('gpu-nv-4080s', 'NVIDIA GeForce RTX 4080 Super', 'NVIDIA', 999.99, NVIDIA_GPU_IMAGE, 88, 'Tope de Gama', '16GB GDDR6X', '2295 MHz', '2550 MHz', '320W', '310mm'),
  gpu('gpu-nv-4080', 'NVIDIA GeForce RTX 4080', 'NVIDIA', 949.99, NVIDIA_GPU_IMAGE, 86, 'Tope de Gama', '16GB GDDR6X', '2205 MHz', '2505 MHz', '320W', '310mm'),
  gpu('gpu-nv-4070tis', 'NVIDIA GeForce RTX 4070 Ti Super', 'NVIDIA', 799.99, NVIDIA_GPU_IMAGE, 82, 'Excelente Rendimiento', '16GB GDDR6X', '2340 MHz', '2610 MHz', '285W', '300mm'),
  gpu('gpu-nv-4070ti', 'NVIDIA GeForce RTX 4070 Ti', 'NVIDIA', 749.99, NVIDIA_GPU_IMAGE, 80, 'Excelente Rendimiento', '12GB GDDR6X', '2310 MHz', '2610 MHz', '285W', '300mm'),
  gpu('gpu-nv-4070s', 'NVIDIA GeForce RTX 4070 Super', 'NVIDIA', 599.99, NVIDIA_GPU_IMAGE, 76, 'Excelente Rendimiento', '12GB GDDR6X', '1980 MHz', '2475 MHz', '220W', '267mm'),
  gpu('gpu-nv-4070', 'NVIDIA GeForce RTX 4070', 'NVIDIA', 549.99, NVIDIA_GPU_IMAGE, 72, 'Muy recomendado', '12GB GDDR6X', '1920 MHz', '2475 MHz', '200W', '240mm'),
  gpu('gpu-nv-4060ti16', 'NVIDIA GeForce RTX 4060 Ti 16GB', 'NVIDIA', 449.99, NVIDIA_GPU_IMAGE, 68, 'Muy recomendado', '16GB GDDR6', '2310 MHz', '2535 MHz', '165W', '240mm'),
  gpu('gpu-nv-4060ti', 'NVIDIA GeForce RTX 4060 Ti 8GB', 'NVIDIA', 399.99, NVIDIA_GPU_IMAGE, 65, 'Muy recomendado', '8GB GDDR6', '2310 MHz', '2535 MHz', '160W', '240mm'),
  gpu('gpu-nv-4060', 'NVIDIA GeForce RTX 4060', 'NVIDIA', 299.99, NVIDIA_GPU_IMAGE, 58, 'Mejor Calidad/Precio', '8GB GDDR6', '1830 MHz', '2460 MHz', '115W', '240mm'),

  // ==========================================================
  // NVIDIA GeForce RTX 30 Series (Ampere)
  // ==========================================================
  gpu('gpu-nv-3090ti', 'NVIDIA GeForce RTX 3090 Ti', 'NVIDIA', 999.99, NVIDIA_GPU_IMAGE, 78, 'Aún vigente', '24GB GDDR6X', '1560 MHz', '1860 MHz', '450W', '336mm'),
  gpu('gpu-nv-3090', 'NVIDIA GeForce RTX 3090', 'NVIDIA', 899.99, NVIDIA_GPU_IMAGE, 76, 'Aún vigente', '24GB GDDR6X', '1395 MHz', '1695 MHz', '350W', '313mm'),
  gpu('gpu-nv-3080ti', 'NVIDIA GeForce RTX 3080 Ti', 'NVIDIA', 799.99, NVIDIA_GPU_IMAGE, 74, 'Aún vigente', '12GB GDDR6X', '1365 MHz', '1665 MHz', '350W', '285mm'),
  gpu('gpu-nv-3080-12', 'NVIDIA GeForce RTX 3080 12GB', 'NVIDIA', 649.99, NVIDIA_GPU_IMAGE, 72, 'Aún vigente', '12GB GDDR6X', '1440 MHz', '1710 MHz', '350W', '285mm'),
  gpu('gpu-nv-3080', 'NVIDIA GeForce RTX 3080 10GB', 'NVIDIA', 599.99, NVIDIA_GPU_IMAGE, 70, 'Aún vigente', '10GB GDDR6X', '1440 MHz', '1710 MHz', '320W', '285mm'),
  gpu('gpu-nv-3070ti', 'NVIDIA GeForce RTX 3070 Ti', 'NVIDIA', 499.99, NVIDIA_GPU_IMAGE, 64, 'Próximo a actualizar', '8GB GDDR6X', '1580 MHz', '1770 MHz', '290W', '267mm'),
  gpu('gpu-nv-3070', 'NVIDIA GeForce RTX 3070', 'NVIDIA', 449.99, NVIDIA_GPU_IMAGE, 62, 'Próximo a actualizar', '8GB GDDR6', '1500 MHz', '1730 MHz', '220W', '242mm'),
  gpu('gpu-nv-3060ti', 'NVIDIA GeForce RTX 3060 Ti', 'NVIDIA', 379.99, NVIDIA_GPU_IMAGE, 55, 'Próximo a actualizar', '8GB GDDR6', '1410 MHz', '1665 MHz', '200W', '242mm'),
  gpu('gpu-nv-3060', 'NVIDIA GeForce RTX 3060 12GB', 'NVIDIA', 329.99, NVIDIA_GPU_IMAGE, 48, 'Próximo a actualizar', '12GB GDDR6', '1320 MHz', '1777 MHz', '170W', '242mm'),
  gpu('gpu-nv-3050', 'NVIDIA GeForce RTX 3050 8GB', 'NVIDIA', 249.99, NVIDIA_GPU_IMAGE, 38, 'Próximo a actualizar', '8GB GDDR6', '1552 MHz', '1777 MHz', '130W', '229mm'),

  // ==========================================================
  // NVIDIA GeForce GTX 16 Series (Turing - Legacy)
  // ==========================================================
  gpu('gpu-nv-1660s', 'NVIDIA GeForce GTX 1660 Super', 'NVIDIA', 229.99, NVIDIA_GPU_IMAGE, 32, 'Próximo a actualizar', '6GB GDDR6', '1530 MHz', '1785 MHz', '125W', '229mm'),
  gpu('gpu-nv-1660', 'NVIDIA GeForce GTX 1660', 'NVIDIA', 199.99, NVIDIA_GPU_IMAGE, 28, 'Próximo a actualizar', '6GB GDDR5', '1530 MHz', '1785 MHz', '120W', '229mm'),
  gpu('gpu-nv-1650s', 'NVIDIA GeForce GTX 1650 Super', 'NVIDIA', 169.99, NVIDIA_GPU_IMAGE, 25, 'Uso Básico', '4GB GDDR6', '1530 MHz', '1725 MHz', '100W', '200mm'),
  gpu('gpu-nv-1650', 'NVIDIA GeForce GTX 1650', 'NVIDIA', 149.99, NVIDIA_GPU_IMAGE, 20, 'Uso Básico', '4GB GDDR6', '1485 MHz', '1665 MHz', '75W', '200mm'),
  gpu('gpu-nv-1630', 'NVIDIA GeForce GTX 1630', 'NVIDIA', 119.99, NVIDIA_GPU_IMAGE, 12, 'Uso Básico', '4GB GDDR6', '1740 MHz', '1785 MHz', '75W', '172mm'),

  // ==========================================================
  // AMD Radeon RX 9000 Series (RDNA 4)
  // ==========================================================
  gpu('gpu-amd-9070xt', 'AMD Radeon RX 9070 XT', 'AMD', 549.99, AMD_GPU_IMAGE, 82, 'Excelente Rendimiento', '16GB GDDR6', '2361 MHz', '2621 MHz', '300W', '276mm'),
  gpu('gpu-amd-9070', 'AMD Radeon RX 9070', 'AMD', 449.99, AMD_GPU_IMAGE, 75, 'Muy recomendado', '16GB GDDR6', '2250 MHz', '2519 MHz', '250W', '267mm'),
  gpu('gpu-amd-9060xt', 'AMD Radeon RX 9060 XT', 'AMD', 339.99, AMD_GPU_IMAGE, 65, 'Mejor Calidad/Precio', '16GB GDDR6', '2600 MHz', '2900 MHz', '150W', '230mm'),

  // ==========================================================
  // AMD Radeon RX 7000 Series (RDNA 3)
  // ==========================================================
  gpu('gpu-amd-7900xtx', 'AMD Radeon RX 7900 XTX', 'AMD', 949.99, AMD_GPU_IMAGE, 90, 'Tope de Gama', '24GB GDDR6', '2300 MHz', '2500 MHz', '355W', '287mm'),
  gpu('gpu-amd-7900xt', 'AMD Radeon RX 7900 XT', 'AMD', 799.99, AMD_GPU_IMAGE, 85, 'Tope de Gama', '20GB GDDR6', '2000 MHz', '2400 MHz', '315W', '276mm'),
  gpu('gpu-amd-7900gre', 'AMD Radeon RX 7900 GRE', 'AMD', 549.99, AMD_GPU_IMAGE, 78, 'Excelente Rendimiento', '16GB GDDR6', '1880 MHz', '2245 MHz', '260W', '276mm'),
  gpu('gpu-amd-7800xt', 'AMD Radeon RX 7800 XT', 'AMD', 499.99, AMD_GPU_IMAGE, 75, 'Mejor Calidad/Precio', '16GB GDDR6', '2124 MHz', '2430 MHz', '263W', '267mm'),
  gpu('gpu-amd-7700xt', 'AMD Radeon RX 7700 XT', 'AMD', 449.99, AMD_GPU_IMAGE, 68, 'Muy recomendado', '12GB GDDR6', '2171 MHz', '2544 MHz', '245W', '267mm'),
  gpu('gpu-amd-7600xt', 'AMD Radeon RX 7600 XT', 'AMD', 329.99, AMD_GPU_IMAGE, 58, 'Mejor Calidad/Precio', '16GB GDDR6', '2470 MHz', '2755 MHz', '150W', '204mm'),
  gpu('gpu-amd-7600', 'AMD Radeon RX 7600', 'AMD', 269.99, AMD_GPU_IMAGE, 52, 'Mejor Calidad/Precio', '8GB GDDR6', '2250 MHz', '2625 MHz', '165W', '204mm'),

  // ==========================================================
  // AMD Radeon RX 6000 Series (RDNA 2)
  // ==========================================================
  gpu('gpu-amd-6950xt', 'AMD Radeon RX 6950 XT', 'AMD', 699.99, AMD_GPU_IMAGE, 75, 'Aún vigente', '16GB GDDR6', '2100 MHz', '2310 MHz', '335W', '267mm'),
  gpu('gpu-amd-6900xt', 'AMD Radeon RX 6900 XT', 'AMD', 599.99, AMD_GPU_IMAGE, 72, 'Aún vigente', '16GB GDDR6', '2015 MHz', '2250 MHz', '300W', '267mm'),
  gpu('gpu-amd-6800xt', 'AMD Radeon RX 6800 XT', 'AMD', 499.99, AMD_GPU_IMAGE, 68, 'Aún vigente', '16GB GDDR6', '2015 MHz', '2250 MHz', '300W', '267mm'),
  gpu('gpu-amd-6800', 'AMD Radeon RX 6800', 'AMD', 449.99, AMD_GPU_IMAGE, 65, 'Próximo a actualizar', '16GB GDDR6', '1815 MHz', '2105 MHz', '250W', '267mm'),
  gpu('gpu-amd-6750xt', 'AMD Radeon RX 6750 XT', 'AMD', 399.99, AMD_GPU_IMAGE, 58, 'Próximo a actualizar', '12GB GDDR6', '2150 MHz', '2600 MHz', '250W', '267mm'),
  gpu('gpu-amd-6700xt', 'AMD Radeon RX 6700 XT', 'AMD', 379.99, AMD_GPU_IMAGE, 55, 'Próximo a actualizar', '12GB GDDR6', '2321 MHz', '2581 MHz', '230W', '267mm'),
  gpu('gpu-amd-6700-10', 'AMD Radeon RX 6700 10GB', 'AMD', 329.99, AMD_GPU_IMAGE, 50, 'Próximo a actualizar', '10GB GDDR6', '2175 MHz', '2450 MHz', '175W', '240mm'),
  gpu('gpu-amd-6650xt', 'AMD Radeon RX 6650 XT', 'AMD', 299.99, AMD_GPU_IMAGE, 48, 'Próximo a actualizar', '8GB GDDR6', '2410 MHz', '2635 MHz', '180W', '242mm'),
  gpu('gpu-amd-6600xt', 'AMD Radeon RX 6600 XT', 'AMD', 279.99, AMD_GPU_IMAGE, 45, 'Próximo a actualizar', '8GB GDDR6', '2359 MHz', '2589 MHz', '160W', '242mm'),
  gpu('gpu-amd-6600', 'AMD Radeon RX 6600', 'AMD', 249.99, AMD_GPU_IMAGE, 42, 'Próximo a actualizar', '8GB GDDR6', '2044 MHz', '2491 MHz', '132W', '204mm'),
  gpu('gpu-amd-6500xt', 'AMD Radeon RX 6500 XT', 'AMD', 169.99, AMD_GPU_IMAGE, 25, 'Uso Básico', '4GB GDDR6', '2610 MHz', '2815 MHz', '107W', '193mm'),
  gpu('gpu-amd-6400', 'AMD Radeon RX 6400', 'AMD', 139.99, AMD_GPU_IMAGE, 18, 'Uso Básico', '4GB GDDR6', '2039 MHz', '2321 MHz', '53W', '172mm'),

  // ==========================================================
  // Intel Arc (Discrete GPUs)
  // ==========================================================
  gpu('gpu-intel-b580', 'Intel Arc B580', 'Intel', 249.99, NVIDIA_GPU_IMAGE, 55, 'Mejor Calidad/Precio', '12GB GDDR6', '2670 MHz', '2670 MHz', '150W', '267mm'),
  gpu('gpu-intel-b570', 'Intel Arc B570', 'Intel', 219.99, NVIDIA_GPU_IMAGE, 48, 'Mejor Calidad/Precio', '10GB GDDR6', '2500 MHz', '2500 MHz', '150W', '250mm'),
  gpu('gpu-intel-a770', 'Intel Arc A770 16GB', 'Intel', 299.99, NVIDIA_GPU_IMAGE, 50, 'Aún vigente', '16GB GDDR6', '2100 MHz', '2400 MHz', '225W', '267mm'),
  gpu('gpu-intel-a750', 'Intel Arc A750', 'Intel', 229.99, NVIDIA_GPU_IMAGE, 45, 'Aún vigente', '8GB GDDR6', '2050 MHz', '2400 MHz', '225W', '267mm'),
  gpu('gpu-intel-a580', 'Intel Arc A580', 'Intel', 179.99, NVIDIA_GPU_IMAGE, 38, 'Aún vigente', '8GB GDDR6', '1700 MHz', '2000 MHz', '185W', '267mm'),
  gpu('gpu-intel-a380', 'Intel Arc A380', 'Intel', 109.99, NVIDIA_GPU_IMAGE, 15, 'Uso Básico', '6GB GDDR6', '2000 MHz', '2000 MHz', '75W', '200mm'),
];
