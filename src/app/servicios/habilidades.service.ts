import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Habilidades } from '../modelos/habilidades';

@Injectable({
  providedIn: 'root'
})

export class HabilidadesService {
  private apiServerUrl=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public obtenerHabilidad():Observable<Habilidades[]>{
    return this.http.get<Habilidades[]>(`${this.apiServerUrl}/habilidades/obtener`);
  }

  public agregarHabilidad(habilidad : Habilidades):Observable<Habilidades>{
    return this.http.post<Habilidades>(`${this.apiServerUrl}/habilidades/agregar`,habilidad);
  }

  public actualizarHabilidad(habilidad : Habilidades):Observable<Habilidades>{
    return this.http.put<Habilidades>(`${this.apiServerUrl}/habilidades/actualizar`,habilidad);
  }

  public eliminarHabilidad(habilidadId : number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/habilidades/eliminar/${habilidadId}`);
  }

}
