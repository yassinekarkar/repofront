import {Component, Input, OnInit} from '@angular/core';
import {ICompany, ITable} from "../../../core";

@Component({
  selector: 'el-bill-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit {
  @Input() listOfData!: ITable ;
  @Input() current = 1;
  @Input() total = 20;
  @Input() pageSize = 5;
  @Input() dataFrom = '';
  totalFac=0 ;
  constructor() { }

  ngOnInit(): void {
  }


  

  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
  }

  onImgError(event){
    event.target.src = './assets/images/smarteo.png'
  }


  onPageIndexChange(pageIndex: number) {
    this.current = pageIndex;
  }


}
  