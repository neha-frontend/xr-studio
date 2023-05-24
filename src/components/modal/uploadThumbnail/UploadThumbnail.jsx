import { Formik, Form } from 'formik';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { CLOSE_ICON } from '../../../assets/images';
import { s3 } from '../../../aws';
import { UPLOAD_THUMBNAIL_MODAL } from '../../../constants/modalTypeConstant';
import { hideCustomModal, updateTeamAction } from '../../../store/sagaActions';
import BackDrop from '../../spinner/BackDrop';
import CustomModal from '../CustomModal';
import {
  INVALID_FORMAT,
  MINIMUM_SIZE_REQUIRED,
  SIZE_EXCEEDS
} from '../../../constants/errorConstants';
import DefaultProfile from '../../defaultProfile/DefaultProfile';

import styles from './uploadThumbnail.module.scss';

const UploadThumbnail = () => {
  const dispatch = useDispatch();
  const { customModalType } = useSelector((state) => state.modal);
  const { teamDetail } = useSelector((state) => state.myTeam.teamDetail);
  const { profileData } = useSelector((state) => state.profile.updateProfile);

  const initialValues = {
    profile: ''
  };

  const [coverPic, setCoverPic] = useState('');
  const [coverPicUrl, setCoverPicUrl] = useState('');
  const [imageLoader, setImageLoader] = useState(false);

  const hideModal = () => {
    dispatch(hideCustomModal());
    setCoverPicUrl('');
    setCoverPic('');
  };

  //UPLOAD IMAGE TO S3
  const uploadImageToS3 = async (file, path) => {
    const key = `${path}/${file.name}`;

    const params = {
      Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
      Key: key,
      Body: file
    };

    try {
      const data = await s3.upload(params).promise();
      return data.Location;
    } catch (error) {
      toast.error(error);
    }
  };

  //RETERIVE ITS URL
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const path = `media/organizations/${teamDetail?._organization}/teams/${teamDetail?._id}/uploadedBy/${profileData?._id}`;

    const url = await uploadImageToS3(file, path);
    setCoverPic(url);
    setImageLoader(false);
  };

  const handleCoverPicChange = (e) => {
    setImageLoader(true);
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
        if (file.size <= 524288) {
          toast.error(MINIMUM_SIZE_REQUIRED);
          setImageLoader(false);
        } else if (file.size >= 2097152) {
          toast.error(SIZE_EXCEEDS);
          setImageLoader(false);
        } else {
          handleFileUpload(e);
          setCoverPicUrl(URL.createObjectURL(file));
          setCoverPic(file);
        }
      } else {
        toast.error(INVALID_FORMAT);
        setImageLoader(false);
      }
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
          <div className={styles.modal_title}>Select Thumbnail</div>
          <Formik
            initialValues={initialValues}
            // validationSchema={resetPasswordValidatior}
            onSubmit={() => {
              if (coverPic) {
                const updatedUrl = coverPic.replace(
                  process.env.REACT_APP_S3_BASE_URL,
                  process.env.REACT_APP_IMAGE_KIT_BASE_URL
                );
                const teamData = {
                  media: [
                    {
                      contentType: 'image',
                      url: updatedUrl
                    }
                  ]
                };
                dispatch(
                  updateTeamAction({
                    orgId: teamDetail?._organization,
                    teamId: teamDetail?._id,
                    hideModal,
                    data: teamData
                  })
                );
              }
            }}>
            {({ errors, touched, isValid }) => (
              <Form>
                <div className={styles.email_input}>
                  <label className="w-100">
                    {teamDetail?.media?.length && teamDetail?.media[0]?.url !== '' ? (
                      <img
                        src={coverPicUrl || teamDetail?.media[0]?.url}
                        alt="coverpic"
                        className={styles.profile_image}
                      />
                    ) : (
                      <DefaultProfile name={teamDetail?.name} className={styles.profile_image} />
                    )}
                    <input
                      type="file"
                      name="profile"
                      accept="image/png,image/jpg,image/jpeg"
                      multiple={false}
                      className="d-none"
                      id="file-upload-button"
                      onChange={(e) => {
                        handleCoverPicChange(e);
                      }}
                    />
                  </label>
                  {errors.profile && touched.profile && (
                    <div className="error_msg">{errors.profile}</div>
                  )}
                </div>
                <Button
                  className={`${styles.send_btn} interact`}
                  type="submit"
                  disabled={coverPic === '' || !isValid}>
                  {!imageLoader && coverPicUrl.length > 0 ? 'Save Thumbnail' : 'Upload Thumbnail'}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </>
    );
  };

  return (
    <>
      <BackDrop open={imageLoader} />
      <CustomModal
        showModal={customModalType === UPLOAD_THUMBNAIL_MODAL}
        closeModal={hideModal}
        modalBody={modalBody()}
        className="upload_thumbnail_modal"
      />
    </>
  );
};

export default UploadThumbnail;
