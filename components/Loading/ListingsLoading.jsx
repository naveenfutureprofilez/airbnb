const ListingsLoading = ({ divider = 5, css = "w-[calc(100%/2-50px)]" }) => {
  return (
    <div className={`${divider === 5 ? "w-full sm:w-3/6 md:w-2/6 sm:px-3 mb-8" : css }`} >
      <div className="rounded-xl bg-borderColor w-full min-h-[250px] h-[calc(50vh/5+10px)] mb-4"></div>
      <div className="mb-1 flex items-center justify-between">
        <div className="h-6 rounded w-7/12 bg-borderColor"></div>
        <div className="h-6 rounded w-16 bg-borderColor"></div>
      </div>
      <div className="mb-1 h-6 rounded w-5/12 bg-borderColor"></div>
      <div className="mb-1 h-6 rounded w-4/12 bg-borderColor"></div>
      <div className="mb-1 h-6 rounded w-2/12 bg-borderColor"></div>
    </div>
  );
};

const TableLoading = () => {
  return (
    <div className="w-full bg-white flex items-center justify-center z-50 h-auto gap-8">
  <div className="bg-white rounded-lg list-gstr overflow-hidden flex animate-pulse w-full h-auto">
    <div className="w-[350px] max-h-[300px] bg-gray-200 relative">
    </div>
    <div className="w-8/12 p-6">
      <div className="h-5 bg-gray-300 rounded mb-[12px] min-w-[1050px]"></div>
      <div className="h-5 bg-gray-300 rounded mb-[12px] min-w-[1050px]"></div>
      {/* <div className="h-8 bg-gray-300 rounded mb-[15px] w-[250px]"></div> */}

      <div className="flex h-8 mb-[25px] bg-gray-300 w-[500px] rounded">
        {/* <div className="mb-2 pr-[40px]">
          <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        </div>
        <div className="mb-2 px-[40px] border-x">
          <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        </div>
        <div className="mb-2 pl-[40px]">
          <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        </div>
        <div className="mb-2 pl-[40px]">
          <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        </div>
        <div className="mb-2 pl-[40px]">
          <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        </div> */}
      </div>

      <div className="h-16 bg-gray-300 rounded min-w-[1050px]"></div>
      {/* <div className="h-4 bg-gray-300 rounded w-full"></div> */}
    </div>
  </div>
</div>
  );
};

export { ListingsLoading, TableLoading };
