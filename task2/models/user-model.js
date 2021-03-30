import { v4 as uuidv4 } from 'uuid';

export default class User {
  constructor(login, password, age) {
    this.id = uuidv4();
    this.login = login;
    this.password = password;
    this.age = age;
    this.isDeleted = false;
  }

  delete() {
    this.isDeleted = true;
  }

  update(login, password, age) {
    if (login) {
      this.setLogin(login);
    }
    if (password) {
      this.setPassword(password);
    }
    if (age) {
      this.setAge(age);
    }
  }

  setLogin(login) {
    this.login = login;
  }

  setPassword(password) {
    this.password = password;
  }

  setAge(age) {
    this.age = age;
  }
}
