import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proyectos } from '../modelos/proyectos';

@Injectable({
  providedIn: 'root'
})

export class ProyectosService {
  private apiServerUrl=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public obtenerProyecto():Observable<Proyectos[]>{
    return this.http.get<Proyectos[]>(`${this.apiServerUrl}/proyectos/obtener`);
  }

  public agregarProyecto(proyecto : Proyectos):Observable<Proyectos>{
    return this.http.post<Proyectos>(`${this.apiServerUrl}/proyectos/agregar`,proyecto);
  }

  public actualizarProyecto(proyecto : Proyectos):Observable<Proyectos>{
    return this.http.put<Proyectos>(`${this.apiServerUrl}/proyectos/actualizar`,proyecto);
  }

  public eliminarProyecto(proyectoId : number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/proyectos/eliminar/${proyectoId}`);
  }

}
