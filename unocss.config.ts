import { defineConfig, presetWind3, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [presetWind3()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      brand: 'var(--lb-brand)',
      label: 'var(--lb-brand-label)',
      heading: 'var(--lb-h)',
      body: 'var(--vp-c-text-1)',
      muted: 'var(--vp-c-text-2)',
      faint: 'var(--vp-c-text-3)',
      surface: 'var(--lb-surface)',
      edge: 'var(--lb-border)',
      up: 'var(--up-color)',
      down: 'var(--down-color)'
    }
  }
})
