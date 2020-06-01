import { Component } from '@angular/core';
import { CrudService } from '../app/service/crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crudFirebase';
  students:any;
  STname:string;
  STage:number;
  STaddress:string;

  Editname:string;
  Editage:number;
  Editaddress:string;

  constructor(private crudService : CrudService){}

  ngOnInit(){
    this.crudService.read_Student().subscribe(data => {
      this.students = data.map(e =>{
        return{
          id: e.payload.doc.id,
          isEdit:false,
          Name: e.payload.doc.data()['Name'],
          Age: e.payload.doc.data()['Age'],
          Address: e.payload.doc.data()['Address'],
        };
      })
    })
  }

  CreateRecord(){
    let record = {};
    record['Name'] = this.STname;
    record['Age'] = this.STage;
    record['Address'] = this.STaddress;
    this.crudService.create_NewStudent(record).then(resp =>{
      this.STname = "";
      this.STage = undefined;
      this.STaddress = "";
      console.log(resp);
    }).catch(error =>{
      console.log(error);
    });
  }

  RemoveRecord(id){
    this.crudService.delete_Student(id);
  }

  EditRecord(id, record){
    record.isEdit = true;
    this.crudService.setId(id);
  }
  UpdateRecord(){
    let record = {};
    record['Name'] = this.Editname;
    record['Age'] = this.Editage;
    record['Address'] = this.Editaddress;
    this.crudService.update_Student(record).then(resp =>{
      this.Editname = "";
      this.Editage = undefined;
      this.Editaddress = "";
      console.log(resp);
    }).catch(error =>{
      console.log(error);
    });
  }



}
