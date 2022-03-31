import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { UserModel } from './user.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  formvalue !: FormGroup
  table : string = 'user'
  user !: any
  showadd !: boolean
  showupdate !: boolean
  userModel: UserModel = {
    id: 0,
    nom: '',
    prenom: '',
    poste: '',
    role: '',
    statut: '',
    login:[{
    email: '',
    pass: ''}]

  }
  closeResult = '';

  constructor(private api : ApiService,
    private formbuilder : FormBuilder,
    private modalService: NgbModal ){ }

  ngOnInit(): void {

    this.formvalue = this.formbuilder.group({
      id: 0,
      nom : [''],
      prenom : [''],
      poste : [''],
      role : [''],
      statut : [''],
      email : [''],
      pass : [''],

    })
    this.get_user()

  }

  get_user(){
    this.api.get_something(this.table).subscribe(res=>{
      this.user = res;
      console.log(this.user);
    })
  }
  delete_user(row : any){

    this.api.delete_something(row.id, this.table).subscribe(res=>{
      alert('user supprimé !!')
      this.get_user()
    }, err=>{
      alert('Erreur!!!!!!!')
    }
    )
  }

  post_user(){

    this.userModel.nom = this.formvalue.value.nom;
    this.userModel.prenom = this.formvalue.value.prenom;
    this.userModel.poste = this.formvalue.value.poste;
    this.userModel.role = this.formvalue.value.role;
    this.userModel.statut = this.formvalue.value.statut;
    this.userModel.login[0].email = this.formvalue.value.email;
    this.userModel.login[0].pass = this.formvalue.value.pass;





    this.api.post_something(this.userModel,this.table).subscribe(res=>{
      console.log(res);
      alert('user ajouté');
      this.formvalue.reset()
      this.get_user()
    },err=>{
      alert('Une erreur')
    })
  }


  onEdit(content: any, row : any){
    this.showupdate=true;
    this.showadd=false;


    this.userModel.id = row.id
    this.formvalue.controls['nom'].setValue(row.nom);
    this.formvalue.controls['prenom'].setValue(row.prenom);
    this.formvalue.controls['email'].setValue(row.email);
    this.formvalue.controls['poste'].setValue(row.poste);
    this.formvalue.controls['role'].setValue(row.role);
    this.formvalue.controls['statut'].setValue(row.statut);



    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  update_user(){
    this.userModel.nom = this.formvalue.value.nom;
    this.userModel.prenom = this.formvalue.value.prenom;
    this.userModel.poste = this.formvalue.value.poste;
    this.userModel.role = this.formvalue.value.role;
    this.userModel.statut = this.formvalue.value.statut;
    this.userModel.login[0].email = this.formvalue.value.email;
    this.userModel.login[0].pass = this.formvalue.value.pass;


    console.log(this.userModel.id)
    this.api.update_something(this.userModel,this.userModel.id,this.table).subscribe(res=>{
      console.log(res);
      this.formvalue.reset()
      alert('user modifié');
      this.get_user()
    },err=>{
      alert('Une erreur')
    })
  }

  open(content : any) {
    this.showadd=true;
    this.showupdate=false;

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.formvalue.reset()


  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
