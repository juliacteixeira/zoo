import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AnimalFormComponent } from './animal-form/animal-form.component';
import { AnimalListComponent } from './animal-list/animal-list.component';

@NgModule({
  declarations: [AnimalFormComponent, AnimalListComponent],
  imports: [CommonModule],
  exports: [AnimalListComponent],
})
export class ModulesModule {}
