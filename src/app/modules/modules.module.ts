import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AnimalFormComponent } from './animal-form/animal-form.component';
import { AnimalListComponent } from './animal-list/animal-list.component';

@NgModule({
  declarations: [AnimalFormComponent, AnimalListComponent],
  imports: [CommonModule, SharedModule],
  exports: [AnimalListComponent],
})
export class ModulesModule {}
