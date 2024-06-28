import fs from "fs";

export const retrieveDBJson = async (req, res) => {
  const { testType, content } = req.params;
  try {
    const data = await fs.readFileSync(
      `data/db_json/${testType}_${content}.json`,
      "utf8"
    );
    const jsonData = await JSON.parse(data);
    console.log(jsonData);
    res.status(200).json(jsonData);
  } catch (err) {
    console.error("Error reading or parsing the file:", err);
    res.status(404).json("couldnt send json");
  }
};
