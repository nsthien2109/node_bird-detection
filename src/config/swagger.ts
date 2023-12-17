import * as swaggerJSDoc from "swagger-jsdoc";
import * as path from "path";
import { Routes } from "../routes";

const options = {
  definition: {
    openapi: "3.0.0", // Specify the OpenAPI version
    info: {
      title: "Your API Title",
      version: "1.0.0",
      description: "Description of your API",
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
