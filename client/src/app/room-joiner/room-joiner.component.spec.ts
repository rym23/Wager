import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomJoinerComponent } from './room-joiner.component';

describe('RoomJoinerComponent', () => {
  let component: RoomJoinerComponent;
  let fixture: ComponentFixture<RoomJoinerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomJoinerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomJoinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
