import React from "react";
import { ItemTags } from "../../../../../components";
import { Typography } from "antd";
import { Notes_notes_tags } from "../../../../../../../graphql/query/notes/__generated__/Notes";
import ReactMarkdown, { ReactMarkdownOptions } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  title: string;
  description: string;
  tags: Notes_notes_tags[];
}

const { Title } = Typography;

export const MarkDownPreview = ({
  description,

  tags,
  title,
}: Props) => {
  const NoteElement = (
    <>
      <Title level={2}>{title}</Title>
      <ItemTags tags={tags} />
      <div style={{ margin: "10px 0" }} />
      <ReactMarkdown children={description} components={components} />
    </>
  );
  return <div className="markdown__preview-container">{NoteElement}</div>;
};

const components: ReactMarkdownOptions["components"] = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");

    return !inline && match ? (
      <SyntaxHighlighter
        style={a11yDark}
        language={match[1]}
        PreTag="div"
        showLineNumbers
        children={String(children).replace(/\n$/, "")}
        {...props}
      />
    ) : (
      <code className={className} {...props} />
    );
  },
};
