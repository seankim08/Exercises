const fs = require('fs');
const axios = require('axios');

function cat(path, outputPath) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else {
            handleOutput(data, outputPath);
        }
    });
}

async function webCat(url, outputPath) {
    try {
        const response = await axios.get(url);
        handleOutput(response.data, outputPath);
    } catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

function handleOutput(data, outputPath) {
    if (outputPath) {
        fs.writeFile(outputPath, data, 'utf8', (err) => {
            if (err) {
                console.error(`Couldn't write ${outputPath}: ${err}`);
                process.exit(1);
            }
        });
    } else {
        console.log(data);
    }
}

// Parse command line arguments
let outputPath;
let inputPath;

if (process.argv[2] === '--out') {
    outputPath = process.argv[3];
    inputPath = process.argv[4];
} else {
    inputPath = process.argv[2];
}

if (!inputPath) {
    console.error('Please provide an input file path or URL');
    process.exit(1);
}

// Check if the argument is a URL or a file path
if (inputPath.startsWith('http://') || inputPath.startsWith('https://')) {
    webCat(inputPath, outputPath);
} else {
    cat(inputPath, outputPath);
}