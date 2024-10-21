import axios from "axios";
import * as fs from "fs/promises";
import { createVectorPedia, storeDocx } from "./handleVectors.js";
import { addDocx } from "./fetchPDF.js";

const filePath = "./data/txt/qa.txt";

export const fetchSaveTXT = async () => {
  const url = "https://staging.needpedia.org/api/v1/faqs";
  const url2 = "https://staging.needpedia.org/api/v1/how_to";
  try {
    await fs.writeFile("./data/txt/qa.txt", " ");
    await getDataQA(url);
    await getDataQA(url2);
    await createVectorPedia();
    await storeDocx();
    // await addDocx();
  } catch (e) {
    console.log(e?.message);
  }
};
export const getPostData = async () => {
  try {
    const url = "https://staging.needpedia.org/api/v1/posts";
    const token = "e38412ab-2f63-440d-bf12-afb69dd28ac2";
    const { data } = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const prevData = await fs.readFile(filePath, "utf8");
    const arr = [...data];
    let content;
    arr?.forEach((item) => {
      const post = item?.subject;
      const id = post?.id;
      const title = post?.title;
      const description = post?.content;
      const NoIdeaProblems = "No Problems Available For this problem";
      const ProblemsTXT = post?.problems?.map((obj) => {
        const idea = obj?.problem;
        const ideaTitle = idea?.title;
        const ideaDescription = idea?.content;
        const ideas = idea?.ideas?.map((ideass) => {
          const solution = ideass?.idea;
          const solutionTitle = solution?.title;
          const solutionDescription = solution?.content;
          return `
          Idea Title: ${solutionTitle}.
          Idea Description: ${solutionDescription}\n
          `;
        });

        return `
        Problem Title: ${ideaTitle}
        Problem Description: ${ideaDescription}
        Ideas About Problems: ${ideas?.join("")}
        `;
      });
      let str = `
        Post ID:  ${id}.
        Post Title:  ${title}.
        Post Description: ${description}
        Problems About the Subject:  ${
          ProblemsTXT?.length === 0 ? NoIdeaProblems : ProblemsTXT.join("")
        }
        `;
      content += str;
    });
    const updatedData = `${prevData}
    ${content}
    \n`;
    await fs.writeFile("./data/txt/qa.txt", updatedData);
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
export const getDataQA = async (url) => {
  try {
    const { data } = await axios.get(url);
    const prevData = await fs.readFile(filePath, "utf8");

    let content = "";
    data?.forEach((item) => {
      content += `Question: ${item.question}\n

        Answer: ${item.answer}\n`;
    });
    const updatedData = `${prevData}
    ${content}
    \n`;
    await fs.writeFile("./data/txt/qa.txt", updatedData);
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
export const getPostDataJson = async (value) => {
  try {
    const url = "https://staging.needpedia.org/api/v1/posts";
    const token = "e38412ab-2f63-440d-bf12-afb69dd28ac2";
    const { data } = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const prevData = await fs.readFile(filePath, "utf8");
    const arr = [...data];
    const newData = arr?.map((item) => {
      const post = item?.subject;
      const postId = post?.id;
      const postTitle = post?.title;
      const postDescription = post?.content;
      const NoIdeaProblems = "No Problems Available For this problem";
      const problems = post?.problems?.map((obj) => {
        const problem = obj?.problem;
        const problemId = problem?.id;
        const problemTitle = problem?.title;
        const problemDescription = problem?.content;
        const ideas = problem?.ideas?.map((ideass) => {
          const idea = ideass?.idea;
          const id = idea?.id;
          const title = idea?.title;
          const description = idea?.content;
          return {
            id,
            title,
            description,
          };
        });

        return {
          id: problemId,
          title: problemTitle,
          description: problemDescription,
          ideas,
        };
      });

      return {
        id: postId,
        title: postTitle,
        description: postDescription,
        problems,
        // problems: problems?.length > 0 ? problems : NoIdeaProblems,
      };
    });
    if (value) {
      return newData;
    }
    const updatedData = `${prevData}
    \n\n\n\n\n\n\n
    Posts Data
    \n\n
    ${JSON.stringify(newData, 2)}
    \n`;
    await fs.writeFile("./data/txt/qa.txt", updatedData);
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
