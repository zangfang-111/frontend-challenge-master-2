function TagSideBar(): JSX.Element {
  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 64px)' }}>
      <div className="col-span-full xl:col-start-1 xl:col-span-3 relative bg-gray-50 pt-5 pl-2 text-gray-600 text-sm pb-7 h-5/6 overflow-y-scroll">
        <p>
          Sidebar goes here.
          <br />
          Not relevant for this test assignment.
        </p>
      </div>
    </div>
  );
}

export default TagSideBar;
