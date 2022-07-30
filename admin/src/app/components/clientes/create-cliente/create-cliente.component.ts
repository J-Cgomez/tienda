import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';

declare var iziToast:any;

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent implements OnInit {

    public cliente : any = {
      genero:''
    };

    public token:any;
    public load_btn = false;

  constructor(
    private _clienteService : ClienteService,
    private _adminServie : AdminService,
    private _router : Router
  ) {
    this.token = this._adminServie.getToken();

   }

  ngOnInit(): void {
  }

  registro(registroForm:any){
    if (registroForm.valid) {
      console.log(this.cliente);
      this.load_btn = true;
      this._clienteService.registro_cliente_admin(this.cliente, this.token).subscribe(
        Response=>{
          console.log(Response);

          iziToast.show({

            title: 'COMPLETADO',
            titleColor: '#85C1E9',
            color: '#EBF5FB',
            class: 'text-success',
            position: 'topRight',
            message: 'Cliente Registrado Exitosamente.'
          });

          this.cliente = {
            genero :'',
            nombres: '',
            apellidos: '',
            f_nacimiento: '',
            telefono: '',
            dni: '',
            email: ''

          };

          this.load_btn = false;
          this._router.navigate(['/panel/clientes']);

        }, Error=>{
          console.log(Error);
        }
      );

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
