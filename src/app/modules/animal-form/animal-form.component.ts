import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AnimalService } from '@core/services/animal.service';
import { Animal } from '@shared/models/animal.models';

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
  }

  createForm() {
    this.animalForm = this.formBuilder.group({
      nome: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      especie: ['', Validators.required],
      sexo: ['Macho', Validators.required],
      vinculoMae: [''],
      vinculoPai: [''],
    });
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
      vinculoMae: this.animalForm.value.vinculoMae,
      vinculoPai: this.animalForm.value.vinculoPai,
    };

    if (!this.animalEdit) {
      this.animalService.adicionarAnimal(animal);
    } else {
      animal.id = this.animalEdit.id;
      this.animalService.editarAnimal(animal);
      this.showAlert = true;
    }

    this.setEmptyValue();

    // Marcar o formulário como não submetido
    this.submitted = false;
  }
}
