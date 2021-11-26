import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserModel } from '../user/user.model';
import { Router, Routes } from '@angular/router';
// import { SessionLoginService } from 'src/app/shared/sessionLogin/session-login.service';
import { Token } from '@angular/compiler';
import { AuthService } from 'src/app/shared/services/auth.service';

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
  wrongCredentials = false


  userModel: UserModel = {
    id: 0,
    nom: '',
    prenom: '',
    poste: '',
    role: '',
    statut: '',
    email: '',
    pass: ''
  }

  constructor(private api : ApiService,
    private auth: AuthService,
    private formbuilder : FormBuilder,
    private router : Router,
    // private sessionLogin: SessionLoginService,
    private ngModal: NgbModal) { }

  ngOnInit(): void {

    this.loginform = this.formbuilder.group({
      email : ['', [Validators.required]],
      password : ['', [Validators.required]],

    })


  }

connexion(): void{
  if (this.loginform.valid) {


 this.auth.login(this.loginform.value).subscribe(result=>{
   this.router.navigate(['home']);
  if (result) {

  }
 }, (err: Error )=>{
alert(err.message)
 });
}
}







//  connexion(){
//     this.api.get_something(this.table).subscribe(res=>{

//       this.user = res.find((a:any)=>{
//         return a.email === this.loginform.value.email && a.pass === this.loginform.value.pass
//       });
//       if (this.user) {
//         alert ("Connexion reussi");


//         this.router.navigate(['']);

//       }else{
//         alert ("email ou mot de passe erroné")
//       }

//     })
//   }

  // login(){
  //   this.wrongCredentials = false;
  //   this.sessionLogin.login(this.loginform.value.email, this.loginform.value.pass ).subscribe(result => {
  //     this.router.navigate(['']);
  //   }, error =>{
  //     this.wrongCredentials=true
  //   })
  // }

}


