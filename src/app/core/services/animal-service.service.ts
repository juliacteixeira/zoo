import { Injectable } from '@angular/core';
import { Animal } from '@shared/models/animal.models';

@Injectable({
  providedIn: 'root',
})
export class AnimalServiceService {
  private animais: Animal[] = [];
  constructor() {}

  getAnimais(): Animal[] {
    return this.animais;
  }

  adicionarAnimal(animal: Animal): void {
    this.animais.push(animal);
  }

  editarAnimal(animal: Animal): void {
    const index = this.animais.findIndex((a) => a.id === animal.id);
    if (index !== -1) {
      this.animais[index] = animal;
    }
  }

  excluirAnimal(animal: Animal): void {
    const index = this.animais.findIndex((a) => a.id === animal.id);
    if (index !== -1) {
      this.animais.splice(index, 1);
    }
  }
}
