import React, { useEffect, memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import branch from 'branch-sdk';

import Team from './Team';
import { PLUS } from '../../assets/images';
import { MultisectionDropdown } from '../../components/customDropdown/CustomDropdown';
import {
  getAllTeamAction,
  getTeamMemberAction,
  joinTeamByEmailAction,
  joinTeamUsingLinkAction,
  showCustomModal
} from '../../store/sagaActions';
import { CREATE_NEW_TEAM_MODAL, INVITE_TO_TEAM_MODAL } from '../../constants/modalTypeConstant';
import CreateNewTeam from '../../components/modal/createNewTeam/CreateNewTeam';
import DeleteTeam from '../../components/modal/deleteTeam/DeleteTeam';
import InviteToTeam from '../../components/modal/inviteToTeam/InviteToTeam';
import ChooseTeamPlan from '../../components/modal/chooseTeamPlan/ChooseTeamPlan';
import RenameTeam from '../../components/modal/renameTeam/RenameTeam';
import BackDrop from '../../components/spinner/BackDrop';
import { generateURL } from '../../utils';
import Spinner from '../../components/spinner';

import styles from './myTeam.module.scss';

const MyTeam = () => {
  const dispatch = useDispatch();

  const { isLoading, allTeamList } = useSelector((state) => state.myTeam.myTeam);
  const { isLoading: createTeamLoader } = useSelector((state) => state.myTeam.createTeam);
  const { inviteLoader } = useSelector((state) => state.myTeam.teamDetail);
  const { isLoading: inviteByLinkLoader } = useSelector((state) => state.common);

  const [sortBy, setSortBy] = useState('');

  const updatefilter = (sort) => {
    setSortBy(sort);
  };

  const handleCreateNewTeam = () => {
    dispatch(
      showCustomModal({
        customModalType: CREATE_NEW_TEAM_MODAL
      })
    );
  };

  const { teamMembers: team } = useSelector((state) => state.myTeam.teamDetail);

  const getTeamMemberApi = (isNew = false, org, teamId) => {
    dispatch(
      getTeamMemberAction({
        orgId: org,
        teamId: teamId,
        URL: generateURL({
          startIndex: isNew ? 1 : team?.startIndex + 4,
          itemsPerPage: 4
        }),
        isNew
      })
    );
  };

  const handleInvite = (data) => {
    const orgId = data?.orgId;
    const teamId = data?.teamId;
    getTeamMemberApi(true, orgId, teamId);

    dispatch(
      showCustomModal({
        customModalType: INVITE_TO_TEAM_MODAL,
        tempCustomModalData: data
      })
    );
  };

  const getAllTeamApi = (isNew = false) => {
    dispatch(
      getAllTeamAction({
        URL: generateURL({
          startIndex: isNew ? 1 : allTeamList.startIndex + 10,
          itemsPerPage: 10,
          'q[sort]': sortBy
        }),
        isNew
      })
    );
  };

  const fetchMoreData = () => getAllTeamApi();

  useEffect(() => {
    //intialize branch io to read deep link
    branch.init(process.env.REACT_APP_BRANCH_IO_KEY, (err, data) => {
      if (!err && data?.data_parsed?.type.length > 0) {
        const inviteDetail = {
          _team: data?.data_parsed?._team
        };
        if (data?.data_parsed?.type === 'JoinResourceFromEmailInvite') {
          dispatch(
            joinTeamByEmailAction({
              invitationId: data?.data_parsed?.invitationId,
              status: 'Accepted'
            })
          );
        } else dispatch(joinTeamUsingLinkAction({ data: inviteDetail }));
      }
    });
    if (allTeamList === null || allTeamList?.list?.length === 0) getAllTeamApi(true);
  }, []);

  useEffect(() => {
    if (sortBy.length > 0) getAllTeamApi(true);
  }, [sortBy]);

  return (
    <>
      <BackDrop open={isLoading || createTeamLoader || inviteLoader || inviteByLinkLoader} />
      <div className={styles.nav_bar}>
        <div className={styles.head}>My Teams</div>
        <div className={styles.add_btn} onClick={handleCreateNewTeam}>
          <img src={PLUS} alt="add" /> New Team
        </div>
      </div>
      <div className={styles.sort}>
        <span className="filter_name">Sort:</span>
        <MultisectionDropdown
          updatefilter={updatefilter}
          selectedSort="Last Edited"
          seectedOrder="Newest First"
        />
      </div>
      {!isLoading && allTeamList?.list?.length > 1 ? (
        <InfiniteScroll
          className="overflow-hidden"
          dataLength={allTeamList?.list?.length}
          next={fetchMoreData}
          hasMore={allTeamList?.hasMore}
          loader={<Spinner />}>
          {allTeamList.list.map((teams, index) =>
            !teams?.isDefault ? (
              <Team
                name={teams.name}
                org={teams._organization}
                key={teams._id}
                isFavourite={teams.isFavorite}
                teamId={teams._id}
                index={index}
                handleInvite={handleInvite}
                inviteLink={teams?.inviteLink}
                inviteByLinkRole={teams?.inviteByLinkRole}
                inviteByLink={teams?.inviteByLink}
              />
            ) : null
          )}
        </InfiniteScroll>
      ) : !isLoading ? (
        <div className={styles.no_data}>No Teams Yet</div>
      ) : null}
      <CreateNewTeam createTitle="Create New Team" createBtnText="Create Team" />
      <RenameTeam type="team" />
      <DeleteTeam type="team" />
      <InviteToTeam getTeamMemberApi={getTeamMemberApi} />
      <ChooseTeamPlan />
    </>
  );
};

export default memo(MyTeam);
