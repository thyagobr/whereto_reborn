import { DrawerMenu } from "./DrawerMenu/DrawerMenu";

export const Header = () => {
  return (
    <>
      <div className="md:hidden bg-card border-slate-800 border-b-[1px] shadow-lg fixed z-40 top-0 w-full mx-auto flex flex-row items-center justify-between h-[49px]">
        <div className="w-3/4 flex flex-row gap-5 my-2 ml-2">
          <DrawerMenu />
        </div>
      </div>
      <div className="h-[49px] md:hidden" />
    </>
  );
};
