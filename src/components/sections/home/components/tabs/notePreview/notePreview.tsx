import React from "react";
import "../../../../../../styles/note.css";
import { Typography, Button, message, Popconfirm, Divider } from "antd";
import { ClockCircleFilled, TagsFilled, StarFilled } from "@ant-design/icons";
import { useCurrentNoteStore } from "../../../../../../state/currentNoteStore";
import { ItemTags } from "../../../../../Timeline/components";
import { createNoteModalStore } from "../../../../../../state/createNoteModal/createNoteModalStore";
import { useMutation } from "@apollo/client";
import { DELETE_NOTE_MUTATION } from "../../../../../../graphql/mutation/deleteNote/deleteNoteMutation";
import {
  DeleteNote as DeleteNoteData,
  DeleteNoteVariables,
} from "../../../../../../graphql/mutation/deleteNote/__generated__/DeleteNote";
import { NOTES_QUERY } from "../../../../../../graphql/query";
import dayjs from "dayjs";
import ReactMarkdown, { ReactMarkdownOptions } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useHistory, useLocation } from "react-router-dom";
import { EmptyIcon } from "../../../../../../assets/svgComponent/EmptyIcon";

interface Props {
  style?: React.CSSProperties | undefined;
}
const { Title } = Typography;

export const NotePreview = ({ style }: Props) => {
  const history = useHistory();
  const location = useLocation();
  const { currentNote, setModifyNote, setCurrentNote } = useCurrentNoteStore(
    (state) => ({
      currentNote: state.currentNote,
      setModifyNote: state.setModifyNote,
      setCurrentNote: state.setCurrentNote,
    })
  );

  const [deleteNote] = useMutation<DeleteNoteData, DeleteNoteVariables>(
    DELETE_NOTE_MUTATION,
    {
      onCompleted: () => {
        setCurrentNote(null);
        message.success("Note was successfully deleted!😊");
      },
    }
  );

  const setCreateNotesModal = createNoteModalStore(
    (state) => state.setVisibility
  );

  const editNoteHandler = () => {
    setModifyNote(true);
    setCreateNotesModal(true);
  };
  const isNoteRoute = location.pathname.substring(0, 5) === "/note";

  const deleteNoteHandler = () => {
    if (currentNote) {
      deleteNote({
        variables: { id: currentNote.id },
        refetchQueries: [{ query: NOTES_QUERY }],
      });

      if (isNoteRoute) {
        history.push("/");
      }
    }
  };

  const cancelDeleteN0teHandler = () => {
    message.error("Delete note cancelled 😮‍");
  };

  const ViewFullScreenHandler = () => {
    history.push(`/note/${currentNote?.title}`);
  };

  const ratingsElement =
    currentNote?.track?.ratings === 5 ? (
      <StarFilled style={{ color: "#ffdc62", marginLeft: ".5em" }} />
    ) : null;

  const NoteElement = currentNote ? (
    <>
      <div className="markdown__preview-header">
        {currentNote.track && (
          <div className="markdown__notes-sub-header-title">
            <div>
              {currentNote.track.title}
              {ratingsElement}
            </div>
          </div>
        )}

        <Title className="markdown__preview-header-title" level={1}>
          {currentNote.title}
        </Title>
      </div>
      <div className="markdown__notes-details-container">
        <div className="markdown__notes-details">
          <ClockCircleFilled />

          <div>Created On :</div>
          <div> {dayjs(currentNote.createdAt).format("MMM DD, YYYY")}</div>
        </div>
        <div className="markdown__notes-details">
          <ClockCircleFilled />

          <div>Last Updated On :</div>
          <div> {dayjs(currentNote.updatedAt).format("MMM DD, YYYY")}</div>
        </div>
        <div className="markdown__notes-details">
          <TagsFilled />

          <div>Labels :</div>
          <div className="markdown__notes-details-tags">
            <ItemTags tags={currentNote.tags} />
          </div>
        </div>
      </div>
      <div className="markdown__preview-header-btns">
        {!isNoteRoute && (
          <Button size="small" onClick={ViewFullScreenHandler}>
            View Full Screen
          </Button>
        )}

        <Button size="small" onClick={editNoteHandler}>
          Edit
        </Button>
        <Popconfirm
          placement="topLeft"
          title="Are you sure to delete this note?"
          onConfirm={deleteNoteHandler}
          onCancel={cancelDeleteN0teHandler}
          okText="Yes"
          cancelText="No"
        >
          <Button size="small">Delete</Button>
        </Popconfirm>
      </div>
      <div style={{ margin: "15px 0" }} />
      <Divider dashed />
      <ReactMarkdown
        children={currentNote.description}
        components={components}
      />
    </>
  ) : (
    <div className="empty-icon__girl-on-computer">
      <EmptyIcon />
      <p>
        You current have no that is selected to preview. <br />
        Create a note or click on one in the timeline.
      </p>
    </div>
  );
  return <>{NoteElement}</>;
};

const components: ReactMarkdownOptions["components"] = {
  code: ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");

    return !inline && match ? (
      <SyntaxHighlighter
        style={a11yDark}
        language={match[1]}
        PreTag="div"
        showLineNumbers
        {...props}
      >
        {children}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};
