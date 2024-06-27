import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

export const getAudioFile = (req, res) => {
  try {
    const encodedFilename = req.params.filename;
    const filename = decodeURIComponent(encodedFilename);
    const filePath = filename;

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Set Content-Disposition header for download
      const fileExtension = path.extname(filePath).toLowerCase();
      const fileName = path.basename(filePath);
      // res.setHeader(
      //   "Content-Disposition",
      //   `attachment; filename="${fileName}"`
      // );

      // Determine MIME type based on file extension
      let mimeType = "audio/wav"; // Default to audio/wav
      if (fileExtension === ".mp3") {
        mimeType = "audio/mpeg";
      } else if (fileExtension === ".ogg") {
        mimeType = "audio/ogg";
      }

      // Set the appropriate Content-Type header
      res.writeHead(200, { "Content-Type": mimeType });

      // Stream the file to the client
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);

      return; // Add this return statement to prevent further execution
    } else {
      // If the file doesn't exist, send a 404 response

      res.status(404).json("File not found");
      return; // Add this return statement to prevent further execution
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Internal Server Error");
  }
};
