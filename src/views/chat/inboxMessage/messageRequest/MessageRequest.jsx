import React from 'react';
import { INBOX_USER } from '../../../../assets/images';

import styles from './messageRequest.module.scss';

const MessageRequest = () => {
  return (
    <>
      <div className={styles.message_request}>
        <div className={styles.user_detail}>
          <img src={INBOX_USER} alt="profile_pic" className={styles.profile_img} />
          <div className={styles.user_name}>Patrick Brown</div>
          <div className={styles.bio}>Digital Creator</div>
          <div className={styles.follower}>104 followers | 15 Moments</div>
          <div className={styles.view_btn}>View Profile</div>
        </div>
        <div className={styles.text_date}>Dec 16 at 2:50 PM</div>
        <div className="d-flex">
          <img src={INBOX_USER} alt="profile_pic" className={styles.text_img} />
          <div className={styles.msg_received}>Hello</div>
        </div>
      </div>
      <div className={styles.msg_request_body}>
        <div className={styles.accept_text}>Accept request from John Doe to reply..</div>
        <div className={styles.request_action}>
          <div className={styles.block_btn}>Block</div>
          <div className={styles.delete_btn}>Delete</div>
          <div className={styles.accept_btn}>Accept</div>
        </div>
      </div>
    </>
  );
};

export default MessageRequest;
