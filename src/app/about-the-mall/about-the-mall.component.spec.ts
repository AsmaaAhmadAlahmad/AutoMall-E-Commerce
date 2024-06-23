import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutTheMallComponent } from './about-the-mall.component';

describe('AboutTheMallComponent', () => {
  let component: AboutTheMallComponent;
  let fixture: ComponentFixture<AboutTheMallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutTheMallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutTheMallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
