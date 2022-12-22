import React, { forwardRef, PropsWithChildren, useEffect } from "react";
import RModal, { Props } from "react-modal";

import { mergeRefs, useBodyScroll } from "../../../common";

export interface IModalProps extends Props {}

export const Modal = forwardRef<
  RModal,
  PropsWithChildren<Partial<IModalProps>>
>(({ children, isOpen = false, ariaHideApp = false, ...rest }, ref) => {
  const [modalRef, lock, unlock] = useBodyScroll();

  useEffect(() => {
    if (isOpen) {
      lock();
    } else {
      unlock();
    }
    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <RModal
      ref={mergeRefs([ref, modalRef as any])}
      isOpen={isOpen}
      ariaHideApp={ariaHideApp}
      {...rest}
    >
      {children}
    </RModal>
  );
});
