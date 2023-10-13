const Loading = () => {
  return (
    <div
      className={`fixed inset-x-0 bottom-0 flex h-[200px] w-full items-center justify-center overflow-x-auto md:left-0 md:h-[90vh] md:w-72 md:overflow-y-scroll md:bg-white lg:w-[470px]`}
    >
      <div className="border-blue-500 h-16 w-16 animate-spin rounded-full border-t-4 border-solid"></div>

      <div className="ml-2 text-base">Loading....</div>
    </div>
  );
};

export default Loading;
