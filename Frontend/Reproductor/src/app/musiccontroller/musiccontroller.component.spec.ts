import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicControllerComponent } from './musiccontroller.component';

describe('MusicControllerComponent', () => {
  let component: MusicControllerComponent;
  let fixture: ComponentFixture<MusicControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicControllerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
