import React, { createRef, useCallback, useEffect, useState } from 'react';
import useLocalStorage from 'hooks/useLocalStorage';
import CenterPanel from './CenterPanel';
import LeftPanel from './LeftPanel';

type ResizedContainerPropsType = {
  left: React.ReactElement;
  center: React.ReactElement;
  right: React.ReactElement;
};

function ResizedContainer({ left, center, right }: ResizedContainerPropsType): JSX.Element {
  const [centerWidth, setCenterWidth] = useLocalStorage('centerWidth', undefined);
  const [leftWidth, setLeftWidth] = useLocalStorage('leftWidth', undefined);
  const [separatorXPosition, setSeparatorXPosition] = useState<undefined | number>(undefined);

  const splitPaneRef = createRef<HTMLDivElement>();

  const [rightLineDragging, setRightLineDragging] = useState(false);
  const [leftLineDragging, setLeftLineDragging] = useState(false);

  const CENTER_MIN_WIDTH = 50;
  const LEFT_MIN_WIDTH = 10;

  const onRightLineTouchStart = (e: React.TouchEvent) => {
    setSeparatorXPosition(e.touches[0].clientX);
    setRightLineDragging(true);
  };

  const onLeftLineTouchStart = (e: React.TouchEvent) => {
    setSeparatorXPosition(e.touches[0].clientX);
    setLeftLineDragging(true);
  };

  const onRightLineMove = (clientX: number) => {
    if (rightLineDragging && centerWidth && separatorXPosition) {
      const newCenterWidth = centerWidth + clientX - separatorXPosition;
      setSeparatorXPosition(clientX);

      if (newCenterWidth < CENTER_MIN_WIDTH) {
        setCenterWidth(CENTER_MIN_WIDTH);
        return;
      }

      if (splitPaneRef.current) {
        const splitPaneWidth = splitPaneRef.current.clientWidth;
        const maxWidth = splitPaneWidth - CENTER_MIN_WIDTH;

        if (newCenterWidth > maxWidth) {
          setCenterWidth(maxWidth);
          return;
        }
      }

      setCenterWidth(newCenterWidth);
    }
  };

  const onLeftLineMove = (clientX: number) => {
    if (leftLineDragging && leftWidth && separatorXPosition) {
      const newLeftWidth = leftWidth + clientX - separatorXPosition;
      setSeparatorXPosition(clientX);

      if (newLeftWidth < LEFT_MIN_WIDTH) {
        setLeftWidth(LEFT_MIN_WIDTH);
        return;
      }

      if (splitPaneRef.current) {
        const splitPaneWidth = splitPaneRef.current.clientWidth;

        if (newLeftWidth > splitPaneWidth - LEFT_MIN_WIDTH) {
          setLeftWidth(splitPaneWidth - LEFT_MIN_WIDTH);
          return;
        }
      }

      setLeftWidth(newLeftWidth);
    }
  };

  const onRightLineTouchMove = (e: TouchEvent) => {
    onRightLineMove(e.touches[0].clientX);
  };

  const onLeftLineTouchMove = (e: TouchEvent) => {
    onLeftLineMove(e.touches[0].clientX);
  };

  const onRightLineMouseDown = (e: React.MouseEvent) => {
    setSeparatorXPosition(e.clientX);
    setRightLineDragging(true);
  };
  const onLeftLineMouseDown = (e: React.MouseEvent) => {
    setSeparatorXPosition(e.clientX);
    setLeftLineDragging(true);
  };

  const onRightLineMouseMove = useCallback(
    (e: MouseEvent) => {
      if (rightLineDragging) e.preventDefault();
      onRightLineMove(e.clientX);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rightLineDragging],
  );

  const onLeftLineMouseMove = useCallback(
    (e: MouseEvent) => {
      if (leftLineDragging) e.preventDefault();
      onLeftLineMove(e.clientX);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [leftLineDragging],
  );

  const onRightLineMouseUp = useCallback(() => {
    setSeparatorXPosition(undefined);
    setRightLineDragging(false);
  }, [setRightLineDragging]);

  const onLeftLineMouseUp = useCallback(() => {
    setSeparatorXPosition(undefined);
    setLeftLineDragging(false);
  }, [setLeftLineDragging]);

  useEffect(() => {
    document.addEventListener('mousemove', onRightLineMouseMove);
    document.addEventListener('touchmove', onRightLineTouchMove);
    document.addEventListener('mouseup', onRightLineMouseUp);

    return () => {
      document.removeEventListener('mousemove', onRightLineMouseMove);
      document.removeEventListener('touchmove', onRightLineTouchMove);
      document.removeEventListener('mouseup', onRightLineMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onRightLineMouseMove, onRightLineMouseUp]);

  useEffect(() => {
    document.addEventListener('mousemove', onLeftLineMouseMove);
    document.addEventListener('touchmove', onLeftLineTouchMove);
    document.addEventListener('mouseup', onLeftLineMouseUp);

    return () => {
      document.removeEventListener('mousemove', onLeftLineMouseMove);
      document.removeEventListener('touchmove', onLeftLineTouchMove);
      document.removeEventListener('mouseup', onLeftLineMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onLeftLineMouseMove, onLeftLineMouseUp]);

  return (
    <div ref={splitPaneRef} className="h-full flex items-start">
      <LeftPanel leftWidth={leftWidth} setLeftWidth={setLeftWidth}>
        {left}
      </LeftPanel>
      <div
        className="cursor-ew-resize self-stretch flex items-center py-0 pr-1"
        onMouseDown={onLeftLineMouseDown}
        onTouchStart={onLeftLineTouchStart}
        onTouchEnd={onLeftLineMouseUp}
        aria-hidden
      >
        <div className="w-2 bg-gray-50 p-1 h-full border-r border-gray-200 " />
      </div>
      <CenterPanel centerWidth={centerWidth} setCenterWidth={setCenterWidth}>
        {center}
      </CenterPanel>
      <div
        className="cursor-ew-resize self-stretch flex items-center py-0 pl-1"
        onMouseDown={onRightLineMouseDown}
        onTouchStart={onRightLineTouchStart}
        onTouchEnd={onRightLineMouseUp}
        aria-hidden
      >
        <div className="w-2 bg-gray-50 p-1 h-full border-l border-gray-200" />
      </div>
      <div className="flex-1">{right}</div>
    </div>
  );
}

export default ResizedContainer;
