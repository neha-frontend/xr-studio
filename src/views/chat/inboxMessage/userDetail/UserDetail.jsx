import { useState } from 'react';
import { INBOX_USER } from '../../../../assets/images';

import styles from './userDetail.module.scss';

const UserDetail = () => {
  const [mute, setMute] = useState(true);
  const [isFollowing, setIsFollowing] = useState(true);
  return (
    <div className={styles.detail_body}>
      <div className={styles.group_detail}>
        <img src={INBOX_USER} alt="profile" className={styles.group_icon} />
        <div className={styles.group_title}>Friends</div>
      </div>
      <div className="d-flex justify-content-between">
        <div className={styles.member}>Members</div>
        <div className={styles.add_people}>Add People</div>
      </div>
      <div className={styles.detail_box}>
        <div className="d-flex">
          <img src={INBOX_USER} alt="user_profile" />
          <div className={styles.user_detail}>
            <div className={styles.full_name}>Patrick Brown</div>
            <div className={styles.user_name}>patrick_01</div>
          </div>
        </div>
        <div
          className={isFollowing ? styles.following_btn : styles.follow_btn}
          onClick={() => setIsFollowing(!isFollowing)}>
          {isFollowing ? 'Following' : 'Follow'}
        </div>
      </div>
      <div className={styles.mute_box}>
        <div className={styles.mute}>Mute notifications</div>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={mute}
            onClick={() => setMute(!mute)}
            //   disabled={isLoading}
          />
          <span className={styles.slider}></span>
        </label>
      </div>
      <div className={styles.options}>Block</div>
      <div className={styles.options}>Report</div>
      <div className={styles.options}>Delete chat</div>
    </div>
  );
};

export default UserDetail;
