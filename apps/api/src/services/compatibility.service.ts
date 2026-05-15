import { prisma } from '../config/database'

export type CompatStatus = 'ok' | 'warning' | 'error' | 'info'

export interface CompatCheck {
  id: string
  status: CompatStatus
  message: string
  components: string[]
  details?: string
}

export interface BuildCompatResult {
  overallStatus: CompatStatus
  score: number
  checks: CompatCheck[]
  estimatedTdp: number
  recommendedPsu: number
}

interface BuildComponent {
  id: string
  name: string
  category: string
  socket?: string | null
  formFactor?: string | null
  memoryType?: string | null
  wattage?: number | null
  tdp?: number | null
}

/**
 * Core compatibility engine.
 * Validates a set of PC components for compatibility issues.
 */
export async function checkBuildCompatibility(
  productIds: string[]
): Promise<BuildCompatResult> {
  if (productIds.length === 0) {
    return { overallStatus: 'info', score: 100, checks: [], estimatedTdp: 0, recommendedPsu: 550 }
  }

  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
    select: {
      id: true,
      name: true,
      category: true,
      socket: true,
      formFactor: true,
      memoryType: true,
      wattage: true,
      tdp: true,
    },
  })

  const byCategory = Object.fromEntries(
    products.map((p) => [p.category, p])
  ) as Record<string, BuildComponent>

  const checks: CompatCheck[] = []

  // ─── CPU ↔ Motherboard Socket ─────────────────────────────────────────────
  const cpu = byCategory['CPU']
  const mb = byCategory['MOTHERBOARD']

  if (cpu && mb) {
    if (cpu.socket && mb.socket) {
      if (cpu.socket === mb.socket) {
        checks.push({
          id: 'cpu-mb-socket',
          status: 'ok',
          message: `Socket compatible: ${cpu.socket}`,
          components: [cpu.id, mb.id],
          details: `${cpu.name} and ${mb.name} both use ${cpu.socket}`,
        })
      } else {
        checks.push({
          id: 'cpu-mb-socket',
          status: 'error',
          message: `Socket incompatible: CPU uses ${cpu.socket}, MB uses ${mb.socket}`,
          components: [cpu.id, mb.id],
          details: 'You need a motherboard with the same socket as your CPU.',
        })
      }
    }
  } else if (cpu && !mb) {
    checks.push({
      id: 'cpu-mb-missing',
      status: 'info',
      message: 'Add a motherboard to verify socket compatibility',
      components: [cpu.id],
    })
  }

  // ─── RAM ↔ Motherboard DDR Type ───────────────────────────────────────────
  const ram = byCategory['RAM']

  if (ram && mb) {
    if (ram.memoryType && mb.memoryType) {
      if (ram.memoryType === mb.memoryType) {
        checks.push({
          id: 'ram-mb-ddr',
          status: 'ok',
          message: `RAM type compatible: ${ram.memoryType}`,
          components: [ram.id, mb.id],
        })
      } else {
        checks.push({
          id: 'ram-mb-ddr',
          status: 'error',
          message: `RAM type mismatch: RAM is ${ram.memoryType}, MB supports ${mb.memoryType}`,
          components: [ram.id, mb.id],
          details: `${mb.name} requires ${mb.memoryType} memory. ${ram.name} is ${ram.memoryType}.`,
        })
      }
    }
  }

  // ─── RAM ↔ CPU DDR Type ───────────────────────────────────────────────────
  if (ram && cpu) {
    // AM5 requires DDR5; LGA1700 supports DDR4 or DDR5 depending on the board
    const am5RequiresDdr5 = cpu.socket === 'AM5'
    if (am5RequiresDdr5 && ram.memoryType === 'DDR4') {
      checks.push({
        id: 'ram-cpu-ddr',
        status: 'error',
        message: 'AM5 platform requires DDR5 memory',
        components: [cpu.id, ram.id],
        details: 'AMD Ryzen 7000/9000 series (AM5) only supports DDR5.',
      })
    }
  }

  // ─── PSU Wattage ──────────────────────────────────────────────────────────
  const psu = byCategory['PSU']
  const gpu = byCategory['GPU']
  const cooling = byCategory['COOLING']

  const tdpComponents = [cpu, gpu, cooling].filter(Boolean)
  const estimatedTdp =
    tdpComponents.reduce((sum, c) => sum + (c?.tdp ?? 0), 0) +
    (ram ? 15 : 0) +
    50 // base system (fans, drives, etc.)

  const recommendedPsu = Math.ceil((estimatedTdp * 1.3) / 50) * 50 // 30% headroom, rounded to 50W

  if (psu && psu.wattage) {
    if (psu.wattage >= estimatedTdp + 100) {
      checks.push({
        id: 'psu-wattage',
        status: 'ok',
        message: `PSU ${psu.wattage}W is sufficient (est. ~${estimatedTdp}W load)`,
        components: [psu.id],
        details: `${Math.round(((psu.wattage - estimatedTdp) / psu.wattage) * 100)}% headroom for stability and future upgrades.`,
      })
    } else if (psu.wattage >= estimatedTdp) {
      checks.push({
        id: 'psu-wattage',
        status: 'warning',
        message: `PSU is tight: ${psu.wattage}W for ~${estimatedTdp}W system`,
        components: [psu.id],
        details: `Recommended: ${recommendedPsu}W or more for safe operation.`,
      })
    } else {
      checks.push({
        id: 'psu-wattage',
        status: 'error',
        message: `PSU insufficient: ${psu.wattage}W cannot power ~${estimatedTdp}W system`,
        components: [psu.id],
        details: `Upgrade to at least ${recommendedPsu}W PSU.`,
      })
    }
  } else if (estimatedTdp > 0) {
    checks.push({
      id: 'psu-missing',
      status: 'warning',
      message: `Estimated system TDP: ~${estimatedTdp}W. Recommended PSU: ${recommendedPsu}W+`,
      components: tdpComponents.map((c) => c!.id),
    })
  }

  // ─── Case Form Factor ─────────────────────────────────────────────────────
  const pcCase = byCategory['CASE']

  if (pcCase && mb) {
    const formFactorHierarchy: Record<string, string[]> = {
      'Full Tower': ['ATX', 'mATX', 'ITX', 'E-ATX'],
      'Mid Tower': ['ATX', 'mATX', 'ITX'],
      'Mini Tower': ['mATX', 'ITX'],
      'Mini-ITX': ['ITX'],
    }
    const caseFF = pcCase.formFactor ?? ''
    const mbFF = mb.formFactor ?? ''
    const supported = formFactorHierarchy[caseFF] ?? []

    if (supported.length > 0 && mbFF) {
      if (supported.includes(mbFF)) {
        checks.push({
          id: 'case-mb-formfactor',
          status: 'ok',
          message: `Form factor compatible: ${mbFF} fits in ${caseFF}`,
          components: [pcCase.id, mb.id],
        })
      } else {
        checks.push({
          id: 'case-mb-formfactor',
          status: 'error',
          message: `Form factor mismatch: ${caseFF} case won't fit ${mbFF} motherboard`,
          components: [pcCase.id, mb.id],
          details: `${caseFF} supports: ${supported.join(', ')}`,
        })
      }
    }
  }

  // ─── No issues found ──────────────────────────────────────────────────────
  if (products.length >= 3 && checks.every((c) => c.status === 'ok')) {
    checks.push({
      id: 'all-clear',
      status: 'ok',
      message: 'All compatibility checks passed!',
      components: products.map((p) => p.id),
    })
  }

  // ─── Score Calculation ────────────────────────────────────────────────────
  const errorCount = checks.filter((c) => c.status === 'error').length
  const warningCount = checks.filter((c) => c.status === 'warning').length
  const score = Math.max(0, 100 - errorCount * 30 - warningCount * 10)

  const overallStatus: CompatStatus =
    errorCount > 0 ? 'error' : warningCount > 0 ? 'warning' : 'ok'

  return { overallStatus, score, checks, estimatedTdp, recommendedPsu }
}
