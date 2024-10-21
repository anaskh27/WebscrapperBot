import "cheerio";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import { PromptTemplate } from "@langchain/core/prompts";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { generalQAJSON } from "./generalQA.js";
import * as fs from "fs/promises";

// Memory Instance
const memory = new BufferMemory({
  memoryKey: "chat_history",
  returnMessages: true,
  inputKey: "question",
});

// Using OPENAI
export const QAfromTxtGPT = async (query, firstMessage) => {
  try {
    if (firstMessage) {
      await memory.clear();
    }
    const jsonData = await fs.readFile("./data/prompt/prompt.json", "utf8");
    const model = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
    const vector = await FaissStore.load("./vectors/jsonData", embeddings);

    const docxPrompt = `
    ${JSON.parse(jsonData)?.prompt}
    {context}
    {chat_history}
    Human: {question} Current conversation:
    AI:
`;
    const prompt = PromptTemplate.fromTemplate(docxPrompt);
    /* Create the chain */
    const chain = ConversationalRetrievalQAChain.fromLLM(
      model,
      vector.asRetriever(),
      {
        memory,
        qaChainOptions: {
          prompt: prompt,
          type: "stuff",
        },
      }
    );

    const res = await chain.invoke({ question: query });
    return res?.text;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
export const checkResponse = (str) => {
  const check = `I don't know`;
  const check1 = `I don't have`;
  const check2 = `I'm sorry`;
  return str.includes(check) || str.includes(check1) || str.includes(check2);
};
