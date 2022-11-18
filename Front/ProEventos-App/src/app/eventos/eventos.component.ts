import { Component, OnInit } from '@angular/core';
import { Evento } from '../models/Evento';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: Evento[] = [];
  public eventosFiltred: Evento[] = [];

  public widthImg = 50;
  public marginImg = 2;
  public showImage = true;
  private _listFilter = '';

  public findEventos(findFor: string): Evento[]{
    findFor = findFor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: any) => evento.tema.toLocaleLowerCase().indexOf(findFor) !== -1 ||
                       evento.local.toLocaleLowerCase().indexOf(findFor) !== -1
    )
  };

  public get listFilter(){
    return this._listFilter;
  }

  public set listFilter(value: string){
    this._listFilter = value;
    this.eventosFiltred = this.listFilter ? this.findEventos(this.listFilter): this.eventos;
  }

  constructor(private eventoService: EventoService) { }

  public ngOnInit(): void {
    this.getEventos();
  }

  public alterImage(): void{
    this.showImage = !this.showImage
  }

  public getEventos(): void{
    this.eventoService.getEventos().subscribe(
      {
        next: (_eventos: Evento[]) =>{
          this.eventos = _eventos;
          this.eventosFiltred = this.eventos
        },
        error: (error: any) => console.log(error)
      });
  }


}
