import { RemovableTag } from "./TagInput/RemovableTag/RemovableTag";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const Tag = ({ tags, setTags }) => {
  const [text, setText] = useState("");

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

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RemovableTag key={tag.text} tag={tag} setTags={setTags} />
        ))}
      </div>
      <div className="mt-2">
        <Input
          id="tags"
          value={text}
          onBlur={() => addTag(text)}
          onChange={(event) => setText(event.target.value)}
          placeholder="beer bar restaurant"
          onKeyDown={handleKeyPress}
        />
      </div>
    </div>
  )
}
