import { DrawerMenu } from "./DrawerMenu/DrawerMenu";

export const Header = () => {
  return (
    <div className="w-full max-w-[450px] mx-auto flex flex-row items-center justify-between mb-4">
      <div className="w-3/4 flex flex-row gap-5 ml-2 mt-2">
        <DrawerMenu />
      </div>
    </div>
  );
};
