import React from 'react';
import type { TitleProps } from './Title.types';

function getTitleClasses(type: string): string {
  switch (type) {
    case 'title':
      return 'text-3xl';
    case 'subtitle':
      return 'text-2xl';
    case 'heading':
      return 'text-xl';
    case 'subheading':
      return 'text-lg';
    default:
      return 'text-3xl';
  }
}

function Title({ children, type = 'title', as: TitleElement = 'h1' }: TitleProps): JSX.Element {
  return <TitleElement className={`${getTitleClasses(type)}`}>{children}</TitleElement>;
}

export default Title;
