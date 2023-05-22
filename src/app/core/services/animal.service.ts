import { Injectable } from '@angular/core';
import { Animal } from '@shared/models/animal.models';
import { formatDate } from '@shared/utils/utils';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  animais: Animal[] = [];
  private static lastId: number = 0;

  constructor() {
    this.loadAnimaisFromLocalStorage();
    this.setLastId();
  }

  setLastId(): void {
    if (this.animais.length > 0) {
      AnimalService.lastId = this.animais[this.animais.length - 1].id;
    }
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
    AnimalService.lastId++;
    animal.id = AnimalService.lastId;
    const formattedData = formatDate(animal.dataNascimento.toString());

    animal.dataNascimento = formattedData;
    this.animais.push(animal);
    this.saveAnimaisToLocalStorage();
  }

  getAnimalById(id: number) {
    return this.animais.find((animal) => animal.id === id);
  }

  editarAnimal(animal: Animal): void {
    const index = this.animais.findIndex((a) => a.id === animal.id);
    if (index !== -1) {
      const formattedData = formatDate(animal.dataNascimento);
      animal.dataNascimento = formattedData;
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
