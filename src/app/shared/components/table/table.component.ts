import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnimalSelectionService } from '@core/services/animal-selection.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input()
  columns: any[] = [];
  @Input()
  data: any[] = [];

  @Output() animalSelected: EventEmitter<any> = new EventEmitter<any>();
  selectedItem: any;

  constructor(private animalSelectionSrc: AnimalSelectionService) {}

  ngOnInit(): void {}

  toggleSelection(item: any) {
    item.selected = !item.selected;
    this.animalSelected.emit(item.id);
  }

  isSelected(item: any): boolean {
    return item === this.selectedItem;
  }

  selectItem(item: any, index: number): void {
    if (this.isSelected(item)) {
      this.selectedItem = null;
    } else {
      this.selectedItem = item;
      this.animalSelected.emit(item.id);
      this.deselectOthers(index);
    }
  }

  deselectOthers(index: number): void {
    this.data.forEach((item, i) => {
      if (i !== index) {
        delete item.selected;
      }
    });
  }
  toggleAllSelection(event: any) {
    const checked = event.target.checked;
    for (const item of this.data) {
      item.selected = checked;
    }
  }
}
