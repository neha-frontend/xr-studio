import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './inboxMessage.module.scss';
import { BACK_ARROW, EDIT_ICON, INBOX_USER, MORE_VERTICAL, SEARCH } from '../../../assets/images';
import MessageCard from '../messageList/messageCard/MessageCard';
import ChatWindow from './chatWindow/ChatWindow';
import MessageRequest from './messageRequest/MessageRequest';
import UserDetail from './userDetail/UserDetail';
import EditDetails from './editDetails/EditDetails';
import SelectUser from '../../../components/message/SelectUser';

const InboxMessage = () => {
  const { tab } = useParams();
  const [edit, setEdit] = useState(false);
  const [requestAction, setRequestAction] = useState(false);

  const handleEdit = () => {
    if (tab === 'request') {
      setRequestAction(true);
    }
  };
  useEffect(() => {
    setRequestAction(false);
  }, [tab]);

  const navigate = useNavigate();
  return (
    <div className={styles.inbox}>
      <Grid container spacing={2} className={styles.chat_window_grid}>
        <Grid item lg={3} sm={5} xs={6} className={styles.inbox_msg}>
          <div className="d-flex justify-content-between mt-4">
            <div className={styles.msg_head}>
              {' '}
              {tab === 'inbox' ? (
                'Message'
              ) : requestAction ? (
                <div className="d-flex align-items-center justify-content-center">
                  <img
                    src={BACK_ARROW}
                    alt="back_arrow"
                    className={styles.arrow_img}
                    onClick={() => setRequestAction(false)}
                  />
                  Request
                </div>
              ) : (
                'Request'
              )}
            </div>
            {requestAction && tab === 'request' ? (
              <p className={styles.select_all}>Select All</p>
            ) : (
              <img src={EDIT_ICON} alt="edit" onClick={() => handleEdit()} />
            )}
          </div>
          <div className={styles.search_box}>
            <img src={SEARCH} alt="search" className={styles.search_img} />
            <input
              type="text"
              placeholder="Search"
              className={styles.search_input}
              //   onChange={handleSearch}
            />
          </div>
          {tab === 'inbox' && (
            <div className={styles.msg_request} onClick={() => navigate('/message/request')}>
              Request (2)
            </div>
          )}
          {tab === 'request' && requestAction ? (
            <>
              <div className={styles.select_user_container}>
                <SelectUser userName="Patrick Brown" userImg={INBOX_USER} />
              </div>
              <div className={styles.msg_box}>
                <div className={styles.request_action}>
                  <div className={styles.block_btn}>Block</div>
                  <div className={styles.delete_btn}>Delete</div>
                  <div className={styles.accept_btn}>Accept</div>
                </div>
              </div>
            </>
          ) : (
            <MessageCard />
          )}
        </Grid>
        <Grid item lg={9} sm={7} xs={6} className="position-relative">
          <div className={styles.chat_window}>
            <div className={styles.user_detail}>
              {/* <img
                src={BACK_ARROW}
                alt="back_arrow"
                className={styles.arrow_img}
                onClick={() => navigate(-1, { state: tab })}
              /> */}
              {tab === 'details' ? (
                <div className={styles.detail}>Details</div>
              ) : (
                !requestAction && (
                  <>
                    <div className="position-relative me-2">
                      <img src={INBOX_USER} alt="user_profile" />
                      <div className={styles.active_status}></div>
                    </div>
                    <div>
                      <div className={styles.full_name}>Patrick Brown</div>
                      <div className={styles.user_name}>patrick_01</div>
                    </div>
                  </>
                )
              )}
            </div>
            {tab === 'details' ? (
              <div className={styles.edit_detail} onClick={() => setEdit(!edit)}>
                {edit ? <span className={styles.opacity}> Done </span> : 'Edit'}
              </div>
            ) : (
              !requestAction && <img src={MORE_VERTICAL} alt="more-option" />
            )}
          </div>
          {tab === 'inbox' ? (
            <ChatWindow />
          ) : tab === 'request' && requestAction ? (
            <></>
          ) : tab === 'request' ? (
            <MessageRequest />
          ) : edit ? (
            <EditDetails />
          ) : (
            <UserDetail />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default InboxMessage;
