import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experiencia } from '../modelos/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  private apiServerUrl=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public obtenerExperiencia():Observable<Experiencia[]>{
    return this.http.get<Experiencia[]>(`${this.apiServerUrl}/experiencia/obtener`);
  }

  public agregarExperiencia(experiencia : Experiencia):Observable<Experiencia>{
    return this.http.post<Experiencia>(`${this.apiServerUrl}/experiencia/agregar`,experiencia);
  }

  public actualizarExperiencia(experiencia : Experiencia):Observable<Experiencia>{
    return this.http.put<Experiencia>(`${this.apiServerUrl}/experiencia/actualizar`,experiencia);
  }

  public eliminarExperiencia(experienciaId : number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/experiencia/eliminar/${experienciaId}`);
  }
}
