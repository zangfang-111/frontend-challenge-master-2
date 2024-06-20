import React from 'react';
import { type ButtonProps } from './Button.types';

function getButtonClasses(styleType: string): string {
  switch (styleType) {
    case 'primary':
      return 'inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-base shadow-sm text-white bg-indigo-600 hover:bg-indigo-700';
    case 'secondary':
      return 'inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-sm text-indigo-700 bg-indigo-100 hover:bg-indigo-200';
    case 'neutral':
      return 'inline-flex items-center justify-center px-4 py-2 border border-indigo-300 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-sm text-indigo-700 bg-transparent hover:bg-indigo-100';
    case 'neutralDisabled':
      return 'inline-flex items-center justify-center px-4 py-2 border border-indigo-300 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-sm text-indigo-700 bg-transparent hover:border-gray-400 hover:cursor-not-allowed hover:text-gray-400';
    case 'disabled':
      return 'inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-sm text-gray-400 bg-gray-200 cursor-not-allowed';
    case 'active':
      return 'inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md outline-none text-white bg-indigo-600 text-sm';
    case 'delete':
      return 'inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 text-base shadow-sm text-white bg-red-600 hover:bg-red-700';
    case 'textButton':
      return 'inline-flex items-center justify-center rounded-md text-xs text-indigo-600 hover:text-indigo-800';
    default:
      return 'inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-base shadow-sm text-white bg-indigo-600 hover:bg-indigo-700';
  }
}

function Button({
  label,
  styleType,
  onClick,
  additionalClasses,
  disabled = false,
  icon,
}: ButtonProps): JSX.Element {
  return (
    <button
      className={`${getButtonClasses(styleType)} ${additionalClasses}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
      {icon && icon}
    </button>
  );
}

export default Button;
