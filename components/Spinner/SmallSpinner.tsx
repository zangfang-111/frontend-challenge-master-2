import React from 'react';

function SmallSpinner(): JSX.Element {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center">
        <div
          style={{ borderTopColor: 'transparent' }}
          className="w-7 h-7 border-4 border-indigo-300 border-solid rounded-full animate-spin"
        />
      </div>
    </div>
  );
}

export default SmallSpinner;
