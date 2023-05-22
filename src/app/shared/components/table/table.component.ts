import { Component, Input } from '@angular/core';

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

  ngOnInit(): void {}

  toggleSelection(item: any) {
    item.selected = !item.selected;
    console.log(item);
  }

  toggleAllSelection(event: any) {
    const checked = event.target.checked;
    for (const item of this.data) {
      item.selected = checked;
    }
  }
}
