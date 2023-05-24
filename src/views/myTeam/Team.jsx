import React, { useEffect, useState, memo } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';

import { PROFILE, STAR, TEAM_IMG, THREE_DOT, YELLOW_START } from '../../assets/images';
import { getAllTeamMembersAction, showCustomModal } from '../../store/sagaActions';
import { DELETE_TEAM_MODAL, RENAME_TEAM_MODAL } from '../../constants/modalTypeConstant';
import useFavourite from '../../hooks/manageFavourite/manageFavourite';
import TrimName from '../../components/trimName/TrimName';

import styles from './myTeam.module.scss';

const cards = [];
const Team = ({
  name,
  org,
  isFavourite,
  teamId,
  handleInvite,
  inviteLink,
  inviteByLinkRole,
  inviteByLink
}) => {
  const dispatch = useDispatch();

  const [isLiked, setIsLiked] = useState(isFavourite);

  const data = {
    orgId: org,
    teamId: teamId,
    name: name,
    showColab: true,
    showInviteByLink: true,
    showInviteByEmail: true,
    type: 'team',
    inviteLink: inviteLink,
    inviteByLinkRole,
    inviteByLink
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

  const { allTeamList } = useSelector((state) => state.myTeam.myTeam);
  const teamMembers = useSelector((state) => state?.myTeam?.myTeam?.teamMembers);

  const handleTeamDetail = () => {
    localStorage.setItem('orgId', org);
    localStorage.setItem('teamId', teamId);
  };

  const updateLike = (value) => {
    setIsLiked(value);
  };

  const [handleFavourite] = useFavourite(org, teamId, updateLike, isLiked);

  useEffect(() => {
    if (teamMembers.length === 0 || allTeamList.list.length !== teamMembers.length)
      dispatch(getAllTeamMembersAction({ orgId: org, teamId: teamId }));
  }, [org, teamId, allTeamList.list.length]);

  const TeamMembers = teamMembers.filter((member) => member[0]._team == teamId);

  return (
    <Link to="/team-details/experiences" className={styles.team_link} onClick={handleTeamDetail}>
      <div className={styles.team_body}>
        <div className={styles.sub_body}>
          <span className={styles.team_name}>{TrimName(name)}</span>
          <div className={styles.imgTextContainer}>
            <div className="d-flex align-items-center">
              {TeamMembers?.length
                ? TeamMembers[0]
                    ?.slice(0, 4)
                    .map((member) => (
                      <img
                        src={PROFILE}
                        className={styles.teamRoundedImg}
                        alt="collaborators"
                        key={member?._id}
                      />
                    ))
                : null}
              {TeamMembers[0]?.length > 4 ? (
                <div className={styles.teamImgNum}>{`+${TeamMembers[0]?.length - 4}`}</div>
              ) : null}
            </div>
            <span className={styles.editText}>Edited 5 minutes ago</span>
          </div>
        </div>

        <Grid container spacing={2} className={`cp ${styles.teamCard}`}>
          {cards?.length ? (
            cards.map((index) => (
              <Grid item lg={3} sm={4} xs={6} key={index}>
                <Link to="/team-details/experiences" key={index} className={styles.team_link}>
                  <img src={TEAM_IMG} alt="team" className={styles.team_img} />
                </Link>
              </Grid>
            ))
          ) : (
            <div className={styles.no_exp}>No experience yet</div>
          )}
        </Grid>

        <div className={styles.team_star_dropdown_container}>
          <img
            src={isLiked ? YELLOW_START : STAR}
            alt="star"
            className={styles.star_img}
            onClick={(event) => {
              event.preventDefault();
              handleFavourite();
            }}
          />
          <Dropdown className={styles.edit_dropdown}>
            <Dropdown.Toggle className={styles.edit_toggle}>
              <img
                src={THREE_DOT}
                alt="dropDown"
                className={styles.dot_img}
                onClick={(event) => event.preventDefault()}
              />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleInvite(data)} className={styles.simpledd_item}>
                Invite
              </Dropdown.Item>
              <Dropdown.Item onClick={handleTeamRename} className={styles.simpledd_item}>
                Rename
              </Dropdown.Item>
              <Dropdown.Item onClick={handleDeleteTeam} className={styles.simpledd_item}>
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </Link>
  );
};

export default memo(Team);
