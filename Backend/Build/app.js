"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const child_process_1 = __importDefault(require("child_process"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.get("/basic", (req, res) => {
    console.log("here");
    res.send({ data: "i am hrere" });
});
app.post("/getsummary", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    child_process_1.default.execSync("touch ./Public/content.txt");
    child_process_1.default.execSync("touch ./Public/summary.txt");
    let content_file = fs_1.default.openSync("./Public/content.txt", "w");
    let summary_file = fs_1.default.openSync("./Public/summary.txt", "r");
    let data = req.body.content;
    console.log(`data == ${data}`);
    fs_1.default.writeSync(content_file, data);
    child_process_1.default.exec("python3 ./Public/summarizer.py", (error, stdout, stderr) => {
        if (error) {
            console.log(`error == ${error}`);
            res.status(500).send({ error: error });
            // res.status(500).send("first if");
        }
        else if (stderr) {
            console.log(`stderr == ${stderr}`);
            res.status(500).send({ error: stderr });
            // res.status(500).send("second if");
        }
        else if (stdout) {
            console.log('stdout == ', stdout);
            let summaryData = fs_1.default.readFileSync(summary_file);
            let responseData = summaryData.toString();
            res.status(200).send({ data: responseData });
            // res.status(500).send("last if");
            child_process_1.default.execSync("rm ./Public/content.txt");
            child_process_1.default.execSync("rm ./Public/summary.txt");
        }
        else {
            res.status(500).send("else");
        }
    });
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server started at ::${PORT}`));
