import React, { useRef, useEffect, MutableRefObject } from "react";

export interface ReactCommentProps {
  text: string;
  trim?: boolean;
}

export const ReactComment: React.FC<ReactCommentProps> = ({
  text,
  trim = false
}: ReactCommentProps) => {
  const element: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);

  const createComment: () => string = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    trim ? (text = text.trim()) : (): any => void 0;

    return `<!-- ${text} -->`;
  };

  useEffect(() => {
    element.current?.outerHTML &&
      (element.current.outerHTML = createComment());
  }, []);

  return <div ref={element}></div>;
};
