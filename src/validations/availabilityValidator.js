import * as Yup from 'yup';

import { EMAIL_REGEX } from '../constants/regexConstants';
import {
  DELETE_TEAM_ERROR,
  EMAIL_REQUIRED,
  EMAIL_VALID,
  TEAMNAME_MAX_LENGTH,
  TEAMNAME_MIN_LENGTH,
  TEAMNAME_REQUIRED
} from '../constants/errorConstants';

export const availabilityValidator = () =>
  Yup.object().shape({
    email: Yup.string().trim().matches(EMAIL_REGEX, EMAIL_VALID).required(EMAIL_REQUIRED)
    // phone: isMobile && Yup.string().trim().matches(EMAIL_REGEX, EMAIL_ERROR).required(REQUIRED)
  });

export const teamNameValidator = () =>
  Yup.object().shape({
    teamName: Yup.string()
      .trim()
      .min(4, TEAMNAME_MIN_LENGTH)
      .max(100, TEAMNAME_MAX_LENGTH)
      .required(TEAMNAME_REQUIRED)
  });

export const deleteTeamValidator = (name) =>
  Yup.object().shape({
    teamName: Yup.string().trim().oneOf([name], DELETE_TEAM_ERROR).required(TEAMNAME_REQUIRED)
  });
