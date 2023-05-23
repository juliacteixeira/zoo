import { Injectable } from '@angular/core';
import { Animal } from '@shared/models/animal.models';
import { formatDate } from '@shared/utils/utils';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  animais: Animal[] = [];
  especies: string[] = ['Leão', 'Cavalo', 'Arara', 'Orangotango', 'Girafa'];
  private static lastId: number = 0;
  private animaisSubject: BehaviorSubject<Animal[]> = new BehaviorSubject<
    Animal[]
  >([]);

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
    this.updateAnimaisSubject();
  }

  getAnimalById(id: number) {
    return this.animais.find((animal) => animal.id === id);
  }

  getEspecies(): string[] {
    return this.especies;
  }

  editarAnimal(animal: Animal): void {
    const index = this.animais.findIndex((a) => a.id === animal.id);
    if (index !== -1) {
      const formattedData = formatDate(animal.dataNascimento);
      animal.dataNascimento = formattedData;
      this.animais[index] = animal;
      this.updateAnimaisSubject();
    }
  }

  excluirAnimal(id: number): void {
    const animal = this.getAnimalById(id);
    const index = this.animais.findIndex((a) => a.id === animal?.id);
    if (index !== -1) {
      this.animais.splice(index, 1);
      this.updateAnimaisSubject();
    }
  }

  getAnimaisSubject(): BehaviorSubject<Animal[]> {
    return this.animaisSubject;
  }

  private emitAnimaisSubject(): void {
    this.animaisSubject.next(this.animais);
  }

  private updateAnimaisSubject(): void {
    this.saveAnimaisToLocalStorage();
    this.emitAnimaisSubject();
  }

  getGenealogicalTree(animal: Animal): Animal[] {
    const tree: Animal[] = [];
    this.buildGenealogicalTree(animal, tree);
    return tree;
  }

  private buildGenealogicalTree(animal: Animal, tree: Animal[]) {
    if (!animal) {
      return;
    }

    tree.push(animal);

    if (animal.vinculoPai) {
      const pai = this.animais.find((a) => a.nome === animal.vinculoPai?.nome);
      if (pai) {
        this.buildGenealogicalTree(pai, tree);
      }
    }

    if (animal.vinculoMae) {
      const mae = this.animais.find((a) => a.nome === animal.vinculoMae?.nome);
      if (mae) {
        this.buildGenealogicalTree(mae, tree);
      }
    }
  }
}
