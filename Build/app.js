"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const child_process_1 = __importDefault(require("child_process"));
const app = express_1.default();
app.use(express_1.default.json());
let err_file = fs_1.default.openSync("./logs/error.txt", "a");
let content_file = fs_1.default.openSync("./Public/content.txt", "w");
let summary_file = fs_1.default.openSync("./Public/summary.txt", "r");
app.post("/getsummary", (req, res) => {
    // console.log(req.bo);
    let data = req.body.content;
    fs_1.default.writeSync(content_file, data);
    child_process_1.default.execFile("python3 ./Public/summarizer.py", [], (error, stdout, stderr) => {
        if (error) {
            res.json({ error: error });
        }
        if (stderr) {
            res.json({ error: stderr });
        }
        if (stdout) {
            let summaryData = fs_1.default.readFileSync(summary_file);
            res.json({ data: summaryData });
        }
        res.json({ data: "no data" });
    });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server started at ::${PORT}`));
