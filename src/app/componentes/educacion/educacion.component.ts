import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Educacion } from 'src/app/modelos/educacion';
import { EducacionService } from 'src/app/servicios/educacion.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  public educaciones:Educacion[]=[];
  public actualizarEducacion:Educacion | undefined;
  public eliminarEducacion:Educacion | undefined;
  
  constructor(private educacionService:EducacionService) { }

  ngOnInit(): void {
    this.obtenerEducaciones();  
  }

  public obtenerEducaciones():void {
    this.educacionService.obtenerEducacion().subscribe({
      next: (Response: Educacion[]) => {
        this.educaciones=Response;
      },
      error:(error:HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onOpenModal (mode:String, educacion?: Educacion):void {
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type = 'button';
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal');

    if (mode==='agregar') {
      button.setAttribute('data-target', '#agregarEducacionModal');
    } else if (mode==='eliminar') {
      this.eliminarEducacion=educacion;
      button.setAttribute('data-target', '#eliminarEducacionModal');
    } else if (mode==='actualizar') {
      this.actualizarEducacion=educacion;
      button.setAttribute('data-target', '#actualizarEducacionModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddEducacion(addForm: NgForm) {
    document.getElementById('add-education-form')?.click();
    this.educacionService.agregarEducacion(addForm.value).subscribe ({
    next: (response:Educacion) => {
      console.log(response);
      this.obtenerEducaciones();
      addForm.reset();
    },
    error:(error:HttpErrorResponse) => {
      alert(error.message);
      addForm.reset();
    }
    })
  }

  public onUpdateEducacion(educacion: Educacion) {
    this.actualizarEducacion=educacion;
    document.getElementById('add-education-form')?.click();
    this.educacionService.actualizarEducacion(educacion).subscribe ({
    next: (response:Educacion) => {
      console.log(response);
      this.obtenerEducaciones();
    },
    error:(error:HttpErrorResponse) => {
      alert(error.message);
    }
  })
  }

  public onDeleteEducacion(idEdu: number): void {
    this.educacionService.eliminarEducacion(idEdu).subscribe ({
    next: (response:void) => {
      console.log(response);
      this.obtenerEducaciones();
    },
    error:(error:HttpErrorResponse) => {
      alert(error.message);
    }
  })
  }


}
