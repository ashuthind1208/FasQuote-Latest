





// Waterfall chart

Highcharts.setOptions({
    //blue 		- green 	- red 		- grey	- light red
    colors: ['#263f73', '#91b806', '#b74444', '#656565', '#CD6060']


});


var deno = parseFloat(chart_Bar1) + parseFloat(chart_Discount1);
var disPerc = parseFloat((parseFloat(chart_Discount1) / parseFloat(chart_Bar1)) * 100).toFixed(1);
var timeExlEP = parseFloat((parseFloat(chart_NEP_DCost) / parseFloat(chart_Bar1)) * 100).toFixed(1);
var contri = parseFloat(((parseFloat(deno) - parseFloat(chart_NEP_DCost)) / parseFloat(deno)) * 100).toFixed(1);
var over = parseFloat(((parseFloat(chart_Overhead)) / parseFloat(deno)) * 100).toFixed(1);
var profitsPerc = parseFloat(((parseFloat(deno) - parseFloat(chart_NEP_DCost) - parseFloat(chart_Overhead)) / parseFloat(deno)) * 100).toFixed(1);
var EPComp = parseFloat(((parseFloat(chart_EPDirect)) / parseFloat(deno)) * 100).toFixed(1);
var profitsPercAfterEP = parseFloat(((parseFloat(deno) - parseFloat(chart_EPDirect) - parseFloat(chart_NEP_DCost) - parseFloat(chart_Overhead)) / parseFloat(deno)) * 100).toFixed(1);
var riskPerc = parseFloat(((parseFloat(chart_RiskAmount)) / parseFloat(deno)) * 100).toFixed(1);
var profitsTotal = parseFloat(((parseFloat(deno) - parseFloat(chart_RiskAmount) - parseFloat(chart_EPDirect) - parseFloat(chart_NEP_DCost) - parseFloat(chart_Overhead)) / parseFloat(deno)) * 100).toFixed(1);

var disColor;
if (chart_Discount1 > 0)
    disColor = Highcharts.getOptions().colors[1];
else
    disColor = Highcharts.getOptions().colors[2];


// Waterfall without Kira Cost included

var waterfallChart = new Highcharts.chart('waterFallChartContainer', {
    chart: {
        type: 'waterfall'
    },

    title: {
        text:  ' Profit Summary' + $("#txtMatter").val()
    },

    xAxis: {
        type: 'category'
    },

    yAxis: {
        title: {
            text: '$(000\')'
        }
    },

    legend: {
        enabled: false
    },

    tooltip: {
        pointFormat: '<b>${point.y:,.2f}K</b> CAD'
    },
    credits: {
        enabled: false
    },
    series: [{
        pointWidth: 35,
        data: [
            { name: 'Initial Quote', y: chart_Bar1, color: Highcharts.getOptions().colors[0] },
            { name: 'Premium/Discount', y: chart_Discount1, color: disColor },
            { name: 'Fixed Price', isSum: true, color: Highcharts.getOptions().colors[0] },
            { name: 'Timekeeper Comp. Exl. EP', y: -chart_NEP_DCost, color: Highcharts.getOptions().colors[2] },
            { name: 'Contribution', isSum: true, color: Highcharts.getOptions().colors[0] },
            { name: 'Overhead', y: -chart_Overhead, color: Highcharts.getOptions().colors[2] },
            { name: 'Profits', isSum: true, color: Highcharts.getOptions().colors[0] },
            { name: 'EP Comp.', y: -chart_EPDirect, color: Highcharts.getOptions().colors[2] },
            { name: 'Profits after EP Comp.', isSum: true, color: Highcharts.getOptions().colors[0] }
        ],

        dataLabels: {
            enabled: true,
            formatter: function () {
                return Highcharts.numberFormat(this.y, 0, ',') + '';
            },
            style: {
                fontWeight: 'bold'
            }
        },

        pointPadding: 0
    }]
});

function getwaterfallSVG() {
    var svg = waterfallChart.getSVG({

    })
        .replace(/</g, '\n&lt;') // make it slightly more readable
        .replace(/>/g, '&gt;');

    return svg;
}


//var calcPtrPerc = 0;
//var point1Delta = 0;
//var chart1XAxisLabel = "";
//var chart1TooltipPtr = "";
//var partnerText = "";

//var sensChartYAxisLabel = "";


//getCalculatedEPValues();
//startChartBuild();



//function getCalculatedEPValues() {


//    sensChartYAxisLabel = "Profits after EP Comp.($ 000\')";

