import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './components/button/button.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [HeaderComponent, ButtonComponent],
  imports: [CommonModule],
  exports: [HeaderComponent, ButtonComponent],
})
export class SharedModule {}
