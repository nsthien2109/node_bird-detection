import * as express from "express";
import { Request, Response } from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as compression from "compression";
import * as cors from "cors";
import * as swaggerUi from "swagger-ui-express";

import * as dotenv from "dotenv";
dotenv.config();

import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import { RouteType } from "./types/route.type";
import { noneMiddleware } from "./shared/middlewares/none.middleware";
import configPublic from "./config/config";

import * as cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: "dmzvudfg5",
  api_key: "614921592645376",
  api_secret: "L98LhofuulpSFiErE_pB0G8in_g",
  secure: true,
});

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(cors());
    app.use(compression());
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    configPublic(app);

    const endpoints = [
      ...Routes.map((route) => `${route.method} ========> /api${route.route}`),
    ];

    console.log(endpoints);

    // register express routes from defined application routes
    Routes.forEach((route: RouteType) => {
      (app as any)[route.method](
        `/api${route.route}`,
        route.middleware?.length > 0 ? [...route.middleware] : noneMiddleware,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined ? result : undefined
            );
          } else if (result !== null && result !== undefined) {
            result;
          }
        }
      );
    });

    // start express server
    app.listen(8080, () => {
      console.log("Express server has started on port : 8080");
    });
  })
  .catch((error) => console.log(error));
