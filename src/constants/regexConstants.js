export const CANNOT_EMPTY_REGEX = /[^\s+$]/;
export const ONLY_CONTAN_ALPHABET_AND_SPACES_REGEX = /^[a-zA-Z ]*$/;
export const USERNAME_REGEX = /^[a-z0-9._]{3,30}$/;
export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@!]).{8,15}$/;
export const EMAIL_REGEX = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
export const TEAMNAME_REGEX = /^.{4,100}$/;
