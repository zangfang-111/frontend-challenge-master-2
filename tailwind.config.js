module.exports = {
  content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xs: '375px',
      tb: '470px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '2560px',
    },
    fontFamily: {
      inter: ['Inter'],
    },
    extend: {
      spacing: {
        45: '2.8rem',
      },
      width: {
        21: '21rem',
        timeline: '52rem',
        'chart-modal': '50rem',
        'image-sample': '7.5rem',
        'integration-checkbox': '56.25rem',
      },
      height: {
        'content-upsell-image--sm': '22rem',
        'content-upsell-image--2xl': '30rem',
        'content-upsell-image--xl': '23rem',
        'image-sample': '7.5rem',
      },
      minWidth: {
        16: '16.938rem',
        'note-preview': '20rem',
        'mention-hover': '8rem',
        'active-log-hover': '25rem',
        'pipeline-title': '14rem',
        circle: '1.2rem',
      },
      maxWidth: {
        'timeline-image': '7rem',
      },
      maxHeight: {
        'search-filters': '25rem',
        'integration-modal': '37.5rem',
      },
      minHeight: {
        table: '32rem',
        circle: '1.2rem',
      },
      fontSize: {
        xxs: '10px',
      },
      margin: {
        'edit-mode-buttons': '8px',
      },
      inset: {
        'tooltip-hover-4.5': '4.5rem',
        'tooltip-hover-6.5': '6.5rem',
      },
    },
  },
  plugins: [],
};
