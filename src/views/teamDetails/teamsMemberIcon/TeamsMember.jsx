import React from 'react';
import { useSelector } from 'react-redux';

import { TEAM_ADD_ICON, TEAM_IMG_ONE } from '../../../assets/images';

import styles from './teamsMember.module.scss';

const TeamsMember = ({ teamsImgContainerClass, addContainerClass, handleInvite, showInvite }) => {
  const { collaborator } = useSelector((state) => state.myTeam.teamDetail);

  return (
    <div className="d-flex align-items-center">
      <div className={`${styles.teamsImgContainer} ${teamsImgContainerClass} ${!showInvite ? 'me-2' : ''}`}>
        {collaborator?.items?.length &&
          collaborator?.items?.map((member) => (
            <img
              src={member?.user?.media[0]?.url || TEAM_IMG_ONE}
              alt="teamImg"
              key={member?._id}
              className={styles.teamRoundedImg}
            />
          ))}
        {collaborator?.totalItems > 4 && (
          <div className={styles.teamImgNum}>
            {collaborator?.totalItems - 4}
          </div>
        )}
      </div>
      {showInvite && (
        <div>
          <div className={`${styles.addContainer} ${addContainerClass}`} onClick={handleInvite}>
            <img src={TEAM_ADD_ICON} alt="add" />
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsMember;
