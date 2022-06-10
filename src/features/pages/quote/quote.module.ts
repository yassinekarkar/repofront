import { NgModule } from '@angular/core';
import {SharedModule} from "../../../shared";
import {QuoteRoutingModule} from "./quote-routing.module";
import {QuoteComponent} from "./quote.component";
import { HttpClientModule } from '@angular/common/http';
import { AddQuoteComponent } from './add-quote/add-quote.component';




@NgModule({
  declarations: [QuoteComponent , AddQuoteComponent],
  imports: [
    QuoteRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  exports:[
    SharedModule,
  ]
})
export class QuoteModule { }
