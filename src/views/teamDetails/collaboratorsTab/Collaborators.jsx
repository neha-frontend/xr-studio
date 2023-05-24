import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';

import { SEARCH } from '../../../assets/images';
import copyToClipboard from '../../../components/copyToClipboard/copyToClipboard';
import Spinner from '../../../components/spinner';
import BackDrop from '../../../components/spinner/BackDrop';
import {
  getTeamMemberAction,
  inviteMemberAction,
  removeMemberAction,
  transferOwnershipAction,
  updateMemberRoleAction
} from '../../../store/sagaActions';
import { generateURL } from '../../../utils';
import {
  CheckmarkDropdown,
  SimpleDropdown
} from './../../../components/customDropdown/CustomDropdown';
import {
  adminOptions,
  collaboratorFilter,
  editorOptions,
  editorPermission,
  ownerOptions,
  ownerPermission
} from './permissonOptions';

import styles from './collaborators.module.scss';

const Collaborators = () => {
  const dispatch = useDispatch();
  const { isLoading, teamDetail, teamMembers, teamMemberLoader, updateRoleLoader, userRole } =
    useSelector((state) => state.myTeam.teamDetail);

  const [memberRole, setMemberRole] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  const [timer, setTimer] = useState(null);

  const setPermissionOption = (userRole) => {
    switch (userRole) {
      case 'admin':
        return ownerPermission;
      case 'owner':
        return ownerPermission;
      case 'editor':
        return editorPermission;
      default:
        return [];
    }
  };

  const setDropdownOption = (userRole) => {
    switch (userRole) {
      case 'admin':
        return adminOptions;
      case 'owner':
        return ownerOptions;
      case 'editor':
        return editorOptions;
      case 'viewer':
        return editorOptions;
      default:
        return [];
    }
  };

  const handleFilter = (role) => {
    setMemberRole(role);
  };

  const updateRole = (id, data, updateMemberRole) => {
    dispatch(
      updateMemberRoleAction({
        orgId: teamDetail?._organization,
        teamId: teamDetail?._id,
        memberId: id,
        data: data,
        updateMemberRole
      })
    );
  };

  const removeMember = (id) => {
    dispatch(
      removeMemberAction({
        orgId: teamDetail?._organization,
        teamId: teamDetail?._id,
        memberId: id
      })
    );
  };

  const handleInvite = (email, role) => {
    const data = {
      email: email,
      role: role
    };
    dispatch(
      inviteMemberAction({
        data,
        orgId: teamDetail?._organization,
        teamId: teamDetail?._id
      })
    );
  };

  const handleTransferOwnership = (id) => {
    const data = {
      _transferTo: id
    };
    dispatch(
      transferOwnershipAction({
        data,
        orgId: teamDetail?._organization,
        teamId: teamDetail?._id
      })
    );
  };

  const getTeamMemberApi = (isNew = false) => {
    dispatch(
      getTeamMemberAction({
        index: 1,
        limit: 10,
        orgId: teamDetail?._organization,
        teamId: teamDetail?._id,
        URL: generateURL({
          startIndex: isNew ? 1 : teamMembers?.startIndex + 10,
          itemsPerPage: 10,
          none1:
            memberRole === 'invite'
              ? `q[inviteStatus%3D/Pending/]`
              : memberRole !== 'all'
              ? `q[role%3D${memberRole}]`
              : '',
          none2: searchValue ? `q[user.usename%3D/${searchValue}/]` : '',          
        }),
        isNew
      })
    );
  };

  const fetchMoreData = () => getTeamMemberApi();

  const handleSearch = (e) => {
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        setSearchValue(e.target.value);
      }, 1000)
    );
  };
  useEffect(() => {
    if (!teamMembers?.list.length) getTeamMemberApi(true);
  }, [teamDetail]);

  useEffect(() => {
    getTeamMemberApi(true);
  }, [memberRole, searchValue]);

  return (
    <div className="h-100">
      <BackDrop open={updateRoleLoader} />
      <div className={styles.filter_head}>
        <div className="d-flex">
          <span className="filter_name">Filters:</span>
          <CheckmarkDropdown
            dropdownItem={collaboratorFilter}
            selectedValue="all"
            handleFilter={handleFilter}
            dropDownType="filter"
          />
        </div>
        <div className="d-flex align-items-center ms-5">
          <img src={SEARCH} alt="search" className={styles.search_img} />
          <input
            type="text"
            placeholder="Search"
            className={styles.search_input}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="h-100">
        <InfiniteScroll
          className="h-100"
          dataLength={teamMembers?.list?.length || 0}
          next={fetchMoreData}
          hasMore={teamMembers?.hasMore}
          loader={!teamMemberLoader && <Spinner />}>
          <Table className={styles.table_responsive}>
            <thead className={styles.colab_table}>
              <tr>
                <th className={styles.table_head}>Name</th>
                <th className={styles.table_head}>Username</th>
                <th className={styles.table_head}>Email</th>
                <th className={styles.table_head}>Team Permission</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {!teamMemberLoader ? (
                teamMembers?.list?.length ? (
                  teamMembers?.list?.map((member) => (
                    <>
                      <tr key={member._id} className="deskRow">
                        <td className={`${styles.table_body} pt-3 pb-3`}>
                          {member?.inviteStatus === 'Pending'
                            ? '-'
                            : `${member?.user?.firstName || '-'} ${
                                member?.user?.middleName || ''
                              } ${member?.user?.lastName || ''}`}
                        </td>
                        <td className={`${styles.table_body} pt-3 pb-3`}>
                          {member?.inviteStatus === 'Pending' ? '-' : member?.user?.username || '-'}
                        </td>
                        <td className={`${styles.table_body} pt-3 pb-3`}>
                          {member?.user?.email || member?.invitedUserEmail || '-'}
                          {member?.inviteStatus === 'Pending' ? (
                            <span className={styles.invite}>Invited</span>
                          ) : null}
                        </td>
                        <td className={`${styles.table_body} pt-3 pb-3`}>
                          {member?.role === 'owner' ? (
                            'Owner'
                          ) : userRole === 'editor' &&
                            (member?.role === 'admin' || member?.role === 'editor') ? (
                            member?.role.charAt(0).toUpperCase() + member?.role.slice(1)
                          ) : userRole === 'viewer' ? (
                            member?.role.charAt(0).toUpperCase() + member?.role.slice(1)
                          ) : (
                            <CheckmarkDropdown
                              dropdownItem={setPermissionOption(userRole)}
                              selectedValue={member?.role}
                              id={member._id}
                              action={updateRole}
                              dropDownType="changeRole"
                            />
                          )}
                        </td>
                        <td className={styles.table_body}>
                          <SimpleDropdown
                            dropdownItem={setDropdownOption(userRole)}
                            id={member._id}
                            userId={member?._user}
                            email={member?.user?.email || member?.invitedUserEmail}
                            role={member?.role}
                            showReinvite={member?.inviteStatus === 'Pending'}
                            handleInvite={handleInvite}
                            copyToClipboard={copyToClipboard}
                            removeMember={removeMember}
                            handleTransferOwnership={handleTransferOwnership}
                          />
                        </td>
                      </tr>
                    </>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">
                      <div className="no_data">No collaborator yet</div>
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan="4" className="mt-5">
                    {!isLoading && <Spinner className="mt-5" />}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Collaborators;
