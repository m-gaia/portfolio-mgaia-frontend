import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { FormsModule } from '@angular/forms';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { HabilidadesComponent } from './componentes/habilidades/habilidades.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FooterComponent } from './componentes/footer/footer.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    EducacionComponent,
    ExperienciaComponent,
    HabilidadesComponent,
    ProyectosComponent,
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgCircleProgressModule.forRoot({
      "radius": 100,
      "space": -10,
      "outerStrokeWidth": 5,
     // "outerStrokeColor": "#76C2AF",
      //"innerStrokeColor": "#ffffff",
      "innerStrokeWidth": 5,
      //"imageSrc": "assets/images/music.svg",
      "imageHeight": 100,
      "imageWidth": 100,
      "showImage": true,
      "outerStrokeGradient": true,
      "outerStrokeColor": "#47c28d",
      "outerStrokeGradientStopColor": "#53a9ff",
      "innerStrokeColor": "#e7e8ea",
      "title": "UI",
      "animateTitle": false,
      "animationDuration": 1000,
      "showUnits": false,
      "showBackground": false,
      "clockwise": false,
      "startFromZero": false,
      "lazy": true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
