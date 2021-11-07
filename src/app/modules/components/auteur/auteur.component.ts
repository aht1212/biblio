import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { AuteurModel } from './auteur.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-auteur',
  templateUrl: './auteur.component.html',
  styleUrls: ['./auteur.component.scss']
})
export class AuteurComponent implements OnInit {

  formvalue !: FormGroup
  table : string = 'auteur'
  auteur !: any
  showadd !: boolean
  showupdate !: boolean
  AuteurModel : AuteurModel = new AuteurModel
  closeResult = '';

  constructor(private api : ApiService,
    private formbuilder : FormBuilder,
    private modalService: NgbModal ){ }

  ngOnInit(): void {

    this.formvalue = this.formbuilder.group({
      nom : [''],
      discipline : [''],
      date_naissance : [''],
      nationalite : [''],


    })
    this.get_auteur()

  }

  get_auteur(){
    this.api.get_something(this.table).subscribe(res=>{
      this.auteur = res;
      console.log(this.auteur);
    })
  }
  delete_auteur(row : any){

    this.api.delete_something(row.id, this.table).subscribe(res=>{
      alert('auteur supprimé !!')
      this.get_auteur()
    }, err=>{
      alert('Erreur!!!!!!!')
    }
    )
  }

  post_auteur(){
    this.AuteurModel.nom = this.formvalue.value.nom;
    this.AuteurModel.discipline = this.formvalue.value.discipline;
    this.AuteurModel.date_naissance = this.formvalue.value.date_naissance;
    this.AuteurModel.nationalite = this.formvalue.value.nationalite;



    this.api.post_something(this.AuteurModel,this.table).subscribe(res=>{
      console.log(res);
      alert('auteur ajouté');
      this.formvalue.reset()
      this.get_auteur()
    },err=>{
      alert('Une erreur')
    })
  }


  onEdit(content: any, row : any){
    this.showupdate=true;
    this.showadd=false;


    this.AuteurModel.id = row.id
    this.formvalue.controls['nom'].setValue(row.nom);
    this.formvalue.controls['discipline'].setValue(row.discipline);
    this.formvalue.controls['date_naissance'].setValue(row.date_naissance);
    this.formvalue.controls['nationalite'].setValue(row.nationalite);


    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  update_auteur(){

    this.AuteurModel.nom = this.formvalue.value.nom;
    this.AuteurModel.discipline = this.formvalue.value.discipline;
    this.AuteurModel.date_naissance = this.formvalue.value.date_naissance;
    this.AuteurModel.nationalite = this.formvalue.value.nationalite;

    console.log(this.AuteurModel.id)
    this.api.update_something(this.AuteurModel,this.AuteurModel.id,this.table).subscribe(res=>{
      console.log(res);
      this.formvalue.reset()
      alert('Auteur modifié');
      this.get_auteur()
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
