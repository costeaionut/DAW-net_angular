import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingTileComponent } from './painting-tile.component';

describe('PaintingTileComponent', () => {
  let component: PaintingTileComponent;
  let fixture: ComponentFixture<PaintingTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintingTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintingTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
