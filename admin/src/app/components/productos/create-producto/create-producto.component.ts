import { Component, OnInit } from '@angular/core';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { AdminService } from 'src/app/services/admin.service';
import { ProductoService } from 'src/app/services/producto.service';

declare var JQuery: any;
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent implements OnInit {

  public producto:any =  {
    categoria:''
  };
  public file:any = undefined;
  public imgselect : any | ArrayBuffer = 'assets/img/01.jpg';
  public config :any = {};
  public token:any;

  constructor(
    private _productoService : ProductoService,
    private _adminService : AdminService
  ) {
    this.config = {
      heigth: 500
    }

    this.token = this._adminService.getToken();
   }

  ngOnInit(): void {
  }

registro(registroForm:any){
        if (registroForm.valid) {
            console.log(this.producto);
            console.log(this.file);

            this._productoService.registro_producto_admin(this.producto, this.file, this.token).subscribe(
              Response=>{
                console.log(Response);
              },error=>{
                console.log(error);
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

    fileChangeEvent(event:any):void{
      var file:any;
      if (event.target.files && event.target.files[0]) {
        file = <File>event.target.files[0];
      }else{
        iziToast.show({

          title: 'ERROR',
          titleColor: '#F1948A',
          color: '#FDEDEC',
          class: 'text-danger',
          position: 'topRight',
          message: 'No Se Ha Registrado Una Imagen'
        });

        $('#input-portada').text('Seleccionar imagen');
        this.imgselect = 'assets/img/01.jpg';
        this.file = undefined;
      }

      if (file.size <= 4000000) {
        //asd
        if (file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg' ) {

          const reader = new FileReader();
          reader.onload = e => this.imgselect = reader.result;
          console.log(this.imgselect);


          reader.readAsDataURL(file);

          $('#input-portada').text(file.name);
          this.file = file;
        }else{
          iziToast.show({

            title: 'ERROR',
            titleColor: '#F1948A',
            color: '#FDEDEC',
            class: 'text-danger',
            position: 'topRight',
            message: 'Tipo de Archivo Erroneo, El Archivo Debe de Ser una Imangen'
          });

          $('#input-portada').text('Seleccionar imagen');
          this.imgselect = 'assets/img/01.jpg';
          this.file = undefined;
        }

      }else{
        iziToast.show({

          title: 'ERROR',
          titleColor: '#F1948A',
          color: '#FDEDEC',
          class: 'text-danger',
          position: 'topRight',
          message: 'La Imangen NO Puede Superar los 4MB'
        });

        $('#input-portada').text('Seleccionar imagen');
        this.imgselect = 'assets/img/01.jpg';
        this.file = undefined;
      }

      console.log(this.file);
}


}
