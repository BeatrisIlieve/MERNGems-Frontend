const PASSWORD_LENGTH = {
  MIN: 8,
  MAX: 255,
};

export const PASSWORD_PATTERN = new RegExp(
  `^(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[0-9]{1})[A-Za-z0-9]{${PASSWORD_LENGTH.MIN},${PASSWORD_LENGTH.MAX}}$`
);
const PASSWORD_ERROR_MESSAGE = `* Password must be ${PASSWORD_LENGTH.MIN}-${PASSWORD_LENGTH.MAX} characters and include at least one lowercase letter, one uppercase letter, and one digit`;
const PASSWORD_MISMATCH_ERROR_MESSAGE =
  "* Ensure that both password fields contain the same password";

const PASSWORD_SUCCESS_MESSAGE = "Your password has been changed successfully";

export const EMAIL_PATTERN = /^[A-Za-z0-9]+@+[a-z]+\.[a-z]{2,4}$/;
const EMAIL_ERROR_MESSAGE = "* Ensure you enter a valid email address";
const EMAIL_MISMATCH_ERROR_MESSAGE =
  "* Ensure that both email fields contain the same email address";
export const EMAIL_ALREADY_EXISTS_ERROR_MESSAGE =
  "This email address is already registered. Please log in or use a different one";

export const INVALID_CREDENTIALS_ERROR_MESSAGE =
  "We couldn't find an account matching the email and password you entered";

const NAME_LENGTH = {
  MIN: 2,
  MAX: 255,
};

export const NAME_PATTERN = new RegExp(
  `^[A-Za-z]{${NAME_LENGTH.MIN},${NAME_LENGTH.MAX}}$`
);
const NAME_ERROR_MESSAGE = `* This field requires ${NAME_LENGTH.MIN}-${NAME_LENGTH.MAX} letters`;

export const DATE_PATTERN = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
const DATE_ERROR_MESSAGE = "* Ensure you enter a valid date";

const PHONE_LENGTH = {
  MIN: 7,
  MAX: 15,
};

export const PHONE_PATTERN = new RegExp(
  `^[0-9]{${PHONE_LENGTH.MIN},${PHONE_LENGTH.MAX}}$`
);
const PHONE_ERROR_MESSAGE = `* This field requires ${PHONE_LENGTH.MIN}-${PHONE_LENGTH.MAX} digits`;

const STREET_LENGTH = {
  MIN: 8,
  MAX: 255,
};

export const STREET_PATTERN = new RegExp(
  `^[a-zA-Z0-9 ]{${STREET_LENGTH.MIN},${STREET_LENGTH.MAX}}$`
);
const STREET_ERROR_MESSAGE = `* This field requires ${STREET_LENGTH.MIN}-${STREET_LENGTH.MAX} characters`;

const APARTMENT_LENGTH = {
  MIN: 0,
  MAX: 10,
};

export const APARTMENT_PATTERN = new RegExp(
  `^[a-zA-Z0-9]{${APARTMENT_LENGTH.MIN},${APARTMENT_LENGTH.MAX}}$`
);
const APARTMENT_ERROR_MESSAGE = `* This field requires ${APARTMENT_LENGTH.MIN}-${APARTMENT_LENGTH.MAX} characters`;

const ZIP_CODE_LENGTH = {
  MIN: 4,
  MAX: 15,
};

export const ZIP_CODE_PATTERN = new RegExp(
  `^[A-Za-z0-9 ]{${ZIP_CODE_LENGTH.MIN},${ZIP_CODE_LENGTH.MAX}}$`
);
const ZIP_CODE_ERROR_MESSAGE = `* This field requires ${ZIP_CODE_LENGTH.MIN}-${ZIP_CODE_LENGTH.MAX} characters`;

export const SUCCESS_MESSAGES = {
  newPassword: PASSWORD_SUCCESS_MESSAGE,
};

export const LONG_CARD_NUMBER_PATTERN = /^\d{16}$/;

const LONG_CARD_NUMBER_PATTERN_ERROR_MESSAGE =
  "The card number should be exactly 16 digits long";

export const CARD_HOLDER_NAME_PATTERN = /^[a-zA-Z\s'-]{2,50}$/;

const CARD_HOLDER_NAME_PATTERN_ERROR_MESSAGE = "Ensure you enter a valid name";

export const CVV_CODE_PATTERN = /^\d{3}$/;

const CVV_CODE_PATTERN_ERROR_MESSAGE =
  "The CVV code should be exactly 3 digits long";

export const ERROR_MESSAGES = {
  password: PASSWORD_ERROR_MESSAGE,
  newPassword: PASSWORD_ERROR_MESSAGE,
  retypeNewPassword: PASSWORD_ERROR_MESSAGE,
  retypePassword: PASSWORD_ERROR_MESSAGE,
  passwordMismatch: PASSWORD_MISMATCH_ERROR_MESSAGE,
  email: EMAIL_ERROR_MESSAGE,
  retypeEmail: EMAIL_ERROR_MESSAGE,
  emailMismatch: EMAIL_MISMATCH_ERROR_MESSAGE,
  firstName: NAME_ERROR_MESSAGE,
  lastName: NAME_ERROR_MESSAGE,
  birthday: DATE_ERROR_MESSAGE,
  specialDay: DATE_ERROR_MESSAGE,
  phoneNumber: PHONE_ERROR_MESSAGE,
  street: STREET_ERROR_MESSAGE,
  zipCode: ZIP_CODE_ERROR_MESSAGE,
  city: NAME_ERROR_MESSAGE,
  apartment: APARTMENT_ERROR_MESSAGE,
  country: NAME_ERROR_MESSAGE,
  longCardNumber: LONG_CARD_NUMBER_PATTERN_ERROR_MESSAGE,
  cvvCode: CVV_CODE_PATTERN_ERROR_MESSAGE,
  cardHolder: CARD_HOLDER_NAME_PATTERN_ERROR_MESSAGE,
};
