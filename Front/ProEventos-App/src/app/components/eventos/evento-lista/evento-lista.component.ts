import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from '@app/models/Evento';
import { EventoService } from '@app/services/evento.service';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent implements OnInit {

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
    private spinner: NgxSpinnerService,
    private router: Router
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

  detalheEvento(id: number): void{
    this.router.navigate([`eventos/detalhe/${id}`]);
  }
}
