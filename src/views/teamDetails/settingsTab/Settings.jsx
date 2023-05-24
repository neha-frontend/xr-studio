import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomAccordion from '../../../components/accordian/CustomAccordion';
import { teamPlay } from './settingAccordion';
import { SIDE_ARROW } from '../../../assets/images';
import { showCustomModal } from '../../../store/sagaActions';
import {
  DELETE_TEAM_MODAL,
  INVITE_TO_TEAM_MODAL,
  RENAME_TEAM_MODAL,
  UPLOAD_THUMBNAIL_MODAL
} from '../../../constants/modalTypeConstant';
import RenameTeam from '../../../components/modal/renameTeam/RenameTeam';
import DeleteTeam from '../../../components/modal/deleteTeam/DeleteTeam';
import UploadThumbnail from '../../../components/modal/uploadThumbnail/UploadThumbnail';

import styles from './setting.module.scss';

const Settings = () => {
  const dispatch = useDispatch();

  const { teamDetail, userRole } = useSelector((state) => state.myTeam.teamDetail);

  const data = {
    orgId: teamDetail?._organization,
    teamId: teamDetail?._id,
    name: teamDetail?.name,
    redirect: true,
    showColab: true,
    showInviteByLink: true,
    showInviteByEmail: true,
    type: 'team',
    inviteLink: teamDetail?.inviteLink,
    inviteByLink: teamDetail?.inviteByLink,
    inviteByLinkRole: teamDetail?.inviteByLinkRole
  };

  const handleTeamRename = () => {
    dispatch(
      showCustomModal({
        customModalType: RENAME_TEAM_MODAL,
        tempCustomModalData: data
      })
    );
  };

  const handleDeleteTeam = () => {
    dispatch(
      showCustomModal({
        customModalType: DELETE_TEAM_MODAL,
        tempCustomModalData: data
      })
    );
  };

  const handleInvite = () => {
    dispatch(
      showCustomModal({
        customModalType: INVITE_TO_TEAM_MODAL,
        tempCustomModalData: data
      })
    );
  };

  const handleThumbnail = () => {
    dispatch(
      showCustomModal({
        customModalType: UPLOAD_THUMBNAIL_MODAL
      })
    );
  };

  return (
    <>
      <CustomAccordion data={teamPlay} titleClassName="accord_title" />
      <div className={`${styles.text} ${styles.setting_body} row`}>
        <div className={`${styles.accordion_head} col-lg-3 col-md-4 col-sm-4 col-4`}>Team name</div>
        <div className="col-lg-5 col-md-4 col-sm-6 col-6">
          <div className="pb-4">Change the team name</div>
          <div>Change the team thumbnail</div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-2 col-2 position-relative">
          <img
            src={SIDE_ARROW}
            alt="side_arrow"
            className={`${styles.arrow_icon} pb-4`}
            onClick={handleTeamRename}
          />

          <img
            src={SIDE_ARROW}
            alt="side_arrow"
            className={`${styles.arrow_icon} ${styles.thumb_arrow}`}
            onClick={handleThumbnail}
          />
        </div>
      </div>
      <div className={`${styles.text} ${styles.setting_body} row`}>
        <div className={`${styles.accordion_head} col-lg-3 col-md-4 col-sm-4 col-4`}>
          Invite Team
        </div>
        <div className="col-lg-5 col-md-4 col-sm-6 col-6">
          <span>Share the team and the experiences</span>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-2 col-2 position-relative">
          <img
            src={SIDE_ARROW}
            alt="side_arrow"
            className={styles.arrow_icon}
            onClick={handleInvite}
          />
        </div>
      </div>
      {userRole === 'owner' && (
        <div className={`${styles.text} ${styles.setting_body} row border-0`}>
          <div className={`${styles.accordion_head} col-lg-3 col-md-4 col-sm-4 col-4`}>
            Delete Team
          </div>
          <div className="col-lg-5 col-md-4 col-sm-6 col-6">
            <span>Remove the team and the experiences</span>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-2 col-2 position-relative">
            <img
              src={SIDE_ARROW}
              alt="side_arrow"
              className={styles.arrow_icon}
              onClick={handleDeleteTeam}
            />
          </div>
        </div>
      )}
      <RenameTeam />
      <DeleteTeam />
      <UploadThumbnail />
    </>
  );
};

export default Settings;
