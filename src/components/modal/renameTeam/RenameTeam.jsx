import { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { CHECK, CLEAR, CLOSE_ICON } from '../../../assets/images';
import { TEAMNAME_EXIST_ERROR } from '../../../constants/errorConstants';
import { RENAME_TEAM_MODAL } from '../../../constants/modalTypeConstant';
import { resetteamNameAvailability } from '../../../store/reducer/myTeam/createTeamSlice';
import {
  hideCustomModal,
  teamNameAvailabilityAction,
  updateTeamAction
} from '../../../store/sagaActions';
import { teamNameValidator } from '../../../validations/availabilityValidator';
import Spinner from '../../spinner';
import CustomModal from '../CustomModal';

import styles from './renameTeam.module.scss';

const RenameTeam = () => {
  const dispatch = useDispatch();
  const { customModalType, tempCustomModalData } = useSelector((state) => state.modal);
  const { availabilityLoader, teamNameAvailability } = useSelector(
    (state) => state.myTeam.createTeam
  );

  const [timer, setTimer] = useState(null);
  const [showError, setShowError] = useState(false);

  const initialValues = {
    teamName: tempCustomModalData?.name
  };

  const hideModal = () => {
    dispatch(hideCustomModal());
    setShowError(false);
  };

  const checkTeamName = (name) => {
    dispatch(
      teamNameAvailabilityAction({
        orgId: tempCustomModalData.orgId,
        teamName: name
      })
    );
  };

  const handleReset = (available, setFieldValue) => {
    if (!showError || !available) {
      setFieldValue('teamName', '');
    }
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
          <div className={styles.modal_title}>Rename Team</div>
          <Formik
            initialValues={initialValues}
            validationSchema={teamNameValidator}
            onSubmit={(values) => {
              const teamData = {
                name: values.teamName
              };
              dispatch(
                updateTeamAction({
                  orgId: tempCustomModalData.orgId,
                  teamId: tempCustomModalData.teamId,
                  hideModal,
                  data: teamData
                })
              );
            }}>
            {({ errors, isValid, setFieldValue, values }) => (
              <Form>
                <div className={styles.email_input}>
                  <div className={styles.input_name}>
                    {tempCustomModalData?.type === 'team' && 'Team Name'}
                    {tempCustomModalData?.type === 'experience' && 'Experience Name'}
                  </div>
                  <Field
                    name="teamName"
                    type="text"
                    className={styles.input_box}
                    onChange={(e) => {
                      setShowError(true);
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
                  showError &&
                  (availabilityLoader || teamNameAvailability === null) ? (
                    <Spinner className="rename_team_spinner" spinnerClassName="spinner_body" />
                  ) : isValid && values.teamName !== '' ? (
                    <img
                      src={teamNameAvailability ? CHECK : CLEAR}
                      alt="check_icon"
                      className="rename_team_spinner cp"
                      onClick={() => handleReset(teamNameAvailability, setFieldValue)}
                    />
                  ) : null}
                  {teamNameAvailability === false && values.teamName !== '' && !errors.teamName && (
                    <div className="error_msg">{showError ? TEAMNAME_EXIST_ERROR : ''}</div>
                  )}
                  {errors.teamName && (
                    <div className="error_msg">{showError ? errors.teamName : ''}</div>
                  )}
                </div>
                <div className={`${styles.btn_container} row`}>
                  <div className="col-6">
                    <Button
                      className={`${styles.send_btn} ${styles.cancel_btn} interact`}
                      onClick={hideModal}>
                      Cancel
                    </Button>
                  </div>
                  <div className="col-6">
                    <Button
                      className={`${styles.send_btn} interact`}
                      type="submit"
                      disabled={values.teamName === '' || !isValid || !teamNameAvailability}>
                      Rename Team
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </>
    );
  };

  return (
    <CustomModal
      showModal={customModalType === RENAME_TEAM_MODAL}
      closeModal={hideModal}
      modalBody={modalBody()}
      className="rename_team_modal"
    />
  );
};

export default RenameTeam;
