import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/sequelize";

export interface ProjectMasterAttributes {
  id: number;
  project_name: string;
  is_active: boolean;
  created_by: number;
  created_at: Date;
  updated_by?: number | null;
  updated_at?: Date | null;
}

type ProjectMasterCreationAttributes = Optional<
  ProjectMasterAttributes,
  "id" | "is_active" | "created_at" | "updated_by" | "updated_at"
>;

class ProjectMaster
  extends Model<ProjectMasterAttributes, ProjectMasterCreationAttributes>
  implements ProjectMasterAttributes
{
  public id!: number;
  public project_name!: string;
  public is_active!: boolean;
  public created_by!: number;
  public created_at!: Date;
  public updated_by?: number | null;
  public updated_at?: Date | null;
}

ProjectMaster.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    project_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "project_master",
    modelName: "ProjectMaster",
    timestamps: false,
    underscored: true,
  }
);

export default ProjectMaster;