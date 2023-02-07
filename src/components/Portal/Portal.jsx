import * as ReactDOM from 'react-dom';
import Modal from '../Modal/Modal';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import style from './Portal.module.css';

const portal = document.getElementById('modals');

const Portal = ({ modalIsOpen, children, handleCloseModal, title}) => {
  
    return ReactDOM.createPortal(
      <div className={style.wrapper}>
        <ModalOverlay onClose={handleCloseModal} isOpen={modalIsOpen}/>
        <Modal children={children} onClose={handleCloseModal} header={title} isOpen={modalIsOpen}/>
      </div>,
      portal,
    );
  
};

export default Portal;
