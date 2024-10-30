import { Badge } from "./ui/badge";

function PlaceTag({ tag }) {
  const filter_by_tag = () => {};

  return <Badge onClick={() => filter_by_tag(tag)}>{tag.text}</Badge>;
}

export { PlaceTag };
