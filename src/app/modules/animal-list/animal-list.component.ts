import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimalService } from '@core/services/animal.service';
import { Animal } from '@shared/models/animal.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss'],
})
export class AnimalListComponent {
  animais: Array<Animal> = [];
  selectedAnimalId!: number;
  animaisSubscription: Subscription = new Subscription();
  tree: Animal[] = [];

  tableColumns = [
    { key: 'id', label: 'ID' },
    { key: 'especie', label: 'Espécie' },
    { key: 'sexo', label: 'Sexo' },
    { key: 'nome', label: 'Nome' },
    { key: 'vinculoPai', label: 'Nome do Pai' },
    { key: 'vinculoMae', label: 'Nome da Mãe' },
    { key: 'dataNascimento', label: 'Aniversário' },
  ];
  tableData: Array<Animal> = [];

  constructor(private router: Router, private animalService: AnimalService) {}
  ngOnInit(): void {
    this.animaisSubscription = this.animalService
      .getAnimaisSubject()
      .subscribe((animais) => {
        this.animais = animais;
      });
    this.getAnimais();
  }

  ngOnDestroy(): void {
    this.animaisSubscription.unsubscribe();
  }
  getAnimais() {
    const animalsData = localStorage.getItem('animais');

    if (animalsData) {
      this.animais = JSON.parse(animalsData);
      this.tableData = this.animais;
    } else {
      this.animais = [];
    }
  }

  editSelectedAnimal(): void {
    if (this.selectedAnimalId) {
      this.router.navigate(['/animal-form'], {
        queryParams: { id: this.selectedAnimalId },
      });
    }
  }

  deleteAnimal() {
    if (this.selectedAnimalId) {
      this.animalService.excluirAnimal(this.selectedAnimalId);
      this.getAnimais();
    }
  }

  showGenealogyTree(): void {
    if (this.selectedAnimalId) {
      const animal = this.animais.find((a) => a.id === this.selectedAnimalId);
      if (animal) {
        const tree: Animal[] = [];
        this.buildGenealogicalTree(animal, tree);
        console.log(tree);
        this.router.navigate(['/family-tree'], {
          queryParams: { animalFamily: tree },
        });
      }
    }
  }

  private buildGenealogicalTree(animal: Animal | undefined, tree: Animal[]) {
    if (!animal) {
      return;
    }

    tree.push(animal);

    if (animal.vinculoPai) {
      const pai = this.animais.find((a) => a.id === animal.vinculoPai?.id);
      if (pai) {
        this.buildGenealogicalTree(pai, tree);
      }
    }

    if (animal.vinculoMae) {
      const mae = this.animais.find((a) => a.id === animal.vinculoMae?.id);
      if (mae) {
        this.buildGenealogicalTree(mae, tree);
      }
    }
  }
}
