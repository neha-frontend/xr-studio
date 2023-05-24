import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { PLUS, STAR, YELLOW_START } from '../../assets/images';
import Collaborators from './collaboratorsTab/Collaborators';
import InviteToTeam from '../../components/modal/inviteToTeam/InviteToTeam';
import { INVITE_TO_TEAM_MODAL } from '../../constants/modalTypeConstant';
import {
  getTeamCollaboratorAction,
  getTeamDetailAction,
  getuserRoleAction,
  showCustomModal
} from '../../store/sagaActions';
import Settings from './settingsTab/Settings';
import Assets from './assetsTab/AssestsTab';
import BackDrop from '../../components/spinner/BackDrop';
import { teamTabs } from './teamTab';
import Experience from './experience/Experience';
import TeamsMember from './teamsMemberIcon/TeamsMember';
import useFavourite from '../../hooks/manageFavourite/manageFavourite';

import styles from './teamDetails.module.scss';

const TeamDetails = () => {
  const { tab } = useParams();
  const dispatch = useDispatch();

  const { teamDetail, isLoading, inviteLoader, userRole } = useSelector(
    (state) => state.myTeam.teamDetail
  );
  const { isLoading: generateLinkLoader } = useSelector((state) => state.common);
  const { isLoading: updateTeamLoader } = useSelector((state) => state.myTeam.myTeam);
  const { isLoading: deleteTeamLoader } = useSelector((state) => state.myTeam.createTeam);

  const showInvite = userRole === 'admin' || userRole === 'owner';
  const org = localStorage.getItem('orgId');
  const teamId = localStorage.getItem('teamId');

  const filterOptions = [
    { label: 'All Assets', value: 'all' },
    { label: 'Video', value: 'video' },
    { label: 'Image', value: 'image' },
    { label: '3D', value: '3d' }
  ];

  //TO TOGGLE BETWEEN TABS ACCORDING TO CURRENT ACTIVE ROUTE 'TAB'
  const content = (tabs) => {
    switch (tabs) {
      case 'experiences':
        return <Experience filter={filterOptions} />;

      case 'assets':
        return <Assets />;

      case 'collaborators':
        return <Collaborators />;

      case 'settings':
        if (userRole === 'owner' || userRole === 'admin') return <Settings />;
        else break;
      default:
        return 'Comming Soon';
    }
  };

  const handleInvite = () => {
    const data = {
      showInviteByEmail: true,
      showInviteByLink: true,
      name: teamDetail?.name,
      orgId: org,
      teamId: teamId,
      inviteLink: teamDetail?.inviteLink,
      inviteByLink: teamDetail?.inviteByLink,
      inviteByLinkRole: teamDetail?.inviteByLinkRole
    };
    dispatch(
      showCustomModal({
        customModalType: INVITE_TO_TEAM_MODAL,
        tempCustomModalData: data
      })
    );
  };

  const [isLiked, setIsLiked] = useState(false);

  const updateLike = (value) => {
    setIsLiked(value);
  };

  const [handleFavourite] = useFavourite(org, teamId, updateLike, isLiked);

  useEffect(() => {
    setIsLiked(teamDetail?.isFavorite);
  }, [teamDetail]);

  useEffect(() => {
    dispatch(getTeamDetailAction({ orgId: org, teamId: teamId }));
    dispatch(getuserRoleAction({ orgId: org, teamId: teamId }));
    dispatch(getTeamCollaboratorAction({ orgId: org, teamId: teamId }));
  }, [org, teamId]);

  return (
    <>
      <BackDrop
        open={
          isLoading || inviteLoader || updateTeamLoader || deleteTeamLoader || generateLinkLoader
        }
      />
      <div className={styles.header}>
        <div>
          <span className={styles.title}>{teamDetail?.name}</span>
          <img
            src={isLiked ? YELLOW_START : STAR}
            className={styles.star}
            onClick={handleFavourite}
          />
        </div>
      </div>
      <div className={styles.tab_head}>
        <div className={styles.tab_sections}>
          {teamTabs.map((tabData) => (
            <Link
              to={`${tabData.redirect}/${tabData.currentTab}`}
              key={tabData.currentTab}
              className={`${styles.team_tab} ${tab === tabData.currentTab ? styles.active : ''}`}>
              {tabData.isAdmin
                ? userRole === 'owner' || userRole === 'admin'
                  ? tabData.text
                  : null
                : tabData.text}
            </Link>
          ))}
        </div>
        {tab === 'collaborators' && showInvite && (
          <div className={styles.add_btn} onClick={handleInvite}>
            <img src={PLUS} alt="add" /> Invite Collaborators
          </div>
        )}
        {tab === 'experiences' && (
          <div className="d-flex align-items-center">
            <TeamsMember handleInvite={handleInvite} showInvite={showInvite} />
            <Link to="/unity-editor" target='_blank'>
              <div className={styles.add_btn}>
                <img src={PLUS} alt="add" />
                New Experience
              </div>
            </Link>
          </div>
        )}
        {tab === 'assets' && (
          <div className="d-flex align-items-center">
            <TeamsMember handleInvite={handleInvite} showInvite={showInvite} />
            <div className={styles.add_btn}>
              <img src={PLUS} alt="add" />
              New Asset
            </div>
          </div>
        )}
      </div>
      <div className="h-100">{content(tab)}</div>
      <div className={styles.add_btn_container}>
        {tab === 'collaborators' && showInvite && (
          <div className={styles.add_btn} onClick={handleInvite}>
            <img src={PLUS} alt="add" /> Invite Collaborators
          </div>
        )}
        {tab === 'experiences' && (
          <div className={styles.add_btn}>
            <img src={PLUS} alt="add" />
            New Experience
          </div>
        )}
        {tab === 'assets' && (
          <div className={styles.add_btn}>
            <img src={PLUS} alt="add" />
            New Asset
          </div>
        )}
      </div>
      <InviteToTeam />
    </>
  );
};

export default TeamDetails;
