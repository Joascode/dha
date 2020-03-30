import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewDetailPage } from './overview-detail.page';

describe('OverviewDetailPage', () => {
  let component: OverviewDetailPage;
  let fixture: ComponentFixture<OverviewDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
