import { defineConfig } from '@unocss/vite'
import presetUno from '@unocss/preset-uno'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'

// 先不使用 presetAttributify
export default defineConfig({
  exclude: ['node_modules', 'dist', '.git', 'public'],
  presets: [
    presetUno()
  ],
  rules: [
    ['rounded-5xl', {
      'border-radius': '2.5rem'
    }],
    ['jagged-top', {
      'background': 'linear-gradient(45deg, #fff 25%, transparent 25%) 0 50px , linear-gradient(-45deg, white 25%, transparent 25%) 0 50px',
      'background-size': '20px 30px',
      'background-color': '#fff0',
      'height': '18px',
      'filter': 'drop-shadow(rgba(28, 88, 151, 0.2) 0px -2px 1.3px)'
    }],    
    ['jagged-bottom', {
      'background': 'linear-gradient(135deg, white 25%, transparent 25%) -50px 0, linear-gradient(225deg, white 25%, transparent 25%) -50px 0, linear-gradient(315deg, white 25%, transparent 25%), linear-gradient(45deg, white 25%, transparent 25%)',
      'background-size': '20px 30px',
      'background-color': '#fff0',
      'height': '18px',
      'filter': 'drop-shadow(rgba(28, 88, 151, 0.2) 0px 2px 1.3px)'
    }]
  ],
  // 有紅底線但能正常使用，是 unocss 本身的 error
  transformers: [
    transformerDirectives(),
    transformerVariantGroup()
  ],
  theme: {
    colors: {
      brand: {
        1: '#2378BF',
        2: '#369CF0',
        3: '#70BEFB',
        4: '#ECF7FF'
      },
      gray: {
        1: '#1F2225',
        2: '#636466',
        3: '#BDBEC2',
        4: '#EFEFEF'
      },
      line: '#C2D7EA'
    },
    fontSize: {
      h1: '40px',
      h2: '32px',
      h3: '28px',
      h4: '24px',
      h5: '20px',
      h6: '16px'
    },
    lineHeight: {
      h1: '48px',
      h2: '38px',
      h3: '34px',
      h4: '28px',
      h5: '24px',
      h6: '20px'
    }
  },
  shortcuts: {
    'itemList': 'mb-10px',
  }
})
