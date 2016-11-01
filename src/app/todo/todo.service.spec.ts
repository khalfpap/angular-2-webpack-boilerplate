import { TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, Headers, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { Todo } from './todo';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  beforeEach(() => {
    let MockHttpProvider = {
      deps: [MockBackend, BaseRequestOptions],
      provide: Http,
      useFactory: (mockBackend: MockBackend, defaultOptions: BaseRequestOptions) => {
        return new Http(mockBackend, defaultOptions);
      },
    };
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        TodoService,
        MockBackend,
        MockHttpProvider,
      ],
    });
  });

  it('should create TodoService', inject([TodoService], (service: TodoService) => {
    expect(service instanceof TodoService).toBe(true);
  }));

  describe('TodoService#getTodos', () => {
    it('should return todos', (done) => {
      inject([TodoService, MockBackend], (service: TodoService, mockBackend: MockBackend) => {
        let todo: Todo = {
          completed: false,
          id: 1,
          title: 'Todo',
        };
        mockBackend.connections.subscribe((connection: MockConnection) => {
          let options = new ResponseOptions({
            body: JSON.stringify({ data: [todo] }),
            headers: new Headers({
              'Content-Type': 'application/json',
            }),
          });
          connection.mockRespond(new Response(options));
        });
        service.getTodos().then((todos: Todo[]) => {
          expect(todos).toEqual([todo], 'TodoService#getTodos did not return todos');
          done();
        });
      })();
    });
  });
});
