import * as Yup from 'yup';

import { CONFIRM_PASSWORD_ERROR, EMAIL_VALID, PASSWORD_REQUIRED, PASSWORD_VALIDATION, REQUIRED_FIELD } from '../constants/errorConstants';
import { PASSWORD_REGEX } from '../constants/regexConstants';


export const forgotPasswordValidatior = ({ mobile }) => {  
  return Yup.object().shape({
    userData: mobile
      ? Yup.string()
          .trim()
          .matches(/^\d{8,14}$/, "enter valid mobile no")
          .required(REQUIRED_FIELD)
      : Yup.string()
          .trim()
          .matches(/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/, EMAIL_VALID)
          .required(REQUIRED_FIELD)
  });
};

export const resetPasswordValidatior = Yup.object().shape({
  password: Yup.string().trim().matches(PASSWORD_REGEX, PASSWORD_VALIDATION).required(PASSWORD_REQUIRED),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref('password'), null], CONFIRM_PASSWORD_ERROR)
    .required(PASSWORD_REQUIRED)
});
