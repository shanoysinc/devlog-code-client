import { useQuery } from "@apollo/client";
import { NOTES_QUERY } from "../../graphql/query";
import { Timeline, Typography, Result } from "antd";
import { EditFilled, FormOutlined, FrownFilled } from "@ant-design/icons";
import {
  Notes as NotesData,
  Notes_notes,
} from "../../graphql/query/notes/__generated__/Notes";
import { ItemCard } from "./components";
import { CardSkeleton } from "./utils/components";
import { useCurrentNoteStore } from "../../state/currentNoteStore";
import dayjs from "dayjs";
import { createNoteModalStore } from "../../state/createNoteModal/createNoteModalStore";

const { Title } = Typography;
const { Item } = Timeline;

const date = dayjs(new Date()).format("YYYY MMMM DD");
const dateArr = date.split(" ");
const day = dateArr[2];
const month = dateArr[1];
const year = dateArr[0];

export const TimeLine = () => {
  const { setCurrentNote, currentNote } = useCurrentNoteStore((state) => ({
    currentNote: state.currentNote,
    setCurrentNote: state.setCurrentNote,
  }));

  const { setCreateNotesModal, createNotesModal } = createNoteModalStore(
    (state) => ({
      createNotesModal: state.visibility,
      setCreateNotesModal: state.setVisibility,
    })
  );

  const { data, loading } = useQuery<NotesData>(NOTES_QUERY, {
    onCompleted: (data) => {
      if (!currentNote) {
        setCurrentNote(data.notes[0]);
      }
    },
  });

  if (loading) {
    return (
      <div className="dashboard">
        <CardSkeleton loading={loading} />
      </div>
    );
  }
  const notes = data?.notes && data.notes.length > 0 ? data.notes : null;

  const noteHandler = (note: Notes_notes) => {
    setCurrentNote(note);
  };

  const TimelineElement = notes ? (
    <Timeline className="timeline">
      {notes.map((note) => (
        <div key={note.id} onClick={() => noteHandler(note)}>
          <Item
            style={{ cursor: "pointer" }}
            dot={
              <EditFilled
                style={{
                  fontSize: "22px",
                  color: "#6B7280",
                }}
              />
            }
          >
            <ItemCard key={note.id} note={note} noteHandler={noteHandler} />
          </Item>
        </div>
      ))}
    </Timeline>
  ) : (
    <div className="timeline__empty-state">
      <Result
        icon={<FrownFilled />}
        subTitle="Get started with Devlog by creating your first note. You won't be disappointed!"
      />
      <button
        className="navbar-menu-item__create-note__btn"
        onClick={() => setCreateNotesModal(!createNotesModal)}
      >
        <div>
          <FormOutlined />
        </div>
        <div> Create Note</div>
      </button>
    </div>
  );

  return (
    <>
      <div className="timeline__date-container">
        <Title className="timeline__date-month" level={3}>
          {day}. {month}
        </Title>
        <p className="timeline__date-year">{year}</p>
      </div>

      {TimelineElement}
    </>
  );
};
