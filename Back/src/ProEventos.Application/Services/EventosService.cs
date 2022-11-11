using ProEventos.Application.Interfaces;
using ProEventos.Domain;
using ProEventos.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProEventos.Application.Services
{
    public class EventosService : IEventosService
    {
        private readonly IProEventosRepository _geralProEventoRepository;
        private readonly IProEventosRepositoryEvento _eventoRepository;

        public EventosService(IProEventosRepository geralProEventoRepository, 
                              IProEventosRepositoryEvento eventoRepository)
        {
            _geralProEventoRepository = geralProEventoRepository;
            _eventoRepository = eventoRepository;
        }

        public async Task<Evento> AddEventos(Evento model)
        {
            try
            {
                _geralProEventoRepository.Add<Evento>(model);
                if(await _geralProEventoRepository.SaveChangesAsync())
                {
                    return await _eventoRepository.GetAllEventoByIdAsync(model.Id, false);
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Evento> UpdateEventos(int eventoId, Evento model)
        {
            try
            {
                var evento = await _eventoRepository.GetAllEventoByIdAsync(eventoId, false);

                if(evento == null) return null;

                _geralProEventoRepository.Update<Evento>(model);

                if (await _geralProEventoRepository.SaveChangesAsync())
                {
                    return await _eventoRepository.GetAllEventoByIdAsync(model.Id, false);
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteEventos(int eventoId)
        {
            try
            {
                var evento = await _eventoRepository.GetAllEventoByIdAsync(eventoId, false);

                if (evento == null) throw new Exception($"Evento {eventoId} para delete não localizado");

                _geralProEventoRepository.Delete<Evento>(evento);

                return await _geralProEventoRepository.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Evento> GetAllEventoByIdAsync(int eventoId, bool includePalestrantes = false)
        {
            try
            {
                var evento = await _eventoRepository.GetAllEventoByIdAsync(eventoId, includePalestrantes);
                
                if (evento == null) return null;
                
                return evento;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public async Task<Evento[]> GetAllEventosAsync(bool includePalestrantes = false)
        {
            try
            {
                var evento = await _eventoRepository.GetAllEventosAsync(includePalestrantes);

                if (evento == null) return null;

                return evento;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public async Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false)
        {
            try
            {
                var evento = await _eventoRepository.GetAllEventosByTemaAsync(tema, includePalestrantes);
                
                if (evento == null) return null;
                
                return evento;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }


    }
}
