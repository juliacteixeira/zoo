import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnimalSelectionService {
  private selectedAnimalId!: number;

  constructor() {}

  setSelectedAnimalId(animalId: number): void {
    this.selectedAnimalId = animalId;
  }

  getSelectedAnimalId(): number {
    return this.selectedAnimalId;
  }
}
