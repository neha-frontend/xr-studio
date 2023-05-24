import { useState } from 'react';
import { INBOX_USER, UPLOAD } from '../../../../assets/images';

import styles from './editDetails.module.scss';

const EditDetails = () => {
  const [groupName, setGroupName] = useState('Friends');
  return (
    <div className={styles.detail_body}>
      <div className={styles.group}>
        <img src={INBOX_USER} alt="profile" className={styles.group_icon} />
        <img src={UPLOAD} alt="profile" className={styles.camera_icon} />
      </div>
      <div className={styles.group_title}>Friends</div>
      <input
        type="text"
        value={groupName}
        className={styles.group_name}
        onChange={(e) => setGroupName(e.target.value)}
      />
    </div>
  );
};

export default EditDetails;
