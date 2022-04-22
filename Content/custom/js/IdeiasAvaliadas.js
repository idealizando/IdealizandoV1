$(document).ready(function () {

    let urlAtual = window.location.href;
    if (urlAtual.includes($URL_PRINCIPAL + 'Avaliacao')) {

        CarregaInfoCardsIdeiasAvaliadas();
        CarregaInfoCardsIdeiasAvaliadasFeedback();

        $('.btn-auxiliar-grafico').on("click", function () {
            CarregaInfoCardsIdeiasAvaliadasFeedbackByIdIdeia()
        });

        let ItensCarrocel = document.querySelector('.carrocel-comentarios-itens');
        if (ItensCarrocel != null) {
            new Glider(ItensCarrocel, {
                slidesToShow: 1,
                slidesToScroll: 1,
                draggable: true,
                arrows: {
                    prev: '.glider-prev',
                    next: '.glider-next'
                }
            });
        }
    }

});

function CarregaInfoCardsIdeiasAvaliadas() {
    Loading.start();
    let ObjTotais = '{';
    ObjTotais += '"AVALIACAOENUM":"AVALIADOR"';
    ObjTotais += '}';

    $.ajax(
        {
            type: 'POST',
            url: $URL_PRINCIPAL + 'Avaliacao/BuscarInfoCardsIdeiasAvaliadas',
            data: ObjTotais,
            async: true,
            contentType: "application/json; charset=utf-8",
            datatype: 'json',
            beforeSend: function (xhr) {

            },
            success: function (data) {
                Loading.done();
                let index = 0;
                while (index < data.length)
                {
                    if ($('#graph_bar_' + data[index].ID).length) {
                        Morris.Bar({
                            element: 'graph_bar_' + data[index].ID,
                            data: [
                                { device: data[index].LETRA, geekbench: data[index].PONTUACAO / 5 },
                                { device: data[index + 1].LETRA, geekbench: data[index + 1].PONTUACAO / 5},
                                { device: data[index + 2].LETRA, geekbench: data[index + 2].PONTUACAO / 5 },
                                { device: data[index + 3].LETRA, geekbench: data[index + 3].PONTUACAO / 5 },
                                { device: data[index + 4].LETRA, geekbench: data[index + 4].PONTUACAO / 5 }
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
                            resize: true
                        });

                    }
                    index = index + 5;
                }
            },
            error: function () {
                Loading.done();
                Messages('error');
            }
        });
}

function CarregaInfoCardsIdeiasAvaliadasFeedback() {
    Loading.start();
    let ObjTotais = '{';    
    ObjTotais += '"AVALIACAOENUM":"FEEDBACK"';    
    ObjTotais += '}';    

    $.ajax(
        {
            type: 'POST',
            url: $URL_PRINCIPAL + 'Avaliacao/BuscarInfoCardsIdeiasAvaliadas',
            data: ObjTotais,
            async: true,
            contentType: "application/json; charset=utf-8",
            datatype: 'json',
            beforeSend: function (xhr) {

            },
            success: function (data) {
                Loading.done();
                let index = 0;
                while (index < data.length) {

                    let quantidadeFeedbacks = $('#id_quantidade_feedbacks_' + data[index].ID).html();

                    if ($('#graph_bar_feedback_' + data[index].ID).length) {

                        Morris.Bar({
                            element: 'graph_bar_feedback_' + data[index].ID,
                            data: [
                                { device: data[index].LETRA, geekbench:     (data[index].PONTUACAO / (parseInt(quantidadeFeedbacks) * 5)).toFixed(2)},
                                { device: data[index + 1].LETRA, geekbench: (data[index + 1].PONTUACAO / (parseInt(quantidadeFeedbacks) * 5)).toFixed(2)},
                                { device: data[index + 2].LETRA, geekbench: (data[index + 2].PONTUACAO / (parseInt(quantidadeFeedbacks) * 5)).toFixed(2)},
                                { device: data[index + 3].LETRA, geekbench: (data[index + 3].PONTUACAO / (parseInt(quantidadeFeedbacks) * 5)).toFixed(2)},
                                { device: data[index + 4].LETRA, geekbench: (data[index + 4].PONTUACAO / (parseInt(quantidadeFeedbacks) * 5)).toFixed(2)}
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
                            resize: true
                        });

                    }
                    index = index + 5;
                }
            },
            error: function () {
                Loading.done();
                Messages('error');
            }
        });
}

function CarregaInfoCardsIdeiasAvaliadasFeedbackByIdIdeia() {
    Loading.start();
    let idIdeia = $('.btn-auxiliar-grafico').val();

    let ObjTotais = '{';
    ObjTotais += '"AVALIACAOENUM":"FEEDBACK",';
    ObjTotais += '"IDIDEIA":"' + idIdeia + '"';
    ObjTotais += '}';

    $.ajax(
        {
            type: 'POST',
            url: $URL_PRINCIPAL + 'Avaliacao/BuscarInfoCardsIdeiasAvaliadas',
            data: ObjTotais,
            async: true,
            contentType: "application/json; charset=utf-8",
            datatype: 'json',
            beforeSend: function (xhr) {

            },
            success: function (data) {
                Loading.done();
                let index = 0;
                while (index < data.length) {

                    let quantidadeFeedbacks = $('#qntFeedbacksRecebidos').html();

                    if ($('#graph_bar_feedback_ideia_' + data[index].ID).length) {

                        Morris.Bar({
                            element: 'graph_bar_feedback_ideia_' + data[index].ID,
                            data: [
                                { device: data[index].LETRA, geekbench: (data[index].PONTUACAO / (parseInt(quantidadeFeedbacks) * 5)).toFixed(2)},
                                { device: data[index + 1].LETRA, geekbench: (data[index + 1].PONTUACAO / (parseInt(quantidadeFeedbacks) * 5)).toFixed(2) },
                                { device: data[index + 2].LETRA, geekbench: (data[index + 2].PONTUACAO / (parseInt(quantidadeFeedbacks) * 5)).toFixed(2)},
                                { device: data[index + 3].LETRA, geekbench: (data[index + 3].PONTUACAO / (parseInt(quantidadeFeedbacks) * 5)).toFixed(2)},
                                { device: data[index + 4].LETRA, geekbench: (data[index + 4].PONTUACAO / (parseInt(quantidadeFeedbacks) * 5)).toFixed(2)}
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
                            resize: true
                        });

                    }
                    index = index + 5;
                }
            },
            error: function () {
                Loading.done();
                Messages('error');
            }
        });
}

$('.btn-modal-observacao').on("click", function () {
    $('.observacao_avaliador').val('');

    let idUsuarioAvaliador = $(this).attr("data-idusuarioavaliador");

    comentariosAvaliacao.forEach(function (comentarios) {
        if (comentarios.ID_USUARIO_AVALIADOR == idUsuarioAvaliador) {
            $('.observacao_avaliador').val(comentarios.OBSERVACAO);
        }
    });
});