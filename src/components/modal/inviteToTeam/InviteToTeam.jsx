import { Formik, Field, Form } from 'formik';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CLOSE_ICON, PROFILE } from '../../../assets/images';
import { INVITE_TO_TEAM_MODAL } from '../../../constants/modalTypeConstant';
import {
  hideCustomModal,
  inviteMemberAction,
  setJoinByLinkRoleAction,
} from '../../../store/sagaActions';
import { availabilityValidator } from '../../../validations/availabilityValidator';
import copyToClipboard from '../../copyToClipboard/copyToClipboard';
import { CheckmarkDropdown } from '../../customDropdown/CustomDropdown';
import Spinner from '../../spinner';
import CustomModal from '../CustomModal';
import TrimName from '../../trimName/TrimName';

import styles from './inviteToTeam.module.scss';

const InviteToTeam = ({ getTeamMemberApi }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customModalType, tempCustomModalData } = useSelector((state) => state.modal);

  // const [showPlan, setShowPlan] = useState(false);

  const hideModal = () => {
    dispatch(hideCustomModal());
    // if (showPlan) dispatch(showCustomModal({ customModalType: CHOOSE_TEAM_PLAN_MODAL }));
    // setShowPlan(false);
  };

  const showColab = tempCustomModalData?.showColab;
  const orgId = tempCustomModalData?.orgId;
  const teamId = tempCustomModalData?.teamId;
  const link = tempCustomModalData?.inviteByLink;
  const linkedRole = tempCustomModalData?.inviteByLinkRole;
  const initialValues = {
    email: ''
  };
  
  const [selectedValue, setSelectedValue] = useState('editor');
  const [linkRole, setLinkRole] = useState('editor');

  const permissionOptions = [
    { label: 'Admin', value: 'admin' },
    { label: 'Editor', value: 'editor' },
    { label: 'Viewer', value: 'viewer' }
  ];

  const handleCollab = () => {
    hideModal();
    navigate('/team-details/collaborators');
  };

  const updatePermission = (role) => {
    setSelectedValue(role);
  };

  const updateLinkRole = (role) => {
    setLinkRole(role);
    handleSetLinkForLink(role,true);
  };

  const handleInvite = (value) => {
    const data = {
      email: value.email,
      role: selectedValue
    };
    dispatch(
      inviteMemberAction({
        data,
        orgId: orgId,
        teamId: teamId,
        hideModal
      })
    );
  };

  const handleSetLinkForLink = (role,response) => {
    const data = {
      inviteByLink: true,
      inviteByLinkRole: role
    };
    dispatch(
      setJoinByLinkRoleAction({
        orgId: orgId,
        teamId: teamId,
        data: data,
        showResponse: response
      })
    );
  };

  const { teamMemberLoader, teamMembers } = useSelector((state) => state.myTeam.teamDetail);

  const modalBody = () => {
    return (
      <>
        <div className={styles.close_modal}>
          <img
            src={CLOSE_ICON}
            alt="close_icon"
            className={styles.close_icon}
            onClick={hideModal}
          />
        </div>
        <div
          className={`${
            tempCustomModalData?.showInviteByEmail ? styles.invite_body : styles.team_modal
          } ${styles.modal_body} ${showColab === undefined ? styles.modal_padding : ''}`}>
          <div className={styles.modal_title}>Invite to {TrimName(tempCustomModalData?.name)}</div>
          <Formik
            initialValues={initialValues}
            validationSchema={availabilityValidator}
            onSubmit={(values) => handleInvite(values)}>
            {({ errors, values, isValid }) => (
              <Form>
                <div className={styles.email_input}>
                  <div className={styles.input_name}>Invite by email</div>
                  <div className="d-flex flex-md-row flex-column">
                    <div className="d-flex mb-md-0 mb-3 w-100">
                      <Field name="email" type="text" className={styles.input_box} />
                      <CheckmarkDropdown
                        dropdownItem={permissionOptions}
                        className="invite_dropdown"
                        selectedValue={selectedValue}
                        updatePermission={updatePermission}
                        dropDownType="changeRole"
                      />
                    </div>
                    {tempCustomModalData?.showInviteByEmail ? (
                      <Button
                        className={styles.send_btn}
                        type="submit"
                        disabled={values.email === '' || !isValid}>
                        Send Invite
                      </Button>
                    ) : null}
                  </div>
                  {errors.email && <div className="error_msg">{errors.email}</div>}
                </div>
                {tempCustomModalData?.showInviteByLink ? (
                  <div className={styles.email_input}>
                    <div className={styles.input_name}>Invite by link</div>
                    <div className="d-flex flex-md-row flex-column">
                      <div className="d-flex mb-md-0 mb-3 w-100">
                        <Field
                          name="invitelink"
                          type="text"
                          className={styles.input_box}
                          value={tempCustomModalData?.inviteLink}
                          disabled
                        />
                        <CheckmarkDropdown
                          dropdownItem={permissionOptions}
                          className="invite_dropdown"
                          selectedValue={linkedRole || linkRole}
                          updatePermission={updateLinkRole}
                          dropDownType="changeRole"
                        />
                      </div>
                      <Button
                        className={styles.send_btn}
                        onClick={() =>
                          copyToClipboard(
                            tempCustomModalData?.inviteLink,
                            'Link copied to clipboard'
                          )
                        }
                        disabled={linkRole.length === 0}>
                        Copy Link
                      </Button>
                    </div>
                    {errors.invitelink && <div className="error_msg">{errors.invitelink}</div>}
                  </div>
                ) : null}
                {showColab === undefined ? null : !showColab ? (
                  <>
                    <Button
                      className={styles.create_btn}
                      type="submit"
                      // onClick={setShowPlan(true)}
                      disabled={values.email === '' || !isValid}>
                      Send Invite
                    </Button>
                    <div className={styles.skip_invite} onClick={hideModal}>
                      Skip For Now
                    </div>
                  </>
                ) : (
                  <div className={styles.colab_section}>
                    <p>Collaborators {!teamMemberLoader && `( ${teamMembers?.list?.length} )`} </p>

                    <InfiniteScroll
                      className={styles.infinite}
                      dataLength={teamMembers?.list?.length || 0}
                      next={() => getTeamMemberApi(false, orgId, teamId)}
                      hasMore={teamMembers?.hasMore}
                      height={150}
                      loader={<Spinner />}>
                      {!teamMemberLoader ? (
                        teamMembers?.list?.length ? (
                          teamMembers?.list?.map((member) => (
                            <div className={styles.member_details} key={member?.id}>
                              <div>
                                <img src={PROFILE} alt="image" className={styles.colab_image} />
                                <span className={styles.colab_name}>
                                  {member?.user?.username || 'N/A'}
                                </span>
                              </div>
                              <div className={styles.colab_role}>{member?.role}</div>
                            </div>
                          ))
                        ) : (
                          <div className="no_data">No collaborator yet</div>
                        )
                      ) : (
                        <Spinner className="mt-5" />
                      )}
                    </InfiniteScroll>
                    <div className={styles.manage_colab} onClick={handleCollab}>
                      Manage Collaborators
                    </div>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </>
    );
  };

  useEffect(() => {
    if (tempCustomModalData?.showInviteByLink) {
      if (!link) {
        handleSetLinkForLink('editor',false);
      }
    }
  }, [tempCustomModalData]);

  return (
    <CustomModal
      showModal={customModalType === INVITE_TO_TEAM_MODAL}
      closeModal={hideModal}
      modalBody={modalBody()}
      className="invite_modal"
    />
  );
};

export default InviteToTeam;
