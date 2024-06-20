import React, { createRef, useEffect } from 'react';

type LeftPanelPropsType = {
  leftWidth: number | undefined;
  setLeftWidth: (value: number) => void;
  children: React.ReactNode;
};

function LeftPanel({ children, leftWidth, setLeftWidth }: LeftPanelPropsType): JSX.Element {
  const leftRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const percentageMaxWidth = 18;
    const screenWidth = window.screen.width; // total px across width
    const maxWidth = Math.round((percentageMaxWidth / 100) * screenWidth);

    const percentageMinWidth = 10;
    const minWidth = Math.round((percentageMinWidth / 100) * screenWidth);

    if (leftRef.current) {
      if (!leftWidth) {
        setLeftWidth(leftRef.current?.clientWidth);
        return;
      }
      // Set max width
      if (leftWidth > maxWidth) {
        setLeftWidth(maxWidth);
      }

      // Set min width
      if (leftWidth < minWidth) {
        setLeftWidth(minWidth);
      }

      leftRef.current.style.width = `${leftWidth}px`;
    }
  }, [leftRef, leftWidth, setLeftWidth]);

  return <div ref={leftRef}>{children}</div>;
}

export default LeftPanel;
