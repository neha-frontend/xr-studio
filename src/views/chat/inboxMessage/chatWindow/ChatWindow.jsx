import React from 'react';
import { useDispatch } from 'react-redux';

import {
  CLEAR,
  COPY_MSG,
  FORWARD,
  MIC,
  PLUS_INBOX,
  REPLY,
  UNSEND
} from '../../../../assets/images';
import { ChatDropdown } from '../../../../components/customDropdown/CustomDropdown';
import { showCustomModal } from '../../../../store/sagaActions';
import Message from '../../../../components/modal/message/Message';
import { MESSAGE_MODAL } from '../../../../constants/modalTypeConstant';
import SharedPost from '../sharedPost/SharedPost';

import styles from './chatWindow.module.scss';

const ChatWindow = () => {
  const dispatch = useDispatch();
  const forwardMessage = () => {
    dispatch(
      showCustomModal({
        customModalType: MESSAGE_MODAL
      })
    );
  };

  const dropdownItem = [
    { label: 'Reply', value: 'reply', image: REPLY },
    { label: 'Undo Send', value: 'unsend', image: UNSEND },
    { label: 'Copy', value: 'copy', image: COPY_MSG },
    { label: 'Forward', value: 'forward', image: FORWARD, action: forwardMessage }
  ];

  return (
    <>
      <div className={styles.text_window}>
        <div className={styles.text_date}>Dec 16 at 2:50 PM</div>
        <div className={styles.msg_received_section}>
          <div className={styles.msg_received}>Congratulation for new car! 🥳🎉</div>
          <ChatDropdown dropdownItem={dropdownItem} />
        </div>
        <div className={styles.msg_received_section}>
          <div className={styles.msg_received}>What car is that?</div>
          <ChatDropdown dropdownItem={dropdownItem} />
        </div>
        <div className={styles.msg_sent_section}>
          <div>
            <img src={REPLY} alt="reply" className="me-1" />
            <span className={styles.reply}>Congratulation for new car! 🥳🎉</span>
          </div>
          <div className={styles.chat_msg}>
            <ChatDropdown dropdownItem={dropdownItem} />
            <div className={styles.msg_sent}>Thank you!</div>
          </div>
        </div>
        <div className={styles.post_sent}>
          <ChatDropdown dropdownItem={dropdownItem} />
          <SharedPost />
        </div>
        <div className={styles.post_received}>
          <SharedPost />
          <ChatDropdown dropdownItem={dropdownItem} />
        </div>
      </div>
      <div>
        <div className={styles.reply_section}>
          <div>
            <div>
              <img src={REPLY} alt="reply" />
              <span className={styles.replying_text}> Replying to</span>
            </div>
            <div className={styles.replied_msg}>what car is that?</div>
          </div>
          <div>
            <img src={CLEAR} alt="clear" />
          </div>
        </div>
        <div className={styles.msg_box}>
          <img src={PLUS_INBOX} alt="add_media" className={styles.add_media} />
          <div className={styles.text_msg}>
            <input type="text" />
            <img src={MIC} alt="mic_img" className={styles.mic_img} />
          </div>
        </div>
      </div>
      <Message/>
    </>
  );
};

export default ChatWindow;
