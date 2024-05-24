import { ComponentFixture, TestBed } from '@angular/core/testing';

import { M3mComponent } from './m3m.component';

describe('M3mComponent', () => {
  let component: M3mComponent;
  let fixture: ComponentFixture<M3mComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [M3mComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(M3mComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
