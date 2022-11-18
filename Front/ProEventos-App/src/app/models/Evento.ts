import { Lote } from "./Lote";
import { PalestranteEventos } from "./PalestranteEventos";
import { RedeSocial } from "./RedeSocial";

export interface Evento {
     id: number;
     local: string;
     dataEvento?: Date ;
     tema: string
     qtPessoas: number;
     lote: string;
     imgEvento: string;
     telefone: string;
     email: string;
     lotes: Lote[],
     redesSociais: RedeSocial[],
     palestranteEventos: PalestranteEventos[];
}
