import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Habilidades } from 'src/app/modelos/habilidades';
import { HabilidadesService } from 'src/app/servicios/habilidades.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  public habilidades:Habilidades[]=[];
  public actualizarHabilidades:Habilidades | undefined;
  public eliminarHabilidades:Habilidades | undefined;
  
  constructor(private habilidadesService:HabilidadesService) { }

  ngOnInit(): void {
    this.obtenerHabilidad();  
  }

  public obtenerHabilidad():void {
    this.habilidadesService.obtenerHabilidad().subscribe({
      next: (Response: Habilidades[]) => {
        this.habilidades=Response;
      },
      error:(error:HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onOpenModal (mode:String, habilidad?: Habilidades):void {
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type = 'button';
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal');

    if (mode==='agregar') {
      button.setAttribute('data-target', '#agregarHabilidadModal');
    } else if (mode==='eliminar') {
      this.eliminarHabilidades=habilidad;
      button.setAttribute('data-target', '#eliminarHabilidadModal');
    } else if (mode==='actualizar') {
      this.actualizarHabilidades=habilidad;
      button.setAttribute('data-target', '#actualizarHabilidadModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddHabilidad(addForm: NgForm) {
    document.getElementById('add-skill-form')?.click();
    this.habilidadesService.agregarHabilidad(addForm.value).subscribe ({
    next: (response:Habilidades) => {
      console.log(response);
      this.obtenerHabilidad();
      addForm.reset();
    },
    error:(error:HttpErrorResponse) => {
      alert(error.message);
      addForm.reset();
    }
    })
  }

  public onUpdateHabilidad(habilidad: Habilidades) {
    this.actualizarHabilidades=habilidad;
    document.getElementById('add-skill-form')?.click();
    this.habilidadesService.actualizarHabilidad(habilidad).subscribe ({
    next: (response:Habilidades) => {
      console.log(response);
      this.obtenerHabilidad();
    },
    error:(error:HttpErrorResponse) => {
      alert(error.message);
    }
  })
  }

  public onDeleteHabilidad(idHab: number): void {
    this.habilidadesService.eliminarHabilidad(idHab).subscribe ({
    next: (response:void) => {
      console.log(response);
      this.obtenerHabilidad();
    },
    error:(error:HttpErrorResponse) => {
      alert(error.message);
    }
  })
  }

}
