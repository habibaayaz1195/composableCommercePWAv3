import { keyframes } from '@emotion/react';

export const breathe = keyframes`
  0% { opacity: 0.4; }
  50% { opacity: 1; }
  100% { opacity: 0.4; }
`;

export const breathingAnimation = `${breathe} 1.5s ease-in-out infinite`;