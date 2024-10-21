import { ChatOpenAI } from "@langchain/openai";

export const generalQA = async (query) => {
  try {
    const chatModel = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
    const answer = await chatModel.invoke(query);
    return answer?.lc_kwargs?.content;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
export const generalQAJSON = async (query) => {
  const prompt = `This is my JSON DATA ${query}.
  
  I want to you to write the summary of its data and use simple and easy language. 
  
  Summarize all its title in general language.

  I want you to respond like you are giving them infos about the problems and its solutions only sif they are included in the data.
  
  Dont Include words like ID or this.`;
  try {
    const chatModel = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
    const answer = await chatModel.invoke(prompt);
    return answer?.lc_kwargs?.content;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
