import "./index.scss";

import classNames from "classnames";
import type { FC, PropsWithChildren } from "react";
import React from "react";

import { useCompoundProps } from "../../../common/hooks/useCompoundProps";

export interface ITextBoxProps {
  title: string;
}

interface TextBoxStatic {
  Wrap: (props: React.HTMLAttributes<HTMLDivElement>) => null;
  Title: (props: React.HTMLAttributes<HTMLDivElement>) => null;
  Content: (props: React.HTMLAttributes<HTMLDivElement>) => null;
}

export const TextBox: FC<PropsWithChildren<ITextBoxProps>> & TextBoxStatic = ({
  title,
  children,
}) => {
  const innerProps = useCompoundProps(
    { children, title },
    TextBox,
    "Wrap",
    "Title",
    "Content",
  );

  return (
    <div
      {...innerProps.wrap}
      className={classNames("text-box__wrap", innerProps.wrap?.className)}
    >
      <div
        {...innerProps.title}
        className={classNames("text-box__title", innerProps.title?.className)}
      >
        {title}
      </div>
      <div
        {...innerProps.content}
        className={classNames(
          "text-box__content",
          innerProps.content?.className,
        )}
      >
        {innerProps.$children}
      </div>
    </div>
  );
};

TextBox.Wrap = (_props: React.HTMLAttributes<HTMLDivElement>) => null;
TextBox.Title = (_props: React.HTMLAttributes<HTMLDivElement>) => null;
TextBox.Content = (_props: React.HTMLAttributes<HTMLDivElement>) => null;
