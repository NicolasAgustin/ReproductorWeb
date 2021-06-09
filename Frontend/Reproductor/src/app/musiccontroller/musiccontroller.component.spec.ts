import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusiccontrollerComponent } from './musiccontroller.component';

describe('MusiccontrollerComponent', () => {
  let component: MusiccontrollerComponent;
  let fixture: ComponentFixture<MusiccontrollerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusiccontrollerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusiccontrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
