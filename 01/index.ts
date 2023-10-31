import { readFileSync, writeFileSync } from "fs";
const filePath = "./bd.json";

const fileReader = (fileName: string): unknown => {
  return JSON.parse(readFileSync(fileName, "utf-8"));
};

const fileWritter = (fileName: any, content: any): void => {
  writeFileSync(fileName, JSON.stringify(content));
};

const data = fileReader(filePath) as string[];

data.push("Aí?");
fileWritter(filePath, data);
