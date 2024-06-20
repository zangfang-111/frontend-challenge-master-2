import React from 'react';

function Spinner(): JSX.Element {
  return (
    <div className="pt-56 mt-12">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <div
            style={{ borderTopColor: 'transparent' }}
            className="w-12 h-12 border-4 border-gray-200 border-solid rounded-full animate-spin spinner"
          />
        </div>
      </div>
    </div>
  );
}

export default Spinner;
