import * as fs from "fs/promises";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { OpenAIEmbeddings } from "@langchain/openai";
import { fetchPDFS } from "./fetchPDF.js";

export const createVectorPedia = async () => {
  try {
    const trainingText = await fs.readFile("./data/txt/qa.txt", "utf8");
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 175,
      chunkOverlap: 0,
    });
    const docs = await textSplitter.createDocuments([trainingText]);

    const vectorStore = await FaissStore.fromDocuments(
      docs,
      new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY })
    );

    await vectorStore.save("./vectors/jsonData");
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
export const storeDocx = async () => {
  try {
    const trainingText = await fs.readFile("./data/txt/docxData.txt", "utf8");
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 175,
      chunkOverlap: 0,
    });
    const docs = await textSplitter.createDocuments([trainingText]);
    const vector = await FaissStore.load(
      "./vectors/jsonData",
      new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY })
    );
    await vector.addDocuments(docs);
    await vector.save("./vectors/jsonData");
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
