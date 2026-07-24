import {
    ProjectMaster,
    VersionControl,
  } from "../../../database/models";
  
  import { DEVELOPMENT_USER_ID } from "../../../constants/development.constant";
  
  import type {
    VersionControlAttributes,
    VersionType,
  } from "../../../database/models/versionControl";
  
  import type {
    CreateVersionInput,
    UpdateVersionInput,
  } from "./version.validation";
  
  import { calculateNextVersionNumber } from "./version.utils";
  
  /**
   * Checks whether the project exists and is active.
   */
  const getActiveProject = async (
    projectId: number
  ): Promise<ProjectMaster> => {
    const project = await ProjectMaster.findOne({
      where: {
        id: projectId,
        isActive: true,
      },
    });
  
    if (!project) {
      throw new Error("Active project not found");
    }
  
    return project;
  };
  
  /**
   * Finds the latest version created for a project.
   */
  const getLatestVersion = async (
    projectId: number
  ): Promise<VersionControl | null> => {
    return VersionControl.findOne({
      where: {
        projectId,
      },
      order: [
        ["createdAt", "DESC"],
        ["id", "DESC"],
      ],
    });
  };
  
  /**
   * Calculates the next version number for a project.
   *
   * Example:
   * latest: 1.2.0
   * type: bug-fix
   * result: 1.2.1
   */
  export const getNextVersionNumber = async (
    projectId: number,
    versionType: VersionType
  ): Promise<string> => {
    await getActiveProject(projectId);
  
    const latestVersion =
      await getLatestVersion(projectId);
  
    return calculateNextVersionNumber(
      latestVersion?.versionNumber ?? null,
      versionType
    );
  };
  
  /**
   * Creates a new version record.
   */
  export const createVersion = async (
    input: CreateVersionInput
  ): Promise<VersionControl> => {
    await getActiveProject(input.projectId);
  
    const versionNumber =
      await getNextVersionNumber(
        input.projectId,
        input.version
      );
  
    const createdVersion =
      await VersionControl.create({
        projectId: input.projectId,
        version: input.version,
        versionNumber,
        versionTitle: input.versionTitle,
        versionInfo: input.versionInfo,
        isActive: true,
        createdBy: DEVELOPMENT_USER_ID,
      });
  
    return createdVersion;
  };
  
  /**
   * Updates an existing version.
   *
   * Only versionTitle and versionInfo can be changed.
   * The version type and version number remain unchanged.
   */
  export const updateVersion = async (
    versionId: number,
    input: UpdateVersionInput
  ): Promise<VersionControl> => {
    const existingVersion =
      await VersionControl.findByPk(versionId);
  
    if (!existingVersion) {
      throw new Error("Version not found");
    }
  
    const updateData: Partial<VersionControlAttributes> = {
      updatedBy: DEVELOPMENT_USER_ID,
    };
  
    if (input.versionTitle !== undefined) {
      updateData.versionTitle =
        input.versionTitle;
    }
  
    if (input.versionInfo !== undefined) {
      updateData.versionInfo =
        input.versionInfo;
    }
  
    await existingVersion.update(updateData);
  
    return existingVersion;
  };
  
  /**
   * Toggles the isActive status.
   *
   * true  → false
   * false → true
   *
   * This performs soft delete/restore instead of
   * permanently removing the database record.
   */
  export const toggleVersionStatus = async (
    versionId: number
  ): Promise<VersionControl> => {
    const existingVersion =
      await VersionControl.findByPk(versionId);
  
    if (!existingVersion) {
      throw new Error("Version not found");
    }
  
    await existingVersion.update({
      isActive: !existingVersion.isActive,
      updatedBy: DEVELOPMENT_USER_ID,
    });
  
    return existingVersion;
  };