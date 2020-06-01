import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  Id:string;

  constructor(private firestore : AngularFirestore) { }

  create_NewStudent(record){
    return this.firestore.collection('student').add(record);

  }
  read_Student(){
    return this.firestore.collection('student').snapshotChanges();

  }
  delete_Student(id){
    this.firestore.doc('student/'+id).delete();

  }
  setId(Id:string){
    this.Id=Id;

  }
  getId(){
    return this.Id;

  }
  update_Student(record){
    return this.firestore.doc('student/'+this.Id).update(record);
  }
}