//    if (calcTotal_EP_Perc() > 0) {
//        chart1XAxisLabel = "Equity Partner Time %";
//        chart1TooltipPtr = "Equity Partner Time";
//        partnerText = '<span style="font-size:15px;">What is the impact on profits as a result of changing price and Equity Partner time?</span>';


//        if (calcTotal_EP_Perc() >= 5) {
//            calcPtrPerc = calcTotal_EP_Perc();
//            point1Delta = 5;

//        } else {
//            calcPtrPerc = calcTotal_EP_Perc();
//            point1Delta = calcTotal_EP_Perc();
//        }

//    }
//    else if (calcTotal_EP_Perc() ==== 0 && calcTotal_NEP_Perc() > 0) {
//        chart1XAxisLabel = "Non-Equity Partner Time %";
//        chart1TooltipPtr = "Non-Equity Partner Time";
//        partnerText = '<span style="font-size:15px;">What is the impact on profits as a result of changing price and Non-Equity Partner time?</span>';
//        if (calcTotal_NEP_Perc() >= 5) {

//            calcPtrPerc = calcTotal_NEP_Perc();
//            point1Delta = 5;
//        } else {
//            calcPtrPerc = calcTotal_NEP_Perc();
//            point1Delta = calcTotal_NEP_Perc();
//        }
//    }
//    else if (calcTotal_EP_Perc() === 0 && calcTotal_NEP_Perc() === 0) {
//        partnerText = '<span style="font-size:15px;">What is the impact on profits as a result of changing price?</span>';
//    }

//}


//function getSenstivityData() {

//    //**************************** Building the Partner Time Senstivity Chart **********************************
//    var lineChartFixedPrice = parseFloat((parseFloat($("#chart_STDRate").val()) + parseFloat($("#chart_Discount").val())) / 1000);

//    arr_EPT.push(calcProfits(parseFloat(calcPtrPerc - 5), parseFloat(lineChartFixedPrice - 100), 0));
//    arr_EPT.push(calcProfits(parseFloat(calcPtrPerc + 0), parseFloat(lineChartFixedPrice - 100), 0));
//    arr_EPT.push(calcProfits(parseFloat(calcPtrPerc + 5), parseFloat(lineChartFixedPrice - 100), 0));
//    arr_EPT.push(calcProfits(parseFloat(calcPtrPerc + 10), parseFloat(lineChartFixedPrice - 100), 0));
//    arr_EPT.push(calcProfits(parseFloat(calcPtrPerc + 15), parseFloat(lineChartFixedPrice - 100), 0));
//    arr_EPT.push(calcProfits(parseFloat(calcPtrPerc + 20), parseFloat(lineChartFixedPrice - 100), 0));
//    //arr_EPT.push( calcProfits(parseFloat(calcPtrPerc +25),parseFloat(lineChartFixedPrice-100),0));

//    arr_EPT.push(calcProfits(parseFloat(calcPtrPerc - 5), parseFloat(lineChartFixedPrice - 0), 0));
//    arr_EPT.push(calcProfits(parseFloat(calcPtrPerc + 0), parseFloat(lineChartFixedPrice - 0), 0));
//    arr_EPT.push(calcProfits(parseFloat(calcPtrPerc + 5), parseFloat(lineChartFixedPrice - 0), 0));
//    arr_EPT.push(calcProfits(parseFloat(calcPtrPerc + 10), parseFloat(lineChartFixedPrice - 0), 0));
//    arr_EPT.push(calcProfits(parseFloat(calcPtrPerc + 15), parseFloat(lineChartFixedPrice - 0), 0));
//    arr_EPT.push(calcProfits(parseFloat(calcPtrPerc + 20), parseFloat(lineChartFixedPrice - 0), 0));
//    //arr_EPT.push( calcProfits(parseFloat(calcPtrPerc +25),parseFloat(lineChartFixedPrice-0)  ,0));						

//    arr_EPT.push(calcProfits(parseFloat(calcPtrPerc - 5), parseFloat(lineChartFixedPrice) + 100, 0));
//    arr_EPT.push(calcProfits(parseFloat(calcPtrPerc + 0), parseFloat(lineChartFixedPrice) + 100, 0));
//    arr_EPT.push(calcProfits(parseFloat(calcPtrPerc + 5), parseFloat(lineChartFixedPrice) + 100, 0));
//    arr_EPT.push(calcProfits(parseFloat(calcPtrPerc + 10), parseFloat(lineChartFixedPrice) + 100, 0));
//    arr_EPT.push(calcProfits(parseFloat(calcPtrPerc + 15), parseFloat(lineChartFixedPrice) + 100, 0));
//    arr_EPT.push(calcProfits(parseFloat(calcPtrPerc + 20), parseFloat(lineChartFixedPrice) + 100, 0));
//    //arr_EPT.push( calcProfits(parseFloat(calcPtrPerc +25),parseFloat(lineChartFixedPrice)+100,0));

