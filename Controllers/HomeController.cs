using System;
using System.Collections.Generic;
using System.Web.Mvc;
using WebApp.Enum;
using WebApp.Models;

namespace WebApp.Controllers
{
    public class HomeController : BaseController
    {
        [HttpGet]
        public ActionResult Index()
        {
            StartController("HomeController", "Index");

            if (!Autorized())
                return RedirectToAction("Index", "Login");

            ViewBag.IsHome = "active";
            ViewBag.QntCards = BuscarQuantidadeCards();

            AvaliacaoEnum avaliacaoEnum = AvaliacaoEnum.FEEDBACK;
            ViewBag.InfoCards = BuscarInfoCardsIdeiasAvaliadas(avaliacaoEnum);
            ViewBag.MediaPontuacaoFeedbacks = new AvaliacaoController().BuscarMediaPontuacaoIdeiasAvaliadasComQuantidadeFeedback(avaliacaoEnum, HttpContext.Session["Id"].ToString());

            EndController("HomeController", "Index");

            return View();
        }

        [HttpPost]
        public JsonResult GetTotais()
        {
            var ideia = new Ideia().GetTotaisIdeia(HttpContext.Session["Id"].ToString(), HttpContext.Session["Email"].ToString());
            return Json(ideia, JsonRequestBehavior.AllowGet);
        }

        public int BuscarQuantidadeCards()
        {
            return new Ideia().BuscarQntdCards(HttpContext.Session["Id"].ToString());
        }

        [HttpPost]
        public JsonResult BuscarInfoCardsIdeiasAvaliadas(AvaliacaoEnum avaliacaoEnum, string idIdeia = "0")
        {
            return Json(new Ideia().BuscarInfoCardsIdeiasAvaliadas(HttpContext.Session["Id"].ToString(), avaliacaoEnum, idIdeia), JsonRequestBehavior.AllowGet);
        }

    }
}