import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { EDIT_ICON, SEARCH } from '../../../assets/images';
import MessageCard from './messageCard/MessageCard';

import styles from './message.module.scss';

const MessageList = () => {
  const [showRequest, setShowRequest] = useState(false);

  return (
    <div>
      <div className={styles.msg_header}>
        <div className={styles.msg_title}>{showRequest ? 'Request' : 'Message'}</div>
        {!showRequest ? (
          <div className="d-flex">
            <div className="d-flex align-items-center ms-5">
              <img src={SEARCH} alt="search" className={styles.search_img} />
              <input
                type="text"
                placeholder="Search"
                className={styles.search_input}
                //onChange={handleSearch}
              />
            </div>
            <div className="d-flex align-items-center me-3">
              <img src={EDIT_ICON} alt="edit" />
              <span className={styles.header_text}>Edit</span>
            </div>
            <span
              className={`${styles.msg_request} ${styles.header_text}`}
              onClick={() => setShowRequest(true)}>
              Request (2)
            </span>
          </div>
        ) : (
          <div className="d-flex align-items-center">
            <span className={styles.header_text}>Edit</span>
          </div>
        )}
      </div>
      <Link to={showRequest ? '/message/request' : '/message/inbox'} className={styles.no_td}>
        <MessageCard />
      </Link>
      {showRequest ? <div className={styles.delete_all}> Delete All</div> : null}
    </div>
  );
};

export default MessageList;
