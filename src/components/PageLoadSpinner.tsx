import { LoaderPinwheel  } from "lucide-react";

export const PageLoadSpinner = () => {
  return (
    <div className="mx-auto w-fit mt-[50%]">
      <LoaderPinwheel 
        className="animate-spin"
        size={60}
        color="#6d28d9"
        strokeWidth={3}
      />
    </div>
  );
};
