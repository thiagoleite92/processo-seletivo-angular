import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureAreaComponent } from './secure-area.component';

describe('SecureAreaComponent', () => {
  let component: SecureAreaComponent;
  let fixture: ComponentFixture<SecureAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecureAreaComponent]
    });
    fixture = TestBed.createComponent(SecureAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
