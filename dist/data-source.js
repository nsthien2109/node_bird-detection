"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var user_1 = require("./entity/user");
var role_1 = require("./entity/role");
var entity_1 = require("./entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "34.143.244.24",
    port: 3306,
    username: "root",
    password: "Bame12345@",
    database: "njha_bird_db",
    synchronize: true,
    logging: false,
    entities: [user_1.User, role_1.Role, entity_1.History, entity_1.Prediction, entity_1.Bird],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map