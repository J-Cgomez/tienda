import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';

declare var iziToast:any;

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit {

  public cliente : any = {};
  public id:any;
  public token:any;
  public load_btn = false;
  public load_data = true;

  constructor(
    private _route : ActivatedRoute,
    private _clienteService : ClienteService,
    private _adminService : AdminService,
    private _router : Router
  ) {
    this.token = this._adminService.getToken();
   }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id = params ['id'];
        //console.log(this.id);

        this._clienteService.obtener_cliente_admin(this.id, this.token).subscribe(
          Response =>{
            console.log(Response);
            if (Response.data == undefined) {
              this.cliente = undefined;
              this.load_data = false;

            }else{
              this.cliente = Response.data;
              this.load_data = false;
            }
          },
          Error =>{

          }
        )
      }
    );
  }

  actualizar(updateForm:any){
    if (updateForm.valid) {
      this.load_btn = true;
        this._clienteService.actualizar_cliente_admin(this.id, this.cliente, this.token).subscribe(
          Response=>{
            iziToast.show({

              title: 'COMPLETADO',
              titleColor: '#85C1E9',
              color: '#EBF5FB',
              class: 'text-success',
              position: 'topRight',
              message: 'Datos Actualizados Exitosamente.'
            });

            this.load_btn =false;

            this._router.navigate(['/panel/clientes']);

          }, Error=> {
            console.log(Error);
          }
        )
    }else{
      iziToast.show({

        title: 'ERROR',
        titleColor: '#F1948A',
        color: '#FDEDEC',
        class: 'text-danger',
        position: 'topRight',
        message: 'LOS DATOS DEL FORMULARIO NO SON VALIDOS'
      });
    }

  }
}
