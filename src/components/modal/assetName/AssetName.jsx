import { useDispatch, useSelector } from 'react-redux';

import { CLOSE_ICON } from '../../../assets/images';
import { ASSET_NAME_MODAL } from '../../../constants/modalTypeConstant';
import { hideCustomModal } from '../../../store/sagaActions';
import CustomModal from '../CustomModal';

import styles from './assetName.module.scss';

const AssetName = () => {
  const dispatch = useDispatch();
  const { customModalType } = useSelector((state) => state.modal);

  const hideModal = () => {
    dispatch(hideCustomModal());
  };

  const assetDetails = [
    { detailsType: 'TYPE', details: 'Image' },
    { detailsType: 'CREATED', details: '11/25/2022, 4:38 PM' },
    { detailsType: 'MODIFIED', details: '12/4/2022, 4:38 PM' },
    { detailsType: 'SIZE', details: '43.3 MB' },
    { detailsType: 'WIDTH', details: '-' },
    { detailsType: 'HEIGHT', details: '-' },
    { detailsType: 'ACCESS', details: 'Team Access' }
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
          <div className={styles.modal_title}>{`{Asset Name} Details`}</div>
          <div className="container">
            <div className={`${styles.assetDetailsContainer} py-5`}>
              {assetDetails.map((details, index) => (
                <div className={`${styles.assetDetails} row mb-2`} key={index}>
                  <div className={`${styles.detailsType} col`}>{details.detailsType}</div>
                  <div className={`${styles.details} col`}>{details.details}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <CustomModal
        showModal={customModalType === ASSET_NAME_MODAL}
        closeModal={hideModal}
        modalBody={modalBody()}
        className="asset_name_modal"
      />
    </>
  );
};

export default AssetName;
