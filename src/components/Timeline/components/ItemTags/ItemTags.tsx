import React from "react";
import { Notes_notes } from "../../../../graphql/query/notes/__generated__/Notes";
import { Tag } from "antd";

interface Props {
  tags: Notes_notes["tags"];
}

export const ItemTags = ({ tags }: Props) => {
  const TagsElement = tags.map((tag) => (
    <Tag className="tags" key={tag.value} color={tag.color}>
      {tag.value}
    </Tag>
    // <div className="tags">{tag}</div>
  ));

  return <>{TagsElement}</>;
};
