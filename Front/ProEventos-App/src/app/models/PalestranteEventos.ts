import { Evento } from "./Evento";
import { Palestrante } from "./Palestrante";

export interface PalestranteEventos {
    palestranteId: number;
    eventoId: number;
    evento: Evento[];
    palestrante: Palestrante[];
}
