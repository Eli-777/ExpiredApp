import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionTableComponent } from './option-table.component';

describe('OptionTableComponent', () => {
  let component: OptionTableComponent;
  let fixture: ComponentFixture<OptionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
