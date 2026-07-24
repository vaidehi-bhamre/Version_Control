import sequelize from "../config/sequelize";
import ProjectMaster from "./projectMaster";
import VersionControl from "./versionControl";

ProjectMaster.hasMany(VersionControl, {
  foreignKey: "project_id",
  as: "versions",
});

VersionControl.belongsTo(ProjectMaster, {
  foreignKey: "project_id",
  as: "project",
});

export { sequelize, ProjectMaster, VersionControl };