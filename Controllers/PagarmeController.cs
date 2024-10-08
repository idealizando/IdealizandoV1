﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Mvc;

namespace WebApp.Controllers
{
    public class PagarmeController : Controller
    {
        // GET: Pagarme
        public JsonResult Index()
        {
            var url = "https://api.pagar.me/1/transactions";

            var httpRequest = (HttpWebRequest)WebRequest.Create(url);
            httpRequest.Method = "POST";
            httpRequest.ContentType = "application/json";


            //httpRequest.Headers["content-type"] = "application/json";

            var data = @"{
                ""api_key"": ""ak_test_vjZTZerrMUQn2OTJ22IfI6ghsuZnuM"",
                ""capture"": ""false"", 
                ""amount"": 21000,
                ""card_number"": ""4111111111111111"",
                ""card_cvv"": ""123"",
                ""card_expiration_date"": ""0922"",
                ""card_holder_name"": ""Morpheus Fishburne"",
                ""customer"": {
                  ""external_id"": ""#3311"",
                  ""name"": ""Morpheus Fishburne"",
                  ""type"": ""individual"",
                  ""country"": ""br"",
                  ""email"": ""mopheus@nabucodonozor.com"",
                  ""documents"": [
                    {
                      ""type"": ""cpf"",
                      ""number"": ""17138618794""
                    }
                  ],
                  ""phone_numbers"": [""+5511999998888"", ""+5511888889999""],
                  ""birthday"": ""1965-01-01""
                },
                ""billing"": {
                  ""name"": ""Trinity Moss"",
                  ""address"": {
                    ""country"": ""br"",
                    ""state"": ""sp"",
                    ""city"": ""Cotia"",
                    ""neighborhood"": ""Rio Cotia"",
                    ""street"": ""Rua Matrix"",
                    ""street_number"": ""9999"",
                    ""zipcode"": ""06714360""
                  }
                },
                ""shipping"": {
                  ""name"": ""Neo Reeves"",
                  ""fee"": 1000,
                  ""delivery_date"": ""2000-12-21"",
                  ""expedited"": true,
                  ""address"": {
                    ""country"": ""br"",
                    ""state"": ""sp"",
                    ""city"": ""Cotia"",
                    ""neighborhood"": ""Rio Cotia"",
                    ""street"": ""Rua Matrix"",
                    ""street_number"": ""9999"",
                    ""zipcode"": ""06714360""
                  }
                },
                ""items"": [
                  {
                    ""id"": ""r123"",
                    ""title"": ""Red pill"",
                    ""unit_price"": 10000,
                    ""quantity"": 1,
                    ""tangible"": true
                  },
                  {
                    ""id"": ""b123"",
                    ""title"": ""Blue pill"",
                    ""unit_price"": 10000,
                    ""quantity"": 1,
                    ""tangible"": true
                  }
                ]
            }";

            using (var streamWriter = new StreamWriter(httpRequest.GetRequestStream()))
            {
                streamWriter.Write(data);
            }

            var httpResponse = httpRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                var result = streamReader.ReadToEnd();
            }


            return Json(httpResponse, JsonRequestBehavior.AllowGet);
        }
    }
}