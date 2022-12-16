import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {


  private _apiKey: string = "oPoGZ9R0yFEZrvi8XM6Ce7gZqKywYC8U";

  private _servicioUrl: string = "http://api.giphy.com/v1/gifs";

  private _historial: string[] = [];

  //TODO: Cambiar any por su tipo correspondiente.
  public resultados: Gif[] = [];

  private _reciente:string = '';

  /* Recuerda que JS/TS solo devuelve valores o información por referencia. Para romper esa relación, utilizabamos la sintaxis:
  return [...this.valor]
  para que el sistema cree una "copia" del valor referenciado y lo envie por valor. */
  get historial(){
    return [...this._historial];
  }
  /* Para hacer peticiones HTTP, Angular ofrece una serie de bibliotecas y módulos. En este caso, usaremos el módulo HttpClient, localizado en @angular/common/http */
  constructor(private http: HttpClient) {
    /* Ya que el constructor del servicio solo se ejecuta una única vez durante el ciclo de vida de nuestra aplicación, es el lugar idoneo para rescatar información de el Local Storage de nuestro navegador. */

    //localStorage.getItem('historial');
    /* if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    } */

    /* this._reciente = this._historial[0];
    this.cargarUltimo(this._reciente); */


    //otra forma de escribirlo:
    /* Usando el operador || para que, o devuelva lo que deseamos, o devuelva vacio. */
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    //Ejercicio: Almacenarmos en local el último resultado y lo mostramos en pantalla al iniciar.
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

  }

  buscarGifs( query: string = ''){
    /* unshift introduce un nuevo elemento en un array al comienzo de este, en vez de al final. */

    query = query.trim().toLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      /* Para almacenar información en el navegador local de nuestros clientes, para, por poner un ejemplo, tener un historia de búsqueda persistente durante cierto tiempo, utilizaremos un objeto nativo de JS llamado localStorage, el cual tiene sus propias propiedades. */

      localStorage.setItem('historial', JSON.stringify(this._historial));

    }

    /* Para acceder a un enlace en JS, podemos usar la función de JS fetch */
    /* fetch('http://api.giphy.com/v1/gifs/search?api_key=oPoGZ9R0yFEZrvi8XM6Ce7gZqKywYC8U&q=Dragon Ball Z&limit=10').then(resp =>{
      resp.json().then(data => {console.log(data);})
    }) */

    /* Para poder, de alguna manera, parametrizar los argumentos enviados a una petición HTTP, Angular incluye un tipo de objeto que puede encargarse de ello:  HttpParams */

    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('q', query)
      .set('limit', '10');

    /* Una vez importado el servicio HttpClient, podemos ejecutar una función GET apuntando a una URL, que nos permitirá subscribirnos a ella, lo cual crea un Promise, o promesa. Si, de eso que muchas veces te ha hablado David XDDDDD. Esto es lo que se conoce como un "Observable" en ingles. Los observables son propios de RX-JS*/
    this.http.get<SearchGifsResponse>(`${this._servicioUrl}/search`, {params})
    .subscribe( (resp) =>{
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    });

  }

  /* cargarUltimo(query: string=''){
    this.http.get<SearchGifsResponse>(`http://api.giphy.com/v1/gifs/search?api_key=oPoGZ9R0yFEZrvi8XM6Ce7gZqKywYC8U&q=${query}&limit=10`)
    .subscribe( (resp) =>{
      console.log(resp.data);
      this.resultados = resp.data;
    });
  } */

}
