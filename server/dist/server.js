"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
// const express = require('express');
// const userRouter = require("./routes/users/user-route")
// const app = express();
// const PORT = process.env.PORT || 5001
// app.use(express.json());
// app.use("/users", userRouter)
// app.listen(PORT, function () {
//     console.log(`listening on ${PORT}`)
// })
const express_1 = __importDefault(require("express"));
// import { config } from "https://deno.land/x/dotenv/mod.ts";
// const APP_PORT = config.PORT || 5001
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.get("/", (_req, res) => {
            res.send("Hello World");
        });
    }
    listen(port) {
        this.app.listen(port, () => {
            console.log(`listening on ${PORT}`);
        });
    }
}
exports.App = App;
const app = new App();
const PORT = 5001;
app.listen(PORT);
