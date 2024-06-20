import type React from 'react';

export type ButtonProps = {
  label: string;
  styleType: 'primary' | 'secondary' | 'neutral' | 'disabled' | 'active' | 'delete' | 'neutralDisabled' | "textButton";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  additionalClasses?: string;
  disabled?: boolean;
  icon?: JSX.Element;
};
