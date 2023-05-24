import { useParams } from 'react-router';

import { ASSET, YELLOW_START } from '../../../assets/images';
import { CardDropdown } from '../../../components/customDropdown/CustomDropdown';

import styles from './assests.module.scss';

const AssetsCard = ({ experience = false, dropdown }) => {
  const { tab } = useParams();

  return (
    <>
      <div className={styles.image_box}>
        <div className="position-relative">
          <img src={ASSET} alt="asset" className={styles.asset_image} />
          {experience && (
            <>
              <img src={YELLOW_START} className={styles.fav_icon} alt="star" />
              <div className={styles.exp_status}>In Progress</div>
            </>
          )}
        </div>
        <div className={styles.asset_details}>
          <div className={styles.asset_name}>
            {tab === 'experiences' && `Experience Name`}
            {tab === 'assets' && `Asset Name`}
            <CardDropdown dropdownItem={dropdown} collapse="horizontal" />
          </div>
          <div className={styles.asset_time}>10 minutes ago</div>
        </div>
      </div>
    </>
  );
};

export default AssetsCard;
