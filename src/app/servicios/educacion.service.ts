import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Educacion } from '../modelos/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  private apiServerUrl=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public obtenerEducacion():Observable<Educacion[]>{
    return this.http.get<Educacion[]>(`${this.apiServerUrl}/educacion/obtener`);
  }

  public agregarEducacion(educacion : Educacion):Observable<Educacion>{
    return this.http.post<Educacion>(`${this.apiServerUrl}/educacion/agregar`,educacion);
  }

  public actualizarEducacion(educacion : Educacion):Observable<Educacion>{
    return this.http.put<Educacion>(`${this.apiServerUrl}/educacion/actualizar`,educacion);
  }

  public eliminarEducacion(educacionId : number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/educacion/eliminar/${educacionId}`);
  }

}
