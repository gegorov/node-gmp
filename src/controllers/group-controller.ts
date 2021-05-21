import { Request, Response, NextFunction } from 'express';
import { ValidatedRequestWithRawInputsAndFields } from 'express-joi-validation';
import { GroupService } from '../services/group-service';
import { Group } from '../dao/sequelize';
import logger from '../logger';
import { GroupPostRequestSchema, GroupToUsersRequestSchema } from '../types';

const groupService = new GroupService(Group, logger);

export const getGroup = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const group = await groupService.getById(id);
    res.json(group);
  } catch (error) {
    logger.error(`Error in Group Controller, method getGroup, id: ${id}. ${error.message}`);
    next(error);
  }
};

export const postGroup = async (req: Request, res: Response, next: NextFunction) => {
  const vreq = req as ValidatedRequestWithRawInputsAndFields<GroupPostRequestSchema>;
  const { name, permissions } = vreq.body;

  try {
    const group = await groupService.create({ name, permissions });
    res.json(group);
  } catch (error) {
    logger.error(`Error in Group Controller, method postGroup, name: ${name}, permissions: [${permissions.join(',')}]. ${error.message}`);
    next(error);
  }
};

export const updateGroup = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const vreq = req as ValidatedRequestWithRawInputsAndFields<GroupPostRequestSchema>;
    const updatedGroup = await groupService.update(id, vreq.body);
    res.json(updatedGroup);
  } catch (error) {
    logger.error(`Error in Group Controller, method updateGroup, id: ${id}, updatedGroup: [${req.body.name}, ${req.body.permissions.join(',')}]. ${error.message}`);
    next(error);
  }
};

export const deleteGroup = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    await groupService.delete(id);
    res.sendStatus(200);
  } catch (error) {
    logger.error(`Error in Group Controller, method delete, id: ${id}. ${error.message}`);
    next(error);
  }
};

export const getAllGroups = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await groupService.getAll();
    res.json(result);
  } catch (error) {
    logger.error(`Error in Group Controller, method updateGroup. ${error.message}`);
    next(error);
  }
};

export const addUsersToGroup = async (req: Request, res: Response, next:NextFunction) => {
  const { id } = req.params;
  const vreq = req as ValidatedRequestWithRawInputsAndFields<GroupToUsersRequestSchema>;
  try {
    await groupService.addUsersToGroup(id, vreq.body.users);
    res.sendStatus(200);
  } catch (error) {
    logger.error(`Error in Group Controller, method addUsersToGroup, group id: ${id}, users: [${req.body.users.join(',')}]. ${error.message}`);
    next(error);
  }
};
