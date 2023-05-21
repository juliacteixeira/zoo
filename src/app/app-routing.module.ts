import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalFormComponent } from './modules/animal-form/animal-form.component';
import { AnimalListComponent } from './modules/animal-list/animal-list.component';

const routes: Routes = [
  { path: '', component: AnimalListComponent },
  { path: 'animal-form', component: AnimalFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
