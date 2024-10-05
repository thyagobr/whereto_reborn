import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const UserBadge = () => {
  return (
    <Avatar >
      <AvatarImage
        sizes="200"
        src="https://avatars.githubusercontent.com/u/4836353?v=4"
        alt="@shadcn"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
