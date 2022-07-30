import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from "src/app/services/admin.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private _adminService: AdminService,
    private _router:Router
  ){

  }


  canActivate():any{
    //USO DE GUARDS 
    //si la funcion isAuntenticate que esta en el admin.service.ts, es falso va redireccionar al login, 
    //de lo contrario dara acceso a la ruta
      if (!this._adminService.IsAunthenticate(['admin'])) {
            this._router.navigate(['/login']);
            return false; 
      }
      return true;
  }
  
}
