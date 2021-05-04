import colors from 'colors/safe';
import {
  GroupCreationAttributes, GroupStatic, GroupInstance,
} from '../types';

export class GroupService {
  constructor(private groupModel: GroupStatic) {
    this.groupModel = groupModel;
  }

  public getById(id:string): Promise<GroupInstance | null> {
    return this.groupModel.findByPk(id);
  }

  public create(newGroup: GroupCreationAttributes): Promise<GroupInstance> {
    return this.groupModel.create(newGroup)
      .then((group) => {
        console.log(colors.green(`group "${group.name}" created, id: ${group.id}`));
        return group;
      });
  }
}
