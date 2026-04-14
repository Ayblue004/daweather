import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyCard } from './daily-card';

describe('DailyCard', () => {
  let component: DailyCard;
  let fixture: ComponentFixture<DailyCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
