import React from 'react';

import styles from './defaultProfile.module.scss';

const DefaultProfile = ({ name="", className }) => {
  
  const words = name.split(' ');
  let initials = words[0]?.charAt(0);

  if (words.length >= 2) {
    initials += words[1].charAt(0);
  }

  return (
    <div className={`${styles.profileImage} ${className}`}>
      <span className={styles.initials}>{initials.toUpperCase()}</span>
    </div>
  );
};

export default DefaultProfile;
