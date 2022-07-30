import { Injectable } from '@angular/core';
import { Observable, observable } from "rxjs";
import { GLOBAL } from "./GLOBAL";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public url:any;

  constructor(
    private _http: HttpClient,
  ) { 
    this.url = GLOBAL.url;
   }

   login_admin(data:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'login_admin', data, {headers: headers});

   }

   getToken(){
    return localStorage.getItem('token');
   }

   /**
    * IsAunthenticate Aqui se esta validando en token
    * AQUI SE VE EL USO DE LOS GUARDS
    */
   public IsAunthenticate(allowRoles : string[]):boolean {

    const token:any = localStorage.getItem('token');
   
//si no hay un token en el localstorage osea en el navegador retornara falso y no dejara ingresar a la pagina
    if (!token) {
      return false;
    }

    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(token);

      console.log(decodedToken);

    if (!decodedToken) {
      console.log(' NO ACCESO');
      localStorage.removeItem('token');
      return false;
    }
      
    } catch (error) {
      localStorage.removeItem('token');
      return false;
    }

    return allowRoles.includes(decodedToken['role']);
    
   }
}
