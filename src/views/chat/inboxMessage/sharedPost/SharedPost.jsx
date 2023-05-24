import { INBOX_USER, INSTA_POST } from '../../../../assets/images';

import styles from './sharedPost.module.scss';

const SharedPost = () => {
  return (
    <div className={styles.shared_post}>
      <div className={styles.post_header}>
        <img src={INBOX_USER} alt="profile" className={styles.post_profile} />
        <span className={styles.post_owner}>ThoughfulTimes</span>
      </div>
      <img src={INSTA_POST} alt="post" />
      <div className={styles.post_caption}>
        Lorem ipsum dolor sit amet consectetur. Massa sed facilisi
      </div>
    </div>
  );
};

export default SharedPost;
