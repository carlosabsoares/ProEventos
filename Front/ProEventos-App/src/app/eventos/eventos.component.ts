import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from '../models/Evento';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  modalRef!: BsModalRef;

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

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
    ) { }

  public ngOnInit(): void {
    this.getEventos();
    this.spinner.show();
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
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao carregar elementos','Deletado!')
        },
        complete: () => this.spinner.hide()
      });
  }

  public openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: "modal-sm"})
  }

  public confirm(): void{
    this.modalRef.hide();
    this.toastr.success('O Evento foi deletado com sucesso.','Deletado!')
  }

  public decline(): void{
    this.modalRef.hide();
  }

}
