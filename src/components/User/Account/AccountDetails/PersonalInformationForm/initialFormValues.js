import { DATE_PATTERN, NAME_PATTERN} from "../../../../../constants/forms";


const FORM_KEYS = {
  FirstName: "firstName",
  LastName: "lastName",
  Birthday: "birthday",
  SpecialDay: "specialDay"
};

export const INITIAL_FORM_VALUES = {
  [FORM_KEYS.FirstName]: {
    fieldLabel: "First Name",
    fieldValue: "",
    regexPattern: NAME_PATTERN,
    errorMessage: "",
    isFocused: false,
    fieldType: "text",
    validTestData: "Test",
    invalidTestData: "Test1",
    emptyTestData: "",
  },

  [FORM_KEYS.LastName]: {
    fieldLabel: "Last Name",
    fieldValue: "",
    regexPattern: NAME_PATTERN,
    errorMessage: "",
    isFocused: false,
    fieldType: "text",
    validTestData: "Test",
    invalidTestData: "Test1",
    emptyTestData: "",

  },

  [FORM_KEYS.Birthday]: {
    fieldLabel: "Birthday (DD/MM/YYYY)",
    fieldValue: "",
    regexPattern: DATE_PATTERN,
    errorMessage: "",
    isFocused: false,
    fieldType: "text",
    validTestData: "10/10/1990",
    invalidTestData: "10101990",
    emptyTestData: "",
  },

  [FORM_KEYS.SpecialDay]: {
    fieldLabel: "Anniversary/Wedding (DD/MM/YYYY)",
    fieldValue: "",
    regexPattern: DATE_PATTERN,
    errorMessage: "",
    isFocused: false,
    fieldType: "text",
    validTestData: "10/10/1990",
    invalidTestData: "10101990",
    emptyTestData: "",
  },
};

export { FORM_KEYS };
