import { v4 as uuid } from 'uuid';

export class Task {
  constructor(title) {
    this.id = uuid();
    this.title = title;
    this.completed = false;
    this.date = new Date();
  }
}

