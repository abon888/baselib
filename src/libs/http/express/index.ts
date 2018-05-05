'use strict';

import * as express from "express";
import {Application} from "express";
import * as bodyParser from "body-parser";
      import * as morgan from "morgan";

import {PathsMapping} from '@BASELIB/js_paths_mapping';

class HttpServer{

  private app: Application;

  constructor( private config: any, private port: number){}

  async init(): Promise<any>{
    this.app = express();
    this.app.use( bodyParser.urlencoded({extended: true}));
    this.app.use(bodyParser.json());

    let Routes = PathsMapping.pmRequire('@MS_ROUTES/').Routes;
    let routes = new Routes(this.app);


    return new Promise( (resolve, reject) => {
      this.app.listen(this.port, this.config.host, (err: any) => {
        if (err) return reject(err);
        else resolve(`Server running on : http://${this.config.host}:${this.port}`);
      });
    })
  }

}

export = HttpServer;

// import * as express from "express";
// import { Application } from "express";
// import * as fs from "fs";
// import { WriteStream } from "fs";
// import * as path from "path";
// import { AppConfig } from "./config/config";

// import { unCoughtErrorHandler } from "./handlers/errorHandler";
// import Routes from "./routes";

// export default class Server {

//     constructor(app: Application) {
//         this.config(app);
//         var routes: Routes = new Routes(app);
//     }

//     public config(app: Application): void {
//         AppConfig();
//         var accessLogStream: WriteStream = fs.createWriteStream(path.join(__dirname, "./logs/access.log"), { flags: "a" });
//         app.use(morgan("combined", { stream: accessLogStream }));
//         app.use(bodyParser.urlencoded({ extended: true }));
//         app.use(bodyParser.json());
//         app.use(unCoughtErrorHandler);
//     }
// }