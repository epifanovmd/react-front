import "./index.scss";

import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import classNames from "classnames";
import React, {
  ComponentProps,
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithChildren,
  PropsWithoutRef,
  RefAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { mergeRefs, useBooleanState } from "../../../common";
import { useCompoundProps } from "../../../common/hooks/useCompoundProps";
import { Placeholder } from "../placeholder";

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  touch?: boolean;
  error?: string;
}

interface IInputStatic {
  Wrap: (props: React.HTMLAttributes<HTMLDivElement>) => null;
  Error: (props: React.HTMLAttributes<HTMLDivElement>) => null;
  Input: (props: React.InputHTMLAttributes<HTMLInputElement>) => null;
  RightIcon: (
    props: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>,
  ) => null;
  Placeholder: typeof Placeholder;
}

export const Input: ForwardRefExoticComponent<
  PropsWithoutRef<PropsWithChildren<IInputProps>> &
    RefAttributes<HTMLInputElement>
> &
  IInputStatic = forwardRef<HTMLInputElement, PropsWithChildren<IInputProps>>(
  (
    {
      children,
      name,
      touch,
      error,
      value,
      onChange,
      onBlur,
      readOnly,
      placeholder,
      style,
      className,
      type,
      ...rest
    },
    ref,
  ) => {
    const [visible, setVisible, setUnVisible] = useBooleanState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const innerProps = useCompoundProps(
      { children },
      Input,
      "Wrap",
      "Error",
      "Placeholder",
      "Input",
      "RightIcon",
    );
    const [isFloating, setFloating] = useState(!value);

    useEffect(() => {
      setFloating(!!value);
    }, [value]);

    const onAnimationStart = useCallback(
      (event: React.AnimationEvent<HTMLInputElement>) => {
        if (event.animationName === "onAutoFillStart") {
          setFloating(true);
        } else if (event.animationName === "onAutoFillCancel") {
          setFloating(!!(event.target as any).value);
        }
      },
      [],
    );

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
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
      (event: React.FocusEvent<HTMLInputElement>) => {
        onBlur?.(event);
      },
      [onBlur],
    );

    const handleClickPlaceholder = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        innerProps.placeholder?.onClick?.(event);
        if (inputRef.current) {
          inputRef.current.focus();
        }
      },
      [innerProps.placeholder],
    );

    const handleClickIcon = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        innerProps.rightIcon?.onClick?.(event);
        if (type === "password" && !innerProps.rightIcon?.children) {
          visible ? setUnVisible() : setVisible();
        }
      },
      [innerProps.rightIcon, setUnVisible, setVisible, type, visible],
    );

    return (
      <div
        style={style}
        {...innerProps.wrap}
        className={classNames(
          "input-wrap",
          { ["input-wrap__read-only"]: readOnly },
          { ["input-wrap__error"]: Boolean(touch && error) },
          className,
          innerProps.wrap?.className,
        )}
      >
        <input
          ref={mergeRefs([inputRef, ref])}
          {...rest}
          type={visible ? undefined : type}
          readOnly={readOnly}
          className={classNames(
            "input",
            {
              ["input__read-only"]: readOnly,
            },
            innerProps.input?.className,
          )}
          placeholder={""}
          value={value}
          onBlur={handleBlur}
          onChange={handleChange}
          onAnimationStart={onAnimationStart}
        />
        {(!!innerProps?.rightIcon || type === "password") && (
          <div
            {...innerProps.rightIcon}
            className={classNames(
              "input-right-icon",
              innerProps.rightIcon?.className,
            )}
            onClick={handleClickIcon}
          >
            {innerProps.rightIcon?.children ??
              (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
          </div>
        )}
        <Placeholder
          placeholder={placeholder}
          isFocus={isFloating || !!value}
          {...innerProps.placeholder}
          onClick={handleClickPlaceholder}
        />
        <div
          {...innerProps.error}
          className={classNames("input-error", innerProps.error?.className)}
        >
          {!readOnly && touch && error}
        </div>
      </div>
    );
  },
) as any;

Input.Wrap = (_p: ComponentProps<typeof Input.Wrap>) => null;
Input.Error = (_p: ComponentProps<typeof Input.Error>) => null;
Input.Input = (_p: ComponentProps<typeof Input.Input>) => null;
Input.RightIcon = (_p: ComponentProps<typeof Input.RightIcon>) => null;
Input.Placeholder = Placeholder;
