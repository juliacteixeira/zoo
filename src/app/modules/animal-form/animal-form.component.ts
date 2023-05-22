import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private formBuilder: FormBuilder,
    private animalService: AnimalService
  ) {
    this.createForm();
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

  animalSave(): void {
    this.submitted = true;
    if (this.animalForm.invalid) {
      return;
    }

    const animal: Animal = {
      id: 0,
      nome: this.animalForm.value.nome,
      dataNascimento: this.animalForm.value.dataNascimento,
      especie: this.animalForm.value.especie,
      sexo: this.animalForm.value.sexo,
      vinculoMae: this.animalForm.value.vinculoMae,
      vinculoPai: this.animalForm.value.vinculoPai,
    };

    this.animalService.adicionarAnimal(animal);

    this.animalForm.setValue({
      nome: '',
      dataNascimento: '',
      especie: '',
      sexo: '',
      vinculoMae: '',
      vinculoPai: '',
    });

    // Marcar o formulário como não submetido
    this.submitted = false;
  }
}
