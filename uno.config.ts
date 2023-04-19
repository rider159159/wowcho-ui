import { defineConfig } from '@unocss/vite';
import presetUno from '@unocss/preset-uno';

// 先不使用 presetAttributify
export default defineConfig({
  exclude: ['node_modules', 'dist', '.git', 'public'],
  presets: [
    presetUno(),
  ],
  // rules: [
  //   // 文字顏色搭配 theme
  //   [/^text-(.*)$/, ([, c], { theme }) => {
  //     if (theme.colors[c])
  //       return { color: theme.colors[c] }
  //   }],
  //   // 背景顏色搭配 theme
  //   [/^bg-(.*)$/, function bgColor([, c], { theme }) {
  //     if (theme.colors[c]) return { 'background-color': theme.colors[c] };
  //     return false;
  //   }],
  // ],
  theme: {
    colors: {
      'brand1': '#2378BF',
      'brand2': '#369CF0',
      'brand3': '#70BEFB',
      'brand4': '#ECF7FF',
      'gray1': '#1F2225',
      'gray2': '#636466',
      'gray3': '#BDBEC2',
      'gray4': '##EFEFEF',
      'line': '#C2D7EA',
    },
    fontSize: {
      h1: '40px',
      h2: '32px',
      h3: '28px',
      h4: '24px',
      h5: '20px',
      h6: '16px',
    },
    lineHeight:{
      h1: '48px',
      h2: '38px',
      h3: '34px',
      h4: '28px',
      h5: '24px',
      h6: '20px',
    }
  }
})