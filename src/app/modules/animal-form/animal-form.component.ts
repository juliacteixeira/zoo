import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AnimalService } from '@core/services/animal.service';
import { Animal } from '@shared/models/animal.models';
import { debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.scss'],
})
export class AnimalFormComponent {
  animalForm!: FormGroup;
  submitted = false;
  animalEdit!: any;
  isEdit = false;
  showAlert = false;

  vinculoPaiCtrl = new FormControl();
  vinculoMaeCtrl = new FormControl();
  vinculoPaiOptions: Animal[] = [];
  vinculoMaeOptions: Animal[] = [];
  pai: any;
  mae: any;
  showMsgError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private animalService: AnimalService,
    private route: ActivatedRoute
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (Object.keys(params).length > 0) {
        const id = params['id'];
        this.animalEdit = this.animalService.getAnimalById(Number(id));
        this.isEdit = !this.isEdit;
        this.setEditValue(this.animalEdit);
      }
    });

    this.vinculoPaiCtrl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this.filterAnimals(value, 'vinculoPaiOptions');
      });

    this.vinculoMaeCtrl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this.filterAnimals(value, 'vinculoMaeOptions');
      });
  }

  createForm() {
    this.animalForm = this.formBuilder.group({
      nome: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      especie: ['', [Validators.required, this.validateEspecie.bind(this)]],
      sexo: ['Macho', Validators.required],
      vinculoMae: [''],
      vinculoPai: [''],
    });
  }

  validateEspecie(control: AbstractControl): ValidationErrors | null {
    const especie = control.value;
    const especiesAceitas = this.animalService.getEspecies();

    if (especiesAceitas.indexOf(especie) === -1) {
      return { especieInvalida: true };
    }

    return null;
  }

  setEditValue(animal: Animal) {
    this.animalForm.setValue({
      nome: animal.nome,
      dataNascimento: animal.dataNascimento,
      especie: animal.especie,
      sexo: animal.sexo,
      vinculoMae: animal.vinculoMae ? animal.vinculoMae : '',
      vinculoPai: animal.vinculoPai ? animal.vinculoPai : '',
    });
  }

  setEmptyValue() {
    this.animalForm.setValue({
      nome: '',
      dataNascimento: '',
      especie: '',
      sexo: '',
      vinculoMae: '',
      vinculoPai: '',
    });
  }

  filterAnimals(value: any, target: keyof AnimalFormComponent): void {
    const filterValue = value.toLowerCase();
    this[target] = this.animalService.getAnimais().filter((animal) => {
      const nome = animal.nome.toLowerCase();
      if (this.animalForm.value['especie'] === '') {
        this.showMsgError = true;
        return null;
      } else {
        if(nome.includes(filterValue) && animal.especie === this.animalForm.value['especie']) {
          return nome.includes(filterValue);
        }
      }
      return null
    });
  }

  selectVinculoPai(animal: Animal) {

    this.vinculoPaiCtrl.setValue(animal.nome);
    this.pai = animal;
  }

  selectVinculoMae(animal: Animal) {
    this.vinculoMaeCtrl.setValue(animal.nome);
    this.mae = animal;
  }

  animalSave(): void {
    this.submitted = true;
    if (this.animalForm.invalid) {
      return;
    }

    let animal: Animal = {
      id: 0,
      nome: this.animalForm.value.nome,
      dataNascimento: this.animalForm.value.dataNascimento,
      especie: this.animalForm.value.especie,
      sexo: this.animalForm.value.sexo,
      vinculoPai: this.pai ? this.pai : '',
      vinculoMae: this.mae ? this.mae : '',
    };

    if (!this.animalEdit) {
      this.animalService.adicionarAnimal(animal);
    } else {
      animal.id = this.animalEdit.id;
      this.animalService.editarAnimal(animal);
      this.showAlert = true;
    }

    this.setEmptyValue();

    this.submitted = false;
  }
}
