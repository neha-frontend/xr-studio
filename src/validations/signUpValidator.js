import * as Yup from 'yup';

import {
  PASSWORD_REQUIRED,
  PASSWORD_VALIDATION,
  USERNAME_REQUIRED,
  USERNAME_VALID
} from '../constants/errorConstants';
import { PASSWORD_REGEX, USERNAME_REGEX } from '../constants/regexConstants';

export const signUpValidatior = Yup.object().shape({
  username: Yup.string().matches(USERNAME_REGEX, USERNAME_VALID).required(USERNAME_REQUIRED),
  password: Yup.string()
    .trim()
    .matches(PASSWORD_REGEX, PASSWORD_VALIDATION)
    .required(PASSWORD_REQUIRED)
  // confirm_password: Yup.string()
  //   .oneOf([Yup.ref('password'), null], 'Passwords do not match')
  //   .required('Confirm password is required')
});

export const usernameValidatior = Yup.object().shape({
  username: Yup.string().matches(USERNAME_REGEX, USERNAME_VALID).required(USERNAME_REQUIRED), 
});
