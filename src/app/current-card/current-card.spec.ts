import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentCard } from './current-card';

describe('CurrentCard', () => {
  let component: CurrentCard;
  let fixture: ComponentFixture<CurrentCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
