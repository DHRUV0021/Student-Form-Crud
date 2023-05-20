import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  jsonUrl = 'http://localhost:3000/Student';//JSON URL LINK

  constructor(private http: HttpClient) { }

  //=================GET DATA METHOD
  getItem() {
    return this.http.get<Array<Data>>(this.jsonUrl);
  }

  //=================POST DATA METHOD
  addItem(data: Data) {
    return this.http.post(this.jsonUrl, data);
  }

  //=================EDIT DATA METHOD
  editItem(data: Data) {
    return this.http.put(`${this.jsonUrl}/${data.id}`, data);
  }

  //=================DELETE DATA METHOD
  deleteItem(data: Data) {
    return this.http.delete(`${this.jsonUrl}/${data.id}`);
  }
}


//==========ARRAY OF OBJECT CLASS
export class Data {
  id: number = 0;
  companyname: string;
  fname: string;
  lname: string;
  email: string;
  mobileno: string;
  address: Addressing;
  salary: string;
  parsonalDetalis: PersonalData;
}

export class Addressing {
  city: string;
  blockno: string;
}

export class PersonalData {
  aadhaarno: string;
  panno: string;
  passbookno: string;
}
