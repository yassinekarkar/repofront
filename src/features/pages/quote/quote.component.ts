import { HttpClient } from '@angular/common/http';
import {Component, Input, OnInit} from '@angular/core';
import { QuotesService } from 'src/core/services/quote.service';
import {ICompany, ITable, ITableData} from "../../../core";
import {QUOTESLIST} from "../../../mocks/quotes.mockes";
import {Quote} from './quote.model'


@Component({
  selector: 'el-bills-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.less']
})
export class QuoteComponent implements OnInit{

  quotes$ : Quote[];
  @Input() dataFrom = '';
  @Input() QUOTES = QUOTESLIST ;
  @Input() listOfData: ITable = {
    header: [
      { name: 'client_name' },
      { name: 'created_at' },
      { name: 'total_price_ttc' },
      { name: 'status' },
      { name: 'actions' }
    ],
    data: this.QUOTES as ITableData[] ,
    actions: [],
    nameTable: ['Quote']
};

constructor(private quoteService: QuotesService ) {}
ngOnInit() {
  //this.getCountriesList() ;
  this.listOfData.actions= [
    {
      name: 'common.update',
      icon: 'edit',
      fn: (data: ICompany) => {
        console.log(data);
      }
    },
    {
      name: 'common.show_details',
      icon: 'eye',
      fn: (data: ICompany) => {
        console.log(data);
      }
    },
  ]

  return this.quoteService.getQuotes()
  .subscribe((data :any) => { console.log(data);
   this.listOfData.data= data.results.data.rows})



}
}