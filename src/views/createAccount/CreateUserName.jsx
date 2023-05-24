import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../../components/spinner';
import { checkAvailability} from '../../store/sagaActions/auth/auth';
import { usernameValidatior } from '../../validations/signUpValidator';
import { resetAvailabilityCheck, updateProfileAction } from '../../store/sagaActions';
import { USERNAME_EXIST_ERROR } from '../../constants/errorConstants';
import { CHECK, CLEAR } from '../../assets/images';
import BackDrop from '../../components/spinner/BackDrop';

import './createAccount.scss';

const CreateUserName = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { availabilityLoader, availability } = useSelector((state) => state.auth.register);

  const { isLoading } = useSelector((state) => state.profile.updateProfile);

  const initialValues = {
    username: ''
  };

  const [timer, setTimer] = useState(null);

  const redirect = () => {
    const joinLink = sessionStorage.getItem('joinTeam');
    if (joinLink) navigate(joinLink);
    else navigate('/');
  };

  const handleUsernameChange = (value) => {
    if (value !== '') {
      dispatch(
        checkAvailability({
          isUsername: true,
          username: value
        })
      );
    }
  };

  const handleReset = (available, reset) => {
    if (!available) reset();
  };

  return (
    <>
      <BackDrop open={isLoading} />
      <div className="create_body center_div">
        <div className="signup_title heading1">Create an Account</div>
        <Formik
          initialValues={initialValues}
          validationSchema={usernameValidatior}
          onSubmit={(values) => {
            dispatch(
              updateProfileAction({
                data: values,
                updateUsername: true,
                redirect
              })
            );
          }}>
          {({ errors, isValid, values, setFieldValue, resetForm}) => (
            <Form>
              <div className="email_input">
                <div className="input_name">Username </div>
                <Field
                  name="username"
                  type="text"
                  className="input_box"
                  onChange={(e) => {
                    const username = e.target.value.toLowerCase();
                    setFieldValue('username', username);
                    clearTimeout(timer);
                    setTimer(
                      setTimeout(() => {
                        handleUsernameChange(username);
                      }, 2000)
                    );
                    dispatch(resetAvailabilityCheck());
                  }}
                />
                {values.username !== '' && (availabilityLoader || availability === null) ? (
                  <Spinner className="input_spinner" spinnerClassName="spinner_body" />
                ) : values.username !== '' ? (
                  <img
                    src={availability ? CHECK : CLEAR}
                    alt="check_icon"
                    className="input_spinner cp"
                    onClick={() => handleReset(availability, resetForm)}
                  />
                ) : null}
                {!availability && availability !== null && !errors.username && (
                  <div className="error_msg">{USERNAME_EXIST_ERROR}</div>
                )}
                {errors.username && (
                  <div className="error_msg">{errors.username}</div>
                )}
              </div>

              <Button
                className="start_btn heading2"
                type="submit"
                disabled={!isValid || values.username === ''}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CreateUserName;
