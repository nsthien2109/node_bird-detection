"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var swaggerJSDoc = require("swagger-jsdoc");
var options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Your API Title",
            version: "1.0.0",
            description: "Description of your API",
        },
    },
    apis: [],
};
var swaggerSpec = swaggerJSDoc(options);
exports.default = swaggerSpec;
//# sourceMappingURL=swagger.js.map