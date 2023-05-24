import { Formik, Field, Form } from 'formik';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../../spinner';
import CustomModal from '../CustomModal';
import { CHECK, CLEAR, CLOSE_ICON } from '../../../assets/images';
import { CREATE_NEW_TEAM_MODAL, INVITE_TO_TEAM_MODAL } from '../../../constants/modalTypeConstant';
import { teamNameValidator } from '../../../validations/availabilityValidator';
import { resetteamNameAvailability } from '../../../store/reducer/myTeam/createTeamSlice';
import {
  createTeamAction,
  hideCustomModal,
  showCustomModal,
  teamNameAvailabilityAction
} from '../../../store/sagaActions';
import { TEAMNAME_EXIST_ERROR } from '../../../constants/errorConstants';

import styles from './createNewTeam.module.scss';

const CreateNewTeam = ({ createTitle, createBtnText }) => {
  const dispatch = useDispatch();
  const { customModalType } = useSelector((state) => state.modal);
  const { updateProfile } = useSelector((state) => state.profile);
  const { availabilityLoader, teamNameAvailability } = useSelector(
    (state) => state.myTeam.createTeam
  );
  const hideModal = () => dispatch(hideCustomModal());
  const initialValues = {
    teamName: ''
  };

  const [timer, setTimer] = useState(null);

  const handleInvite = (orgId, teamId, teamName) => {
    const data = {
      showColab: false,
      orgId: orgId,
      teamId: teamId,
      showInviteByLink: false,
      name: teamName
    };
    dispatch(
      showCustomModal({
        customModalType: INVITE_TO_TEAM_MODAL,
        tempCustomModalData: data
      })
    );
  };

  const handleCreateTeam = (value) => {
    const data = {
      name: value.teamName
    };
    dispatch(
      createTeamAction({
        data,
        orgId: updateProfile.profileData._defaultOrganization,
        hideModal,
        handleInvite
      })
    );
  };

  const checkTeamName = (name) => {
    dispatch(
      teamNameAvailabilityAction({
        orgId: updateProfile.profileData._defaultOrganization,
        teamName: name
      })
    );
  };

  const handleReset = (available, reset) => {
    if (!available) reset();
  };

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
        <div className={styles.modal_body}>
          <div className={styles.modal_title}>{createTitle}</div>
          <Formik
            initialValues={initialValues}
            validationSchema={teamNameValidator}
            onSubmit={(values) => handleCreateTeam(values)}>
            {({ errors, isValid, setFieldValue, values, resetForm }) => (
              <Form>
                <div className={styles.email_input}>
                  <Field
                    name="teamName"
                    type="text"
                    className={styles.input_box}                    
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      setFieldValue('teamName', inputValue);
                      clearTimeout(timer);
                      setTimer(
                        setTimeout(() => {
                          checkTeamName(inputValue);
                        }, 2000)
                      );
                      dispatch(resetteamNameAvailability());
                    }}
                  />
                  {values.teamName !== '' &&
                  (availabilityLoader || teamNameAvailability === null) ? (
                    <Spinner className="create_team_spinner" spinnerClassName="spinner_body" />
                  ) : isValid && values.teamName !== '' ? (
                    <img
                      src={teamNameAvailability ? CHECK : CLEAR}
                      alt="check_icon"
                      className="create_team_spinner cp"
                      onClick={() => handleReset(teamNameAvailability, resetForm)}
                    />
                  ) : null}
                  {teamNameAvailability === false && values.teamName !== '' && !errors.teamName && (
                    <div className="error_msg teamname_error">{TEAMNAME_EXIST_ERROR}</div>
                  )}
                  {errors.teamName && (
                    <div className="error_msg teamname_error">{errors.teamName}</div>
                  )}
                </div>
                <Button
                  className={`${styles.send_btn} interact`}
                  type="submit"
                  disabled={values.teamName === '' || !isValid || !teamNameAvailability}>
                  {createBtnText}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </>
    );
  };

  return (
    <CustomModal
      showModal={customModalType === CREATE_NEW_TEAM_MODAL}
      closeModal={hideModal}
      modalBody={modalBody()}
      className="create_new_team_modal"
    />
  );
};

export default CreateNewTeam;
