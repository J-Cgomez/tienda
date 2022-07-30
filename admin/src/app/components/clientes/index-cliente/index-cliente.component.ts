import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';

declare var JQuery: any;
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent implements OnInit {

public clientes : Array<any> = [];
public filtro_apellidos = '';
public filtro_correo = '';

public page = 1;
public pageSize = 20;
public token:any;
public load_data = true;


  constructor(
    private _clienteService : ClienteService,
    private _adminService : AdminService
  ) {
    this.token = this._adminService.getToken();

  }

  ngOnInit(): void {
     this.init_data();
  }

  init_data(){
    this._clienteService.listar_clientes_filtro_admin(null, null, this.token). subscribe(
      Response=>{

        this.clientes = Response.data;
        this.load_data = false;
        // PARA RETRASAR EL TIEMPO DE RECARGA
        // setTimeout(() => {

        // }, 3000);

      }, Error=>{
        console.log(Error);
      }
    );
  }

  filtro (tipo: any){

    if (tipo == 'apellidos') {
      if (this.filtro_apellidos) {
        this.load_data = true;
        this._clienteService.listar_clientes_filtro_admin(tipo, this.filtro_apellidos, this.token). subscribe(
          Response=>{

            this.clientes = Response.data;
            this.load_data = false;

          }, Error=>{
            console.log(Error);
          }
        );
      } else{
        this.init_data();
      }

    }else if(tipo == 'correo'){
      if (this.filtro_correo) {
        this.load_data = false;
        this._clienteService.listar_clientes_filtro_admin(tipo, this.filtro_correo, this.token). subscribe(
          Response=>{

            this.clientes = Response.data;
            this.load_data = false;

          }, Error=>{
            console.log(Error);
          }
        );
      }else{
        this.init_data();
      }
    }
  }

eliminar(id:any){
  this._clienteService.eliminar_cliente_admin(id,this.token).subscribe(
    response=>{
      iziToast.show({

        title: 'COMPLETADO',
        titleColor: '#85C1E9',
        color: '#EBF5FB',
        class: 'text-success',
        position: 'topRight',
        message: 'Cliente Eliminado Exitosamente.'
      });
      $('#delete-'+id).modal('hide');
      $('.modal-backdrop').removeClass('show');

      this.init_data();

    }, error=>{
      console.log(error);
    }
  )
}

}
