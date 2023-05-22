import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalFormComponent } from './modules/animal-form/animal-form.component';
import { AnimalListComponent } from './modules/animal-list/animal-list.component';
import { FamilyTreeComponent } from './modules/family-tree/family-tree.component';

const routes: Routes = [
  { path: '', component: AnimalListComponent },
  { path: 'animal-form', component: AnimalFormComponent },
  { path: 'family-tree', component: FamilyTreeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
