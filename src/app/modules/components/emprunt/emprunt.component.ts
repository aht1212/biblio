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
    emprunteur: '',
    date_emprunt: ''
  }


  constructor(private api : ApiService,
    private formbuilder : FormBuilder,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {

    this.formvalue = this.formbuilder.group({
      nomlivre: [''],
      emprunteur: [''],
      date_emprunt: ['']
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
    this.EmpruntModel.emprunteur = this.formvalue.value.emprunteur;
    this.EmpruntModel.date_emprunt = this.formvalue.value.date_emprunt;






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
    this.formvalue.controls['emprunteur'].setValue(row.emprunteur);
    this.formvalue.controls['date_emprunt'].setValue(row.date_emprunt);




    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  update_emprunt(){
    this.EmpruntModel.nomlivre = this.formvalue.value.nomlivre;
    this.EmpruntModel.emprunteur = this.formvalue.value.emprunteur;
    this.EmpruntModel.date_emprunt = this.formvalue.value.date_emprunt;



    console.log(this.EmpruntModel.id)
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
