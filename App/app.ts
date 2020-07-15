import express from "express";
import fs from "fs";
import childprocess from "child_process"
import { Stream } from "stream";

const app:express.Application = express();
app.use(express.json())

let err_file = fs.openSync("./logs/error.txt", "a");
let content_file = fs.openSync("./Public/content.txt","w");
let summary_file = fs.openSync("./Public/summary.txt","r");

app.post("/getsummary", (req: express.Request,res: express.Response) => {
    // console.log(req.bo);
    let data = req.body.content;
    fs.writeSync(content_file,data);
    
    childprocess.execFile("python3 ./Public/summarizer.py", [], (error,stdout,stderr) => {
        if(error){
            res.json({error: error});
        }
        if(stderr){
            res.json({error: stderr});
        }
        if(stdout){
            let summaryData = fs.readFileSync(summary_file);
            res.json({data: summaryData});
        }
        res.json({data: "no data"});
    })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server started at ::${PORT}`))