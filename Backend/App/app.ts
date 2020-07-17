import express from "express";
import fs from "fs";
import childprocess from "child_process";
import cors from "cors";

const app:express.Application = express();

app.use(cors())
app.use(express.json())

app.get("/basic", (req,res)=> {
    console.log("here");
    res.send({data: "i am hrere"})
})

app.post("/getsummary", async(req: express.Request,res: express.Response) => {
    childprocess.execSync("touch ./Public/content.txt");
    childprocess.execSync("touch ./Public/summary.txt");

    let content_file = fs.openSync("./Public/content.txt","w");
    let summary_file = fs.openSync("./Public/summary.txt","r");

    let data = req.body.content;
    console.log(`data == ${data}`)
    fs.writeSync(content_file,data);
    
    childprocess.exec("python3 ./Public/summarizer.py", (error,stdout,stderr) => {
        if(error){
            console.log(`error == ${error}`);
            res.status(500).send({error: error});
            // res.status(500).send("first if");
        }
        else if(stderr){
            console.log(`stderr == ${stderr}`);
            res.status(500).send({error: stderr});
            // res.status(500).send("second if");
        }
        else if(stdout){
            console.log('stdout == ',stdout)
            let summaryData: Buffer = fs.readFileSync(summary_file);
            let responseData = summaryData.toString();
            res.status(200).send({data: responseData});
            // res.status(500).send("last if");
            
            childprocess.execSync("rm ./Public/content.txt");
            childprocess.execSync("rm ./Public/summary.txt");
        } else {
            res.status(500).send("else");
        }
    })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server started at ::${PORT}`))