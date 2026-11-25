// part 2 from the assignment 

const http = require("node:http");
const fsp = require("node:fs/promises");
const path = require("node:path");

const server = http.createServer((req, res) => {
  console.log({ url: req.url, method: req.method });
  const { url, method } = req;

  if (url == "/user" && method == "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", async () => {
      try {
        body = JSON.parse(body);
        const { name, age, email } = body;
        const userPath = path.resolve("./users.json");
        let users = await fsp.readFile(userPath, { encoding: "utf-8" });
        users = JSON.parse(users);

        // i didn't know how to do that so searched about it
        for (const id in users.users) {
          if (users.users[id].email == email) {
            res.writeHead(409, { "content-type": "application/json" });
            res.end(JSON.stringify({ msg: "Email Already Exists" }));
            return;
          }
        }

        const id = Date.now();

        /*
        the idea of line 54 to store the data as key is the id and the value is : id, name , age,email
        lets say the id = 123 so the data stored as :
        {
         "users": {
           "123": {
              "name": "Ahmed",
              "age": 21,
              "email": "ahmed@gmail.com"
            },
            "456": {
              "name": "Mohamed",
              "age": 22,
              "email": "mohamed@gmail.com"
            }
          }
        }

        i did this cuz u said in the imp notes donot store the data as array so i searched i found that way to store it 

        */
        users.users[id] = {
          id,
          name,
          age,
          email,
        };
        await fsp.writeFile(userPath, JSON.stringify(users));
        res.writeHead(201, { "content-type": "application/json" });
        res.end(JSON.stringify({ msg: "User Added Successfully" }));
      } catch (error) {
        console.log(error);
        res.writeHead(500, {
          "content-type": "application/json",
        });
        res.end(JSON.stringify({ msg: "Something went wrong" }));
      }
    });
  } else if (url.startsWith("/user/") && method == "PATCH") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        body = JSON.parse(body);
        const id = url.split("/user/")[1];

        const userPath = path.resolve("./users.json");
        let users = await fsp.readFile(userPath, { encoding: "utf-8" });
        users = JSON.parse(users);

        if (!users.users[id]) {
          res.writeHead(404, { "content-type": "application/json" });
          res.end(JSON.stringify({ msg: "User Not Found" }));
          return;
        }

        const { name, age, email } = body;

        /*
         line 102
         i had a problem which about if the user just want to edit his name not all the data how to save also the old data 
         i found sth called spread operators which take a copy of the data and just edit the new data on the old one 
       
        */

        users.users[id] = {
          ...users.users[id],
          name: name ?? users.users[id].name,
          age: age ?? users.users[id].age,
          email: email ?? users.users[id].email,
        };

        await fsp.writeFile(userPath, JSON.stringify(users));

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ msg: "User Updated Successfully" }));
      } catch (error) {
        console.log(error);
        res.writeHead(500, { "content-type": "application/json" });
        res.end(JSON.stringify({ msg: "Something Went Wrong" }));
      }
    });
  } else if (url.startsWith("/user/") && method == "DELETE") {
    const id = url.split("/user/")[1];
    // this fn just cuz it return promise btw i couldn't handle it so i let the ai handle it but i understand it well
    (async () => {
      try {
        const userPath = path.resolve("./users.json");
        let users = await fsp.readFile(userPath, { encoding: "utf-8" });
        users = JSON.parse(users);

        if (!users.users[id]) {
          res.writeHead(404, { "content-type": "application/json" });
          res.end(JSON.stringify({ msg: "User Not Found" }));
          return;
        }

        delete users.users[id];

        await fsp.writeFile(userPath, JSON.stringify(users));

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ msg: "User Deleted Successfully" }));
      } catch (error) {
        console.log(error);
        res.writeHead(500, { "content-type": "application/json" });
        res.end(JSON.stringify({ msg: "Something Went Wrong" }));
      }
    })(); // call the async function
  } else if (url == "/user" && method == "GET") {
    (async () => {
      try {
        const userPath = path.resolve("./users.json");
        let users = await fsp.readFile(userPath, { encoding: "utf-8" });
        users = JSON.parse(users);

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(users.users));
      } catch (error) {
        console.log(error);
        res.writeHead(500, { "content-type": "application/json" });
        res.end(JSON.stringify({ msg: "Something Went Wrong" }));
      }
    })();
  } else if (url.startsWith("/user/") && method == "GET") {
    (async () => {
      try {
        const id = url.split("/user/")[1];

        const userPath = path.resolve("./users.json");
        let users = await fsp.readFile(userPath, { encoding: "utf-8" });
        users = JSON.parse(users);

        if (!users.users[id]) {
          res.writeHead(404, { "content-type": "application/json" });
          res.end(JSON.stringify({ message: "User not found." }));
          return;
        }

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(users.users[id]));
      } catch (error) {
        console.log(error);
        res.writeHead(500, { "content-type": "application/json" });
        res.end(JSON.stringify({ msg: "Something Went Wrong" }));
      }
    })();
  }

  req.on("error", (err) => {
    console.log("request error");
    if (err) throw err;
  });

  res.on("error", (err) => {
    console.log("response error");
    if (err) throw err;
  });
});

server.listen(3000, () => {
  console.log("server is running");
});

server.on("error", (err) => {
  if (err) throw err;
});
