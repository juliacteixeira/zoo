import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalFormComponent } from './animal-form.component';

describe('AnimalFormComponent', () => {
  let component: AnimalFormComponent;
  let fixture: ComponentFixture<AnimalFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimalFormComponent]
    });
    fixture = TestBed.createComponent(AnimalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
