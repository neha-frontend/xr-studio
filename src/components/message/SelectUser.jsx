import React from 'react';
import { CHECKED, UNCHECKED } from '../../assets/images';
import { Checkbox } from '@material-ui/core';
import styles from "./selectUser.module.scss";

const SelectUser = ({userName,userImg}) => {
  return (
    <div className={styles.user_list}>
      <div className={styles.user_details}>
        <img src={userImg} alt="profile" />
        <div className={styles.user_name}>{userName}</div>
      </div>
      <Checkbox
        icon={<img src={UNCHECKED} alt="uncheck" />}
        checkedIcon={<img src={CHECKED} alt="check" />}
      />
    </div>
  );
};

export default SelectUser;
