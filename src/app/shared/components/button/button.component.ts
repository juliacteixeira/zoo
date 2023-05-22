import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input()
  estilo = 'primary' || 'white' || 'danger';
  @Input()
  icon!: string;
  @Input()
  label!: string;
  @Input()
  onClick!: () => void;
}
