import React from 'react';
import classnames from 'classnames';
import 'scss/components/Modal.scss';

interface ModalProps {
  width: number | string;
  height: number | string;
  hasCloseButton?: boolean;
  onClose?: () => void;
  classnames?: string | string[];
}

const Modal: React.FC<ModalProps> = (props) => {
  const modalContentStyle = { width: props.width, height: props.height };
  const hasCloseButton = props.hasCloseButton ?? true;

  return (
    <div className={classnames('modal', props.classnames)}>
      <div className="modal__content" style={modalContentStyle}>
        {
          hasCloseButton && (
            <button
              className="button-round button-round__close button-round--dark"
              onClick={() => props.onClose?.()}
            />
          )
        }

        {props.children}
      </div>
    </div>
  )
};

export default Modal;
