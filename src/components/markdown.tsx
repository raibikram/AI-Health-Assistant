import React from "react";
import markdownit from 'markdown-it';
import DOMPurify from "dompurify";

type Props = {
  content: string;
};

const Markdown = ({ content }: Props) => {
  const md = markdownit();
  const dirtyHTML = md.render(content);
  const purifiedHTML = DOMPurify.sanitize(dirtyHTML);

  return <div dangerouslySetInnerHTML={{ __html: purifiedHTML }} />;
};

export default Markdown;
