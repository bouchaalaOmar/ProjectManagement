import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmProjectComponent } from './pm-project.component';

describe('ListCustomerComponent', () => {
  let component: PmProjectComponent;
  let fixture: ComponentFixture<PmProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
