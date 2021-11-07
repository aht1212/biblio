import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { LivreModel } from './livre.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-livre',
  templateUrl: './livre.component.html',
  styleUrls: ['./livre.component.scss']
})
export class LivreComponent implements OnInit {
  formvalue !: FormGroup
  table : string = 'livre'
  livre !: any
  showadd !: boolean
  showupdate !: boolean
  LivreModel : LivreModel = {
    id: 0,
    titre: '',
    isbn: 0,
    langue: '',
    annee: '',
    date_parution: '',
    img_couverture: '',
    auteur: [{
      id :  0,
      nom: '',
      discipline: '',
      nationalite: ''
    }]
  }
  closeResult = '';

  constructor(private api : ApiService,
             private formbuilder : FormBuilder,
             private modalService: NgbModal ) { }

  ngOnInit(): void {

    this.formvalue = this.formbuilder.group({
      titre : [''],
      isbn : [''],
      langue : [''],
      annee: [''],
      date_parution : [''],
      img_couverture : [''],
      nom : [''],
      discipline : [''],
      nationalite : ['']
    })
    this.get_livre()
  }

  get_livre(){
    this.api.get_something(this.table).subscribe(res=>{
      this.livre = res;
      console.log(this.livre);
    })
  }

delete_livre(row : any){

  this.api.delete_something(row.id, this.table).subscribe(res=>{
    alert('Livre supprimé !!')
    this.get_livre()
  }, err=>{
    alert('Erreur!!!!!!!')
  }
  )
}

post_livre(){
  this.LivreModel.titre = this.formvalue.value.titre;
  this.LivreModel.isbn = this.formvalue.value.isbn;
  this.LivreModel.langue = this.formvalue.value.langue;
  this.LivreModel.annee = this.formvalue.value.annee;
  this.LivreModel.date_parution = this.formvalue.value.date_parution;
  this.LivreModel.auteur[0].nom = this.formvalue.value.nom;
  this.LivreModel.auteur[0].discipline = this.formvalue.value.discipline;
  this.LivreModel.auteur[0].nationalite = this.formvalue.value.nationalite;


  this.api.post_something(this.LivreModel,this.table).subscribe(res=>{
    console.log(res);
    alert('Livre ajouté');
    this.formvalue.reset()
    this.get_livre()
  },err=>{
    alert('Une erreur')
  })
}


onEdit(content: any, row : any){
  this.showupdate=true;
  this.showadd= false
  this.LivreModel.id = row.id

  this.formvalue.controls['titre'].setValue(row.titre);
  this.formvalue.controls['isbn'].setValue(row.isbn);
  this.formvalue.controls['langue'].setValue(row.langue);
  this.formvalue.controls['annee'].setValue(row.annee);
  this.formvalue.controls['date_parution'].setValue(row.date_parution);
  this.formvalue.controls['nom'].setValue(row.auteur[0].nom);
  this.formvalue.controls['discipline'].setValue(row.auteur[0].discipline);
  this.formvalue.controls['nationalite'].setValue(row.auteur[0].nationalite);

  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}



update_livre(){

  this.LivreModel.titre = this.formvalue.value.titre;
  this.LivreModel.isbn = this.formvalue.value.isbn;
  this.LivreModel.langue = this.formvalue.value.langue;
  this.LivreModel.annee = this.formvalue.value.annee;
  this.LivreModel.date_parution = this.formvalue.value.date_parution;
  this.LivreModel.auteur[0].nom = this.formvalue.value.nom;
  this.LivreModel.auteur[0].discipline = this.formvalue.value.discipline;
  this.LivreModel.auteur[0].nationalite = this.formvalue.value.nationalite;
  console.log(this.LivreModel.id)
  this.api.update_something(this.LivreModel,this.LivreModel.id,this.table).subscribe(res=>{
    console.log(res);
    this.formvalue.reset()
    alert('Livre modifié');
    this.get_livre()
  },err=>{
    alert('Une erreur')
  })
}





open(content : any) {
  this.showadd=true;
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
