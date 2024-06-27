import fs from "fs";
import path from "path";

export const getImageFile = (req, res) => {
  try {
    const encodedFilename = req.params.filename;
    const filename = decodeURIComponent(encodedFilename);
    const filePath = filename;

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Set Content-Disposition header for download (optional for images)
      const fileExtension = path.extname(filePath).toLowerCase();
      const fileName = path.basename(filePath);
      // res.setHeader(
      //   "Content-Disposition",
      //   `attachment; filename="${fileName}"`
      // );

      // Determine MIME type based on file extension for images
      let mimeType = "image/jpeg"; // Default to JPEG
      if (fileExtension === ".png") {
        mimeType = "image/png";
      } else if (fileExtension === ".gif") {
        mimeType = "image/gif";
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
