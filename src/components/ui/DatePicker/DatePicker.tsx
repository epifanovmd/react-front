import "./index.scss";

import en from "date-fns/locale/en-US";
import ru from "date-fns/locale/ru";
import type { FC } from "react";
import React from "react";
import RDatePicker, {
  ReactDatePickerProps,
  registerLocale as _registerLocale,
} from "react-datepicker";
import MaskedInput, { MaskedInputProps } from "react-text-mask";

_registerLocale("ru", ru);
_registerLocale("en", en);

export const registerLocale = _registerLocale;

type DatePickerChangeEvent = { target: { value?: Date; name: string } };

export interface IDatePickerProps
  extends Omit<ReactDatePickerProps, "onChange"> {
  onChange?: (e: DatePickerChangeEvent) => void;
  showTimeInput?: boolean;
  withMask?: boolean;
  maskProps?: MaskedInputProps;
}

export const DatePicker: FC<IDatePickerProps> = ({
  name,
  onChange,
  showTimeInput = true,
  withMask = true,
  locale = "en",
  maskProps,
  ...rest
}) => {
  const submitChange = (d: Date | null): void => {
    onChange?.({
      target: {
        value: d ?? undefined,
        name: name ?? "",
      },
    });
  };

  const handleChange = (d: Date | null): void => {
    if (!showTimeInput) {
      d?.setHours(0, 0, 0);
    }
    submitChange(d);
  };

  const customInput = !withMask ? (
    rest.customInput
  ) : (
    <MaskedInput
      mask={[/\d/, /\d/, ".", /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/]}
      {...maskProps}
    />
  );

  return (
    <RDatePicker
      dateFormat={showTimeInput ? "dd.MM.yyyy HH:mm:ss" : "dd.MM.yyyy"}
      locale={locale}
      showTimeInput={showTimeInput}
      customInput={customInput}
      {...rest}
      onChange={handleChange}
      showPopperArrow={false}
    />
  );
};
