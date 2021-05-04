import { Request, Response, RequestHandler } from 'express';
import { ValidatedRequest, ValidatedRequestWithRawInputsAndFields } from 'express-joi-validation';
import { GroupService } from '../services/group-service';
import { Group } from '../dao/sequelize';
import { GroupPostRequestSchema } from '../types';

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
