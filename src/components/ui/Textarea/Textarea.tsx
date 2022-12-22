import "./index.scss";

import classNames from "classnames";
import RCTextarea, { TextAreaProps } from "rc-textarea";
import React, {
  ComponentProps,
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { mergeRefs } from "../../../common";
import { useCompoundProps } from "../../../common/hooks/useCompoundProps";
import { Placeholder } from "../placeholder";

export interface ITextareaProps extends TextAreaProps {
  touch?: boolean;
  error?: string;
}

interface ITextareaStatic {
  Wrap: (props: React.HTMLAttributes<HTMLDivElement>) => null;
  Error: (props: React.HTMLAttributes<HTMLDivElement>) => null;
  Textarea: (props: TextAreaProps) => null;
  Placeholder: typeof Placeholder;
}

export const Textarea: ForwardRefExoticComponent<
  PropsWithoutRef<ITextareaProps> & RefAttributes<RCTextarea>
> &
  ITextareaStatic = forwardRef<RCTextarea, ITextareaProps>(
  (
    {
      children,
      name,
      touch,
      error,
      onChange,
      onBlur,
      readOnly,
      placeholder,
      className,
      style,
      autoSize = true,
      ...rest
    },
    ref,
  ) => {
    const inputRef = useRef<RCTextarea>(null);
    const innerProps = useCompoundProps(
      { children },
      Textarea,
      "Wrap",
      "Error",
      "Placeholder",
      "Textarea",
    );

    const [isFloating, setFloating] = useState(!rest.value);

    useEffect(() => {
      setFloating(!!rest.value);
    }, [rest.value]);

    const onAnimationStart = useCallback(
      (event: React.AnimationEvent<HTMLTextAreaElement>) => {
        if (event.animationName === "onAutoFillStart") {
          setFloating(true);
        } else if (event.animationName === "onAutoFillCancel") {
          setFloating(!!(event.target as any).value);
        }
      },
      [],
    );

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(event);
        if (event.target.value) {
          setFloating(true);
        } else {
          setFloating(false);
        }
      },
      [onChange],
    );

    const handleBlur = useCallback(
      (event: React.FocusEvent<HTMLTextAreaElement>) => {
        onBlur?.(event);
      },
      [onBlur],
    );

    const handleClickPlaceholder = useCallback(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, []);

    const handleClickWrap = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (innerProps.wrap) {
          innerProps.wrap.onClick?.(event);
        }
        if (inputRef.current) {
          inputRef.current.focus();
        }
      },
      [innerProps.wrap],
    );

    return (
      <div
        style={style}
        {...innerProps.wrap}
        className={classNames(
          "textarea-wrap",
          { ["textarea-wrap__read-only"]: readOnly },
          { ["textarea-wrap__error"]: Boolean(touch && error) },
          className,
          innerProps.wrap?.className,
        )}
        onClick={handleClickWrap}
      >
        <RCTextarea
          ref={mergeRefs([inputRef, ref])}
          {...rest}
          readOnly={readOnly}
          autoSize={autoSize}
          className={classNames(
            "textarea",
            {
              ["textarea__read-only"]: readOnly,
            },
            innerProps.textarea?.className,
          )}
          placeholder={""}
          onBlur={handleBlur}
          onChange={handleChange}
          onAnimationStart={onAnimationStart}
        />
        {!readOnly && (
          <Placeholder
            placeholder={placeholder}
            isFocus={isFloating || !!rest.value}
            {...innerProps.placeholder}
            onClick={handleClickPlaceholder}
          />
        )}
        <div
          {...innerProps.error}
          className={classNames("textarea-error", innerProps.error?.className)}
        >
          {!readOnly && touch && error}
        </div>
      </div>
    );
  },
) as any;

Textarea.Wrap = (_p: ComponentProps<typeof Textarea.Wrap>) => null;
Textarea.Error = (_p: ComponentProps<typeof Textarea.Error>) => null;
Textarea.Textarea = (_p: ComponentProps<typeof Textarea.Textarea>) => null;
Textarea.Placeholder = Placeholder;
