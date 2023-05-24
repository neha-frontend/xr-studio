import { CHECKMARK } from '../../../assets/images';
import styles from './setting.module.scss';

export const teamPlay = [
  {
    title: () => {
      return (
        <div className={`${styles.text} row`}>
          <div className={`${styles.sub_head} col-lg-3 col-md-4 col-sm-12 col-12`}>Team Play</div>
          <div
            className={`${styles.accordion_head} col-lg-3 col-md-4 col-sm-12 col-12 d-md-none mb-2`}>
            Team Plan
          </div>
          <div className="col-lg-5 col-md-4 col-sm-6 col-6">
            <span className={`${styles.accordion_head} d-md-flex d-none`}>Team Plan</span>
            <p className={`${styles.sub_head} mb-0`}>Admin</p>
            <p>John Doe</p>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 col-6">
            <span className={styles.accordion_head}>$5 per month,</span> billed annually
            <p className={styles.sub_head}>Next Payment: Feb 1, 2023</p>
          </div>
        </div>
      );
    },
    id: 1,
    body: () => {
      return (
        <div className="container mx-0">
          <div className={`${styles.text} row`}>
            <div className="col-lg-3 col-md-4 col-sm-12 col-12"></div>
            <div className="col-lg-5 col-md-4 col-sm-12 col-12 p-1">
              <div>
                <span className={styles.sub_head}>Details</span>
                <p>
                  For collaboratively building scalable AR experiences with a team. Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                  labore et.
                </p>
                <p>
                  <img src={CHECKMARK} alt="checkmark" className="me-3" />
                  10 collaborators in a team (2 remaining)
                </p>
                <p>
                  <img src={CHECKMARK} alt="checkmark" className="me-3" />
                  Unlimited experiences
                </p>
                <p>
                  <img src={CHECKMARK} alt="checkmark" className="me-3" />1 GB storage{' '}
                </p>
                <p>
                  <img src={CHECKMARK} alt="checkmark" className="me-3" />
                  Interactions and animations{' '}
                </p>
                <p>
                  <img src={CHECKMARK} alt="checkmark" className="me-3" />
                  Continuity API
                </p>
                <p>
                  <img src={CHECKMARK} alt="checkmark" className="me-3" />
                  Lorem Ipsum
                </p>
                <div className={styles.plan_body}>
                  <div className={styles.plan}>Change Team Plan</div>
                  <div className={styles.cancel_plan}>Cancel Plan</div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-12 mt-md-0 mt-5  position-relative">
              <span className={styles.sub_head}>Payment</span>
              <p>$5 per month, billed annually Next payment: Feb 1, 2023</p>
              <p>VISA ending in ****</p>
              <p>Expires 01/25</p>
              <p>John Doe</p>
              <p>Edit</p>
              <div className={styles.biling_btn}>View Billing History</div>
            </div>
          </div>
        </div>
      );
    }
  }
];
