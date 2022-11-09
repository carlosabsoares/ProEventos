import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: any = [];
  public eventosFiltred: any = [];
  widthImg: number = 50;
  marginImg: number = 2;
  showImage: boolean = true;
  private _listFilter: string = '';

  findEventos(findFor: string): any{
    findFor = findFor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: any) => evento.tema.toLocaleLowerCase().indexOf(findFor) !== -1
    )
  };

  public get listFilter(){
    return this._listFilter;
  }

  public set listFilter(value: string){
    this._listFilter = value;
    this.eventosFiltred = this.listFilter ? this.findEventos(this.listFilter): this.eventos;
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEventos();
  }

  alterImage(){
    this.showImage = !this.showImage
  }

  public getEventos(): void{
    this.http.get('https://localhost:5001/api/Eventos').subscribe(
    response =>{
      this.eventos = response;
      this.eventosFiltred = this.eventos
    } ,
    error=> console.log(error)
    );
  }


}
