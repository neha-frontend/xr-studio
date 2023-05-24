import Modal from 'react-bootstrap/Modal';

// import ReactPortal from '../portal';
// import { CROSS_FILTER_MOB_ICON } from '../../assets/images';

import './index.css';

const CustomModal = (props) => {
  const { className = '', modalSize = 'md', showModal = false, modalBody } = props;  
  return (
    // <ReactPortal wrapperId="root">
    <Modal
      show={showModal}
      size={modalSize}
      aria-labelledby="contained-modal-title-vcenter"
      className={className}      
      centered>
      {modalBody}
    </Modal>
    // </ReactPortal>
  );
};

export default CustomModal;
