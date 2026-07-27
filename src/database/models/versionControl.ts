import {
    DataTypes,
    Model,
    Optional,
  } from "sequelize";
  
  import sequelize from "../config/sequelize";
  
  export type VersionType =
    | "major"
    | "minor"
    | "bug-fix";
  
  export interface VersionInfo {
    [key: string]: unknown;
  }
  
  export interface VersionControlAttributes {
    id: number;
    projectId: number;
    version: VersionType;
    versionNumber: string;
    versionTitle: string;
    versionInfo: VersionInfo;
    isActive: boolean;
    createdBy: number;
    createdAt: Date;
    updatedBy: number | null;
    updatedAt: Date | null;
  }
  
  export interface VersionControlCreationAttributes
    extends Optional<
      VersionControlAttributes,
      "id" | "isActive" | "createdAt" | "updatedBy" | "updatedAt"
    > {}
  
  export class VersionControl
    extends Model<
      VersionControlAttributes,
      VersionControlCreationAttributes
    >
    implements VersionControlAttributes
  {
    declare id: number;
    declare projectId: number;
    declare version: VersionType;
    declare versionNumber: string;
    declare versionTitle: string;
    declare versionInfo: VersionInfo;
    declare isActive: boolean;
    declare createdBy: number;
    declare createdAt: Date;
    declare updatedBy: number | null;
    declare updatedAt: Date | null;
  }
  
  VersionControl.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
  
      projectId: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.ENUM(
          "major",
          "minor",
          "bug-fix"
        ),
        allowNull: false,
      },
  
      versionNumber: {
        type: DataTypes.STRING(10),
        allowNull: false,
        field: "version_number",
      },
  
      versionTitle: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "version_title",
      },
  
      versionInfo: {
        type: DataTypes.JSON,
        allowNull: false,
        field: "version_info",
      },
  
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: "is_active",
      },
  
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "created_by",
      },
  
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at",
      },
  
      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "updated_by",
      },
  
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "updated_at",
      },
    },
    {
      sequelize,
      tableName: "version_control",
      modelName: "VersionControl",
      timestamps: false,
    }
  );