import { Injectable } from '@angular/core';
import { Animal } from '@shared/models/animal.models';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  animais: Animal[] = [];

  constructor() {
    this.loadAnimaisFromLocalStorage();
  }

  loadAnimaisFromLocalStorage() {
    const animaisStr = localStorage.getItem('animais');
    if (animaisStr) {
      this.animais = JSON.parse(animaisStr);
    }
  }

  saveAnimaisToLocalStorage(): void {
    localStorage.setItem('animais', JSON.stringify(this.animais));
  }
  getAnimais(): Animal[] {
    return this.animais;
  }

  adicionarAnimal(animal: Animal): void {
    this.animais.push(animal);
    this.saveAnimaisToLocalStorage();
  }

  editarAnimal(animal: Animal): void {
    const index = this.animais.findIndex((a) => a.id === animal.id);
    if (index !== -1) {
      this.animais[index] = animal;
      this.saveAnimaisToLocalStorage();
    }
  }

  excluirAnimal(animal: Animal): void {
    const index = this.animais.findIndex((a) => a.id === animal.id);
    if (index !== -1) {
      this.animais.splice(index, 1);
      this.saveAnimaisToLocalStorage();
    }
  }
}
