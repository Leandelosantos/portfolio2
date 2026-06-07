// TransitionLink.jsx — <a> que intercepta click para page transition animada
// Mantiene href real para a11y y middle-click (nueva pestaña)

import { usePageTransition } from '../../context/PageTransitionContext';

export function TransitionLink({ to, children, onClick, ...props }) {
  const { transitionTo } = usePageTransition();

  const handleClick = (e) => {
    // Permitir modificadores (Ctrl/Cmd + click → nueva pestaña)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onClick?.(e);
    transitionTo(to);
  };

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
