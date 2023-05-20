import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Addressing, CrudService, Data, PersonalData } from '../crud.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent {

  task: Data;
  updateAddBtn = false;
  clearData = false;
  allData: Array<Data> = new Array<Data>;
  searchValue: string;

  constructor(private data: CrudService) { }

  displayedColumns: string[] = ['position', 'companyName', 'firstname', 'lastName', 'Email', 'mobileNo', 'salary', 'city', 'Blockno', 'Aadhaarno', 'panno', 'passbookno', 'Action'];
  dataSource = new MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.task = new Data;
    this.task.address = new Addressing;
    this.task.parsonalDetalis = new PersonalData;
    this.getData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  //=================GET DATA METHOD
  getData() {
    this.data.getItem().subscribe({
      next: (res: any) => {
        console.log(res);
        this.allData = res;
        this.dataSource = new MatTableDataSource<Data>(this.allData);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("get Data success");
      }
    })
  }

  //=================ADD DATA METHOD
  addData() {
    if (this.task.mobileno) {

      this.data.addItem(this.task).subscribe({
        next: (res) => {
          console.log(res);
          this.task = new Data;
          this.task.address = new Addressing;
          this.task.parsonalDetalis = new PersonalData;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log("add Data  success");
        }
      })
    }
  }

  //=================EDIT DATA METHOD
  FillData(data: Data) {
    this.task = data;
    this.updateAddBtn = true;

  }
  EditData() {
    this.data.editItem(this.task).subscribe({
      next: (res) => {
        this.task = new Data;
        this.updateAddBtn = false;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("edit data");
      }
    })
  }

  //=================DELETE DATA METHOD
  deleteData(data: Data) {
    this.data.deleteItem(data).subscribe({
      next: (res) => {
        this.getData();
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("Delete Data");
      }
    })
  }

  //================= SEARCH DATA METHOD
  typeSearchData() {
    if (this.searchValue) {
      let searchEmploye = new Array<Data>();
      if (this.allData.length > 0) {
        for (let emp of this.allData) {
          if (JSON.stringify(emp).toLowerCase().indexOf(this.searchValue.toLowerCase()) > 0) {
            searchEmploye.push(emp)
          }
        }
        this.allData = searchEmploye;
        this.dataSource = new MatTableDataSource<Data>(searchEmploye);
      }
      else {
        this.getData();
      }
    }
    else {
      this.getData();
    }
  }

  //================= EDIT CLEAR FILD DATA METHOD
  clearEdit() {
    this.task = new Data;
    this.task.address = new Addressing;
    this.task.parsonalDetalis = new PersonalData;
    this.updateAddBtn = false;
    this.clearData = true;
  }
}
