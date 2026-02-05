import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export const RemovableTag = ({ tag, setTags }) => {
  const removeItself = () => {
    setTags(tags.filter((t) => t.text !== tag.text));
  };

  return (
    <Badge onClick={removeItself}>
      <div className="flex gap-1 items-center justify-between">
        <span>{tag.text}</span>
        <X size={13} />
      </div>
    </Badge>
  );
};
