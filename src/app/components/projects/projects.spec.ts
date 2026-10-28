import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Projects } from './projects';

// jsdom no implementa IntersectionObserver (lo usa la directiva del scroll reveal).
class IntersectionObserverFalso {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

describe('Projects', () => {
  let component: Projects;
  let fixture: ComponentFixture<Projects>;

  beforeEach(async () => {
    vi.stubGlobal('IntersectionObserver', IntersectionObserverFalso);
    await TestBed.configureTestingModule({
      imports: [Projects],
    }).compileComponents();

    fixture = TestBed.createComponent(Projects);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
