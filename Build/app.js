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
const app = express_1.default();
app.use(express_1.default.json());
let content_file = fs_1.default.openSync("./Public/content.txt", "w");
let summary_file = fs_1.default.openSync("./Public/summary.txt", "r");
app.post("/getsummary", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = req.body.content;
    fs_1.default.writeSync(content_file, data);
    child_process_1.default.execFile("python3", ["./Public/summarizer.py"], (error, stdout, stderr) => {
        if (error) {
            console.log(`error == ${error}`);
            res.json({ error: error });
        }
        else if (stderr) {
            console.log(`stderr == ${stderr}`);
            res.json({ error: stderr });
        }
        else if (stdout) {
            let summaryData = fs_1.default.readFileSync(summary_file);
            console.log(`summary data == ${summaryData}`);
            let responseData = summaryData.toString();
            res.json({ data: responseData });
        }
    });
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server started at ::${PORT}`));
