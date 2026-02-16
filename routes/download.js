// routes/download.js
const express = require("express");
const axios = require("axios");

const downloadRouter = express.Router();

downloadRouter.get("/image", async (req, res) => {
  const { url, filename } = req.query;
  if (!url) {
    return res.status(400).json({ message: "Missing url query param" });
  }

  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${filename || "image.jpg"}"`,
    );
    res.setHeader(
      "Content-Type",
      response.headers["content-type"] || "image/jpeg",
    );

    res.send(response.data);
  } catch (err) {
    console.error("Download error:", err.message);
    res.status(500).json({ message: "Failed to download image" });
  }
});

module.exports = downloadRouter;