//    arr_EPT.push(calcProfits(parseFloat(calcPtrPerc - 5), parseFloat(lineChartFixedPrice) + 200, 0));
//    arr_EPT.push(calcProfits(parseFloat(calcPtrPerc + 0), parseFloat(lineChartFixedPrice) + 200, 0));
//    arr_EPT.push(calcProfits(parseFloat(calcPtrPerc + 5), parseFloat(lineChartFixedPrice) + 200, 0));
//    arr_EPT.push(calcProfits(parseFloat(calcPtrPerc + 10), parseFloat(lineChartFixedPrice) + 200, 0));
//    arr_EPT.push(calcProfits(parseFloat(calcPtrPerc + 15), parseFloat(lineChartFixedPrice) + 200, 0));
//    arr_EPT.push(calcProfits(parseFloat(calcPtrPerc + 20), parseFloat(lineChartFixedPrice) + 200, 0));
//    arr_EPT.push(calcProfits(parseFloat(calcPtrPerc + 25), parseFloat(lineChartFixedPrice) + 200, 0));/**/




//    //***************************************************************************************************************

//    //**************************** Building the Partner Hour Senstivity Chart **********************************

//    arr_EPH.push(calcProfits(parseFloat(calcPtrPerc), parseFloat(lineChartFixedPrice - 100), -5));
//    arr_EPH.push(calcProfits(parseFloat(calcPtrPerc), parseFloat(lineChartFixedPrice - 100), 0));
//    arr_EPH.push(calcProfits(parseFloat(calcPtrPerc), parseFloat(lineChartFixedPrice - 100), 5));
//    arr_EPH.push(calcProfits(parseFloat(calcPtrPerc), parseFloat(lineChartFixedPrice - 100), 10));
//    arr_EPH.push(calcProfits(parseFloat(calcPtrPerc), parseFloat(lineChartFixedPrice - 100), 15));
//    arr_EPH.push(calcProfits(parseFloat(calcPtrPerc), parseFloat(lineChartFixedPrice - 100), 20));
//    //arr_EPH.push( calcProfits(parseFloat(calcPtrPerc ),parseFloat(lineChartFixedPrice-100),25));


//    arr_EPH.push(calcProfits(parseFloat(calcPtrPerc), parseFloat(lineChartFixedPrice - 0), -5));
//    arr_EPH.push(calcProfits(parseFloat(calcPtrPerc), parseFloat(lineChartFixedPrice - 0), 0));
//    arr_EPH.push(calcProfits(parseFloat(calcPtrPerc), parseFloat(lineChartFixedPrice - 0), 5));
//    arr_EPH.push(calcProfits(parseFloat(calcPtrPerc), parseFloat(lineChartFixedPrice - 0), 10));
//    arr_EPH.push(calcProfits(parseFloat(calcPtrPerc), parseFloat(lineChartFixedPrice - 0), 15));
//    arr_EPH.push(calcProfits(parseFloat(calcPtrPerc), parseFloat(lineChartFixedPrice - 0), 20));
//    //arr_EPH.push( calcProfits(parseFloat(calcPtrPerc ),parseFloat(lineChartFixedPrice-0)  ,25));

//    arr_EPH.push(calcProfits(parseFloat(calcPtrPerc), parseFloat(lineChartFixedPrice) + 100, -5));
//    arr_EPH.push(calcProfits(parseFloat(calcPtrPerc), parseFloat(lineChartFixedPrice) + 100, 0));
//    arr_EPH.push(calcProfits(parseFloat(calcPtrPerc), parseFloat(lineChartFixedPrice) + 100, 5));
//    arr_EPH.push(calcProfits(parseFloat(calcPtrPerc), parseFloat(lineChartFixedPrice) + 100, 10));
//    arr_EPH.push(calcProfits(parseFloat(calcPtrPerc), parseFloat(lineChartFixedPrice) + 100, 15));
//    arr_EPH.push(calcProfits(parseFloat(calcPtrPerc), parseFloat(lineChartFixedPrice) + 100, 20));
//    //arr_EPH.push( calcProfits(parseFloat(calcPtrPerc ),parseFloat(lineChartFixedPrice)+100,25));

