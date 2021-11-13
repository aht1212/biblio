import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpruntModel } from './emprunt.model';
import { getNameOfDeclaration, textChangeRangeIsUnchanged } from 'typescript';

@Component({
  selector: 'app-emprunt',
  templateUrl: './emprunt.component.html',
  styleUrls: ['./emprunt.component.scss']
})
export class EmpruntComponent implements OnInit {
  titrelivre !: any
  table : string = 'emprunt';
  livre :  string = 'livre'
  formvalue !: FormGroup
  showadd !: boolean
  showupdate !: boolean
  closeResult = '';
  auteur !: any
  emprunt !: any


  EmpruntModel : EmpruntModel = {
    id: 0,
    nomlivre: '',
    emprunteur : [{
      id: 0,
      nom: '',
      telephone : 77777777,
      date_naissance: '',
      genre : '',
      adresse: ''
    }],
        date_emprunt: '',
        date_retour: '',
        remarque_livre: ''
  }


  constructor(private api : ApiService,
    private formbuilder : FormBuilder,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {

    this.formvalue = this.formbuilder.group({
      nomlivre: [''],
      nom: [''],
      telephone: [''],
      date_naissance: [''],
      genre: [''],
      adresse: [''],
      date_emprunt: [''],
      date_retour: [''],
      remarque_livre: ['']

    })

    this.get_nameLivre()
    this.get_emprunt()
  }

 get_nameLivre(){
    this.api.get_something(this.livre).subscribe(res=>{
    this.titrelivre = res
    })

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


  post_emprunt(){
    this.EmpruntModel.nomlivre = this.formvalue.value.nomlivre;
    this.EmpruntModel.emprunteur[0].nom = this.formvalue.value.nom;
    this.EmpruntModel.emprunteur[0].telephone = this.formvalue.value.telephone;
    this.EmpruntModel.emprunteur[0].date_naissance = this.formvalue.value.date_naissance;
    this.EmpruntModel.emprunteur[0].genre = this.formvalue.value.genre;
    this.EmpruntModel.emprunteur[0].adresse = this.formvalue.value.adresse;

    this.EmpruntModel.date_emprunt = this.formvalue.value.date_emprunt;
    this.EmpruntModel.date_retour = this.formvalue.value.date_retour;
    this.EmpruntModel.remarque_livre = this.formvalue.value.remarque_livre;




      // if (condition) {

      // } si exemplaire existe

    this.api.post_something(this.EmpruntModel,this.table).subscribe(res=>{
      console.log(res);
      alert('emprunt ajouté');
      this.formvalue.reset()
      this.get_emprunt()
    },err=>{
      alert('Une erreur')
    })


  }


  onEdit(content: any, row : any){
    this.showupdate=true;
    this.showadd=false;


    this.EmpruntModel.id = row.id
    this.formvalue.controls['nomlivre'].setValue(row.nomlivre);

    this.formvalue.controls['nom'].setValue(row.emprunteur[0].nom);
    this.formvalue.controls['telephone'].setValue(row.emprunteur[0].telephone);
    this.formvalue.controls['date_naissance'].setValue(row.emprunteur[0].date_naissance);
    this.formvalue.controls['genre'].setValue(row.emprunteur[0].genre);
    this.formvalue.controls['adresse'].setValue(row.emprunteur[0].adresse);

    this.formvalue.controls['date_emprunt'].setValue(row.date_emprunt);
    this.formvalue.controls['date_retour'].setValue(row.date_retour);
    this.formvalue.controls['remarque_livre'].setValue(row.remarque_livre);





    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  update_emprunt(){


    this.EmpruntModel.nomlivre = this.formvalue.value.nomlivre;
    this.EmpruntModel.emprunteur[0].nom = this.formvalue.value.nom;
    this.EmpruntModel.emprunteur[0].telephone = this.formvalue.value.telephone;
    this.EmpruntModel.emprunteur[0].date_naissance = this.formvalue.value.date_naissance;
    this.EmpruntModel.emprunteur[0].genre = this.formvalue.value.genre;
    this.EmpruntModel.emprunteur[0].adresse = this.formvalue.value.adresse;

    this.EmpruntModel.date_emprunt = this.formvalue.value.date_emprunt;
    this.EmpruntModel.date_retour = this.formvalue.value.date_retour;
    this.EmpruntModel.remarque_livre = this.formvalue.value.remarque_livre;


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
