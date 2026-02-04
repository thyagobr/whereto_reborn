import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { RemovableTag } from "./RemovableTag/RemovableTag";

type TagInputProps = {
  defaultTags?: { text: string }[];
};

export const TagInput = ({ defaultTags }: TagInputProps) => {
  const [text, setText] = useState("");
  const [tags, setTags] = useState<{ text: string }[]>(() =>
    defaultTags?.length ? defaultTags.map((t) => ({ text: t.text })) : []
  );

  const form = useFormContext();

  const addTag = (tag: string) => {
    if (tag.trim() !== "" && !tags.some((t) => t.text === tag)) {
      setTags([...tags, { text: tag }]);
      setText("");
    }
  };

  const handleKeyPress = (e) => {
    e.stopPropagation();
    if (e.key === "Enter" || e.key === "Tab" || e.keyCode === 32) {
      e.preventDefault();
      addTag(text);
      setText("");
    }
  };

  useEffect(() => {
    form.setValue("tags", tags);
  }, [tags, form]);

  return (
    <div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.map((tag) => (
            <RemovableTag key={tag.text} tag={tag} setTags={setTags} />
          ))}
        </div>
      )}
      <Input
        id="tags"
        value={text}
        onBlur={() => addTag(text)}
        onChange={(event) => setText(event.target.value)}
        placeholder="beer bar restaurant"
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};
