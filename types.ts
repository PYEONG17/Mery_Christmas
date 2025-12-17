export enum Scene {
  SETUP = 0,
  ACTION = 1,
  CLIMAX = 2
}

export interface ComicButtonProps {
  onClick: () => void;
  text: string;
  variant?: 'primary' | 'danger' | 'success';
  className?: string;
}

export interface SpeechBubbleProps {
  text: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  speaker?: string;
  className?: string;
}