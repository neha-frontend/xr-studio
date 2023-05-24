import React from 'react';

import { INBOX_USER, NEW_MSG_ICON } from '../../../../assets/images';

import styles from './messageCard.module.scss';

const MessageCard = () => {
  return (
    <div className={styles.message_box}>
      <div className="d-flex">
        <img src={NEW_MSG_ICON} alt="new_msg" className={styles.new_msg} />
        <div className="position-relative me-2">
          <img src={INBOX_USER} alt="user_profile" />
          <div className={styles.active_status}></div>
        </div>
        <div>
          <div className={styles.user_name}>Patrick Brown</div>
          <div className={styles.last_msg}>3 new messages</div>
        </div>
      </div>
      <div className={styles.receive_time}>12:10 AM</div>
    </div>
  );
};

export default MessageCard;
