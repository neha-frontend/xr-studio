import { useDispatch, useSelector } from 'react-redux';

import { CHECK_ICON, CLOSE_ICON } from '../../../assets/images';
import { CHOOSE_TEAM_PLAN_MODAL } from '../../../constants/modalTypeConstant';
import { hideCustomModal } from '../../../store/sagaActions';
import CustomModal from '../CustomModal';

import styles from './chooseTeamPlan.module.scss';

const ChooseTeamPlan = () => {
  const dispatch = useDispatch();
  const { customModalType } = useSelector((state) => state.modal);

  const hideModal = () => {
    dispatch(hideCustomModal());
  };

  const teamPlan = [
    '10 collaborators in a team',
    'Unlimited experiences',
    '1 GB storage ',
    'Interactions and animations',
    'Continuity API',
    'Lorem Ipsum'
  ];

  const proPlan = [
    'Unlimited collaborators in a team',
    'Unlimited experiences',
    '5 GB storage ',
    'Interactions and animations',
    'Continuity API',
    'Lorem Ipsum'
  ];

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
          <div className={styles.modal_title}>Choose Team Plan</div>

          <div className="container">
            <div className="row my-5 mx-sm-5 mx-0 text-center planRow gy-3">
              <div className="col">
                <div className={`${styles.card} ${styles.active} card mb-4`}>
                  <div className={`${styles.cardBody} card-body`}>
                    <p className={styles.planType}>Team</p>
                    <h3 className={styles.planTitle}>
                      $5<span className={styles.planMonth}>/ Month</span>
                    </h3>
                    <ul className="list-unstyled mt-3 mb-5">
                      {teamPlan.map((plan, index) => (
                        <li className="d-flex align-items-center" key={index}>
                          <div className={styles.imgDiv}>
                            <img src={CHECK_ICON} alt="check" className={styles.check} />
                          </div>
                          {plan}
                        </li>
                      ))}
                    </ul>
                    <button type="button" className="w-100 btn">
                      Current Plan
                    </button>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className={`${styles.card} card mb-4`}>
                  <div className={`${styles.cardBody} card-body`}>
                    <p className={styles.planType}>Pro</p>
                    <h3 className={styles.planTitle}>
                      $50<span className={styles.planMonth}>/ Month</span>
                    </h3>
                    <ul className="list-unstyled mt-3 mb-5">
                      {proPlan.map((plan, index) => (
                        <li className="d-flex align-items-center" key={index}>
                          <div className={styles.imgDiv}>
                            <img src={CHECK_ICON} alt="check" className={styles.check} />
                          </div>
                          {plan}
                        </li>
                      ))}
                    </ul>
                    <button type="button" className="w-100 btn">
                      Get Pro
                    </button>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className={`${styles.card} card mb-4`}>
                  <div className={`${styles.cardBody} card-body`}>
                    <p className={styles.planType}>Custom</p>
                    <h3 className={styles.planTitle}>Contact for Pricing</h3>
                    <ul className="list-unstyled mt-3 mb-5">
                      {proPlan.map((plan, index) => (
                        <li className="d-flex align-items-center" key={index}>
                          <div className={styles.imgDiv}>
                            <img src={CHECK_ICON} alt="check" className={styles.check} />
                          </div>
                          {plan}
                        </li>
                      ))}
                    </ul>
                    <button type="button" className="w-100 btn">
                      Get Custom
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <CustomModal
        showModal={customModalType === CHOOSE_TEAM_PLAN_MODAL}
        closeModal={hideModal}
        modalBody={modalBody()}
        className="choose_team_plan_modal"
        modalSize="xl"
      />
    </>
  );
};

export default ChooseTeamPlan;
