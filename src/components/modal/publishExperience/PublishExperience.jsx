import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Fade, Switch, Tooltip } from '@material-ui/core';
import { Button, Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import Select from 'react-select';
import { Link } from 'react-router-dom';

import { publicExpValidation } from '../../../validations/publicExpValidation';
import { CLOSE_ICON } from '../../../assets/images';
import CustomModal from '../CustomModal';
import {
  CANCEL_REVIEW_MODAL,
  PUBLISH_EXPERIENCE_MODAL
} from '../../../constants/modalTypeConstant';
import { hideCustomModal, showCustomModal } from '../../../store/sagaActions';
import { Vector } from '../../../assets/images';
import FormContainer from '../../../views/manageExperinece/FormContainer';
import CancelReview from '../cancelReview/CancelReview';

import styles from './publishExperience.module.scss';

// dummy options for tag creators
const tag_creators = [
  { value: 'Wade warren', label: 'Wade warren' },
  { value: 'Leslie', label: 'Leslie' }
];

const Exp_tags = [
  { value: 'Experience 1', label: 'Experience 1' },
  { value: 'Experience 2', label: 'Experience 2' }
];

const location_tags = [{ value: 'The Groove', label: 'The Groove' }];

const initialValues = {
  exp_name: '',
  image: '',
  description: '',
  tag_creators: [],
  experience_tags: [],
  location_tag: []
};

const PublishExperience = ({ draft }) => {
  const dispatch = useDispatch();
  const [switchValue, setSwitchValue] = useState(false);
  const [imageHandler, setImageHandler] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const { customModalType } = useSelector((state) => state.modal);
  const [inputValues, setInputValues] = useState('');
  const [isReview, setIsReview] = useState(false);

  const hideModal = () => dispatch(hideCustomModal());

  // handle switch change
  const handleSwitchChange = (event) => {
    setSwitchValue(event.target.checked);
  };

  //Cancel review
  const handleCancel = () => {
    dispatch(
      showCustomModal({
        customModalType: CANCEL_REVIEW_MODAL
      })
    );
  };

  //   styling for dropdownOption
  const colorStyles = {
    control: (style) => ({
      ...style,
      padding: '3px'
    }),
    multiValue: (style) => {
      return {
        ...style,
        borderRadius: '20px',
        padding: '6px 10px 6px 12px',
        backgroundColor: '#EEEEEE'
      };
    }
  };
  console.log(imageHandler);
  const modalBody = () => {
    return (
      <>
        {!draft && (
          <div className={styles.close_modal}>
            <Tooltip
              title="Close"
              placement="right"
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}>
              <img
                src={CLOSE_ICON}
                alt="close_icon"
                className={styles.close_icon}
                onClick={hideModal}
              />
            </Tooltip>
          </div>
        )}
        <div className={styles.modal_body}>
          {draft ? (
            <>
              <div className={styles.manage_title}>Manage Experience </div>
              <li className={styles.menu_link}>
                <Link href="./my-team/manage-experience" className={styles.active}>
                  Details
                </Link>{' '}
                <Link href="#">Statistic</Link>
              </li>
            </>
          ) : (
            <div className={styles.modal_title}>Publish Experience </div>
          )}
          <Formik
            initialValues={initialValues}
            validationSchema={publicExpValidation}
            onSubmit={(values, { resetForm }) => {
              hideModal();
              setPreviewImage('');
              setIsReview(true);
              setInputValues(values);
              resetForm();
            }}>
            {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
              <>
                <Row className={`${styles.modal_form}  `}>
                  <Col sm="3" className={`${styles.left_content} `}>
                    <div>
                      <div className={styles.qr_image}>
                        <img className={styles.qr_code} src={Vector} alt="Qr-code" width="100%" />
                      </div>
                      <p className={styles.modal_code_desc}>
                        To preview this experience, use Node App to scan the code.
                      </p>
                    </div>

                    <div className={styles.preview_frame}>
                      <label htmlFor="preview_img" className={styles.preview_btn}>
                        {previewImage && (
                          <img
                            src={previewImage}
                            alt="preview_image"
                            className={styles.add_preview}
                          />
                        )}
                        <input
                          accept="image/*"
                          multiple
                          type="file"
                          id="preview_img"
                          onChange={(e) => {
                            handleChange(e);
                            setPreviewImage(URL.createObjectURL(e.target.files[0]));
                          }}
                          value={values.preview}
                          className={styles.upload_preview}
                        />
                        {previewImage ? '' : 'Add Experience preview'}
                      </label>
                      {previewImage ? '' : <p className={styles.optional}>(Optional)</p>}
                    </div>
                  </Col>
                  <Col sm="8" className={` ${styles.right_content} p-0`}>
                    {isReview ? (
                      <FormContainer data={inputValues} image={imageHandler} />
                    ) : (
                      <Form className={styles.form_container}>
                        <Form.Group className={styles.name_input}>
                          <Form.Label className={styles.input_label}>Experience Name</Form.Label>
                          <div className={styles.exp_name_box}>
                            <Form.Control
                              required
                              value={values.exp_name}
                              onChange={handleChange}
                              name="exp_name"
                              className={styles.text_field}
                            />
                            {draft && <span className={styles.draft_span}>Draft</span>}
                            {values.exp_name && (
                              <span
                                onClick={() => setFieldValue('exp_name', '')}
                                className={styles.clear_btn}>
                                x
                              </span>
                            )}
                          </div>

                          {errors.exp_name && touched.exp_name && (
                            <p className={styles.error}>{errors.exp_name}</p>
                          )}
                        </Form.Group>

                        <Form.Group>
                          <Form.Label className={styles.input_label}>
                            Experience Thumbnail
                          </Form.Label>

                          <div className={styles.image_circle}>
                            <label htmlFor="file-input">
                              {imageHandler && (
                                <img
                                  src={imageHandler}
                                  alt="profile_image"
                                  className={styles.image_preview}
                                />
                              )}
                              <input
                                type="file"
                                id="file-input"
                                className={styles.upload_input}
                                onChange={(e) => {
                                  handleChange(e);
                                  setImageHandler(URL.createObjectURL(e.target.files[0]));
                                }}
                                value={values.image}
                                name="image"
                                accept="image/*"
                              />

                              {imageHandler ? '' : 'Upload'}
                            </label>
                          </div>

                          {errors.image && touched.image && (
                            <p className={styles.error}>{errors.image}</p>
                          )}
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label className={styles.input_label}>Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={values.description}
                            onChange={handleChange}
                            name="description"
                          />
                          {errors.description && touched.description && (
                            <p className={styles.error}>{errors.description}</p>
                          )}
                        </Form.Group>

                        <Form.Group className={styles.tag_creator_field}>
                          <Form.Label className={styles.input_label}>Tag Creators</Form.Label>
                          <span className={styles.tag_text}>Tag Everyone in the team name</span>
                          <Select
                            placeholder=""
                            onChange={(option) => {
                              setFieldValue('tag_creators', option);
                            }}
                            options={tag_creators}
                            name="tag_creators"
                            isMulti
                            styles={colorStyles}
                          />
                          {errors.tag_creators && touched.tag_creators && (
                            <p className={styles.error}>{errors.tag_creators}</p>
                          )}
                        </Form.Group>

                        <Form.Group>
                          <Form.Label className={styles.input_label}>
                            location based experience?
                          </Form.Label>
                          <Switch
                            aria-label="Switch demo"
                            checked={switchValue}
                            onChange={handleSwitchChange}
                            color="primary"
                          />
                        </Form.Group>
                        {switchValue && (
                          <Form.Group className={styles.select_location}>
                            <Select
                              placeholder=""
                              options={location_tags}
                              onChange={(option) => {
                                setFieldValue('location_tag', option);
                              }}
                              name="location_tag"
                              isMulti
                              styles={colorStyles}
                            />{' '}
                          </Form.Group>
                        )}

                        <Form.Group>
                          <Form.Label className={styles.input_label}>Experience Tags</Form.Label>
                          <Select
                            placeholder=""
                            onChange={(option) => {
                              setFieldValue('experience_tags', option);
                            }}
                            options={Exp_tags}
                            name="experience_tags"
                            isMulti
                            styles={colorStyles}
                          />
                          {errors.experience_tags && touched.experience_tags && (
                            <p className={styles.error}>{errors.experience_tags}</p>
                          )}
                        </Form.Group>
                      </Form>
                    )}
                  </Col>
                </Row>
                <div className={`${draft ? styles.review_btn : styles.modal_btn} interact `}>
                  {isReview ? (
                    <Button
                      type="submit"
                      className={`${styles.cancel_review} interact `}
                      onClick={handleCancel}>
                      Cancel Review
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      type="submit"
                      className={`${styles.send_btn} interact `}>
                      Request Review
                    </Button>
                  )}
                </div>
              </>
            )}
          </Formik>
        </div>
        <CancelReview />
      </>
    );
  };

  return (
    <>
      {draft ? (
        modalBody()
      ) : (
        <CustomModal
          showModal={customModalType === PUBLISH_EXPERIENCE_MODAL}
          closeModal={hideModal}
          modalBody={modalBody()}
          className="publish_modal"
        />
      )}
    </>
  );
};

export default PublishExperience;
