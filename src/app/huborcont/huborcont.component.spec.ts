import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HuborcontComponent } from './huborcont.component';

describe('HuborcontComponent', () => {
  let component: HuborcontComponent;
  let fixture: ComponentFixture<HuborcontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuborcontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HuborcontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
