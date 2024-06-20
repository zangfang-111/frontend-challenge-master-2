import type React from 'react';

export type TitleProps = {
  children: React.ReactNode;
  type?: 'title' | 'subtitle' | 'heading' | 'subheading';
  as?: keyof JSX.IntrinsicElements;
};
