import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserModel } from '../user/user.model';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginform !: FormGroup
  table : string = 'user'
  showadd !: boolean
  showupdate !: boolean
  closeResult = '';
  user !: any

  userModel: UserModel = {
    id: 0,
    nom: '',
    prenom: '',
    email: '',
    poste: '',
    role: '',
    statut: '',
    pass: ''
  }

  constructor(private api : ApiService,
    private formbuilder : FormBuilder,
    private modalService: NgbModal,
    private router : Router ) { }

  ngOnInit(): void {

    this.loginform = this.formbuilder.group({
      email : [''],
      pass : ['']

    })

  }

 connexion(){
    this.api.get_something(this.table).subscribe(res=>{

      this.user = res.find((a:any)=>{
        return a.email === this.loginform.value.email && a.pass === this.loginform.value.pass
      });
      if (this.user) {
        alert ("Connexion reussi");
        this.router.navigate(['']);

      }else{
        alert ("email ou mot de passe erroné")
      }
    //  for (this.loginform.value.email of this.user) {
    //   console.log("youpi!!!!!")
    //   }
    })
  }




}