//    arr_EPH.push(calcProfits(parseFloat(calcPtrPerc), parseFloat(lineChartFixedPrice) + 200, -5));
//    arr_EPH.push(calcProfits(parseFloat(calcPtrPerc), parseFloat(lineChartFixedPrice) + 200, 0));
//    arr_EPH.push(calcProfits(parseFloat(calcPtrPerc), parseFloat(lineChartFixedPrice) + 200, 5));
//    arr_EPH.push(calcProfits(parseFloat(calcPtrPerc), parseFloat(lineChartFixedPrice) + 200, 10));
//    arr_EPH.push(calcProfits(parseFloat(calcPtrPerc), parseFloat(lineChartFixedPrice) + 200, 15));
//    arr_EPH.push(calcProfits(parseFloat(calcPtrPerc), parseFloat(lineChartFixedPrice) + 200, 20));
//    //arr_EPH.push( calcProfits(parseFloat(calcPtrPerc ),parseFloat(lineChartFixedPrice)+200,25));

//    // ***************************************************************************************************************


//    //Line Chart Begins

//    var profitDelta = calcProfits(calcPtrPerc, (lineChartFixedPrice - 100), 0) - calcProfits((calcPtrPerc + 5), (lineChartFixedPrice - 100), 0);
//    var profitDelata_Hours = calcProfits(calcPtrPerc, (lineChartFixedPrice - 100), -5) - calcProfits((calcPtrPerc), (lineChartFixedPrice - 100), 0);
//    var xInterval = calcPtrPerc - (calcPtrPerc - 5);

//    Highcharts.chart('senstiVityChartContainer1', {

//        title: {
//            text: partnerText
//        },
//        credits: { enabled: false },
//        subtitle: {
//            useHTML: true,
//            text: '<span style="font-size:15px;">&#8595;</span>&nbsp;<span style="font-size:15px;">' + xInterval + '%</span>&nbsp;&nbsp;<span style="font-size:15px;">&#8594;</span>&nbsp; <span style="font-size:15px;">$' + profitDelta + 'K</span>&nbsp;' + '<span style="font-size:15px;">&#8593;</span>'//    'This is the subtitle'
//        },

//        xAxis: {

//            pointStart: Math.round(calcPtrPerc),//Math.round(calcPtrPerc -5) > 0 ? Math.round(calcPtrPerc -5): 0,    	
//            categories: [Math.round(calcPtrPerc), Math.round(calcPtrPerc) + 5, Math.round(calcPtrPerc) + 10, Math.round(calcPtrPerc) + 15, Math.round(calcPtrPerc) + 20, Math.round(calcPtrPerc) + 25, Math.round(calcPtrPerc) + 30],
//            title: {
//                text: chart1XAxisLabel
//            }

//        },

//        yAxis: {
//            tickInterval: 100,
//            title: {
//                text: sensChartYAxisLabel
//            }

//        },
//        legend: {
//            layout: 'vertical',
//            align: 'right',
//            verticalAlign: 'middle'
//        },

//        tooltip: {
//            formatter: function () {
//                return chart1TooltipPtr + ' : ' + this.x + '%<br/>Fixed Fees : ' + this.series.name + '<br/><b>Profits : $' + this.y + 'K</b>';
//            }
//        },

//        plotOptions: {
//            series: {
//                label: {
//                    connectorAllowed: false
//                },
//                marker: {
//                    radius: 0.001,

//                    states: {
//                        hover: {
//                            enabled: true
//                        },
//                        select: {
//                            radius: 6,
//                            enabled: true
//                        }
//                    }
//                },


//            }
//        },

//        exporting: {
//            allowHTML: true,
//            enabled: false
//        },

//        series: [




//            { name: '<span style="font-size:10px">$ ' + parseFloat(parseFloat(lineChartFixedPrice) - parseFloat(0.1)).toFixed(1) + ' K Fees</span>', color: Highcharts.getOptions().colors[0], data: [arr_EPT[0], arr_EPT[1], arr_EPT[2], arr_EPT[3], arr_EPT[4], arr_EPT[5]] },
//            { name: '<span style="font-size:10px">$ ' + parseFloat(lineChartFixedPrice).toFixed(1) + ' K</span>', color: Highcharts.getOptions().colors[2], data: [arr_EPT[6], arr_EPT[7], arr_EPT[8], arr_EPT[9], arr_EPT[10], arr_EPT[11]] },
//            { name: '<span style="font-size:10px">$ ' + parseFloat(parseFloat(lineChartFixedPrice) + parseFloat(0.1)).toFixed(1) + ' K</span>', color: Highcharts.getOptions().colors[3], data: [arr_EPT[12], arr_EPT[13], arr_EPT[14], arr_EPT[15], arr_EPT[16], arr_EPT[17]] },
//            { name: '<span style="font-size:10px">$ ' + parseFloat(parseFloat(lineChartFixedPrice) + parseFloat(0.2)).toFixed(1) + ' K</span>', color: Highcharts.getOptions().colors[1], data: [arr_EPT[18], arr_EPT[19], arr_EPT[20], arr_EPT[21], arr_EPT[22], arr_EPT[23]] },




