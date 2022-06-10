import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QuoteComponent} from "./quote.component";
import { AddQuoteComponent } from './add-quote/add-quote.component';



const ROUTES: Routes = [
  { path: '', component: QuoteComponent },
  {
    path: '', redirectTo: 'quotes', pathMatch: 'full' 
  },
  { path: 'quotes',     component: QuoteComponent ,
       data: {
         seo: {
           title: 'ELBill - Les Devis'
         }
       }
     },
     { path: 'quotes/add_quote',     component: AddQuoteComponent ,
     data: {
       seo: {
         title: 'ELBill - add Devis'
       }
     }
   },



];
@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class QuoteRoutingModule { }
 