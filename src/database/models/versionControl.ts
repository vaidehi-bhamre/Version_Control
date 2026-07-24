import { DataTypes, Model, Optional } from "sequelize";
import { VERSION_TYPES } from "../../constants/version.constant";
import type { VersionType } from "../../constants/version.constant";
import sequelize from "../config/sequelize";

export interface VersionControlAttributes {
  id: number;
  project_id: number;
  version: VersionType;
  version_number: string;
  version_title: string;
  version_info: object;
  is_active: boolean;
  created_by: number;
  created_at: Date;
  updated_by?: number | null;
  updated_at?: Date | null;
}

type VersionControlCreationAttributes = Optional<
  VersionControlAttributes,
  "id" | "is_active" | "created_at" | "updated_by" | "updated_at"
>;

class VersionControl
  extends Model<VersionControlAttributes, VersionControlCreationAttributes>
  implements VersionControlAttributes
{
  public id!: number;
  public project_id!: number;
  public version!: VersionType;
  public version_number!: string;
  public version_title!: string;
  public version_info!: object;
  public is_active!: boolean;
  public created_by!: number;
  public created_at!: Date;
  public updated_by?: number | null;
  public updated_at?: Date | null;
}

VersionControl.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    version: {
      type: DataTypes.ENUM(...VERSION_TYPES),
      allowNull: false,
    },

    version_number: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },

    version_title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    version_info: {
      type: DataTypes.JSON,
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
    tableName: "version_control",
    modelName: "VersionControl",
    timestamps: false,
    underscored: true,
  }
);

export default VersionControl;