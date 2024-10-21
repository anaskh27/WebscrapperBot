import { generalQA } from "../helpers/QAhelpers/generalQA.js";
import {
  QAfromTxtGPT,
  checkResponse,
} from "../helpers/QAhelpers/queryLangchain.js";
import { validateMessage } from "../helpers/constraints/flags.js";

export const question = async (req, res) => {
  const query = req.body.query;
  const general = req.body.general;
  const firstMessage = req.body.firstMessage;
  try {
    let message = "";
    // if (false) {
    //   message = await generalQA(query);
    // }
    if (!general) {
      message = await QAfromTxtGPT(query, firstMessage);
    }
    console.log(message);
    const action = validateMessage(message);
    res.status(200).json({ message, type: "bot", ...action });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
};
