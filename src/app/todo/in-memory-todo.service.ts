import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryTodoService implements InMemoryDbService {
  public createDb() {
    let todo = [
      { id: 1, title: `Learn TypeScript 2` },
      { id: 2, title: `Learn Angular 2` },
      { id: 3, title: `Learn Webpack` },
      { id: 4, title: `Learn Material Design` },
      { id: 5, title: `Learn Sass` },
      { id: 6, title: `Learn Karma` },
      { id: 7, title: `Learn Jasmine` },
    ];
    return { todo };
  }
}
