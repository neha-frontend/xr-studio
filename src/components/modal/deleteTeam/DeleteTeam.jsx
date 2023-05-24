import { Formik, Field, Form } from 'formik';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CLOSE_ICON } from '../../../assets/images';
import { DELETE_TEAM_MODAL } from '../../../constants/modalTypeConstant';
import { deleteTeamAction, hideCustomModal } from '../../../store/sagaActions';
import { deleteTeamValidator } from '../../../validations/availabilityValidator';
import CustomModal from '../CustomModal';
import TrimName from '../../trimName/TrimName';

import styles from './deleteTeam.module.scss';

const DeleteTeam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customModalType, tempCustomModalData } = useSelector((state) => state.modal);
  const hideModal = () => dispatch(hideCustomModal());
  const initialValues = {
    teamName: ''
  };

  const myTeam = () => {
    navigate('/my-team');
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
          <div className={styles.modal_title}>Delete {TrimName(tempCustomModalData?.name)}</div>
          <Formik
            initialValues={initialValues}
            validationSchema={() => deleteTeamValidator(tempCustomModalData?.name)}
            onSubmit={() => {
              dispatch(
                deleteTeamAction({
                  orgId: tempCustomModalData?.orgId,
                  teamId: tempCustomModalData?.teamId,
                  redirect: tempCustomModalData?.redirect,
                  hideModal,
                  myTeam
                })
              );
            }}>
            {({ errors, isValid, values }) => (
              <Form>
                <div className={styles.description}>
                  {tempCustomModalData?.type === 'experience' && (
                    <p className="text-center mb-0">
                      {' '}
                      This will remove the experience from this team. Are you sure you want to
                      delete ?
                    </p>
                  )}
                  {tempCustomModalData?.type === 'team' &&
                    ` This will permanently delete the team ${tempCustomModalData?.name}. Deleting this
                  team will also delete all the projects inside the team.`}
                </div>
                {tempCustomModalData?.type === 'team' && (
                  <div className={styles.email_input}>
                    <div className={styles.input_name}>
                      To confirm, please enter the name of the team.
                    </div>
                    <Field
                      name="teamName"
                      type="text"
                      className={styles.input_box}
                      placeholder={tempCustomModalData?.name}
                    />
                    {errors.teamName && <div className="error_msg">{errors.teamName}</div>}
                  </div>
                )}

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
                      disabled={values.teamName.length === 0 || !isValid}>
                      Delete {tempCustomModalData?.name}
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
      showModal={customModalType === DELETE_TEAM_MODAL}
      closeModal={hideModal}
      modalBody={modalBody()}
      className="delete_team_modal"
    />
  );
};

export default DeleteTeam;
