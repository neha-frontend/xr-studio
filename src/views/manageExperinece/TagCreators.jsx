import React from 'react';
import { profile_thumbnail } from '../../assets/images';

import styles from './formcontainer.module.scss';

const TagCreators = ({ tagData=[] }) => {
//   const tag_list = tagData || [];

  return (
    <main className={styles.card_wrapper}>
      {tagData.length && tagData.map((item) => (
        <div className={styles.card_container} key={item.value}>
          <div className={styles.profile_image}>
            <img
              src={profile_thumbnail}
              alt="profile_thumbnail"
              className={styles.profile_thumb}
            />
          </div>
          <div className={styles.card_content}>
            <span className={styles.tag_name}>{item.value}</span>
            <span className={styles.tag_userName}>wade_warren001</span>
          </div>
        </div>
      ))}
    </main>
  );
};

export default TagCreators;
