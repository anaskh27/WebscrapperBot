import { MESSAGE } from "./messages.js";

export const FLAGS = {
  NO_SUBJECT_POST_FOUND: "Subject Post Not Found!",
  NO_IDEAS_FOUND: "Ideas Not Found!",
};
export const ACTIONS = {
  CREATE_SUBJECT_POST: "CREATE_SUBJECT_POST",
  CREATE_IDEA_POST: "CREATE_IDEA_POST",
};

export const validateMessage = (message) => {
  if (message.includes(FLAGS.NO_SUBJECT_POST_FOUND)) {
    return {
      message: MESSAGE.NOT_SUBJECT_MESSAGE,
      action: ACTIONS.CREATE_SUBJECT_POST,
    };
  }
  if (message.includes(FLAGS.NO_IDEAS_FOUND)) {
    return {
      message: MESSAGE.NOT_IDEAS_MESSAGE,
      action: ACTIONS.CREATE_IDEA_POST,
    };
  }
  return { message };
};
