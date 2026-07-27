"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectMaster = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../config/sequelize"));
class ProjectMaster extends sequelize_1.Model {
}
exports.ProjectMaster = ProjectMaster;
ProjectMaster.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    projectName: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        field: "project_name",
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: "is_active",
    },
    createdBy: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: "created_by",
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        field: "created_at",
    },
    updatedBy: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        field: "updated_by",
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        field: "updated_at",
    },
}, {
    sequelize: sequelize_2.default,
    tableName: "project_master",
    modelName: "ProjectMaster",
    // The database already manages created_at and updated_at.
    timestamps: false,
    indexes: [
        {
            name: "idx_project_master_is_active",
            fields: ["is_active"],
        },
        {
            name: "idx_project_master_project_name",
            fields: ["project_name"],
        },
    ],
});
//# sourceMappingURL=projectMaster.js.map