import { Injectable } from '@angular/core';
import { Animal } from '@shared/models/animal.models';

@Injectable({
  providedIn: 'root'
})
export class FamilyTreeService {
  familyTree: Animal[] = [];
  constructor() { }

  saveFamilyTree(familyTree: Array<Animal>): void {
    localStorage.setItem('family-tree', JSON.stringify(familyTree));
  }


  loadFamilyFromLocalStorage() {
    const family = localStorage.getItem('family-tree');
    if (family) {
      this.familyTree = JSON.parse(family);
    }
  }

}
