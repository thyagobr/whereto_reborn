import { ModeToggle } from "./ui/darkmode";

export const Header = () => {
  return (
    <div className="flex justify-end p-4">
      <ModeToggle />
    </div>
  );
};
