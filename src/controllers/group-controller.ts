import { Request, Response, RequestHandler } from 'express';
import { ValidatedRequestWithRawInputsAndFields } from 'express-joi-validation';
import { GroupService } from '../services/group-service';
import { Group } from '../dao/sequelize';
import { GroupPostRequestSchema, GroupToUsersRequestSchema } from '../types';

const groupService = new GroupService(Group);

export const getGroup:RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const group = await groupService.getById(id);

    if (!group) {
      return res.status(404).send(`Group with id: ${id} not found`);
    }

    return res.json(group);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const postGroup:RequestHandler = async (req: Request, res: Response) => {
  const vreq = req as ValidatedRequestWithRawInputsAndFields<GroupPostRequestSchema>;
  const { name, permissions } = vreq.body;

  try {
    const group = await groupService.create({ name, permissions });

    return res.json(group);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const updateGroup: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const vreq = req as ValidatedRequestWithRawInputsAndFields<GroupPostRequestSchema>;
    const updatedGroup = await groupService.update(id, vreq.body);

    if (!updatedGroup) {
      return res.status(404).send(`Group with id: ${id} not found`);
    }

    return res.json(updatedGroup);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const deleteGroup: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await groupService.delete(id);

    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const getAllGroups: RequestHandler = async (req: Request, res: Response) => {
  try {
    const result = await groupService.getAll();

    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const addUsersToGroup: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const vreq = req as ValidatedRequestWithRawInputsAndFields<GroupToUsersRequestSchema>;
  try {
    await groupService.addUsersToGroup(id, vreq.body.users);

    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};
