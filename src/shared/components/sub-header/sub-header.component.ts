import {Component, Input, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'el-bill-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.less']
})
export class SubHeaderComponent implements OnInit {
  @Input() canGoBack = false;
  @Input()title=''
  @Input()url=''

  constructor( private _location: Location , private _router:Router) { }

  ngOnInit(): void {
  }

  goBack() {
    this._location.back();
  }

  goTo(){
    this._router.navigateByUrl(this.url)
  }

}
