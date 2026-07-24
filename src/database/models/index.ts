import { ProjectMaster } from "./projectMaster";
import { VersionControl } from "./versionControl";

ProjectMaster.hasMany(VersionControl, {
  foreignKey: "projectId",
  as: "versions",
});

VersionControl.belongsTo(ProjectMaster, {
  foreignKey: "projectId",
  as: "project",
});

export {
  ProjectMaster,
  VersionControl,
};

export type {
  ProjectMasterAttributes,
  ProjectMasterCreationAttributes,
} from "./projectMaster";

export type {
  VersionControlAttributes,
  VersionControlCreationAttributes,
  VersionInfo,
  VersionType,
} from "./versionControl";