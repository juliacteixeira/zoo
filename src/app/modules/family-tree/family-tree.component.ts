import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Animal } from '@shared/models/animal.models';

@Component({
  selector: 'app-family-tree',
  templateUrl: './family-tree.component.html',
  styleUrls: ['./family-tree.component.scss'],
})
export class FamilyTreeComponent {
  @Input() tree: Animal[] = [];

  constructor(private route: ActivatedRoute) {
    console.log('entrou aqui');

    this.route.queryParams.subscribe((params) => {
      console.log(params);

      if (params && params['tree']) {
        this.tree = params['tree'];
        console.log(this.tree);
      }
    });
  }

  calcularIdade(dataNascimento: string): number {
    const today = new Date();
    const birthDate = new Date(dataNascimento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }
}
