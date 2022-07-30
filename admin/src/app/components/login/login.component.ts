import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

declare var JQuery: any;
declare var $:any;
declare var iziToast:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user : any = {};
  public usuario: any = {};
  public token : any = '';

  constructor(
    private _adminService:AdminService,
    private _router: Router
  ) { 
    this.token = this._adminService.getToken();

  }

  ngOnInit(): void {

    //console.log(this.token);
    if (this.token) {
        this._router.navigate(['/']);
    }else{
      //MANTENER EN EL COMPONENTE
    }
  }

  login(loginForm: { valid: any; }){
    if (loginForm.valid) {
      console.log(this.user);

      let data = {
        email: this.user.email,
        password: this.user.password
      }
      this._adminService.login_admin(data).subscribe(
          response =>{
            if (response.data == undefined) {
              iziToast.show({
        
                title: 'ERROR',
                titleColor: '#ff0000',
                color: '#A2D9CE',
                class: 'text-danger',
                position: 'topRight',
                message: response.message
              });
            }else{
                this.usuario= response.data;
                localStorage.setItem('token',response.token);
                localStorage.setItem('_id', response.data._id);
                
                this._router.navigate(['/']);

            }
              console.log(response);
          }, 
          error =>{
              console.log(error);
          }  
        );
       
       /* next: resp=>{
          console.log(resp);
          }, 
          error:err=>{
          console.log(err);
          } */

    }else{
      iziToast.show({
        
        title: 'ERROR',
        titleColor: '#ff0000',
        color: '#A2D9CE',
        class: 'text-danger',
        position: 'topRight',
        message: 'LOS DATOS DEL FORMULARIO NO SON VALIDOS'
      });
    }
}


 
}
