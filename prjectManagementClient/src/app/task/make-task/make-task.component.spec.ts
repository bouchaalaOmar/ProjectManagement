import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeTaskComponent } from './make-task.component';

describe('MakeTaskComponent', () => {
  let component: MakeTaskComponent;
  let fixture: ComponentFixture<MakeTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
