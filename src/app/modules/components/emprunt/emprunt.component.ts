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
  table : string = 'livre'
  formvalue !: FormGroup
  showadd !: boolean
  showupdate !: boolean
  closeResult = '';


  EmpruntModel : EmpruntModel = {
    id: 0,
    nomlivre: '',
    auteur:'',
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
      auteur: [''],
      emprunteur: [''],
      date_emprunt: ['']
    })

  }


 get_nameLivre(i : number){
    this.api.get_something(this.table).subscribe(res=>{
      this.titrelivre = res[i].titre

      console.log(this.titrelivre);

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
