import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingCreateComponent } from './painting-create.component';

describe('PaintingCreateComponent', () => {
  let component: PaintingCreateComponent;
  let fixture: ComponentFixture<PaintingCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintingCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