//        ],

//        responsive: {
//            rules: [{
//                condition: {
//                    maxWidth: 500
//                },
//                chartOptions: {
//                    legend: {
//                        layout: 'horizontal',
//                        align: 'center',
//                        verticalAlign: 'bottom'
//                    }
//                }
//            }]
//        }

//    });

//    var chart = $('#senstiVityChartContainer1').highcharts();
//    chart.series[1].data[1].select(true, true);


//    Highcharts.chart('senstiVityChartContainer2', {

//        title: {
//            text: '<span style="font-size:15px;">How do I ensure efficiency during execution?</span>'
//        },

//        subtitle: {
//            useHTML: true,
//            text: '<span style="font-size:15px;">&#8595;</span>&nbsp;<span style="font-size:15px;">' + xInterval + '%</b>&nbsp;&nbsp;<span style="font-size:13px;">&#8594;</span>&nbsp; <span style="font-size:15px;">$' + profitDelata_Hours + 'K</span>&nbsp;' + '<span style="font-size:15px;">&#8593;</span>'//    'This is the subtitle'	    
//        },

//        xAxis: {
//            title: {
//                text: 'Total Hour Change %'
//            },

//            pointStart: -10,
//            categories: [-5, 0, 5, 10, 15, 20, 25],

//        },

//        yAxis: {
//            tickInterval: 100,
//            title: {
//                text: sensChartYAxisLabel
//            }

//        },
//        legend: {
//            layout: 'vertical',
//            align: 'right',
//            verticalAlign: 'middle'
//        },

//        credits: { enabled: false },


//        plotOptions: {
//            series: {
//                label: {
//                    connectorAllowed: false
//                },
//                marker: {
//                    radius: 0.001,

//                    states: {
//                        hover: {
//                            enabled: true
//                        },
//                        select: {
//                            radius: 6,
//                            enabled: true
//                        }
//                    }
//                },

//            }
//        },

//        tooltip: {
//            formatter: function () {
//                return ' Total Hour Change : ' + this.x + '%<br/>Fixed Fees : ' + this.series.name + '<br/><b>Profits : $' + this.y + 'K</b>';
//            }
//        },

//        exporting: {
//            allowHTML: true,
//            enabled: false
//        },



//        series: [


//            { name: '<span style="font-size:10px">$ ' + parseFloat(parseFloat(lineChartFixedPrice) - parseFloat(0.1)).toFixed(1) + ' K Fees</span>', color: Highcharts.getOptions().colors[0], data: [arr_EPH[0], arr_EPH[1], arr_EPH[2], arr_EPH[3], arr_EPH[4], arr_EPH[5]] },
//            { name: '<span style="font-size:10px">$ ' + parseFloat(lineChartFixedPrice).toFixed(1) + ' K</span>', color: Highcharts.getOptions().colors[2], data: [arr_EPH[6], arr_EPH[7], arr_EPH[8], arr_EPH[9], arr_EPH[10], arr_EPH[11]] },
//            { name: '<span style="font-size:10px">$ ' + parseFloat(parseFloat(lineChartFixedPrice) + parseFloat(0.1)).toFixed(1) + ' K</span>', color: Highcharts.getOptions().colors[3], data: [arr_EPH[12], arr_EPH[13], arr_EPH[14], arr_EPH[15], arr_EPH[16], arr_EPH[17]] },
//            { name: '<span style="font-size:10px">$ ' + parseFloat(parseFloat(lineChartFixedPrice) + parseFloat(0.2)).toFixed(1) + ' K</span>', color: Highcharts.getOptions().colors[1], data: [arr_EPH[18], arr_EPH[19], arr_EPH[20], arr_EPH[21], arr_EPH[22], arr_EPH[23]] },




//        ],

//        responsive: {
//            rules: [{
//                condition: {
//                    maxWidth: 500
//                },
//                chartOptions: {
//                    legend: {
//                        layout: 'horizontal',
//                        align: 'center',
//                        verticalAlign: 'bottom'
//                    }
//                }
//            }]
//        }

//    });

//    var chart1 = $('#senstiVityChartContainer2').highcharts();
//    chart1.series[1].data[1].select(true, true);


//}





