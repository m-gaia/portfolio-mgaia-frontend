import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Experiencia } from 'src/app/modelos/experiencia';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  public experiencias:Experiencia[]=[];
  public actualizarExperiencia:Experiencia | undefined;
  public eliminarExperiencia:Experiencia | undefined;
  
  constructor(private experienciaService:ExperienciaService) { }

  ngOnInit(): void {
    this.obtenerExperiencias();  
  }

  public obtenerExperiencias():void {
    this.experienciaService.obtenerExperiencia().subscribe({
      next: (Response: Experiencia[]) => {
        this.experiencias=Response;
      },
      error:(error:HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onOpenModal (mode:String, experiencia?: Experiencia):void {
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type = 'button';
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal');

    if (mode==='agregar') {
      button.setAttribute('data-target', '#agregarExperienciaModal');
    } else if (mode==='eliminar') {
      this.eliminarExperiencia=experiencia;
      button.setAttribute('data-target', '#eliminarExperienciaModal');
    } else if (mode==='actualizar') {
      this.actualizarExperiencia=experiencia;
      button.setAttribute('data-target', '#actualizarExperienciaModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddExperiencia(addForm: NgForm) {
    document.getElementById('add-experience-form')?.click();
    this.experienciaService.agregarExperiencia(addForm.value).subscribe ({
    next: (response:Experiencia) => {
      console.log(response);
      this.obtenerExperiencias();
      addForm.reset();
    },
    error:(error:HttpErrorResponse) => {
      alert(error.message);
      addForm.reset();
    }
    })
  }

  public onUpdateExperiencia(experiencia: Experiencia) {
    this.actualizarExperiencia=experiencia;
    document.getElementById('add-experience-form')?.click();
    this.experienciaService.actualizarExperiencia(experiencia).subscribe ({
    next: (response:Experiencia) => {
      console.log(response);
      this.obtenerExperiencias();
    },
    error:(error:HttpErrorResponse) => {
      alert(error.message);
    }
  })
  }

  public onDeleteExperiencia(idEx: number): void {
    this.experienciaService.eliminarExperiencia(idEx).subscribe ({
    next: (response:void) => {
      console.log(response);
      this.obtenerExperiencias();
    },
    error:(error:HttpErrorResponse) => {
      alert(error.message);
    }
  })
  }


}
