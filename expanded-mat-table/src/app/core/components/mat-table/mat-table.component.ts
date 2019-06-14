import { Component, OnInit,ViewEncapsulation,ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { PersonElement } from '@app/shared';

const ELEMENT_DATA: PersonElement[] = [
  {id: 1, first_name: 'Boaz', weight: 70,age:25, last_name: 'Matoki'},
  {id: 2, first_name: 'Keren', weight: 60,age:24, last_name: 'Hekkie'},
  {id: 3, first_name: 'Idan', weight: 50,age:26, last_name: 'Lilil'},
  {id: 4, first_name: 'Aviad', weight: 60,age:28, last_name: 'Ber'},
  {id: 5, first_name: 'Ronie', weight: 70,age:29, last_name: 'Bat'},
  {id: 6, first_name: 'Ohad', weight: 80,age:28, last_name: 'Cat'},
  {id: 7, first_name: 'Keren', weight: 60,age:27, last_name: 'Neo'},
  {id: 8, first_name: 'Sapir', weight: 50,age:21, last_name: 'Orly'},
  {id: 9, first_name: 'Loren', weight: 60,age:22, last_name: 'Funny'},
  {id: 10, first_name: 'Neon', weight: 70,age:23, last_name: 'Near'},
];

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('*', style({
        height: '*', visibility: 'visible',
        background: 'rgba(119,136,153, 0.4)',
      })),
      transition('void <=> *', animate('245ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('* => void', [style({ height: '325px' }),
        animate('245ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ height: '0',opacity:'0' }))]),
      transition('void => *', [style({ height: '0' }),
       animate('245ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ height: '325px',opacity:'1' }))]),
    ]),
  ],
  encapsulation: ViewEncapsulation.None,
})
export class MatTableComponent implements OnInit {
  displayedColumns: string[] = ['select','id', 'first_name', 'last_name'];
  dataSource: MatTableDataSource<PersonElement>;
  isExpansionDetailRow = (i: number, row: Object) => {
    return row.hasOwnProperty('detailRow');
  }
  selection = new SelectionModel<PersonElement>(true, []);
  @ViewChild(MatSort,{static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  
  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

    // search filter inside the mat table
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // get total selected logs length
  getTotalSelected() {
    const total = this.selection.selected;
    return total.length;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }
}
