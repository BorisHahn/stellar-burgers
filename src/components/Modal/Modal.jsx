import * as ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import PropTypes from 'prop-types';
const classNames = require('classnames');
const portal = document.getElementById('modals');

const Modal = ({ children, onClose, modalIsOpen, title }) => {
  return ReactDOM.createPortal(
    <div
      className={classNames(
        styles.wrapper,
        !modalIsOpen && styles.hiddenWrapper,
      )}
    >
      <ModalOverlay onClose={onClose} isOpen={modalIsOpen} />
      <div
        className={classNames(
          'pt-10 pl-10 pr-10',
          styles.modal,
          modalIsOpen && styles.opened,
        )}
      >
        <div className={styles.header}>
          <h1
            className={classNames(
              'text text_type_main-medium',
              styles.text,
              !title && styles.hide,
            )}
          >
            Детали ингредиента
          </h1>

          <CloseIcon
            type='primary'
            className={styles.close}
            onClick={() => onClose()}
          />
        </div>
        {children}
      </div>
    </div>,
    portal,
  );
};

Modal.propTypes = {
  children: PropTypes.element,
  onClose: PropTypes.func,
  modalIsOpen: PropTypes.bool,
  title: PropTypes.string,
};

export default Modal;
