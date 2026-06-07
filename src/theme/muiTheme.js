// muiTheme.js — SRS §2.5 — MUI override strategy
// MUI se usa SOLO como base de accesibilidad y comportamiento.
// Todos los estilos visuales se sobreescriben — ningún estilo MUI por defecto visible.

import { createTheme } from '@mui/material';

export const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0A0A0A', // --color-bg
      paper: '#111111',   // --color-bg-elevated
    },
    primary: {
      main: '#C8F04D', // --color-accent-hot — CTA único
    },
    secondary: {
      main: '#4D7CFF', // --color-accent-mid — links activos
    },
    text: {
      primary: '#F0EDE8',   // --color-text-primary
      secondary: '#8A8680', // --color-text-secondary
    },
    divider: 'rgba(240, 237, 232, 0.08)', // --color-border
  },

  typography: {
    fontFamily: '"DM Sans", system-ui, sans-serif',
    // Tamaños se manejan vía CSS variables en typography.css
  },

  shape: {
    borderRadius: 0, // Estética sharp — sin rounded corners por defecto
  },

  // Overrides críticos — SRS §2.5
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: 'none',
          letterSpacing: '0.08em',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '13px',
          '&:focus-visible': {
            outline: '2px solid #C8F04D',
            outlineOffset: '2px',
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            fontFamily: '"DM Sans", sans-serif',
            '& fieldset': {
              borderColor: 'rgba(240, 237, 232, 0.08)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(240, 237, 232, 0.20)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#C8F04D',
              borderWidth: '1px',
            },
          },
          '& .MuiInputLabel-root': {
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '11px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          },
        },
      },
    },

    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0A0A0A',
          color: '#F0EDE8',
        },
      },
    },

    // Sin ripple effect — inconsistente con estética del proyecto
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});
