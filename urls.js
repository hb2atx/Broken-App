
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const { URL } = require('url');
const filename = process.argv[2];

if (!filename) {
    console.error("Please provide a filename as an argument.");
    process.exit(1);
}
fs.readFile(filename, "utf-8", async (err, data) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    const urls = data.trim().split("\n");
    for (let url of urls) {
        try {
            const parsedUrl = new URL(url);
            const hostname = parsedUrl.hostname;
            const response = await axios.get(parsedUrl);
            const html = response.data
            const outputFileName = `${hostname}.txt`
            const outPath = path.join(__dirname, outputFileName);
            fs.writeFile(outPath, html, "utf-8", function(err) {
                if (err) {
                    console.error(`Error writing to ${outputFilename}:, ${err}`);
                } else {
                    console.log(`Saved ${url} to ${outputFileName}`);
                }
            })
        } catch (err) {
            console.error(`Error downloading ${url}:, ${err.message}`);
        }
    }
});