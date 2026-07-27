import {
    DataTypes,
    Model,
    Optional,
  } from "sequelize";
  
  import sequelize  from "../config/sequelize";
  
  export interface ProjectMasterAttributes {
    id: number;
    projectName: string;
    isActive: boolean;
    createdBy: number;
    createdAt: Date;
    updatedBy: number | null;
    updatedAt: Date | null;
  }
  
  export interface ProjectMasterCreationAttributes
    extends Optional<
      ProjectMasterAttributes,
      "id" | "isActive" | "createdAt" | "updatedBy" | "updatedAt"
    > {}
  
  export class ProjectMaster
    extends Model<
      ProjectMasterAttributes,
      ProjectMasterCreationAttributes
    >
    implements ProjectMasterAttributes
  {
    declare id: number;
    declare projectName: string;
    declare isActive: boolean;
    declare createdBy: number;
    declare createdAt: Date;
    declare updatedBy: number | null;
    declare updatedAt: Date | null;
  }
  
  ProjectMaster.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
  
      projectName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "project_name",
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
    }
  );