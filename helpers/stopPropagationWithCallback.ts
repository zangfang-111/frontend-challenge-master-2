import type React from 'react';

function stopPropagationWithCallback(
  e: React.MouseEvent<(HTMLButtonElement | HTMLLIElement), MouseEvent>,
  callback: (() => void) | undefined,
): void {
  e.stopPropagation();
  if (callback) {
    callback();
  }
}

export default stopPropagationWithCallback;
