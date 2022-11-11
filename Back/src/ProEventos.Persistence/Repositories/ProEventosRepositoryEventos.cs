using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProEventos.Persistence.Repositories
{
    public class ProEventosRepositoryEventos : ProEventosRepository, IProEventosRepositoryEvento
    {
        private readonly ProEventosContext _context;

        public ProEventosRepositoryEventos(ProEventosContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Evento> GetAllEventoByIdAsync(int eventoId, bool includePalestrantes = false)
        {

            IQueryable<Evento> query = _context.Eventos
                                               .Include(e => e.Lotes)
                                               .Include(e => e.RedesSociais);

            if (includePalestrantes)
            {
                query = query.Include(e => e.PalestranteEventos)
                             .ThenInclude(pe => pe.Palestrante);
            }

            query = query.OrderBy(e => e.Id)
                         .Where(e => e.Id.Equals(eventoId));

            return await query.FirstOrDefaultAsync();

        }
        public async Task<Evento[]> GetAllEventosAsync(bool includePalestrantes = false)
        {
            IQueryable<Evento> query = _context.Eventos
                                               .Include(e => e.Lotes)
                                               .Include(e => e.RedesSociais);

            if (includePalestrantes)
            {
                query = query.Include(e => e.PalestranteEventos)
                             .ThenInclude(pe => pe.Palestrante);
            }

            return await query.ToArrayAsync();

        }

        public async Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false)
        {
            IQueryable<Evento> query = _context.Eventos
                                               .Include(e => e.Lotes)
                                               .Include(e => e.RedesSociais);

            if (includePalestrantes)
            {
                query = query.Include(e => e.PalestranteEventos)
                             .ThenInclude(pe => pe.Palestrante);
            }

            query = query.OrderBy(e => e.Id)
                         .Where(e => e.Tema.ToLower().Contains(tema.ToLower()));

            return await query.ToArrayAsync();
        }
    }

}
