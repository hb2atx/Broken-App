const fs = require('fs');
const https = require('https');
const { URL } = require('url');

function downloadUrl(url, outputFileName) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        fs.writeFile(outputFileName, data, (error) => {
          if (error) {
            console.error(`Couldn't write to ${outputFileName}: ${error.message}`);
            reject(error);
          } else {
            console.log(`Wrote to ${outputFileName}`);
            resolve();
          }
        });
      });
    }).on('error', (error) => {
      console.error(`Couldn't download ${url}: ${error.message}`);
      reject(error);
    });
  });
}

function processUrlsFile(fileName) {
  try {
    const urls = fs.readFileSync(fileName, 'utf-8').split('\n').filter(Boolean);

    if (!urls.length) {
      console.error('No URLs found in the file');
      process.exit(1);
    }

    urls.forEach(async (url) => {
      const outputFileName = new URL(url).hostname;
      await downloadUrl(url, outputFileName);
    });
  } catch (error) {
    console.error(`Couldn't read the file ${fileName}: ${error.message}`);
    process.exit(1);
  }
}

const fileName = process.argv[2];

if (!fileName) {
  console.error('Please provide a file name as an argument');
  process.exit(1);
}

processUrlsFile(fileName);

// run script with this command
// node urls.js urls.txt
