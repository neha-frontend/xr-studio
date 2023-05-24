import { useDispatch, useSelector } from 'react-redux';
import { Fade, Tooltip } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


import { CLOSE_ICON } from '../../../assets/images';
import { hideCustomModal } from '../../../store/sagaActions';
import CustomModal from '../CustomModal';
import { CANCEL_REVIEW_MODAL } from '../../../constants/modalTypeConstant';

import styles from './cancelReview.module.scss';

const CancelReview = ({edit}) => {
  const dispatch = useDispatch();
  const navigate =  useNavigate();
  const { customModalType } = useSelector((state) => state.modal);
  const hideModal = () => dispatch(hideCustomModal());

  const handleCancel = () => {
    dispatch(hideCustomModal());
  };

  const handleRevert = ()=>{
    navigate("/my-team/manage-experience")

  }

  const modalBody = () => {
    return (
      <>
        <div className={styles.close_modal}>
          <Tooltip
            title="Close"
            placement="right"
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}>
            <img
              src={CLOSE_ICON}
              alt="close_icon"
              className={styles.close_icon}
              onClick={hideModal}
            />
          </Tooltip>
        </div>
        <div className={styles.modal_body}>
          <span className={styles.modal_title}>Are You Sure?</span>
          <p className={styles.modal_desc}>
            {edit ? "Editing a published experience will revert it to draft." : "Cancelling the review of experience will revert it back to drafts"}.
          </p>
          <div className={styles.modal_btns}>
            <Button onClick={handleCancel} className={styles.cancel_btn}>
              Cancel
            </Button>
            <Button onClick={handleRevert} className={styles.revert_btn}>Revert to Draft</Button>
          </div>
        </div>
      </>
    );
  };

  return (
    <CustomModal
      showModal={customModalType === CANCEL_REVIEW_MODAL}
      modalBody={modalBody()}
      className="cancel_review_modal"
    />
  );
};

export default CancelReview;
