import * as cors from "cors";
import "dotenv/config";
import * as express from "express";

import apiRouter from "./routes";

const app = express();

app.use(cors());
app.use(express.static("dist"));
app.use(apiRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
