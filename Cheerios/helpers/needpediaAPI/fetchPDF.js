import axios from "axios";
import { WebPDFLoader } from "langchain/document_loaders/web/pdf";
import { DocxLoader } from "langchain/document_loaders/fs/docx";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { OpenAIEmbeddings } from "@langchain/openai";

export const fetchPDFS = async (vectorStore) => {
  try {
    const { data } = await axios.get("https://staging.needpedia.org/pdf_links");
    const links = data?.links?.map((pdf) => {
      return `https${pdf?.url?.split("https")?.[1]}`;
    });
    for (const url of links) {
      const response = await fetch(url);
      const data = await response.blob();
      const loader = new WebPDFLoader(data);
      const docs = await loader.load();
      await vectorStore.addDocuments(docs);
    }
    vectorStore.save("./vectors/needpedia");
  } catch (e) {
    console.log(e);
  }
};
export const addDocx = async () => {
  try {
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
    const vector = await FaissStore.load("./vectors/jsonData", embeddings);
    const loader = new DocxLoader("./data/docx/docx.docx");
    const docs = await loader.load();
    await vector.addDocuments(docs);
    await vector.save("./vectors/jsonData");
  } catch (e) {
    console.log(e, "FROM DOCS FUNC");
  }
};
