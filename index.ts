import express from "express";
import path from 'path';
import bodyParser from 'body-parser';
// import http from 'http';
import jsonfile from 'jsonfile';
import cors from 'cors';
import fs from "fs";
import { validateInputs } from "./services/validate.service";

const app = express();
const port = 8080;

// initializeDB();
// console.log(process.env);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World!");
});

app.post('/entry', async (req: Request, res: Response) => {
  try {
    
    let file = path.resolve(__dirname, 'data.json');
    let data = null;
    if (fs.existsSync(file)) {
      data = await jsonfile.readFile(file);
        // Do something
    }

    let isDataValid = await validateInputs(req.body);

    if(isDataValid) {
      let uploadData = data ? [...data, req.body] : [req.body];
    
    
      // let fields = config.pages.reduce((allfields, ))

      // let {name, gender, age, profession, services} = req.body;
      await jsonfile.writeFile(file, uploadData,{encoding:'utf8',flag:'w'});
      // let data = await insertEntry({name, gender, age, profession, services});
      return res.status(200).send({status: 'done'});
    } else {
      return res.status(400).send({status: "error", msg: "Invalid data"});
    }
  } catch (error) {
    return res.status(400).send(new Error("Error in backend"));
  }
});

app.get('/entries', async (req: Request, res: Response) => {
  try {
    let file = path.resolve(__dirname, 'data.json');
    let data = null;
    if (fs.existsSync(file)) {
      data = await jsonfile.readFile(file);
        // Do something
    }
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send(new Error("Error in backend"));
  }
})

app.get('/config', async (req: Request, res: Response) => {
  try {
    let file = path.resolve(__dirname, 'config.json');
    let config = await jsonfile.readFile(file);
    // console.log(file, config);
    return res.status(200).send(config);
  } catch (error) {
    console.log(error);
    return res.status(400).send(new Error("Error in backend"));
  }
})

app.get('/defaultconfig', async (req: Request, res: Response) => {
  try {
    let file = path.resolve(__dirname, 'default.config.json');
    let config = await jsonfile.readFile(file);
    // console.log(file, config);
    return res.status(200).send(config);
  } catch (error) {
    console.log(error);
    return res.status(400).send(new Error("Error in backend"));
  }
})

app.post('/newconfig', async (req: Request, res: Response) => {
  try {
    
    let file = path.resolve(__dirname, 'config.json');

    let uploadData = req.body;
    
    // let fields = config.pages.reduce((allfields, ))

    // let {name, gender, age, profession, services} = req.body;
    await jsonfile.writeFile(file, uploadData,{encoding:'utf8',flag:'w'});
    // let data = await insertEntry({name, gender, age, profession, services});
    return res.status(200).send({status: 'done'});
  } catch (error) {
    return res.status(400).send(new Error("Error in backend"));
  }
});



  app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  });

  // Default response for any other request
  app.use(function(req: Request, res: Response){
    res.status(404);
  });
