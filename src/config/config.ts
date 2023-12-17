import * as express from "express";

const configPublic = (app: any) => {
  app.use(express.static("./src/public/"));
};

export default configPublic;
