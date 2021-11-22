import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getNameOfDeclaration, textChangeRangeIsUnchanged } from 'typescript';
import { LivreComponent } from '../livre/livre.component';
import { LivreModel } from '../livre/livre.model';
import { EmpruntModel } from '../emprunt/emprunt.model';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {

  table : string = 'emprunt';
  formvalue !: FormGroup
  showadd !: boolean
  showupdate !: boolean
  closeResult = '';
  auteur !: any
  emprunt !: any
  exemplaire !: any
  lol !: any


  EmpruntModel : EmpruntModel = {
    id: 0,
    nomlivre: '',
    emprunteur : [{
      id: 0,
      nom: '',
      telephone : 0,
      date_naissance: '',
      genre : '',
      adresse: ''
    }],
      date_emprunt: '',
      date_echeance: '',
      remarque_livre: '',
      rendu: true,
      date_retour: ''
  }


  constructor(private api : ApiService,
    private formbuilder : FormBuilder,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.formvalue = this.formbuilder.group({
      nomlivre: [''],
      nom: [''],
      telephone: [''],
      date_naissance: [''],
      genre: [''],
      adresse: [''],
      date_emprunt: [''],
      date_echeance: [''],
      remarque_livre: [''],
      rendu : [''],
      date_retour: [''],

    })

    this.get_emprunt()
  }





  get_emprunt(){
    this.api.get_something(this.table).subscribe(res=>{
    this.emprunt = res
    })

  }

  delete_emprunt(row : any){

    this.api.delete_something(row.id, this.table).subscribe(res=>{
      alert('emprunt supprimé !!')
      this.get_emprunt()
    }, err=>{
      alert('Erreur!!!!!!!')
    }
    )
  }


  onEdit(content: any, row : any){
    this.showupdate=true;
    this.showadd=false;


    this.EmpruntModel.id = row.id
    this.formvalue.controls['date_retour'].setValue(row.date_retour);
    this.formvalue.controls['rendu'].setValue(row.rendu);





    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  // validate(content : any, row: any){
  //   this.showupdate=true;
  //   this.showadd=false;

  //   this.EmpruntModel.id = row.id
  //   this.formvalue.controls['date_retour'].setValue(row.date_retour);
  //   this.formvalue.controls['rendu'].setValue(row.rendu);

  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });

  // }

  update_emprunt(){



    this.EmpruntModel.date_retour = this.formvalue.value.date_retour;
    this.EmpruntModel.rendu = this.formvalue.value.rendu;


    this.api.update_something(this.EmpruntModel,this.EmpruntModel.id,this.table).subscribe(res=>{
      console.log(res);
      this.formvalue.reset()
      alert('emprunt modifié');

      this.get_emprunt()
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




