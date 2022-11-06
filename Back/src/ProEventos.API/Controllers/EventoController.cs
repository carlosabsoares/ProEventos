using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProEventos.API.Model;
using System;
using System.Collections;

namespace ProEventos.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventoController : ControllerBase
    {

        public EventoController()
        {

        }

        [HttpGet]
        public Evento Get()
        {
            return new Evento(){
                EventoId = 1,
                Tema= "Angular 11 e .NET",
                Local = "1º lote",
                QtPessoas = 250,
                DataEvento = DateTime.Now.AddDays(2).ToString(),
                Lote = "1º lote",
                ImgEvento = "Foto.png"

            };
        }

    }
}
