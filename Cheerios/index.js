import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";
import dotenv from "dotenv";
import { fetchSaveTXT } from "./helpers/needpediaAPI/fetchNeedPedia.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config({ path: ".env" });
app.use("/", routes);

app.get("/update", async (req, res) => {
  await fetchSaveTXT();

  res.send("Completed!");
});

const PORT = 5021;
// Local NetWork
// app.listen(PORT, "192.168.100.203", () => {
//   console.log("Server is Running on Port " + PORT);
// });

// cron.schedule("* * * * *", async () => {
//   console.log("FUNCTION RUNNNING");
//   // await fetchSaveTXT();
// });
// Local Network
app.listen(PORT, () => {
  console.log("Server is Running on Port " + PORT);
});
