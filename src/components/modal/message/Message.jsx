import { useDispatch, useSelector } from 'react-redux';

import { CHECKED, CLEAR, CLOSE_ICON, INBOX_USER, SEARCH, UNCHECKED } from '../../../assets/images';
import { MESSAGE_MODAL } from '../../../constants/modalTypeConstant';
import { hideCustomModal } from '../../../store/sagaActions';
import CustomModal from '../CustomModal';

import styles from './message.module.scss';
import { Checkbox } from '@material-ui/core';

const Message = () => {
  const dispatch = useDispatch();
  const { customModalType } = useSelector((state) => state.modal);

  const hideModal = () => {
    dispatch(hideCustomModal());
  };

  const modalBody = () => {
    return (
      <>
        <div className={styles.close_modal}>
          <img
            src={CLOSE_ICON}
            alt="close_icon"
            className={styles.close_icon}
            onClick={hideModal}
          />
        </div>
        <div className={styles.modal_body}>
          <div className={styles.title}>Forward</div>
          <div className={styles.search_box}>
            <img src={SEARCH} alt="search" className={styles.search_img} />
            <input
              type="text"
              placeholder="Search"
              className={styles.search_input}
              //   onChange={handleSearch}
            />
          </div>
          <div className="d-flex">
            <div className={styles.selected_user}>
              <div className="position-relative">
                <img src={INBOX_USER} alt="user" />
                <img src={CLEAR} alt="clear" className={styles.remove} />
              </div>
              <div className={styles.selected_user_name}>Patrick Brown</div>
            </div>
          </div>
          <div className={styles.select_all}>Select all</div>
          <div className={styles.user_list}>
            <div className={styles.user_details}>
              <img src={INBOX_USER} alt="profile" />
              <div className={styles.user_name}>Patrick Brown</div>
            </div>
            <Checkbox
              icon={<img src={UNCHECKED} alt="uncheck" />}
              checkedIcon={<img src={CHECKED} alt="check" />}
            />
          </div>
          <div className={styles.user_list}>
            <div className={styles.user_details}>
              <img src={INBOX_USER} alt="profile" />
              <div className={styles.user_name}>Patrick Brown</div>
            </div>
            <Checkbox
              icon={<img src={UNCHECKED} alt="uncheck" />}
              checkedIcon={<img src={CHECKED} alt="check" />}
            />
          </div>
          <div className={styles.user_list}>
            <div className={styles.user_details}>
              <img src={INBOX_USER} alt="profile" />
              <div className={styles.user_name}>Patrick Brown</div>
            </div>
            <Checkbox
              icon={<img src={UNCHECKED} alt="uncheck" />}
              checkedIcon={<img src={CHECKED} alt="check" />}
            />
          </div>
          <div className={styles.user_list}>
            <div className={styles.user_details}>
              <img src={INBOX_USER} alt="profile" />
              <div className={styles.user_name}>Patrick Brown</div>
            </div>
            <Checkbox
              icon={<img src={UNCHECKED} alt="uncheck" />}
              checkedIcon={<img src={CHECKED} alt="check" />}
            />
          </div>
          <div className={styles.user_list}>
            <div className={styles.user_details}>
              <img src={INBOX_USER} alt="profile" />
              <div className={styles.user_name}>Patrick Brown</div>
            </div>
            <Checkbox
              icon={<img src={UNCHECKED} alt="uncheck" />}
              checkedIcon={<img src={CHECKED} alt="check" />}
            />
          </div>
          <div className={styles.create_group}>Send (1)</div>
        </div>
      </>
    );
  };

  return (
    <>
      <CustomModal
        showModal={customModalType === MESSAGE_MODAL}
        closeModal={hideModal}
        modalBody={modalBody()}
        className="message_modal"
      />
    </>
  );
};

export default Message;
