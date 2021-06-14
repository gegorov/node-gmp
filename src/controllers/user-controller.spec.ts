import { Request, Response, NextFunction } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { UsersGetRequestSchema } from 'types';
// import { UserInstance } from 'types';
import logger from '../logger';
import * as userService from '../services/user-service';
import * as userController from './user-controller';

const mockedUser = {
  id: '42',
  login: 'Luke',
  password: 'MayThe4BeWithU',
  age: '42',
  isDeleted: false,
};

const mockedError = new Error('Not Found');

jest.mock('../logger');

jest.mock('../services/user-service', () => ({
  getById: jest
    .fn()
    .mockImplementationOnce(() => mockedUser)
    .mockImplementationOnce(() => { throw mockedError; }),

  create: jest
    .fn()
    .mockImplementationOnce(() => mockedUser)
    .mockImplementationOnce(() => { throw mockedError; }),

  updateUser: jest
    .fn()
    .mockImplementationOnce(() => mockedUser)
    .mockImplementationOnce(() => { throw mockedError; }),

  deleteUser: jest
    .fn()
    .mockImplementationOnce(() => mockedUser)
    .mockImplementationOnce(() => { throw mockedError; }),

  searchUsers: jest
    .fn()
    .mockImplementationOnce(() => ({
      total: 1,
      users: [mockedUser],
    })),

  getAllUsers: jest
    .fn()
    .mockImplementationOnce(() => ({
      total: 1,
      users: [mockedUser],
    })),

}));

describe('User Controller', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeAll(() => {
    req = {} as Request;
    req.body = {};
    req.query = {};
    req.params = {};

    res = {} as Response;

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    next = jest.fn();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('getUser', () => {
    it('should call userService.getById with id = 42', async () => {
      const spy = jest.spyOn(userService, 'getById');
      req.params = {
        id: '42',
      };

      await userController.getUser(req, res, next);
      expect(spy).toBeCalledWith('42');
    });

    it('should return user with id = 42', async () => {
      req.params = {
        id: '42',
      };

      await userController.getUser(req, res, next);
      expect(res.json).toBeCalledWith(mockedUser);
    });

    it('should throw error and call next if called with wrong id', async () => {
      const spy = jest.spyOn(logger, 'error');
      req.params = {
        id: 'blabla',
      };
      await userController.getUser(req, res, next);
      expect(next).toBeCalledWith(mockedError);
      expect(spy).toBeCalled();
    });
  });

  describe('postUser', () => {
    it('should return created user', async () => {
      req.body = {
        login: 'Luke',
        password: 'MayThe4BeWithU',
        age: '42',
      };

      await userController.postUser(req, res, next);
      expect(res.json).toBeCalledWith(mockedUser);
    });

    it('should throw error if not all user data provided', async () => {
      const spy = jest.spyOn(logger, 'error');
      req.body = {
        login: 'Luke',
        password: 'MayThe4BeWithU',
      };

      await userController.postUser(req, res, next);
      expect(next).toBeCalledWith(mockedError);
      expect(spy).toBeCalled();
    });
  });

  describe('updateUser', () => {
    it('should update user, and return updated user, if correct payload sent', async () => {
      req.body = {
        login: 'Luke',
        password: 'MayThe4BeWithU',
        age: '42',
      };

      await userController.updateUser(req, res, next);
      expect(res.json).toBeCalledWith(mockedUser);
    });

    it('should throw, if incorrect payload sent', async () => {
      const spy = jest.spyOn(logger, 'error');

      await userController.updateUser(req, res, next);
      expect(next).toBeCalledWith(mockedError);
      expect(spy).toBeCalled();
    });
  });

  describe('deleteUser', () => {
    it('should update user, and return updated user, if correct payload sent', async () => {
      req.params = {
        id: '42',
      };

      await userController.deleteUser(req, res, next);
      expect(res.json).toBeCalledWith(mockedUser);
    });

    it('should throw, if incorrect payload sent', async () => {
      const spy = jest.spyOn(logger, 'error');
      req.params = {
        id: '45',
      };

      await userController.deleteUser(req, res, next);
      expect(next).toBeCalledWith(mockedError);
      expect(spy).toBeCalled();
    });
  });

  describe('searchUsers', () => {
    it('should search users, if correct payload sent', async () => {
      req.query = {
        q: 'Lu',
        limit: '10',
      };

      await userController.searchUsers(req as ValidatedRequest<UsersGetRequestSchema>, res, next);
      expect(res.json).toBeCalledWith(mockedUser);
    });
  });

  describe('getAll', () => {
    it('should return all users', async () => {
      await userController.getAllUsers(req, res, next);
      expect(res.json).toBeCalledWith(mockedUser);
    });
  });
});
