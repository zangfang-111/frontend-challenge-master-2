import React from 'react';

function ProfileDetailsWrap(): JSX.Element {
  return (
    <div
      className="col-span-full xl:col-start-4 xl:col-span-3 overflow-y-scroll bg-gray-50 pl-7 pr-9"
      style={{ height: 'calc(100vh - 64px)' }}
    >
      <p className='pt-4'>
        Profile goes here. <br />
        Not relevant for this test assignment
      </p>
    </div>
  );
}

export default ProfileDetailsWrap;
