import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  /** El Decorador @ViewChild sirve para buscar un elemento HTML en el template, ya sea por su etiqueta, o por alguno de sus atributos (ya sea el atributo type, class, id, o cualquier otro). En este ejemplo, usaremos la refencia local declarada en el HTML
   * ! -> non-null assertion operator: Sirve para indicar que un operador no será nunca nulo, e indicar a JS/TS que confíe en él.
  */
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;


  /* Ahora, inyectamos el servicio... */

constructor(private gifsService: GifsService){}


/*   buscar( termino: string ){ */
  buscar(){

    const valor = this.txtBuscar.nativeElement.value;

    if(valor.trim().length === 0){
      return;
    }

    this.gifsService.buscarGifs(valor);

    this.txtBuscar.nativeElement.value = '';

  }

}
