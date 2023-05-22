import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AnimalFormComponent } from './animal-form/animal-form.component';
import { AnimalListComponent } from './animal-list/animal-list.component';

@NgModule({
  declarations: [AnimalFormComponent, AnimalListComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, RouterModule],
  exports: [AnimalListComponent],
})
export class ModulesModule {}
