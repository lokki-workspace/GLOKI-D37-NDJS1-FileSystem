const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 8000;
const outputFolder = "./TimeStampFiles";

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}


app.get('/', (req, res)=>{

    res.status(200).send(`
    <h1 style="background-color:black;padding:10px 0px;color:white;text-align:center">
    Node JS File System - Demo</h1>
    <h1 style="background-color:#ff809b;padding:10px 0px;text-align:center">
    Express Server is Connected !</h1>
    <div style="text-align:center">
    <p><span style="background-color:lightgreen;font-size:18px"> To Create a New txt file</span> --> <a href="/create">Click Here</a></p>
    <p><span style="background-color:#ff4545;font-size:18px">To Retrieve All txt file</span> --> <a href="/read">Click Here</a></p>
    </div>
    `);
    
});


app.get("/create", (req, res) => {
  const currentTime = new Date();
  const year = currentTime.getFullYear().toString();
  const month = (currentTime.getMonth() + 1).toString();
  const date = currentTime.getDate().toString();
  const hrs = currentTime.getHours().toString();
  const mins = currentTime.getMinutes().toString();
  const secs = currentTime.getSeconds().toString();

  const dateTimeForFileName = `${date}-${month}-${year}-${hrs}-${mins}-${secs}.txt`;

  const filePath = path.join(outputFolder, dateTimeForFileName);

    var content = `Current TimeStamp : ${currentTime}`;

  fs.writeFile(filePath, content, 'utf8',(err) => {
 try {
    res.status(200).send(` <h1 style="background-color:black;padding:10px 0px;color:white;text-align:center">
    Node JS File System - Demo</h1>
    <div style="background-color:#237d2a;padding:10px 0px;text-align:center;color:white">
    <h1>File created successfully!</h1>
    <p><b>TEXT FILE NAME :</b> ${filePath}</p>
    <p><b>TEXT FILE CONTENT :</b> ${content}</p>
    <p><a href="/" style="color:yellow">Back to Home</a></p>
    </div>`);
   }
   catch(err)
   {
    res.status(500).send(`<h1 style="background-color:black;padding:10px 0px;color:white;text-align:center">
    Node JS File System - Demo</h1>
    <h1 style="background-color:red;padding:10px 0px;text-align:center;color:white">
    Error reading file: ${err.message}</h1>`);
    }
  });
});

app.get("/creates", (req, res) => {
    const currentTime = new Date();
    const year = currentTime.getFullYear().toString();
    const month = (currentTime.getMonth() + 1).toString();
    const date = currentTime.getDate().toString();
    const hrs = currentTime.getHours().toString();
    const mins = currentTime.getMinutes().toString();
    const secs = currentTime.getSeconds().toString();
  
    const dateTimeForFileName = `${year}-${month}-${date}-${hrs}-${mins}-${secs}.txt`;
  
    const filePath = path.join(outputFolder, dateTimeForFileName);
  
  
      var content = `Current TimeStamp : ${currentTime}`;
  
  
    fs.writeFile(filePath, content,'utf8', (err) => {
      if (err) {
        res.status(500).send(`Error creating file: ${err}`);
        return;
      }
  
      res.send(`File created successfully at path : ${filePath}`);
    });
});

app.get("/read", (req, res) => {
  fs.readdir(outputFolder, (err, files) => {
    if (err) {
   res.status(500).send(`<h1 style="background-color:black;padding:10px 0px;color:white;text-align:center">
   Node JS File System - Demo</h1>
   <h1 style="background-color:red;padding:10px 0px;text-align:center;color:white">
   Error reading files: ${err.message}</h1>`);
    }
    console.log("List of files:", files);
    const textFiles = files.filter((file) => path.extname(file) === ".txt");

    res.status(200).send(`<h1 style="background-color:black;padding:10px 0px;color:white;text-align:center">
    Node JS File System - Demo</h1>
    <div style="background-color:#8a1212;padding:10px 0px;text-align:center;color:white">
   <h1>Stored TimeStamp Text Files..!!</h1>
   <ul>${textFiles.map(file => 
    `<dl>
    <dt><b>STORED FILE NAME : </b>${file}</dt>
    <dd><b>FILE MESSAGE : </b>${fs.readFileSync(`./TimeStampFiles/${file}`, 'utf8')}</dd>
    </dl>`).join('')}</ul>
   <p><a href="/" style="color:yellow">Back to Home</a></p>
   </div>
   `);
  });
});

app.get("/reads", (req, res) => {
    fs.readdir(outputFolder, (err, files) => {
      if (err) {
        res.status(500).send(`Error reading files: ${err}`);
        return;
      }
      console.log("List of files:", files);
      const textFiles = files.filter((file) => path.extname(file) === ".txt");
  
      res.json(textFiles);
    });
  });


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});