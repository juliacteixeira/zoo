import { Component } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';

@Component({
  selector: 'app-family-tree',
  templateUrl: './family-tree.component.html',
  styleUrls: ['./family-tree.component.scss'],
})
export class FamilyTreeComponent {
  tree: any;

  constructor() {
    this.tree = localStorage.getItem('family-tree');
    this.tree = JSON.parse(this.tree);
  }

  calcularIdade(dataNascimento: string) {
    const date = moment(dataNascimento, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const age = moment().diff(date, 'years');
    return age;
  }
}
