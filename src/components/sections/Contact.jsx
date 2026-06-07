// Contact.jsx — SRS §4.6 — Sección de contacto
// Headline: "Iniciemos el diálogo." (Figma — aprobado)
// Canal 1: formulario EmailJS con react-hook-form
// Canal 2: WhatsApp deeplink
// GSAP: entrance dramático — yPercent 100 clip para headline
// buenas-practicas §3: useGSAP, solo transform + opacity; gsap.to en handlers OK

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import emailjs from '@emailjs/browser';
import { TextField, Button } from '@mui/material';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const WA_NUMBER = '5491168116492';
const WA_MSG = encodeURIComponent(
  'Hola! Vi tu portfolio y me gustaría hablar de un proyecto.'
);
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

// TextField sx — override completo, sin estilos MUI por defecto
const textFieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 0,
    fontFamily: 'var(--font-ui)',
    fontSize: 'var(--type-body)',
    fontWeight: 300,
    color: 'var(--color-text-primary)',
    backgroundColor: 'transparent',
    '& fieldset': { borderColor: 'var(--color-border)' },
    '&:hover fieldset': { borderColor: 'var(--color-border-hover)' },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--color-accent-hot)',
      borderWidth: '1px',
    },
  },
  '& .MuiInputLabel-root': {
    fontFamily: 'var(--font-mono)',
    fontSize: '13px',
    letterSpacing: 'var(--ls-mono)',
    color: 'var(--color-text-secondary)',
    '&.Mui-focused': { color: 'var(--color-accent-hot)' },
  },
  '& .MuiFormHelperText-root': {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    letterSpacing: 'var(--ls-mono)',
  },
};

export function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          once: true,
        },
      });

      tl.from('.contact__big-text', {
        yPercent: 100,
        duration: 1,
        ease: 'expo.out',
      })
        .from(
          '.contact__form-wrap',
          { opacity: 0, y: 40, duration: 0.6 },
          '-=0.4'
        )
        .from(
          '.contact__wa-block',
          { opacity: 0, scale: 0.95, duration: 0.5, ease: 'back.out(1.7)' },
          '-=0.3'
        );
    },
    { scope: sectionRef }
  );

  const onSubmit = async (data) => {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      // EmailJS no configurado — shake form
      gsap.to(formRef.current, {
        keyframes: { x: [-8, 8, -6, 6, -3, 3, 0] },
        duration: 0.5,
        ease: 'power2.inOut',
      });
      setStatus('error');
      return;
    }

    setStatus('sending');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
      gsap.to(formRef.current, {
        keyframes: { x: [-8, 8, -6, 6, -3, 3, 0] },
        duration: 0.5,
        ease: 'power2.inOut',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contacto"
      aria-label="Contacto"
      style={{
        padding: 'clamp(80px, 12vh, 140px) clamp(24px, 6vw, 80px)',
        backgroundColor: 'var(--color-bg-subtle)',
        overflow: 'hidden',
      }}
    >
      {/* Headline — overflow:hidden en padre para el clip de yPercent */}
      <div style={{ overflow: 'hidden', marginBottom: 'clamp(3rem, 6vh, 5rem)' }}>
        <h2
          className="contact__big-text"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 6.5vw, 96px)',
            fontWeight: 900,
            color: 'var(--color-text-primary)',
            margin: 0,
            lineHeight: 1.0,
          }}
        >
          Iniciemos el diálogo.
        </h2>
      </div>

      {/* Dos columnas */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: 'clamp(3rem, 6vw, 6rem)',
          alignItems: 'start',
        }}
      >
        {/* Canal 1 — Formulario */}
        <div className="contact__form-wrap">
          <p style={channelLabelStyle}>01 — Formulario</p>

          <form ref={formRef} onSubmit={handleSubmit(onSubmit)} noValidate>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <TextField
                label="Nombre"
                fullWidth
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name?.message}
                sx={textFieldSx}
                {...register('name', { required: 'Nombre requerido' })}
              />
              <TextField
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={textFieldSx}
                {...register('email', {
                  required: 'Email requerido',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Email inválido',
                  },
                })}
              />
              <TextField
                label="Mensaje"
                fullWidth
                multiline
                rows={5}
                variant="outlined"
                error={!!errors.message}
                helperText={errors.message?.message}
                sx={textFieldSx}
                {...register('message', {
                  required: 'Mensaje requerido',
                  minLength: { value: 10, message: 'Mínimo 10 caracteres' },
                })}
              />

              <Button
                type="submit"
                variant="contained"
                disableElevation
                disabled={status === 'sending'}
                sx={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--type-mono)',
                  letterSpacing: 'var(--ls-mono)',
                  textTransform: 'uppercase',
                  borderRadius: 0,
                  px: 3,
                  py: 1.5,
                  alignSelf: 'flex-start',
                  '&:focus-visible': {
                    outline: '2px solid var(--color-accent-hot)',
                    outlineOffset: '2px',
                  },
                }}
              >
                {status === 'sending' ? 'Enviando...' : 'Enviar'}
              </Button>

              {status === 'success' && (
                <p role="alert" style={{ ...feedbackStyle, color: 'var(--color-accent-hot)' }}>
                  ✓ Mensaje enviado. Te respondo pronto.
                </p>
              )}
              {status === 'error' && (
                // #FF6B6B: rojo de error — excepción justificada, no está en paleta SRS
                <p role="alert" style={{ ...feedbackStyle, color: '#FF6B6B' }}>
                  Error al enviar. Escribime por WhatsApp.
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Canal 2 — WhatsApp */}
        <div className="contact__wa-block">
          <p style={channelLabelStyle}>02 — WhatsApp</p>

          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              padding: 'clamp(1.25rem, 3vw, 2rem) clamp(1.5rem, 4vw, 2.5rem)',
              border: '1px solid var(--color-border)',
              textDecoration: 'none',
              transition: 'border-color 0.3s ease, background-color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border-hover)';
              e.currentTarget.style.backgroundColor = 'var(--color-bg-elevated)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#25D366"
              aria-hidden="true"
              style={{ flexShrink: 0 }}
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 'var(--type-body)',
                  fontWeight: 500,
                  color: 'var(--color-text-primary)',
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                Escribime directo
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--color-text-secondary)',
                  margin: '4px 0 0',
                  letterSpacing: 'var(--ls-mono)',
                }}
              >
                Respuesta en &lt; 24h
              </p>
            </div>
          </a>

          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'var(--type-body)',
              fontWeight: 300,
              color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
              margin: '2rem 0 0',
              maxWidth: '38ch',
            }}
          >
            Proyectos, consultas, colaboraciones — cualquier conversación que valga la pena iniciar.
          </p>
        </div>
      </div>
    </section>
  );
}

const channelLabelStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--type-mono)',
  color: 'var(--color-text-secondary)',
  letterSpacing: 'var(--ls-mono)',
  textTransform: 'uppercase',
  margin: '0 0 2rem',
};

const feedbackStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--type-mono)',
  margin: 0,
  letterSpacing: 'var(--ls-mono)',
};
