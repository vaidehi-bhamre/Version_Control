"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersionControl = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../config/sequelize"));
class VersionControl extends sequelize_1.Model {
}
exports.VersionControl = VersionControl;
VersionControl.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    projectId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: "project_id",
        references: {
            model: "project_master",
            key: "id",
        },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
    },
    version: {
        type: sequelize_1.DataTypes.ENUM("major", "minor", "bug-fix"),
        allowNull: false,
    },
    versionNumber: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
        field: "version_number",
    },
    versionTitle: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        field: "version_title",
    },
    versionInfo: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
        field: "version_info",
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
    tableName: "version_control",
    modelName: "VersionControl",
    timestamps: false,
});
//# sourceMappingURL=versionControl.js.map