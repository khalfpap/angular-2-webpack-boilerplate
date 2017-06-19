import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { By }              from '@angular/platform-browser';

import { ReadmeComponent } from './readme.component';
import { TrustHtmlPipe } from '../pipes/trust-html.pipe';

import { ActivatedRoute } from '@angular/router';
import { ReadmeService } from './readme.service';


describe('ReadmeComponent', () => {
  let fixture: ComponentFixture<ReadmeComponent>;
  let component: ReadmeComponent;

  let contentElement: HTMLElement;
  let mockContentService: MockContentService;

  let mockActivatedRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReadmeComponent,
        TrustHtmlPipe,
      ],
      imports: [
        MaterialModule.forRoot(),
      ],
      providers: [
        {
          provide: ReadmeService,
          useValue: new MockContentService(),
        },
        {
          provide: ActivatedRoute,
          useValue: new MockActivatedRouteService(),
        },
      ],
    });

    fixture = TestBed.createComponent(ReadmeComponent);
    component = fixture.componentInstance;

    contentElement = fixture.debugElement.query(By.css('.markdown-body')).nativeElement;
    mockContentService = fixture.debugElement.injector.get(ReadmeService);

    mockActivatedRouteService = fixture.debugElement.injector.get(ActivatedRoute);
    mockActivatedRouteService.snapshot.fragment = '';
  });

  describe('ReadmeComponent#ngOnInit', () => {
    it('should render content', () => {
      mockContentService.html = '<h1>Content</h1>';
      fixture.detectChanges();
      expect(contentElement.innerHTML).toBe('<h1>Content</h1>');
      expect(contentElement.textContent).toBe('Content');
    });
  });

  describe('ReadmeComponent#restoreToFragmentLocation', () => {
    it('should restore to fragment location', () => {
      mockActivatedRouteService.snapshot.fragment = 'fragment';
      mockContentService.html = '<h1>Content</h1><h2 id="fragment">Content</h2>';
      fixture.detectChanges();
      component.restoreToFragmentLocation();
      expect(component.restoredToFragmentLocation).toEqual(true);
    })
  });
});

class MockContentService {
  public html: string;

  public getReadmeHTML(): string {
    return this.html;
  }
}

class MockActivatedRouteService {
  public snapshot: Object;

  constructor() {
    this.snapshot = {};
  }
}
