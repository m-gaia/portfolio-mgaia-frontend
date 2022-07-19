import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelos/usuario';
import { EncabezadoService } from 'src/app/servicios/encabezado.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  public usuario : Usuario | undefined;
  public actualizarUsuario : Usuario | undefined;

  constructor(private encabezadoService : EncabezadoService) { }

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  public obtenerUsuario():void {
    this.encabezadoService.obtenerUsuario().subscribe({
      next: (response: Usuario) => {
        this.usuario=response;
      },
      error:(error:HttpErrorResponse) => {
        alert(error.message);
      }
      })
  }

  public onOpenModal (mode:String, usuario?: Usuario):void {
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type = 'button';
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal');

    if (mode==='actualizar') {
      this.actualizarUsuario=usuario;
    button.setAttribute('data-target', '#actualizarUsuarioModal');}
    
    container?.appendChild(button);
    button.click();
  }

  public onUpdateUsuario(usuario: Usuario) {
    this.actualizarUsuario=usuario;
    document.getElementById('add-header-form')?.click();
    this.encabezadoService.actualizarUsuario(usuario).subscribe ({
    next: (response:Usuario) => {
      console.log(response);
      this.obtenerUsuario();
    },
    error:(error:HttpErrorResponse) => {
      alert(error.message);
    }
  })
  }

}
