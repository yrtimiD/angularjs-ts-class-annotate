const fs = require("fs");
const path = require("path");

const logger = require("../dist/logger").defaultLog;
const annotateTs = require("../dist/index");

const inputFilesFolder = "./demo/test-cases";

logger.info("Deleting previous test results...");
fs.readdirSync(inputFilesFolder)
	.map(file => path.join(inputFilesFolder, file))
	.filter(file => file.match(/\.annotated\.ts$/))
	.forEach(file => fs.unlinkSync(file));

const files = fs.readdirSync(inputFilesFolder)
	.map(file => path.join(inputFilesFolder, file));

for (const inputFile of files) {
	logger.info(`Processing ${inputFile}`);
	var fileContent = fs.readFileSync(inputFile, "utf8");

	fileContent = annotateTs(fileContent, logger);

	const inputFilePath = path.parse(inputFile)
	inputFilePath.name += ".annotated";
	inputFilePath.base = "";
	const outputFile = path.format(inputFilePath);
	fs.writeFileSync(outputFile, fileContent, "utf8");
	logger.info(`Saved to ${outputFile}`);
}

