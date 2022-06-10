import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Quote } from '../quote.model';
import {Client} from './../../client/client.model'
import { QuotesService } from '../../../../core/services/quote.service';
import{NgModel}from'@angular/forms'
//import { ToastrService } from 'ngx-toastr';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ClientsService } from 'src/core/services/client.service';

import { Observable } from 'rxjs';
 
import { Router } from '@angular/router';
import { ILanguage } from 'src/core/interfaces/language.interface';
import { LanguagesService } from 'src/core/services/languages.service';
import { CurrenciesService } from 'src/core/services/currencies.service';
import { ICurrency } from 'src/core/interfaces/currency.interface';
import { UserCallerService } from 'src/core/services/user.service';
import { IUser } from 'src/core/interfaces/user.interface';
import { UserInformationService } from 'src/core/services/userInformation.service';
import { VatsService } from 'src/core/services/vats.service';
import { UnitiesService } from 'src/core/services/unities.service';

import { IVat } from 'src/core/interfaces/vat.interface';
import { IUnity } from 'src/core/interfaces/unity.interface';

@Component({
  selector: 'app-add-quote',
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.less']
})
export class AddQuoteComponent implements OnInit {
  title: string  = 'Devis'

  allQuotes:Observable<Quote[]>;
  q:Quote=new Quote();
  form!: FormGroup;
   res:boolean=false
   clientsList : Client[]=[] ; 
   languagesList : ILanguage[]=[] ; 
   currenciesList : ICurrency[]=[] ; 
    UserList : IUser[]=[] ; 

    vatsList : IVat[]=[] ;
   
    uitiesList : IUnity[]=[] ;  

    userInfo : IUser ;  

  constructor(private quoteServ: QuotesService,private unityService: UnitiesService, private vatServie:VatsService,private clientSer: ClientsService,private currencySer: CurrenciesService,private languageServ: LanguagesService,private UserInfoSer: UserInformationService,private userSer: UserCallerService,private forb:FormBuilder,private _notification: NzNotificationService,private route:Router) {}
  public addmore : FormGroup
  ngOnInit() {
    //this.getCountriesList() ;
    this.form=this.forb.group
    ({
        client: ['',[Validators.required]]   ,
        dateBegin: ['',[Validators.required]] ,  
        dateEnd: ['',[Validators.required]]  , 
        estimateNumber: ['',[Validators.required]]  , 
        preNote: ['',[Validators.required]] , 
        postNote: ['',[Validators.required]] ,
        head: ['',[Validators.required]] , 
        language: ['',[Validators.required]] ,
        currency: ['',[Validators.required]] ,
        creator: ['',[Validators.required]] ,
        discount: ['',[Validators.required]] , 
        discount_fixed_value: ['',[Validators.required]] , 
        discount_on_total: ['',[Validators.required]] 

});
 
   this.addmore = this.forb.group({
    name: ['',[Validators.required]]   ,
    unit_price: ['',[Validators.required]]  , 
    amount: ['',[Validators.required]]  , 
    unity: ['',[Validators.required]] ,
    discount: ['',[Validators.required]] , 
    vat: ['',[Validators.required]] , 
    porder: ['',[Validators.required]] ,  
    discount_fixed_value: ['',[Validators.required]] , 
    itemRows: this.forb.array([this.initItemRows()])
   });
 
this.getAllQuotes();
this.getClients();
this.getLanguages();
this.getCurrencies();
this.getVats();
this.getUnities();
this.getUserInformation();


  }

  get formArr() {
    return this.addmore.get('itemRows') as FormArray;
  }

  initItemRows() {
    return this.forb.group({
      Description: ['',[Validators.required]],
      Prix:['',[Validators.required]],
      Qté:['',[Validators.required]],
      Unité:['',[Validators.required]],
      Remise:['',[Validators.required]],
      TVA:['',[Validators.required]]
    })
  }

  addNewRow() {
    this.formArr.push(this.initItemRows());
    this.getVats();
    this.getUnities();
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

  getAllQuotes(){
    this.allQuotes=this.quoteServ.getQuotes();
     }

  

     getClients() {
    this.clientSer.getClients()
    .subscribe((data :any) => { //console.log(data);
      this.clientsList= data.results.data.rows})

  
  }  

  getUserInformation() {
    this.UserInfoSer.getUserInfo()
    .subscribe((data :any) => { 
      console.log("USERINFO",data.results.data.user);
      this.userInfo= data.results.data.user})

  
  }  

 /* getUserCalller() {
    this.userSer.getUserInfo()
    .subscribe((data :any) => { //console.log("user caller", data);
      this.UserList= data.results.data.rows})
     console.log("user", this.UserList)
  
  }  */


  getLanguages() {
    this.languageServ.getLanguages();
    this.languageServ.getLanguagesSuccess().subscribe((languages :any) => {
      //console.log("test language", languages)
    this.languagesList = languages?.results?.data?.rows ;
  
})
}


getCurrencies() {
  this.currencySer.getCurrencies();
  this.currencySer.getCurrenciesSuccess().subscribe((currencies :any) => {
  //  console.log("test currency", currencies)
  this.currenciesList = currencies?.results?.data?.rows ;

})
}

getVats() {
  this.vatServie.getVats();
  this.vatServie.getVatsSuccess().subscribe((vats :any) => {
  this.vatsList = vats?.results?.data?.rows ;

})
}

getUnities() {
this.unityService.getUnities()  ;
this.unityService.getUnitiesSuccess().subscribe((unities :any) => {
  this.uitiesList = unities?.results?.data?.rows
})
}
  

onChangeVat(newValue) {
  console.log(newValue.target.value);
 this.form.value.vat  = newValue.target.value

}

onChangeUnity(newValue) {
console.log(newValue.target.value);
this.form.value.unity  = newValue.target.value

}

  
  onChangeClient(newValue) {
    console.log(newValue.target.value);
   this.form.value.client  = newValue.target.value
 
}

onChangeLanguage(newValue) {
  console.log(newValue.target.value);
 this.form.value.language  = newValue.target.value

}

onChangeCurrency(newValue) {
  console.log(newValue.target.value);
 this.form.value.currency  = newValue.target.value

}

onChange() {
  console.log("")
}

  public addQuote()
  {
   
   console.log(this.form.value)

   const payload = {
    estimateNumber:this.form.value.estimateNumber ,
    status: this.form.value.status,
    preNote:this.form.value.preNote ,
    postNote:this.form.value.postNote,
    dateBegin: this.form.value.dateBegin,
    dateEnd: this.form.value.dateEnd,
    client: this.form.value.client,
    head: this.form.value.head,
    discount: this.form.value.discount,
    discount_on_total: this.form.value.discount_on_total,
    discount_fixed_value: this.form.value.discount_fixed_value,
    discount_base_ttc: this.form.value.discount_base_ttc,
    discountTotal: this.form.value.discountTotal,
    language: this.form.value.language,
    currency: this.form.value.currency,
    creator : this.userInfo.code ,
    name : this.addmore.value.name,
    porder : this.addmore.value.porder,
    unit_price : this.addmore.value.unit_price,
    amount : this.addmore.value.amount,
    discountProduct : this.addmore.value.discount,
    discount_fixed_valueProduct : this.addmore.value.discount_fixed_value,
    vat : this.addmore.value.vat,
    unity : this.addmore.value.unity,


   }
    this.quoteServ.addQuote(payload).subscribe(
    (res:any)=> {
             console.log(res);
 
             this._notification.create('info',
             'Ajout',
             `L\'ajout a été fait avec succès` );
             this.route.navigateByUrl("/quotes")             
             
    })}


    






  
}

