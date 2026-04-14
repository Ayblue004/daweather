import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyCard } from './hourly-card';

describe('HourlyCard', () => {
  let component: HourlyCard;
  let fixture: ComponentFixture<HourlyCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HourlyCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourlyCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
