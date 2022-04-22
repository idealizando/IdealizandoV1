$(document).ready(function () {

    let urlAtual = window.location.href;
    if (urlAtual.includes($URL_PRINCIPAL + 'Home')) {

        CarregaTotais();
        CarregaInfoCards();

        $('#menu-dashboard').attr('style', 'color:#FFF !important;');

    }
});

function CarregaTotais() {
    Loading.start();

    let ObjTotais = '{';
    let now = new Date().getDay() + '/' + new Date().getMonth() + '/' + new Date().getFullYear();
    //ObjTotais += '"datainicio":"' + now + '",';
    //ObjTotais += '"datafim":"' + now + '"';
    ObjTotais += '}';
    $.ajax(
        {
            type: 'POST',
            url: $URL_PRINCIPAL + 'Home/GetTotais',
            data: ObjTotais,
            async: true,
            contentType: "application/json; charset=utf-8",
            datatype: 'json',
            beforeSend: function (xhr) {

            },
            success: function (data) {
                Loading.done();
                $.each(data, function (index, value) {

                    if (value.TIPO === "LABORATORIO") {

                        $('#qntIdeiasLaboratorio').html(value.VALOR);
                        if (value.VALOR == 1) {
                            $('#qntIdeiasLaboratorio_texto').html('ideia no laboratório');
                        } else {
                            $('#qntIdeiasLaboratorio_texto').html('ideias no laboratório');
                        }
                    }

                    if (value.TIPO === "PROJETO") {

                        $('#qntIdeiasCadastras').html(value.VALOR);
                        if (value.VALOR == 1) {
                            $('#qntIdeiasCadastras_texto').html('ideia concluída');
                        } else {
                            $('#qntIdeiasCadastras_texto').html('ideias concluídas');
                        }
                    }

                    if (value.TIPO === "FEEDBACKS") {

                        $('#qntFeedbacksCadastras').html(value.VALOR);
                        if (value.VALOR == 1) {
                            $('#qntFeedbacksCadastras_texto').html('feedback recebido');
                        } else {
                            $('#qntFeedbacksCadastras_texto').html('feedbacks recebidos');
                        }
                    }

                });
            },
            error: function () {
                Loading.done();
                Messages('error');
            }
        });
}

function CarregaInfoCards() {
    let ObjTotais = '{';
    ObjTotais += '"AVALIACAOENUM":"FEEDBACK"';
    ObjTotais += '}';    
    $.ajax(
        {
            type: 'POST',
            url: $URL_PRINCIPAL + 'Home/BuscarInfoCardsIdeiasAvaliadas',
            data: ObjTotais,
            async: true,
            contentType: "application/json; charset=utf-8",
            datatype: 'json',
            beforeSend: function (xhr) {

            },
            success: function (data) {
                let index = 0;
                while (index < data.length)
                {
                    let quantidadeFeedbacks = $('#id_quantidade_feedbacks_' + data[index].ID).html();

                    if ($('#graph_bar_home_' + data[index].ID).length) {
                        Morris.Bar({
                            element: 'graph_bar_home_' + data[index].ID,
                            data: [
                                {
                                    device: data[index].LETRA,
                                    geekbench: (data[index].PONTUACAO / (parseInt(quantidadeFeedbacks) * 5)).toFixed(2),
                                    legenda: 'I. Inovação e Competitividade' +
                                        ' - Aqui você vai entender se a sua ideia é boa, inovadora, viável, agrega alor e se as pessoas valorizarão os seus resultados.'
                                },
                                {
                                    device: data[index + 1].LETRA,
                                    geekbench: (data[index + 1].PONTUACAO / (parseInt(quantidadeFeedbacks) * 5)).toFixed(2),
                                    legenda: 'D - Dores e desejos' +
                                        ' - Aqui você vai entender os problemas que a sua ideia soluciona, a facilidade de como ela atende as dores e desejos do público - alvo, a' +
                                        ' possibilidade de atender de forma mais simples essas necessidades e as ofertas de terceiros'
                                }, 
                                {
                                    device: data[index + 2].LETRA,
                                    geekbench: (data[index + 2].PONTUACAO / (parseInt(quantidadeFeedbacks) * 5)).toFixed(2),
                                    legenda: 'E - Estrutura Estratégica' +
                                        ' - Descreva aqui o caminho que você vai percorrer para conseguir operacionalizar a ideia.Como vai percorrer esse caminho? Quais são os' +
                                        'recursos necessários? Quais as responsabilidades das partes envolvidas? A ideia favorece a cultura da inovação?'
                                }, 
                                {
                                    device: data[index + 3].LETRA,
                                    geekbench: (data[index + 3].PONTUACAO / (parseInt(quantidadeFeedbacks) * 5)).toFixed(2),
                                    legenda: 'A - Alvos desafiantes, específicos e mensuráveis' +
                                        ' - Descreva aqui os resultados que a ideia vai conquistar com a sua implementação, seja específico e utilize referências mensuráveis, como' +
                                        ' por exemplo: aumento de faturamento, aumento da base de clientes, agilidade no tempo de atendimento e etc'
                                }, 
                                {
                                    device: data[index + 4].LETRA,
                                    geekbench: (data[index + 4].PONTUACAO / (parseInt(quantidadeFeedbacks) * 5)).toFixed(2),
                                    legenda: 'L - Legado para o Ecossistema' +
                                        ' Descreva aqui os impactos que a ideia vai deixar como legado, tanto na empresa quanto no seu ecossistema, ao ser implementada por completo'
                                }
                            ],
                            ymax: 10,
                            xkey: 'device',
                            ykeys: ['geekbench'],
                            labels: ['Pontuação'],
                            barRatio: 0.4,
                            barColors: function (row, series, type) {
                                return Grafico.cor(row.y);
                            },                            
                            hideHover: 'auto',
                            hoverCallback: function (index, options, content, row) {
                                var hover = "<div class='morris-hover-row-label'>" + row.legenda + "</div> " +
                                            " <div class='morris-hover-point' > " + 
                                                "<p style='font-size: 20px';> " +
                                                    " Pontuação: " + row.geekbench + 
                                                "</p > " +
                                            "</div > ";
                                return hover;
                            },
                            resize: true
                        });

                    }
                    index = index + 5;
                }
            },
            error: function () {
                Messages('error');
            }
        });
}