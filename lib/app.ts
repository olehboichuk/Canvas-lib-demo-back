import * as express from "express";
import * as bodyParser from "body-parser";
import {Routes} from "./routes/userRoutes";
import * as mongoose from "mongoose";

class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();
    public mongoUrl: string = 'mongodb://localhost/Semi-Circle';

    constructor() {
        this.app = express();
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
            res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
            next();
        });
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
    }

}

export default new App().app;
