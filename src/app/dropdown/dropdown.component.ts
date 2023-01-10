import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { getLocaleDateFormat } from '@angular/common';
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  alllocationName: any;
  campusname: any;
  itemdata: any;
  locationId: any;
  lastalldata: any;
  allgetid: any;

  constructor(private apiService: ApiService, private http: HttpClient) { }

  dropdowndata = new FormGroup({
    select: new FormControl(''),
    item: new FormControl(''),
    campus: new FormControl(''),
  })
  ngOnInit(): void {

    this.apiService.getdata().subscribe((res: any) => {
      this.alllocationName = res.locations;
      this.locationId = res.locationId
      console.log('this.id', this.locationId);
    })
  }

  // change of  Territory
  changeTerritorydata(event: any) {
    this.apiService.postdata(event.value).subscribe((res: any) => {
      this.campusname = res.zones;
    })
  }

  // change of  Campus
  changeCampusdata(event: any) {
    this.apiService.getitemdata().subscribe((res: any) => {
      this.itemdata = res.configs;
    })
  }


  // all submit data
  Postalldata() {

    this.allgetid = this.dropdowndata.value;
    localStorage.setItem('PostdataValue', JSON.stringify(this.allgetid))
    this.apiService.postapi(this.dropdowndata.value).subscribe((res: any) => {
      this.lastalldata = res.reportData;

    })
  }
}

