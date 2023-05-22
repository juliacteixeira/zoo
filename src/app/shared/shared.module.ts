import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './components/button/button.component';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [HeaderComponent, ButtonComponent, TableComponent],
  imports: [CommonModule],
  exports: [HeaderComponent, ButtonComponent, TableComponent],
})
export class SharedModule {}
