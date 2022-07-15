import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proyectos } from 'src/app/modelos/proyectos';
import { ProyectosService } from 'src/app/servicios/proyectos.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})

export class ProyectosComponent implements OnInit {

  public proyectos:Proyectos[]=[];
  public actualizarProyectos:Proyectos | undefined;
  public eliminarProyectos:Proyectos | undefined;
  
  constructor(private proyectosService:ProyectosService) { }

  ngOnInit(): void {
    this.obtenerProyecto();  
  }

  public obtenerProyecto():void {
    this.proyectosService.obtenerProyecto().subscribe({
      next: (Response: Proyectos[]) => {
        this.proyectos=Response;
      },
      error:(error:HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onOpenModal (mode:String, proyecto?: Proyectos):void {
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type = 'button';
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal');

    if (mode==='agregar') {
      button.setAttribute('data-target', '#agregarProyectoModal');
    } else if (mode==='eliminar') {
      this.eliminarProyectos=proyecto;
      button.setAttribute('data-target', '#eliminarProyectoModal');
    } else if (mode==='actualizar') {
      this.actualizarProyectos=proyecto;
      button.setAttribute('data-target', '#actualizarProyectoModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddProyecto(addForm: NgForm) {
    document.getElementById('add-project-form')?.click();
    this.proyectosService.agregarProyecto(addForm.value).subscribe ({
    next: (response:Proyectos) => {
      console.log(response);
      this.obtenerProyecto();
      addForm.reset();
    },
    error:(error:HttpErrorResponse) => {
      alert(error.message);
      addForm.reset();
    }
    })
  }

  public onUpdateProyecto(proyecto: Proyectos) {
    this.actualizarProyectos=proyecto;
    document.getElementById('add-project-form')?.click();
    this.proyectosService.actualizarProyecto(proyecto).subscribe ({
    next: (response:Proyectos) => {
      console.log(response);
      this.obtenerProyecto();
    },
    error:(error:HttpErrorResponse) => {
      alert(error.message);
    }
  })
  }

  public onDeleteProyecto(idProy: number): void {
    this.proyectosService.eliminarProyecto(idProy).subscribe ({
    next: (response:void) => {
      console.log(response);
      this.obtenerProyecto();
    },
    error:(error:HttpErrorResponse) => {
      alert(error.message);
    }
  })
  }

}
