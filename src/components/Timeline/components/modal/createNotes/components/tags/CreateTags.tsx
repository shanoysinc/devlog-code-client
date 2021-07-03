import React, { FormEventHandler, useState } from "react";
import { Tag, Input } from "antd";
import { CirclePicker, ColorChangeHandler } from "react-color";
import { openNotificationWithIcon } from "../../../../../../../utils/components";
import { Notes_notes_tags } from "../../../../../../../graphql/query/notes/__generated__/Notes";

interface Props {
  tags: Notes_notes_tags[];
  setTags: React.Dispatch<React.SetStateAction<Notes_notes_tags[]>>;
}

const colors = ["#047857", "#1D4ED8", "#4338CA", "#6D28D9"];

export const CreateTags = ({ setTags, tags }: Props) => {
  const [tagValue, setTagValue] = useState("");

  const [tagColor, setTagColor] = useState("#4338CA");

  const tagsSubmitHandler: FormEventHandler = (e) => {
    e.preventDefault();

    if (tags.length > 3) {
      return openNotificationWithIcon({
        description: "A single not cannot have more than 3 tags",
        title: "Tags Error",
        type: "error",
      });
    }
    if (tagValue.length < 2) {
      return openNotificationWithIcon({
        description: "Please enter an appropriate Tag name",
        title: "Tags Error",
        type: "error",
      });
    }

    const isduplicateTag = tags.find((tag) => tag.value === tagValue);

    if (isduplicateTag) {
      return openNotificationWithIcon({
        description: "Cannot enter the same tag twice",
        title: "Tags Error",
        type: "error",
      });
    }

    const newValue: Notes_notes_tags = {
      value: tagValue,
      color: tagColor,
      __typename: "Tag",
    };
    setTags([...tags, newValue]);
    setTagValue("");
  };
  const changeColorHandler: ColorChangeHandler = (color) => {
    setTagColor(color.hex);
  };

  const removeTagHandler = (tagValue: string) => {
    const newTagValue = tags.filter((tag) => tag.value !== tagValue);

    setTags(newTagValue);
  };
  return (
    <div>
      <div className="tags-input__container">
        <form onSubmit={tagsSubmitHandler}>
          <Input
            placeholder="Create tag for your notes"
            onChange={(e) => setTagValue(e.target.value)}
            className="create-notes__modal-tag-input"
            value={tagValue}
            size="middle"
            style={{ backgroundColor: tagColor }}
          />
        </form>
        <div>
          {tags.map((tag) => (
            <Tag
              key={tag.value}
              color={tag.color}
              closable
              onClose={() => removeTagHandler(tag.value)}
            >
              {tag.value}
            </Tag>
          ))}
        </div>
      </div>
      <div style={{ margin: "10px 0" }} />

      <CirclePicker colors={colors} onChange={changeColorHandler} />
    </div>
  );
};
