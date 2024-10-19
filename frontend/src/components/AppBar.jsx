export function AppBar() {
  return (
    <div className="shadow h-14 flex justify-between font-medium">
      <div className="flex flex-col justify-center ml-4">PayTM App</div>
      <div className="flex">
        <div className="flex flex-col justify-center mr-4">Hello</div>
        <div className="flex justify-center rounded-full h-12 w-12 bg-slate-200 mt-1 mr-2">
          <div className="flex flex-col justify-center text-xl">U</div>
        </div>
      </div>
    </div>
  );
}
