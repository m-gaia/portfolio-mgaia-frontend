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
  public editUsuario : Usuario | undefined;

  constructor(private encabezadoService : EncabezadoService) { }

  ngOnInit(): void {
    this.traerUsuario();
  }

  public traerUsuario():void {
    this.encabezadoService.traerUsuario().subscribe({
      next: (response: Usuario) => {
        this.usuario=response;
      },
      error:(error:HttpErrorResponse) => {
        alert(error.message);
      }
      })
  }

}
