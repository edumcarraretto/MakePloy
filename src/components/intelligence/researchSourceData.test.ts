import { describe, expect, it } from 'vitest'
import { RESEARCH_SCENES } from './researchSourceData'

describe('fontes ilustrativas por ideia', () => {
  it('usa 100 sites diferentes por ideia, sem repetir nomes ou domínios entre ideias', () => {
    const names = new Set<string>()
    const domains = new Set<string>()

    expect(RESEARCH_SCENES).toHaveLength(5)

    for (const scene of RESEARCH_SCENES) {
      expect(scene.sources).toHaveLength(100)

      for (const source of scene.sources) {
        const hostname = new URL(source.url).hostname.toLowerCase().replace(/^www\d?\./, '')
        const parts = hostname.split('.')
        const threePartSuffixes = ['com.br', 'co.uk', 'com.au', 'com.ar', 'com.mx', 'co.nz', 'co.za', 'com.tr', 'co.jp']
        const domain = parts.slice(threePartSuffixes.includes(parts.slice(-2).join('.')) ? -3 : -2).join('.')
        const name = source.name.toLocaleLowerCase('en').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        expect(names.has(name)).toBe(false)
        expect(domains.has(domain)).toBe(false)
        names.add(name)
        domains.add(domain)
      }
    }

    expect(names.size).toBe(500)
    expect(domains.size).toBe(500)
  })
})
