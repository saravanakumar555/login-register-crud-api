import express from "express";
import apiRoutes from "./routes/index.js";
import cors from "cors";
import bodyParser from "body-parser";



const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/api', apiRoutes);
app.listen(8081);   