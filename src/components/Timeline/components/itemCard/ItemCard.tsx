import React, { useMemo } from "react";
import { Card, Typography, Button } from "antd";
import {
  Notes_notes as NotesData,
  Notes_notes,
} from "../../../../graphql/query/notes/__generated__/Notes";
import dayjs from "dayjs";
import relativeTIME from "dayjs/plugin/relativeTime";
import { calcReadingTime } from "../../../../utils/calcReadingTime/calcReadingTime";
import { useHistory } from "react-router";
import { wordsLimiter } from "../../../../utils/wordsLimiter/wordsLimiter";

dayjs.extend(relativeTIME);

interface Props {
  note: NotesData;
  noteHandler: (note: Notes_notes) => void;
}
const { Title } = Typography;

export const ItemCard = ({ note, noteHandler }: Props) => {
  const history = useHistory();

  const { title, markdown, createdAt, tags } = note;

  const readingTime = useMemo(() => calcReadingTime(markdown), [markdown]);

  const ReadingTimeElement =
    readingTime < 1 ? (
      <div className="timeline__card-info-reading__time">
        less than a min read
      </div>
    ) : (
      <div className="timeline__card-info-reading__time">
        {readingTime} min read
      </div>
    );

  const year = useMemo(
    () => dayjs(createdAt).format("MMM D YYYY"),
    [createdAt]
  );
  const timeCreated = useMemo(() => dayjs(createdAt).fromNow(), [createdAt]);
  const modifyTitle = useMemo(() => wordsLimiter(title, 40), [title]);

  const currentNoteHandler = () => {
    noteHandler(note);
    history.push(`/note/${note.title}`);
  };

  return (
    <Card
      style={{
        backgroundColor: "#1A1D28",
      }}
      size="small"
      className="timeline__card"
      bordered={false}
    >
      <div className="timeline__card-sub-header">
        <p className="timeline__card-date">
          {year} ({timeCreated})
        </p>
        {ReadingTimeElement}
      </div>

      <Title level={4} className="timeline__card-title">
        {modifyTitle}
      </Title>
      <div className="timeline__card-info__container">
        <div className="timeline__card-info-tags__container">
          {tags.map((tag) => (
            <div key={tag.value}>#{`${tag.value}`}</div>
          ))}
        </div>
        <Button
          className="timeline-mobile__note-view-btn"
          type="primary"
          size="middle"
          onClick={currentNoteHandler}
        >
          View
        </Button>
      </div>
    </Card>
  );
};
