import { DebugElement }    from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { By }              from '@angular/platform-browser';

import { ReadmeComponent } from './readme.component';

import { ReadmeService } from './readme.service';

let component: ReadmeComponent;
let fixture: ComponentFixture<ReadmeComponent>;

describe('ReadmeComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadmeComponent],
      imports: [
        MaterialModule.forRoot(),
      ],
      providers: [{
        provide: ReadmeService,
        useValue: new MockContentService(),
      }],
    });

    fixture = TestBed.createComponent(ReadmeComponent);
    component = fixture.componentInstance;
  });

  describe('ReadmeComponent#html', () => {
    let debugElement: DebugElement;
    let contentElement: HTMLElement;
    let mockContentService: MockContentService;

    beforeEach(() => {
      debugElement = fixture.debugElement.query(By.css('.markdown-body'));
      contentElement = debugElement.nativeElement;
      mockContentService = fixture.debugElement.injector.get(ReadmeService);
    });

    it('should have no content before OnInit', () => {
      expect(contentElement.textContent.trim()).toEqual('');
    });

    it('should display content', () => {
      mockContentService.html = '<h1>Content</h1>';
      fixture.detectChanges();
      expect(contentElement.innerHTML).toBe('<h1>Content</h1>');
      expect(contentElement.textContent).toBe('Content');
    });
  });
});

class MockContentService {
  public html: string;

  public getReadmeHTML(): string {
    return this.html;
  }
}
