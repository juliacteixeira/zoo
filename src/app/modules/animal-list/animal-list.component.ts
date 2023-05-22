import { Component } from '@angular/core';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss'],
})
export class AnimalListComponent {
  tableColumns = ['Nome', 'Idade', 'Cidade'];
  tableData = [
    { Nome: 'João', Idade: 25, Cidade: 'São Paulo' },
    { Nome: 'Maria', Idade: 30, Cidade: 'Rio de Janeiro' },
    { Nome: 'Pedro', Idade: 28, Cidade: 'Belo Horizonte' },
  ];
}
