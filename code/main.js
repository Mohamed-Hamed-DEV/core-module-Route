// part 1 from the assignment 

const path = require("node:path");
const { EventEmitter } = require("node:events");
const customEvent = new EventEmitter();
const fs = require("node:fs");
const fsp = require("node:fs/promises");
const zlib = require("node:zlib");
const { pipeline } = require("node:stream");
const os = require("node:os");

//#region question 1
// console.log({
//   File: __filename,
//   Dir: __dirname,
// });
//#endregion

//#region question 2

// var pathExample = "/user/files/report.pdf";
// console.log(path.basename(pathExample));

//#endregion

//#region question 3

// var pathObject = {
//   dir: "\\folder",
//   name: "app",
//   ext: ".js",
// };
// console.log(path.format(pathObject));

//#endregion

//#region question 4

// var pathExample = "/docs/readme.md";
// console.log(path.extname(pathExample));

//#endregion

//#region question 5

// var pathExample = "/home/app/main.js";
// const { name, ext } = path.parse(pathExample);
// console.log({
//   Name: name,
//   Ext: ext,
// });

//#endregion

//#region question 6

// var pathExample1 = "/home/user/file.txt";
// var pathExample2 = "./main.js";
// console.log(path.isAbsolute(pathExample1)); // Expected output : true
// console.log(path.isAbsolute(pathExample2)); // Expected output : false

//#endregion

//#region question 7

// var folder1 = "src";
// var folder2 = "components";
// var folder3 = "App.js";
// console.log(path.join(folder1, folder2, folder3));

//#endregion

//#region question 8

// var pathExample = "./main.js"
// console.log(path.resolve(pathExample));

//#endregion

//#region question 9

// var folder1 = "./folder1";
// var folder2 = "./folder2/file.txt";
// console.log(path.join(folder1, folder2));

//#endregion

//#region question 10
// const filePath = path.resolve("./dist.txt")

//create file first then delete it
// fs.writeFile("filePath", "test", (err) => {
//   if (err) throw err;
//   console.log("file created");
// });

// async function deleteFile() {
//   try {
//    await fsp.unlink(filePath)
//    console.log(`The ${path.basename(filePath)} is deleted.`);

//   } catch (error){
//     console.log(error);
//   }
// }
// deleteFile()

//#endregion

//#region question 11

// const folderPath = path.resolve("./folder 1")

// function createFolder() {
//   fs.mkdirSync(folderPath);
//   console.log("Success");
// }

// createFolder();

//#endregion

//#region qustion 12

// customEvent.on("start", () => {
//     console.log(" Welcome event triggered! ");
// });
// customEvent.emit("start")

//#endregion

//#region question 13

// customEvent.on("login", (username) => {
//     console.log("User logged in:", username);
// });
// customEvent.emit("login","Koong")
//#endregion

//#region question 14

// const readFilePath = path.resolve("./notes.txt");

// try {
//   const result = fs.readFileSync(readFilePath, "utf-8");
//   console.log(result);
// } catch (error) {
//   console.log(error);
// }

//#endregion

//#region question 15

// const writeFilePath = "./async.txt";

// fs.writeFile(writeFilePath, "Async save", (err) => {
//   if (err) throw err;
//   console.log("done");
// });

//#endregion

//#region question 16

// const dirPath = path.resolve("./notes.txt");

// const result = fs.existsSync(dirPath);
// console.log(result);

//#endregion

//#region question 17 

// function getOSInfo() {
//   return {
//     Platform: os.platform(),
//     Arch: os.arch(),
//   };
// }

// console.log(getOSInfo());

//#endregion

//#region question 18

// const readStream = fs.createReadStream("./big.txt");

// readStream.on("data", (chunk) => {
//   console.log(chunk.toString());
// });

// readStream.on("end", () => {
//   console.log("Reading completed");
// });

// readStream.on("error", (err) => {
//   console.log(err);
// });

//#endregion

//#region question 19

// const readFilePath = path.resolve("./src.txt");
// const writeFilePath = path.resolve("./dist.txt");

// const readStream = fs.createReadStream(readFilePath, {
//   encoding: "utf-8",
//   // highWaterMark :5,
// });

// const writeStream = fs.createWriteStream(writeFilePath, {
//   encoding: "utf-8",
//   // highWaterMark : 5
// });
// readStream.on("data", (chunck) => {
//   console.log(chunck);
//   writeStream.write(chunck);
// });

//#endregion

//#region question 20

// pipeline(
//   fs.createReadStream("./src.txt"),
//   zlib.createGzip(),
//   fs.createWriteStream("./src.txt.gz"),
//   (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("File compressed successfully");
//     }
//   },
// );

//#endregion



/*

-this is the end of part 1 in the assignment 

- u can find part 2 in server.js  file  
- also the database called users.json 


*/