import { ProjectMaster } from "../../database/models";

export const getActiveProjectsService = async () => {
  const projects = await ProjectMaster.findAll({
    attributes: ["id", "project_name"],
    where: {
      is_active: true,
    },
    order: [["project_name", "ASC"]],
  });

  return projects;
};