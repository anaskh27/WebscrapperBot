import * as fs from "fs/promises";

export const updatePrompt = async (req, res) => {
  try {
    const prompt = req.body.prompt;

    // Read the JSON data from the file
    const jsonData = JSON.parse(
      await fs.readFile("./data/prompt/prompt.json", "utf8")
    );

    // Update the prompt in the JSON data
    jsonData.prompt = prompt;

    // Write the updated JSON data back to the file
    await fs.writeFile(
      "./data/prompt/prompt.json",
      JSON.stringify(jsonData, null, 2)
    );

    res.status(200).json({ message: "Prompt updated successfully" });
  } catch (e) {
    res.status(500).json({ error: "Failed to update prompt" });
  }
};
export const getPrompt = async (req, res) => {
  try {
    const jsonData = JSON.parse(
      await fs.readFile("./data/prompt/prompt.json", "utf8")
    );
    res.status(200).json({ prompt: jsonData.prompt });
  } catch (e) {
    res.status(500).json({ error: "Failed to get prompt" });
  }
};
