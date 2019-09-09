function switchButtonClass(buttonName, status) {

    if (status === 'disable') {
        $("a[title='" + buttonName + "']").addClass('disabled');
        $("a[title='" + buttonName + "']").addClass('btn-secondary');
        $("a[title='" + buttonName + "']").removeClass('btn-fasQuoteOrange');
    }
    else {

        $("a[title='" + buttonName + "']").removeClass('disabled');
        $("a[title='" + buttonName + "']").removeClass('btn-secondary');
        $("a[title='" + buttonName + "']").addClass('text-light');
        $("a[title='" + buttonName + "']").addClass('btn-fasQuoteOrange');

    }

}

// validate the fields
function validateFields(elementID) {

    if ($("#" + elementID).attr("ID").startsWith("txt")) {
        if ($("#" + elementID).val().length === 0) {
            $("#" + elementID).addClass("is-invalid");
            return "false";
        }
        else {
            $("#" + elementID).removeClass("is-invalid");
            // $("#" + elementID).addClass("is-valid");
            return "true";
        }
    }
    else if ($("#" + elementID).attr("ID").startsWith("ddl")) {

        if ($("#" + elementID).find(":selected").text() === '--Select--') {
            $("#" + elementID).addClass("is-invalid");
            return "false";
        }
        else {
            $("#" + elementID).removeClass("is-invalid");
            //  $("#" + elementID).addClass("is-valid");
            return "true";
        }
    }


}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

// validate the fields
function validateFieldsAsNumbers(elementID) {

    // console.log(elementID);

    var searchPattern = /^[0-9]+$/;

    // if ($("#" + elementID).attr("ID").startsWith("txt")) {
    if ($("#" + elementID).val().length > 0 && !$("#" + elementID).val().match(searchPattern)) {
        $("#" + elementID).addClass("is-invalid");
        return "false";
    }
    else {
        $("#" + elementID).removeClass("is-invalid");
        // $("#" + elementID).addClass("is-valid");
        return "true";
    }
    // }

}

//get calendars
function getCalendarDays(openDate, closeDate) {

    var dateFormat = "mm/dd/yy",
        from = $(openDate)
            .datepicker({
                defaultDate: "+1w",
                changeMonth: true,
                numberOfMonths: 2
            })
            .on("change", function () {
                to.datepicker("option", "minDate", getDate(this));
            }),
        to = $(closeDate).datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 2
        })
            .on("change", function () {
                from.datepicker("option", "maxDate", getDate(this));
            });

    function getDate(element) {
        var date;
        try {
            date = $.datepicker.parseDate(dateFormat, element.value);
        } catch (error) {
            date = null;
        }

        return date;
    }


}

// calculate the days between the selected calendar dates

function getTotalDaysDifference(openDate, closeDate) {

    totalDays = calculateDays(openDate, closeDate);
    return totalDays;
}


function calculateDays(openDate, closeDate) {
    var diff_date = 0;

    var minutes = 1000 * 60;
    var hours = minutes * 60;
    var days = hours * 24;

    var foo_date1 = getDateFromFormat(openDate, "M/d/y");
    var foo_date2 = getDateFromFormat(closeDate, "M/d/y");

    diff_date = Math.round((foo_date2 - foo_date1) / days);

    return diff_date;
}

// fetching the level description title and description fields
function enableDrawerFunctions(thisData, tips, stepID) {
    //  console.log(tips);

    if (tips.length > 0) {

        if ($('#' + tips).attr("ID").length > 0 && $('#' + tips).attr("ID").indexOf("Tips") > -1) {
            fetchLevelDescription_AllLevels(tips.substring(0, tips.length - 4));


            // fetchLevelDescriptionData(tips.substring(0, tips.length - 4), 'levelDesc');
            classie.toggle(thisData, 'active');
            classie.toggle(document.getElementById('cbp-spmenu-s4'), 'cbp-spmenu-open');


        }
        else if (tips === "closeButtonMenuBottom") {
            classie.toggle(thisData, 'active');
            classie.toggle(document.getElementById('cbp-spmenu-s4'), 'cbp-spmenu-open');
        }
        else if (tips === "recapOpenClose") {

            switchButtonClass('Scope of Work', 'disable');

                 //if (stepID.indexOf('step4') > -1) {
                 //    switchButtonClass('Client View', 'disable');
                 //    switchButtonClass('Profit View', 'disable');
     
                 //}
                 //else {
                 //    switchButtonClass('Client View', 'disable');
                 //    switchButtonClass('Profit View', 'disable');
                 //    switchButtonClass('Scope of Work', 'disable');
                 //} 

            classie.toggle(thisData, 'active');
            classie.toggle(document.getElementById('cbp-spmenu-mySidenav'), 'cbp-spmenu-open');

        }
        else if (tips === "closeLeft") {

            switchButtonClass('Scope of Work', 'enable');

              //if (stepID.indexOf('step4') > -1) {
              //    switchButtonClass('Client View', 'enable');
              //    switchButtonClass('Profit View', 'enable');
  
              //}
              //else {
              //    switchButtonClass('Client View', 'disable');
              //    switchButtonClass('Profit View', 'disable');
              //     switchButtonClass('Scope of Work', 'disable');
              //} 

            classie.toggle(thisData, 'active');
            classie.toggle(document.getElementById('cbp-spmenu-mySidenav'), 'cbp-spmenu-open');
        }
    }



}

function fetchLevelDescription_AllLevels(param) {
    $("#levelDescBody").empty();
    // to check if button with english text is hidden which means english text is displayed
    if ($("#btnEN").css("display") === "none") {
        $.ajax({
            dataType: "json",
            url: 'BAL/JSONData/glossaryLevelDescEN.json',
            cache: false,  //do not cache
            success: function (json) {


                obj = json['levelDesc'];
                $.each(obj, function (i) {
                    var obj2 = obj[i][param];
                    $.each(obj2, function (j, items) {
                        $("#levelDescTitle").text(items.title);
                        $.each(items, function (j, items2) {


                            var str = '';
                            if (obj2[1].description.length === 4) {
                                if (items2[0].None !== undefined || items2[1].Level1 !== undefined || items2[2].Level2 !== undefined || items2[3].Level3 !== undefined) {
                                    str = ("<tr><td width='25%' class='small'>None</td><td class='small'>" + items2[0].None + "</td></tr><tr><td class='small'>Level 1</td><td class='small'>" + items2[1].Level1 + "</td></tr><tr><td class='small'>Level 2</td><td class='small'>" + items2[2].Level2 + "</td></tr><tr><td class='small'>Level 3</td><td class='small'>" + items2[3].Level3 + "</td></tr>").replace(/\n/g, "<br>");
                                }
                            }
                            else if (obj2[1].description.length === 5) {
                                if (items2[0].None !== undefined || items2[1].Level1 !== undefined || items2[2].Level2 !== undefined || items2[3].Level3 !== undefined || items2[4].Level4 !== undefined) {
                                    str = ("<tr><td width='25%' class='small'>None</td><td class='small'>" + items2[0].None + "</td></tr><tr><td class='small'>Level 1</td><td class='small'>" + items2[1].Level1 + "</td></tr><tr><td class='small'>Level 2</td><td class='small'>" + items2[2].Level2 + "</td></tr><tr><td class='small'>Level 3</td><td class='small'>" + items2[3].Level3 + "</td></tr><tr><td class='small'>Level 4</td><td class='small'>" + items2[4].Level4 + "</td></tr>").replace(/\n/g, "<br>");
                                }
                            }
                            else if (obj2[1].description.length === 7)
                                if (items2[0].None !== undefined || items2[1].Level1 !== undefined || items2[2].Level2 !== undefined || items2[3].Level3 !== undefined || items2[4].Level4 !== undefined || items2[5].Level5 !== undefined || items2[6].Level6 !== undefined) {
                                    str = ("<tr><td width='25%' class='small'>None</td><td class='small'>" + items2[0].None + "</td></tr><tr><td class='small'>Level 1</td><td class='small'>" + items2[1].Level1 + "</td></tr><tr><td class='small'>Level 2</td><td class='small'>" + items2[2].Level2 + "</td></tr><tr><td class='small'>Level 3</td><td class='small'>" + items2[3].Level3 + "</td></tr><tr><td class='small'>Level 4</td><td class='small'>" + items2[4].Level4 + "</td></tr><tr><td class='small'>Level 5</td><td class='small'>" + items2[5].Level5 + "</td></tr><tr><td class='small'>Level 6</td><td class='small'>" + items2[6].Level6 + "</td></tr>").replace(/\n/g, "<br>");
                                }

                            $("#levelDescBody").append(str);

                            // }
                        });
                    });

                });
            }
        });
    }
    else {
        $.ajax({
            dataType: "json",
            url: 'BAL/JSONData/glossaryLevelDescFR.json',
            cache: false,  //do not cache
            success: function (json) {


                obj = json['levelDesc'];
                $.each(obj, function (i) {
                    var obj2 = obj[i][param];
                    $.each(obj2, function (j, items) {
                        $("#levelDescTitle").text(items.title);
                        $.each(items, function (j, items2) {
                            // if (items2[0].None !== undefined || items2[1].Level1 !== undefined || items2[2].Level2 !== undefined || items2[3].Level3 !== undefined || items2[0].Minimum !== undefined || items2[1].Moderate !== undefined || items2[2].Maximum !== undefined || items2[0].Normal !== undefined || items2[0].High_Maintainance !== undefined || items2[1].Hostile !== undefined || items2[2].Friendly !== undefined) {

                            var str = '';
                            if (obj2[1].description.length === 4) {
                                if (items2[0].None !== undefined || items2[1].Level1 !== undefined || items2[2].Level2 !== undefined || items2[3].Level3 !== undefined) {
                                    str = ("<tr><td width='25%' class='small'>Aucune</td><td class='small'>" + items2[0].None + "</td></tr><tr><td class='small'>Niveau 1</td><td class='small'>" + items2[1].Level1 + "</td></tr><tr><td class='small'>Niveau 2</td><td class='small'>" + items2[2].Level2 + "</td></tr><tr><td class='small'>Niveau 3</td><td class='small'>" + items2[3].Level3 + "</td></tr>").replace(/\n/g, "<br>");
                                }
                            }
                            else if (obj2[1].description.length === 5) {
                                if (items2[0].None !== undefined || items2[1].Level1 !== undefined || items2[2].Level2 !== undefined || items2[3].Level3 !== undefined || items2[4].Level4 !== undefined) {
                                    str = ("<tr><td width='25%' class='small'>Aucune</td><td class='small'>" + items2[0].None + "</td></tr><tr><td class='small'>Niveau 1</td><td class='small'>" + items2[1].Level1 + "</td></tr><tr><td class='small'>Niveau 2</td><td class='small'>" + items2[2].Level2 + "</td></tr><tr><td class='small'>Niveau 3</td><td class='small'>" + items2[3].Level3 + "</td></tr><tr><td class='small'>Niveau 4</td><td class='small'>" + items2[4].Level4 + "</td></tr>").replace(/\n/g, "<br>");
                                }
                            }
                            else if (obj2[1].description.length === 7)
                                if (items2[0].None !== undefined || items2[1].Level1 !== undefined || items2[2].Level2 !== undefined || items2[3].Level3 !== undefined || items2[4].Level4 !== undefined || items2[5].Level5 !== undefined || items2[6].Level6 !== undefined) {
                                    str = ("<tr><td width='25%' class='small'>Aucune</td><td class='small'>" + items2[0].None + "</td></tr><tr><td class='small'>Niveau 1</td><td class='small'>" + items2[1].Level1 + "</td></tr><tr><td class='small'>Niveau 2</td><td class='small'>" + items2[2].Level2 + "</td></tr><tr><td class='small'>Niveau 3</td><td class='small'>" + items2[3].Level3 + "</td></tr><tr><td class='small'>Niveau 4</td><td class='small'>" + items2[4].Level4 + "</td></tr><tr><td class='small'>Niveau 5</td><td class='small'>" + items2[5].Level5 + "</td></tr><tr><td class='small'>Niveau 6</td><td class='small'>" + items2[6].Level6 + "</td></tr>").replace(/\n/g, "<br>");
                                }
                            $("#levelDescBody").append(str);

                            // }
                        });
                    }); getTotal_Weighted_DirectCost_OH_FEA_Rates

                });
            }
        });
    }


}

function fetchLevelDescription_LevelWise(param, selectedLevel, outputSpanID) {
    console.log("outputSpanID", outputSpanID);
    var levelDescriptionText = '';
    $("#" + outputSpanID + "_Desc").empty();
    if ($("#btnEN").css("display") === "none") {
        $.ajax({
            dataType: "json",
            url: 'BAL/JSONData/glossaryLevelDescEN.json',
            cache: false,  //do not cache
            success: function (json) {

                obj = json['levelDesc'];
                $.each(obj, function (i) {
                    var obj2 = obj[i][param];
                    $.each(obj2, function (j, items) {
                        $("#levelDescTitle").text(items.title);
                        $.each(items, function (j, items2) {
                            if (items2[0].None !== undefined || items2[1].Level1 !== undefined || items2[2].Level2 !== undefined || items2[3].Level3 !== undefined || items2[0].Normal !== undefined || items2[1].High_Maintainance !== undefined || items2[1].Minimum !== undefined || items2[2].Moderate !== undefined || items2[3].Maximum !== undefined) {
                                console.log(param);
                                if (selectedLevel === 'None') {
                                    $("#" + outputSpanID + "_Level").text(selectedLevel);
                                    $("#" + outputSpanID + "_Desc").append((items2[0].None).replace(/\n/g, "<br>"));
                                }
                                else if (selectedLevel === 'Level1') {
                                    $("#" + outputSpanID + "_Level").text(selectedLevel);
                                    console.log((items2[1].Level1));
                                    $("#" + outputSpanID + "_Desc").append((items2[1].Level1).replace(/\n/g, "<br>"));
                                }
                                else if (selectedLevel === 'Level2') {
                                    $("#" + outputSpanID + "_Level").text(selectedLevel);
                                    $("#" + outputSpanID + "_Desc").append((items2[2].Level2).replace(/\n/g, "<br>"));
                                }
                                else if (selectedLevel === 'Level3') {
                                    $("#" + outputSpanID + "_Level").text(selectedLevel);
                                    $("#" + outputSpanID + "_Desc").append((items2[3].Level3).replace(/\n/g, "<br>"));
                                }
                                else if (selectedLevel === 'Level4') {
                                    $("#" + outputSpanID + "_Level").text(selectedLevel);
                                    $("#" + outputSpanID + "_Desc").append((items2[4].Level4).replace(/\n/g, "<br>"));
                                }
                                else if (selectedLevel === 'Level5') {
                                    $("#" + outputSpanID + "_Level").text(selectedLevel);
                                    $("#" + outputSpanID + "_Desc").append((items2[5].Level5).replace(/\n/g, "<br>"));
                                }
                                else if (selectedLevel === 'Level6') {
                                    $("#" + outputSpanID + "_Level").text(selectedLevel);
                                    $("#" + outputSpanID + "_Desc").append((items2[6].Level6).replace(/\n/g, "<br>"));
                                }

                            }

                        });
                    });

                });
            }
        });
    }
    else {
        $.ajax({
            dataType: "json",
            url: 'BAL/JSONData/glossaryLevelDescFR.json',
            cache: false,  //do not cache
            success: function (json) {

                obj = json['levelDesc'];
                $.each(obj, function (i) {
                    var obj2 = obj[i][param];
                    $.each(obj2, function (j, items) {
                        $("#levelDescTitle").text(items.title);
                        $.each(items, function (j, items2) {
                            if (items2[0].None !== undefined || items2[1].Level1 !== undefined || items2[2].Level2 !== undefined || items2[3].Level3 !== undefined || items2[0].Normal !== undefined || items2[1].High_Maintainance !== undefined || items2[1].Minimum !== undefined || items2[2].Moderate !== undefined || items2[3].Maximum !== undefined) {
                                console.log(param);
                                if (selectedLevel === 'None') {
                                    $("#" + outputSpanID + "_Level").text('Aucune');
                                    $("#" + outputSpanID + "_Desc").append((items2[0].None).replace(/\n/g, "<br>"));
                                }
                                else if (selectedLevel === 'Level1') {
                                    $("#" + outputSpanID + "_Level").text('Niveau 1');
                                    console.log((items2[1].Level1));
                                    $("#" + outputSpanID + "_Desc").append((items2[1].Level1).replace(/\n/g, "<br>"));
                                }
                                else if (selectedLevel === 'Level2') {
                                    $("#" + outputSpanID + "_Level").text('Niveau 2');
                                    $("#" + outputSpanID + "_Desc").append((items2[2].Level2).replace(/\n/g, "<br>"));
                                }
                                else if (selectedLevel === 'Level3') {
                                    $("#" + outputSpanID + "_Level").text('Niveau 3');
                                    $("#" + outputSpanID + "_Desc").append((items2[3].Level3).replace(/\n/g, "<br>"));
                                }
                                else if (selectedLevel === 'Level4') {
                                    $("#" + outputSpanID + "_Level").text('Niveau 4');
                                    $("#" + outputSpanID + "_Desc").append((items2[4].Level4).replace(/\n/g, "<br>"));
                                }
                                else if (selectedLevel === 'Level5') {
                                    $("#" + outputSpanID + "_Level").text('Niveau 5');
                                    $("#" + outputSpanID + "_Desc").append((items2[5].Level5).replace(/\n/g, "<br>"));
                                }
                                else if (selectedLevel === 'Level6') {
                                    $("#" + outputSpanID + "_Level").text('Niveau 6');
                                    $("#" + outputSpanID + "_Desc").append((items2[6].Level6).replace(/\n/g, "<br>"));
                                }

                            }

                        });
                    });

                });
            }
        });
    }
    return levelDescriptionText;
}

// CREATE QUOTE PAGE TRANSLATIONS
function languageSwitch_MnA(lang, ddVal, step2Val) {

    if (ddVal === undefined || ddVal === null || ddVal === '')
        ddVal = '--Select--~--Select--~--Select--~--Select--~--Select--~--Select--~--Select--~--Select--~--Select--';

    if (step2Val === undefined || step2Val === null || step2Val === '')
        step2Val = '--Select--~--Select--~--Select--~--Select--~--Select--~--Select--~--Select--~--Select--~--Select--';

    //if (rbVal === undefined || rbVal === null || rbVal === '')
    //    rbVal = 'Syndicate~Acquisition';

    $.ajax({
        type: 'GET',
        url: './BAL/jsondata/translationdataMnA.json',
        cache: false,
        async: false,
        contentType: "application/json; charset=ISO-8859-1",
        beforeSend: function (jqXHR) {
            jqXHR.overrideMimeType('application/json;charset=iso-8859-1');
        },  
        success: function (results) {

            // Empty the dropdown value options . 1 for each dropdown
            var options = "";
            var options1 = "";
            var options2 = "";
            var options3 = "";
            var options4 = "";
            var options5 = "";
            var options6 = "";
            var options7 = "";
            var options8 = "";
            var options9 = "";
            var options10 = "";
            var options11 = "";
            var options12 = "";
            var options13 = "";
            var options14 = "";
            var options15 = "";
            var options16 = "";
            var options17 = "";
            var options18 = "";

            if (lang === 'en') {

                $("#spnCreateQuoteText").text(results.en[68].createQuoteTextKey);
                $("#spnEditQuoteText").text(results.en[69].editQuoteTextKey);
                $("#mnaHeadText").text(results.en[100].mnaHeadText);
                $("#spnProjHoursKPITextKey").text(results.en[60].projectedHoursKPITextKey);
                $("#spnFixQuoteKPITextKey").text(results.en[61].fixedQuoteKPITextKey);
                $("#spnPartEQPartKPITextKey").text(results.en[62].partnerEQPartnerKPITextKey);
                $("#spnDisPreKPITextKey").text(results.en[63].discountPremiumKPITextKey);
                $("#pills-step1-tab").text(results.en[64].step1TextKey);
                $("#pills-step2-tab").text(results.en[65].step2TextKey);
                $("#pills-step3-tab").text(results.en[66].step3TextKey);
                $("#pills-step4-tab").text(results.en[67].step4TextKey);
                $("#lnkGetDays").text(results.en[19].getDaysText);
                $("#spnSaveQuoteTextKey").text(results.en[70].saveQuoteTextKey);

                $("#lnkBack").text(results.en[93].backButtonText);
                $("#lnkNext").text(results.en[94].nextButtonText);
                $("#lnkFinish").text(results.en[95].finishAndSaveButtonText);

                $("#spnMatterNameKey").text(results.en[0].matterName);
                $("#txtMatterName").attr("placeholder", results.en[0].matterName);
                $("#spnOfficeKey").text(results.en[1].office);
                $("#ddlOffices").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.en[2].officeVal, function (i) {
                    options += '<option class="pt-3" value= "' + results.en[2].officeVal[i].title.split('~')[0] + '">' + results.en[2].officeVal[i].title.split('~')[1] + '</option>';
                    $("#ddlOffices").html(options);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlOffices").val(ddVal.split('~')[0]);

                $("#spnDealType").text(results.en[3].typeOfDeal);
                $("#ddlDealType").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.en[4].typeOfDealVal, function (i) {
                    options1 += '<option class="pt-3" value= "' + results.en[4].typeOfDealVal[i].title.split('~')[0] + '">' + results.en[4].typeOfDealVal[i].title.split('~')[1] + '</option>';
                    $("#ddlDealType").html(options1);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlDealType").val(ddVal.split('~')[1]);


                $("#spnRepresentation").text(results.en[6].representation);
                $("#ddlRepresent").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.en[7].representationVal, function (i) {
                    options2 += '<option class="pt-3" value= "' + results.en[7].representationVal[i].title.split('~')[0] + '">' + results.en[7].representationVal[i].title.split('~')[1] + '</option>';
                    $("#ddlRepresent").html(options2);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlRepresent").val(ddVal.split('~')[2]);

                $("#spnDatesKey").text(results.en[8].datesText);
                $("#spnTentativeKey").text(results.en[9].tentativeText);
                $("#txtOpeningDate").attr("placeholder", results.en[74].openDateText);
                $("#txtClosingDate").attr("placeholder", results.en[75].closeDateText);

                /////////////////////////////////

                $("#spnDealChar").text(results.en[121].dealCharText);
                $("#spnTranType").text(results.en[122].transactionType);
                $("#ddlTranType_DealChar").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.en[123].transactionTypeVal, function (i) {
                    options3 += '<option class="pt-3" value= "' + results.en[123].transactionTypeVal[i].title.split('~')[0] + '">' + results.en[123].transactionTypeVal[i].title.split('~')[1] + '</option>';
                    $("#ddlTranType_DealChar").html(options3);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlTranType_DealChar").val(ddVal.split('~')[3]);

                $("#spnTranSize").text(results.en[124].transactionSize);
                $("#ddlTranSize_DealChar").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.en[125].transactionSizeVal, function (i) {
                    options4 += '<option class="pt-3" value= "' + results.en[125].transactionSizeVal[i].title.split('~')[0] + '">' + results.en[125].transactionSizeVal[i].title.split('~')[1] + '</option>';
                    $("#ddlTranSize_DealChar").html(options4);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlTranSize_DealChar").val(ddVal.split('~')[4]);

                $("#spnBO").text(results.en[126].buyerOrigin);
                $("#ddlBO_DealChar").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.en[127].buyerOriginVal, function (i) {
                    options5 += '<option class="pt-3" value= "' + results.en[127].buyerOriginVal[i].title.split('~')[0] + '">' + results.en[127].buyerOriginVal[i].title.split('~')[1] + '</option>';
                    $("#ddlBO_DealChar").html(options5);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlBO_DealChar").val(ddVal.split('~')[5]);

                $("#spnRegInd").text(results.en[128].regInd);
                $("#ddlRegInd_DealChar").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.en[129].regIndVal, function (i) {
                    options6 += '<option class="pt-3" value= "' + results.en[129].regIndVal[i].title.split('~')[0] + '">' + results.en[129].regIndVal[i].title.split('~')[1] + '</option>';
                    $("#ddlRegInd_DealChar").html(options6);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlRegInd_DealChar").val(ddVal.split('~')[6]);

                $("#spnCounsel").text(results.en[130].counselCoord);
                $("#ddlCounsel_DealChar").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.en[131].counselCoordVal, function (i) {
                    options7 += '<option class="pt-3" value= "' + results.en[131].counselCoordVal[i].title.split('~')[0] + '">' + results.en[131].counselCoordVal[i].title.split('~')[1] + '</option>';
                    $("#ddlCounsel_DealChar").html(options7);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlCounsel_DealChar").val(ddVal.split('~')[7]);

                $("#spnMNACounsel").text(results.en[132].mnaCounsel);
                $("#ddlMNACounsel_DealChar").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.en[133].mnaCounselVal, function (i) {
                    options8 += '<option class="pt-3" value= "' + results.en[133].mnaCounselVal[i].title.split('~')[0] + '">' + results.en[133].mnaCounselVal[i].title.split('~')[1] + '</option>';
                    $("#ddlMNACounsel_DealChar").html(options8);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlMNACounsel_DealChar").val(ddVal.split('~')[8]);

                $("#spnunknownvar").text(results.en[134].unknownVarText);
                $("#spnClientType").text(results.en[135].clientType);
                $("#ddlCT").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.en[136].clientTypeVal, function (i) {
                    options9 += '<option class="pt-3" value= "' + results.en[136].clientTypeVal[i].title.split('~')[0] + '">' + results.en[136].clientTypeVal[i].title.split('~')[1] + '</option>';
                    $("#ddlCT").html(options9);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlCT").val(step2Val.split('~')[0]);

                $("#spnFirmType").text(results.en[137].firmType);
                $("#ddlFT").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.en[138].firmTypeVal, function (i) {
                    options10 += '<option class="pt-3" value= "' + results.en[138].firmTypeVal[i].title.split('~')[0] + '">' + results.en[138].firmTypeVal[i].title.split('~')[1] + '</option>';
                    $("#ddlFT").html(options10);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlFT").val(step2Val.split('~')[1]);

                $("#spnTranLength").text(results.en[139].tranLengh);

                $("#spnIncreaseHoursText").text(results.en[140].increaseHoursText);
                $("#spnCTHourRangeText").text(results.en[141].clientTypeHourRange);
                $("#spnFTHourRangeText").text(results.en[142].firmTypeHourRange);
                $("#spnTLHourRangeText").text(results.en[143].tranLengthHourRange);
                $("#spnClientNeedsText").text(results.en[144].clientNeedsText);
                $("#spnPASMixText").text(results.en[145].PASMixText);

                $("#spnAgreement").text(results.en[146].agreementsText);
                $("#ddlAgreement_ClientNeeds").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.en[147].agreementsVal, function (i) {
                    options11 += '<option class="pt-3" value= "' + results.en[147].agreementsVal[i].title.split('~')[0] + '">' + results.en[147].agreementsVal[i].title.split('~')[1] + '</option>';
                    $("#ddlAgreement_ClientNeeds").html(options11);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlAgreement_ClientNeeds").val(step2Val.split('~')[2]);

                $("#spnAuction").text(results.en[148].auctionText);
                $("#ddlAuction_ClientNeeds").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.en[149].auctionVal, function (i) {
                    options12 += '<option class="pt-3" value= "' + results.en[149].auctionVal[i].title.split('~')[0] + '">' + results.en[149].auctionVal[i].title.split('~')[1] + '</option>';
                    $("#ddlAuction_ClientNeeds").html(options12);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlAuction_ClientNeeds").val(step2Val.split('~')[3]);


                $("#spnShareGov").text(results.en[150].shareGovText);
                $("#ddlShareGov_ClientNeeds").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.en[151].shareGovVal, function (i) {
                    options13 += '<option class="pt-3" value= "' + results.en[151].shareGovVal[i].title.split('~')[0] + '">' + results.en[151].shareGovVal[i].title.split('~')[1] + '</option>';
                    $("#ddlShareGov_ClientNeeds").html(options13);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlShareGov_ClientNeeds").val(step2Val.split('~')[4]);

                $("#spnReOrg").text(results.en[152].reOrgText);
                $("#ddlReOrg_ClientNeeds").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.en[153].reOrgVal, function (i) {
                    options14 += '<option class="pt-3" value= "' + results.en[153].reOrgVal[i].title.split('~')[0] + '">' + results.en[153].reOrgVal[i].title.split('~')[1] + '</option>';
                    $("#ddlReOrg_ClientNeeds").html(options14);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlReOrg_ClientNeeds").val(step2Val.split('~')[5]);

                $("#spnDueDilli").text(results.en[154].dueDilliText);
                $("#ddlDueDilli_ClientNeeds").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.en[155].dueDilliVal, function (i) {
                    options15 += '<option class="pt-3" value= "' + results.en[155].dueDilliVal[i].title.split('~')[0] + '">' + results.en[155].dueDilliVal[i].title.split('~')[1] + '</option>';
                    $("#ddlDueDilli_ClientNeeds").html(options15);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlDueDilli_ClientNeeds").val(step2Val.split('~')[6]);

                $("#spnTaxStruct").text(results.en[156].taxStructText);
                $("#ddlTaxStruct_ClientNeeds").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.en[157].taxStructVal, function (i) {
                    options16 += '<option class="pt-3" value= "' + results.en[157].taxStructVal[i].title.split('~')[0] + '">' + results.en[157].taxStructVal[i].title.split('~')[1] + '</option>';
                    $("#ddlTaxStruct_ClientNeeds").html(options16);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlTaxStruct_ClientNeeds").val(step2Val.split('~')[7]);

                $("#spnFinance").text(results.en[158].financeText);
                $("#ddlFinance_ClientNeeds").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.en[159].financeVal, function (i) {
                    options17 += '<option class="pt-3" value= "' + results.en[159].financeVal[i].title.split('~')[0] + '">' + results.en[159].financeVal[i].title.split('~')[1] + '</option>';
                    $("#ddlFinance_ClientNeeds").html(options17);
                });

                $("#spnPartnerText2").text(results.en[35].partnersText);
                $("#spnAssociateText2").text(results.en[36].associatesText);
                $("#spnOtherText2").text(results.en[37].othersText);
                $("#spnAggregateStaffMixText").text(results.en[38].aggregatedStaffText);

                // get the selected value of the dropdown from the variable
                $("#ddlFinance_ClientNeeds").val(step2Val.split('~')[8]);


                $("#totalMixPercText").text(results.en[160].totalMixPercText);
                $("#partnerMixText").text(results.en[35].partnersText);
                $("#associateMixText").text(results.en[36].associatesText);
                $("#studentMixText").text(results.en[37].othersText);
                $("#commentMixText").text(results.en[161].commentMixText);

                $("#spnPartnerText3").text(results.en[35].partnersText);
                $("#spnAssociateText3").text(results.en[36].associatesText);

                $("#spnSelectedLocationText1").text(results.en[41].selectedLocationText);
                $("#spnOtherLocationText1").text(results.en[42].otherLocationText);
                $("#spnTotalPartnerHoursText").text(results.en[43].totalPartnerHoursText);

                $("#spnSelectedLocationText2").text(results.en[41].selectedLocationText);
                $("#spnOtherLocationText2").text(results.en[42].otherLocationText);
                $("#spnTotalAssociateHoursText").text(results.en[44].totalAssociateHoursText);

                $("#spnHoursRangeTextKey").text(results.en[45].hoursRangeText);
                $("#spnHourDistriTextKey").text(results.en[46].hoursDistributionText);
                $("#spnPartEQPartTextKey").text(results.en[47].partnerEQPartnerText);
                $("#spnAvgRateTextKey").text(results.en[48].avgRateText);

                $("#spnPartnerText4").text(results.en[35].partnersText);
                $("#spnAssociateText4").text(results.en[36].associatesText);
                $("#spnOthersText4").text(results.en[37].othersText);

                $("#spnFasPriceTextKey").text(results.en[49].fasquotePriceText);
                $("#spnFixedPriceTextKey").text(results.en[51].fixedQuoteText);
                $("#spnQuoteRangeTextKey").text(results.en[52].quoteRangeText);
                $("#spnBlendedSTDRateTextKey").text(results.en[53].blendedSTDText);
                $("#spnBlendedDiscountTextKey").text(results.en[54].blendedDiscountText);

                $("#spnAvgThresholdTextKey").text(results.en[50].avgThresholdPriceText);
                $("#spnFixedQuoteTextKey2").text(results.en[51].fixedQuoteText);
                $("#spnQuoteRangeTextKey2").text(results.en[52].quoteRangeText);
                $("#spnBlendedSTDRateTextKey2").text(results.en[53].blendedSTDText);
                $("#spnBlendedDiscountRateTextKey2").text(results.en[54].blendedDiscountText);

                $("#spnPriceSTDRateTextKey").text(results.en[55].priceAtSTDRateText);
                $("#spnQuoteTextKey1").text(results.en[58].quoteText);

                $("#spnPriceFileMatterTextKey").text(results.en[56].priceAtFileMatterText);
                $("#spnQuoteTextKey2").text(results.en[58].quoteText);

                $("#spnPriceDiscountTextKey").text(results.en[57].priceAtDiscountText);
                $("#spnQuoteTextKey3").text(results.en[58].quoteText);
                $("#spnDisPreTextKey").text(results.en[59].discountPremiumText);

                $("#step1Collapse").text(results.en[71].step1CollapseText);
                $("#step2Collapse").text(results.en[72].step2CollapseText);
                $("#step3Collapse").text(results.en[73].step3CollapseText);

                $("#summaryMatterNameTextKey").text(results.en[0].matterName);
                $("#summaryOpenDateTextKey").text(results.en[74].openDateText);
                $("#summaryCloseDateTextKey").text(results.en[75].closeDateText);
                $("#summaryLocationTextKey").text(results.en[1].office);

                $("#summaryPartnersTextKey").text(results.en[35].partnersText);
                $("#summaryAssociateTextKey").text(results.en[36].associatesText);
                $("#summaryOthersTextKey").text(results.en[37].othersText);
                $("#summaryPartnerHoursTextKey").text(results.en[43].totalPartnerHoursText);
                $("#summaryAssociateHoursTextKey").text(results.en[44].totalAssociateHoursText);


                $("#summaryDealTypeTextKey").text(results.en[3].typeOfDeal);
                $("#summaryRepresentationTextKey").text(results.en[6].representation);
                $("#summaryTranTypeTextKey").text(results.en[122].transactionType);
                $("#summaryTranSizeTextKey").text(results.en[124].transactionSize);
                $("#summaryBuyerOriginTextKey").text(results.en[126].buyerOrigin);
                $("#summaryRegIndTextKey").text(results.en[128].regInd);
                $("#summaryCounselCoordTextKey").text(results.en[130].counselCoord);
                $("#summaryMnACounselTextKey").text(results.en[132].mnaCounsel);

                $("#summaryCTTextKey").text(results.en[135].clientType);
                $("#summaryFTTextKey").text(results.en[137].firmType);
                $("#summaryTLTextKey").text(results.en[139].tranLengh);
                $("#summaryAgreementTextKey").text(results.en[146].agreementsText);
                $("#summaryAuctionTextKey").text(results.en[148].auctionText);
                $("#summaryShareGovTextKey").text(results.en[150].shareGovText);
                $("#summaryReOrgTextKey").text(results.en[152].reOrgText);
                $("#summaryDueDilliTextKey").text(results.en[154].dueDilliText);
                $("#summaryTaxStructTextKey").text(results.en[156].taxStructText);
                $("#summaryFinanceTextKey").text(results.en[158].financeText);

                $("#spnRecapTextKey").text(results.en[98].recapText);
                $("#spnGlossaryTextKey").text(results.en[99].glossaryText);
                $("#bnfHeadText").text(results.en[100].bnfHeadText);
                $("#spnQuoteSavedHeading").text(results.en[101].savedAlertHeading);
                $("#spnQuoteSavedSubHeading").text(results.en[102].savedAlertSubHeading);

                // Client View Modal Popup Data
                $("#clientViewHeading").text(results.en[80].clientViewHeading);
                $("#clientViewMatterNameText").text(results.en[0].matterName);
                $("#clientViewServiceAreaText").text(results.en[81].serviceAreaText);
                $("#clientViewLocationText").text(results.en[1].office);
                $("#clientViewOpeningDate").text(results.en[74].openDateText);
                $("#spnClientViewMatterDetailsTextKey").text(results.en[82].clientViewMatterDetails);
                $("#spnClientViewKeyFactorsTextKey").text(results.en[83].clientViewKeyFactors);
                $("#spnClientViewQuoteTotalText").text(results.en[92].clietViewFixedQuote);
                $("#spnClientViewQuoteTotalText1").text(results.en[92].clietViewFixedQuote);

                $("#spnClientViewValueBasedPricing").text(results.en[162].valuebasedPricingText);
                $("#spnClientViewPhaseBasedPricing").text(results.en[163].phasebasedPricingText);
                $("#spnClientViewMatterMgmtText").text(results.en[164].matterMgmtText);
                $("#spnClientViewDueDilliText").text(results.en[165].dueDilliText);
                $("#spnClientViewStructStrategyText").text(results.en[166].structText);
                $("#spnClientViewIDPText").text(results.en[167].idpText);
                $("#spnClientViewNegoText").text(results.en[168].negotiationText);
                $("#spnClientViewCloseText").text(results.en[169].closingText);
                $("#spnClientViewPostText").text(results.en[170].postClosingText);

               //SOW modal pop up

                $("#sowAgreementsTextKey").text(results.en[146].agreementsText);
                $("#sowAuctionTextKey").text(results.en[148].auctionText);
                $("#sowShareGovTextKey").text(results.en[150].shareGovText);
                $("#sowReOrgTextKey").text(results.en[152].reOrgText);
                $("#sowDDTextKey").text(results.en[154].dueDilliText);
                $("#sowTaxStructTextKey").text(results.en[156].taxStructText);
                $("#sowFinanceTextKey").text(results.en[158].financeText);

                $("#sowModalHeading").text(results.en[76].sowHeadingModalHeadText);
                $("#sowHeadingProjChar").text(results.en[77].sowHeadingProjCharText);
                $("#sowHeadingLevelSelect").text(results.en[78].sowHeadingLevelSelectText);
                $("#sowHeadingAssumption").text(results.en[79].sowHeadingAssumumptionText);
              
               
                //SUMMARY VIEW

                $("#summaryFinalGeneralMatterNameTextKey").text(results.en[64].step1TextKey);
                $("#summaryFinalMatterNameTextKey").text(results.en[0].matterName);
                $("#summaryFinalOpenDateTextKey").text(results.en[74].openDateText);
                $("#summaryFinalCloseDateTextKey").text(results.en[75].closeDateText);
                $("#summaryFinalLoanSizeTextKey").text(results.en[5].sizeOfLoan);
                $("#summaryFinalFinanceNatureTextKey").text(results.en[10].natureofFinanceText);
                $("#summaryFinalLocationTextKey").text(results.en[1].office);               
               
                $("#summaryFinalDealTypeTextKey").text(results.en[3].typeOfDeal);
                $("#summaryFinalRepresentationTextKey").text(results.en[6].representation);
                $("#summaryFinalTranTypeTextKey").text(results.en[122].transactionType);
                $("#summaryFinalTranSizeTextKey").text(results.en[124].transactionSize);
                $("#summaryFinalBuyerOriginTextKey").text(results.en[126].buyerOrigin);
                $("#summaryFinalRegIndTextKey").text(results.en[128].regInd);
                $("#summaryFinalCounselCoordTextKey").text(results.en[130].counselCoord);
                $("#summaryFinalMnACounselTextKey").text(results.en[132].mnaCounsel);

                $("#summaryFinalCTTextKey").text(results.en[135].clientType);
                $("#summaryFinalFTTextKey").text(results.en[137].firmType);
                $("#summaryFinalTLTextKey").text(results.en[139].tranLengh);
                $("#summaryFinalAgreementTextKey").text(results.en[146].agreementsText);
                $("#summaryFinalAuctionTextKey").text(results.en[148].auctionText);
                $("#summaryFinalShareGovTextKey").text(results.en[150].shareGovText);
                $("#summaryFinalReOrgTextKey").text(results.en[152].reOrgText);
                $("#summaryFinalDueDilliTextKey").text(results.en[154].dueDilliText);
                $("#summaryFinalTaxStructTextKey").text(results.en[156].taxStructText);
                $("#summaryFinalFinanceTextKey").text(results.en[158].financeText);


                $("#summaryFinalProjCharacterTextKey").text(results.en[65].step2TextKey);
                $("#summaryFinalTPATextKey").text(results.en[21].thirdPartyAckText);
                $("#summaryFinalCACTextKey").text(results.en[23].creditAgreeComplexText);
                $("#summaryFinalICATextKey").text(results.en[25].interCreditText);
                $("#summaryFinalCODTextKey").text(results.en[27].corpOfficerDocsText);
                $("#summaryFinalDDTextKey").text(results.en[29].dueDilliText);
                $("#summaryFinalCTTextKey").text(results.en[31].clientTypeText);
                $("#summaryFinalOFTTextKey").text(results.en[33].opposeFirmTypeText);

                $("#summaryFinalStaffMixTextKey").text(results.en[66].step3TextKey);
                $("#summaryFinalPartnerTextKey").text(results.en[35].partnersText);
                $("#summaryFinalAssociateTextKey").text(results.en[36].associatesText);
                $("#summaryFinalOtherTextKey").text(results.en[37].othersText);
                $("#summaryFinalTotalPartHoursTextKey").text(results.en[43].totalPartnerHoursText);
                $("#summaryFinalTotalAssociateHoursTextKey").text(results.en[44].totalAssociateHoursText);

                $("#summaryFinalQuotePredictTextKey").text(results.en[92].clietViewFixedQuote);

                $("#summaryFinalProjHours").text(results.en[60].projectedHoursKPITextKey);
                $("#summaryFinalFixedQuote").text(results.en[61].fixedQuoteKPITextKey);
                $("#summaryFinalTotalVsEQTextKey").text(results.en[62].partnerEQPartnerKPITextKey);
                $("#summaryFinalDisPreTextKey").text(results.en[63].discountPremiumKPITextKey);
                $("#summaryFinalQuoteRangeTextKey").text(results.en[96].fixedQuoteRangeText);
                $("#summaryFinalDisPrePercTextKey").text(results.en[97].discountPercText);
                $("#spnRecapTextKey").text(results.en[98].recapText);
                $("#spnGlossaryTextKey").text(results.en[99].glossaryText);
                $("#bnfHeadText").text(results.en[100].bnfHeadText);
                $("#spnQuoteSavedHeading").text(results.en[101].savedAlertHeading);
                $("#spnQuoteSavedSubHeading").text(results.en[102].savedAlertSubHeading);
            }

            else {

                $("#spnCreateQuoteText").text(results.fr[68].createQuoteTextKey);
                $("#spnEditQuoteText").text(results.fr[69].editQuoteTextKey);
                $("#mnaHeadText").text(results.fr[100].mnaHeadText);
                $("#spnProjHoursKPITextKey").text(results.fr[60].projectedHoursKPITextKey);
                $("#spnFixQuoteKPITextKey").text(results.fr[61].fixedQuoteKPITextKey);
                $("#spnPartEQPartKPITextKey").text(results.fr[62].partnerEQPartnerKPITextKey);
                $("#spnDisPreKPITextKey").text(results.fr[63].discountPremiumKPITextKey);
                $("#pills-step1-tab").text(results.fr[64].step1TextKey);
                $("#pills-step2-tab").text(results.fr[65].step2TextKey);
                $("#pills-step3-tab").text(results.fr[66].step3TextKey);
                $("#pills-step4-tab").text(results.fr[67].step4TextKey);
                $("#lnkBack").text(results.fr[93].backButtonText);
                $("#lnkNext").text(results.fr[94].nextButtonText);
                $("#lnkFinish").text(results.fr[95].finishAndSaveButtonText);
                $("#lnkGetDays").text(results.fr[19].getDaysText);
                $("#spnSaveQuoteTextKey").text(results.fr[70].saveQuoteTextKey);


                $("#spnMatterNameKey").text(results.fr[0].matterName);
                $("#txtMatterName").attr("placeholder", results.fr[0].matterName);
                $("#spnOfficeKey").text(results.fr[1].office);



                //clear the existing dropdown options
                $("#ddlOffices").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.fr[2].officeVal, function (i) {
                    options += '<option class="pt-3" value= "' + results.fr[2].officeVal[i].title.split('~')[0] + '">' + results.fr[2].officeVal[i].title.split('~')[1] + '</option>';
                    $("#ddlOffices").html(options);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlOffices").val(ddVal.split('~')[0]);

                $("#spnDealType").text(results.fr[3].typeOfDeal);
                $("#ddlDealType").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.fr[4].typeOfDealVal, function (i) {
                    options1 += '<option class="pt-3" value= "' + results.fr[4].typeOfDealVal[i].title.split('~')[0] + '">' + results.fr[4].typeOfDealVal[i].title.split('~')[1] + '</option>';
                    $("#ddlDealType").html(options1);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlDealType").val(ddVal.split('~')[1]);


                $("#spnRepresentation").text(results.fr[6].representation);
                $("#ddlRepresent").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.fr[7].representationVal, function (i) {
                    options2 += '<option class="pt-3" value= "' + results.fr[7].representationVal[i].title.split('~')[0] + '">' + results.fr[7].representationVal[i].title.split('~')[1] + '</option>';
                    $("#ddlRepresent").html(options2);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlRepresent").val(ddVal.split('~')[2]);

                $("#spnDatesKey").text(results.fr[8].datesText);
                $("#spnTentativeKey").text(results.fr[9].tentativeText);
                $("#txtOpeningDate").attr("placeholder", results.fr[74].openDateText);
                $("#txtClosingDate").attr("placeholder", results.fr[75].closeDateText);


                /////////////////////////////////


                $("#spnDealChar").text(results.fr[121].dealCharText);

                $("#spnTranType").text(results.fr[122].transactionType);
                $("#ddlTranType_DealChar").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.fr[123].transactionTypeVal, function (i) {
                    options3 += '<option class="pt-3" value= "' + results.fr[123].transactionTypeVal[i].title.split('~')[0] + '">' + results.fr[123].transactionTypeVal[i].title.split('~')[1] + '</option>';
                    $("#ddlTranType_DealChar").html(options3);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlTranType_DealChar").val(ddVal.split('~')[3]);


                $("#spnTranSize").text(results.fr[124].transactionSize);
                $("#ddlTranSize_DealChar").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.fr[125].transactionSizeVal, function (i) {
                    options4 += '<option class="pt-3" value= "' + results.fr[125].transactionSizeVal[i].title.split('~')[0] + '">' + results.fr[125].transactionSizeVal[i].title.split('~')[1] + '</option>';
                    $("#ddlTranSize_DealChar").html(options4);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlTranSize_DealChar").val(ddVal.split('~')[4]);

                $("#spnBO").text(results.fr[126].buyerOrigin);
                $("#ddlBO_DealChar").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.fr[127].buyerOriginVal, function (i) {
                    options5 += '<option class="pt-3" value= "' + results.fr[127].buyerOriginVal[i].title.split('~')[0] + '">' + results.fr[127].buyerOriginVal[i].title.split('~')[1] + '</option>';
                    $("#ddlBO_DealChar").html(options5);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlBO_DealChar").val(ddVal.split('~')[5]);

                $("#spnRegInd").text(results.fr[128].regInd);
                $("#ddlRegInd_DealChar").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.fr[129].regIndVal, function (i) {
                    options6 += '<option class="pt-3" value= "' + results.fr[129].regIndVal[i].title.split('~')[0] + '">' + results.fr[129].regIndVal[i].title.split('~')[1] + '</option>';
                    $("#ddlRegInd_DealChar").html(options6);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlRegInd_DealChar").val(ddVal.split('~')[6]);

                $("#spnCounsel").text(results.fr[130].counselCoord);
                $("#ddlCounsel_DealChar").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.fr[131].counselCoordVal, function (i) {
                    options7 += '<option class="pt-3" value= "' + results.fr[131].counselCoordVal[i].title.split('~')[0] + '">' + results.fr[131].counselCoordVal[i].title.split('~')[1] + '</option>';
                    $("#ddlCounsel_DealChar").html(options7);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlCounsel_DealChar").val(ddVal.split('~')[7]);

                $("#spnMNACounsel").text(results.fr[132].mnaCounsel);
                $("#ddlMNACounsel_DealChar").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.fr[133].mnaCounselVal, function (i) {
                    options8 += '<option class="pt-3" value= "' + results.fr[133].mnaCounselVal[i].title.split('~')[0] + '">' + results.fr[133].mnaCounselVal[i].title.split('~')[1] + '</option>';
                    $("#ddlMNACounsel_DealChar").html(options8);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlMNACounsel_DealChar").val(ddVal.split('~')[8]);


                $("#spnunknownvar").text(results.fr[134].unknownVarText);
                $("#spnClientType").text(results.fr[135].clientType);
                $("#ddlCT").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.fr[136].clientTypeVal, function (i) {
                    options9 += '<option class="pt-3" value= "' + results.fr[136].clientTypeVal[i].title.split('~')[0] + '">' + results.fr[136].clientTypeVal[i].title.split('~')[1] + '</option>';
                    $("#ddlCT").html(options9);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlCT").val(step2Val.split('~')[0]);

                $("#spnFirmType").text(results.fr[137].firmType);
                $("#ddlFT").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.fr[138].firmTypeVal, function (i) {
                    options10 += '<option class="pt-3" value= "' + results.fr[138].firmTypeVal[i].title.split('~')[0] + '">' + results.fr[138].firmTypeVal[i].title.split('~')[1] + '</option>';
                    $("#ddlFT").html(options10);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlFT").val(step2Val.split('~')[1]);

                $("#spnTranLength").text(results.fr[139].tranLengh);

                $("#spnIncreaseHoursText").text(results.fr[140].increaseHoursText);
                $("#spnCTHourRangeText").text(results.fr[141].clientTypeHourRange);
                $("#spnFTHourRangeText").text(results.fr[142].firmTypeHourRange);
                $("#spnTLHourRangeText").text(results.fr[143].tranLengthHourRange);
                $("#spnClientNeedsText").text(results.fr[144].clientNeedsText);
                $("#spnPASMixText").text(results.fr[145].PASMixText);

                $("#spnAgreement").text(results.fr[146].agreementsText);
                $("#ddlAgreement_ClientNeeds").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.fr[147].agreementsVal, function (i) {
                    options11 += '<option class="pt-3" value= "' + results.fr[147].agreementsVal[i].title.split('~')[0] + '">' + results.fr[147].agreementsVal[i].title.split('~')[1] + '</option>';
                    $("#ddlAgreement_ClientNeeds").html(options11);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlAgreement_ClientNeeds").val(step2Val.split('~')[2]);

                $("#spnAuction").text(results.fr[148].auctionText);
                $("#ddlAuction_ClientNeeds").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.fr[149].auctionVal, function (i) {
                    options12 += '<option class="pt-3" value= "' + results.fr[149].auctionVal[i].title.split('~')[0] + '">' + results.fr[149].auctionVal[i].title.split('~')[1] + '</option>';
                    $("#ddlAuction_ClientNeeds").html(options12);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlAuction_ClientNeeds").val(step2Val.split('~')[3]);

                $("#spnShareGov").text(results.fr[150].shareGovText);
                $("#ddlShareGov_ClientNeeds").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.fr[151].shareGovVal, function (i) {
                    options13 += '<option class="pt-3" value= "' + results.fr[151].shareGovVal[i].title.split('~')[0] + '">' + results.fr[151].shareGovVal[i].title.split('~')[1] + '</option>';
                    $("#ddlShareGov_ClientNeeds").html(options13);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlShareGov_ClientNeeds").val(step2Val.split('~')[4]);

                $("#spnReOrg").text(results.fr[152].reOrgText);
                $("#ddlReOrg_ClientNeeds").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.fr[153].reOrgVal, function (i) {
                    options14 += '<option class="pt-3" value= "' + results.fr[153].reOrgVal[i].title.split('~')[0] + '">' + results.fr[153].reOrgVal[i].title.split('~')[1] + '</option>';
                    $("#ddlReOrg_ClientNeeds").html(options14);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlReOrg_ClientNeeds").val(step2Val.split('~')[5]);

                $("#spnDueDilli").text(results.fr[154].dueDilliText);
                $("#ddlDueDilli_ClientNeeds").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.fr[155].dueDilliVal, function (i) {
                    options15 += '<option class="pt-3" value= "' + results.fr[155].dueDilliVal[i].title.split('~')[0] + '">' + results.fr[155].dueDilliVal[i].title.split('~')[1] + '</option>';
                    $("#ddlDueDilli_ClientNeeds").html(options15);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlDueDilli_ClientNeeds").val(step2Val.split('~')[6]);

                $("#spnTaxStruct").text(results.fr[156].taxStructText);
                $("#ddlTaxStruct_ClientNeeds").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.fr[157].taxStructVal, function (i) {
                    options16 += '<option class="pt-3" value= "' + results.fr[157].taxStructVal[i].title.split('~')[0] + '">' + results.fr[157].taxStructVal[i].title.split('~')[1] + '</option>';
                    $("#ddlTaxStruct_ClientNeeds").html(options16);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlTaxStruct_ClientNeeds").val(step2Val.split('~')[7]);


                $("#spnFinance").text(results.fr[158].financeText);
                $("#ddlFinance_ClientNeeds").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.fr[159].financeVal, function (i) {
                    options17 += '<option class="pt-3" value= "' + results.fr[159].financeVal[i].title.split('~')[0] + '">' + results.fr[159].financeVal[i].title.split('~')[1] + '</option>';
                    $("#ddlFinance_ClientNeeds").html(options17);
                });

                $("#spnPartnerText2").text(results.fr[35].partnersText);
                $("#spnAssociateText2").text(results.fr[36].associatesText);
                $("#spnOtherText2").text(results.fr[37].othersText);
                $("#spnAggregateStaffMixText").text(results.fr[38].aggregatedStaffText);

                // get the selected value of the dropdown from the variable
                $("#ddlFinance_ClientNeeds").val(step2Val.split('~')[8]);

                $("#totalMixPercText").text(results.fr[160].totalMixPercText);
                $("#partnerMixText").text(results.fr[35].partnersText);
                $("#associateMixText").text(results.fr[36].associatesText);
                $("#studentMixText").text(results.fr[37].othersText);
                $("#commentMixText").text(results.fr[161].commentMixText);

                $("#spnPartnerText3").text(results.fr[35].partnersText);
                $("#spnAssociateText3").text(results.fr[36].associatesText);

                $("#spnSelectedLocationText1").text(results.fr[41].selectedLocationText);
                $("#spnOtherLocationText1").text(results.fr[42].otherLocationText);
                $("#spnTotalPartnerHoursText").text(results.fr[43].totalPartnerHoursText);

                $("#spnSelectedLocationText2").text(results.fr[41].selectedLocationText);
                $("#spnOtherLocationText2").text(results.fr[42].otherLocationText);
                $("#spnTotalAssociateHoursText").text(results.fr[44].totalAssociateHoursText);


                $("#spnHoursRangeTextKey").text(results.fr[45].hoursRangeText);
                $("#spnHourDistriTextKey").text(results.fr[46].hoursDistributionText);
                $("#spnPartEQPartTextKey").text(results.fr[47].partnerEQPartnerText);
                $("#spnAvgRateTextKey").text(results.fr[48].avgRateText);

                $("#spnPartnerText4").text(results.fr[35].partnersText);
                $("#spnAssociateText4").text(results.fr[36].associatesText);
                $("#spnOthersText4").text(results.fr[37].othersText);

                $("#spnFasPriceTextKey").text(results.fr[49].fasquotePriceText);
                $("#spnFixedPriceTextKey").text(results.fr[51].fixedQuoteText);
                $("#spnQuoteRangeTextKey").text(results.fr[52].quoteRangeText);
                $("#spnBlendedSTDRateTextKey").text(results.fr[53].blendedSTDText);
                $("#spnBlendedDiscountTextKey").text(results.fr[54].blendedDiscountText);

                $("#spnAvgThresholdTextKey").text(results.fr[50].avgThresholdPriceText);
                $("#spnFixedQuoteTextKey2").text(results.fr[51].fixedQuoteText);
                $("#spnQuoteRangeTextKey2").text(results.fr[52].quoteRangeText);
                $("#spnBlendedSTDRateTextKey2").text(results.fr[53].blendedSTDText);
                $("#spnBlendedDiscountRateTextKey2").text(results.fr[54].blendedDiscountText);

                $("#spnPriceSTDRateTextKey").text(results.fr[55].priceAtSTDRateText);
                $("#spnQuoteTextKey1").text(results.fr[58].quoteText);

                $("#spnPriceFileMatterTextKey").text(results.fr[56].priceAtFileMatterText);
                $("#spnQuoteTextKey2").text(results.fr[58].quoteText);

                $("#spnPriceDiscountTextKey").text(results.fr[57].priceAtDiscountText);
                $("#spnQuoteTextKey3").text(results.fr[58].quoteText);
                $("#spnDisPreTextKey").text(results.fr[59].discountPremiumText);

                $("#step1Collapse").text(results.fr[71].step1CollapseText);
                $("#step2Collapse").text(results.fr[72].step2CollapseText);
                $("#step3Collapse").text(results.fr[73].step3CollapseText);

                $("#summaryMatterNameTextKey").text(results.fr[0].matterName);
                $("#summaryOpenDateTextKey").text(results.fr[74].openDateText);
                $("#summaryCloseDateTextKey").text(results.fr[75].closeDateText);
                $("#summaryLocationTextKey").text(results.fr[1].office);

                $("#summaryPartnersTextKey").text(results.fr[35].partnersText);
                $("#summaryAssociateTextKey").text(results.fr[36].associatesText);
                $("#summaryOthersTextKey").text(results.fr[37].othersText);
                $("#summaryPartnerHoursTextKey").text(results.fr[43].totalPartnerHoursText);
                $("#summaryAssociateHoursTextKey").text(results.fr[44].totalAssociateHoursText);


                $("#summaryDealTypeTextKey").text(results.fr[3].typeOfDeal);
                $("#summaryRepresentationTextKey").text(results.fr[6].representation);
                $("#summaryTranTypeTextKey").text(results.fr[122].transactionType);
                $("#summaryTranSizeTextKey").text(results.fr[124].transactionSize);
                $("#summaryBuyerOriginTextKey").text(results.fr[126].buyerOrigin);
                $("#summaryRegIndTextKey").text(results.fr[128].regInd);
                $("#summaryCounselCoordTextKey").text(results.fr[130].counselCoord);
                $("#summaryMnACounselTextKey").text(results.fr[132].mnaCounsel);

                $("#summaryCTTextKey").text(results.fr[135].clientType);
                $("#summaryFTTextKey").text(results.fr[137].firmType);
                $("#summaryTLTextKey").text(results.fr[139].tranLengh);
                $("#summaryAgreementTextKey").text(results.fr[146].agreementsText);
                $("#summaryAuctionTextKey").text(results.fr[148].auctionText);
                $("#summaryShareGovTextKey").text(results.fr[150].shareGovText);
                $("#summaryReOrgTextKey").text(results.fr[152].reOrgText);
                $("#summaryDueDilliTextKey").text(results.fr[154].dueDilliText);
                $("#summaryTaxStructTextKey").text(results.fr[156].taxStructText);
                $("#summaryFinanceTextKey").text(results.fr[158].financeText);

                $("#spnRecapTextKey").text(results.fr[98].recapText);
                $("#spnGlossaryTextKey").text(results.fr[99].glossaryText);
                $("#bnfHeadText").text(results.fr[100].bnfHeadText);
                $("#spnQuoteSavedHeading").text(results.fr[101].savedAlertHeading);
                $("#spnQuoteSavedSubHeading").text(results.fr[102].savedAlertSubHeading);

                // Client View Modal Popup Data
                $("#clientViewHeading").text(results.fr[80].clientViewHeading);
                $("#clientViewMatterNameText").text(results.fr[0].matterName);
                $("#clientViewServiceAreaText").text(results.fr[81].serviceAreaText);
                $("#clientViewLocationText").text(results.fr[1].office);
                $("#clientViewOpeningDate").text(results.fr[74].openDateText);
                $("#spnClientViewMatterDetailsTextKey").text(results.fr[82].clientViewMatterDetails);
                $("#spnClientViewKeyFactorsTextKey").text(results.fr[83].clientViewKeyFactors);
                $("#spnClientViewQuoteTotalText").text(results.fr[92].clietViewFixedQuote);
                $("#spnClientViewQuoteTotalText1").text(results.fr[92].clietViewFixedQuote);


                $("#spnClientViewValueBasedPricing").text(results.fr[162].valuebasedPricingText);
                $("#spnClientViewPhaseBasedPricing").text(results.fr[163].phasebasedPricingText);
                $("#spnClientViewMatterMgmtText").text(results.fr[164].matterMgmtText);
                $("#spnClientViewDueDilliText").text(results.fr[165].dueDilliText);
                $("#spnClientViewStructStrategyText").text(results.fr[166].structText);
                $("#spnClientViewIDPText").text(results.fr[167].idpText);
                $("#spnClientViewNegoText").text(results.fr[168].negotiationText);
                $("#spnClientViewCloseText").text(results.fr[169].closingText);
                $("#spnClientViewPostText").text(results.fr[170].postClosingText);

                // sow modal popup

                $("#sowAgreementsTextKey").text(results.fr[146].agreementsText);
                $("#sowAuctionTextKey").text(results.fr[148].auctionText);
                $("#sowShareGovTextKey").text(results.fr[150].shareGovText);
                $("#sowReOrgTextKey").text(results.fr[152].reOrgText);
                $("#sowDDTextKey").text(results.fr[154].dueDilliText);
                $("#sowTaxStructTextKey").text(results.fr[156].taxStructText);
                $("#sowFinanceTextKey").text(results.fr[158].financeText);

                $("#sowModalHeading").text(results.fr[76].sowHeadingModalHeadText);
                $("#sowHeadingProjChar").text(results.fr[77].sowHeadingProjCharText);
                $("#sowHeadingLevelSelect").text(results.fr[78].sowHeadingLevelSelectText);
                $("#sowHeadingAssumption").text(results.fr[79].sowHeadingAssumumptionText);

                //SUMMARY VIEW

                $("#summaryFinalGeneralMatterNameTextKey").text(results.fr[64].step1TextKey);
                $("#summaryFinalMatterNameTextKey").text(results.fr[0].matterName);
                $("#summaryFinalOpenDateTextKey").text(results.fr[74].openDateText);
                $("#summaryFinalCloseDateTextKey").text(results.fr[75].closeDateText);
                $("#summaryFinalLoanSizeTextKey").text(results.fr[5].sizeOfLoan);
                $("#summaryFinalFinanceNatureTextKey").text(results.fr[10].natureofFinanceText);
                $("#summaryFinalLocationTextKey").text(results.fr[1].office);

                $("#summaryFinalProjCharacterTextKey").text(results.fr[65].step2TextKey);
                $("#summaryFinalDealTypeTextKey").text(results.fr[3].typeOfDeal);
                $("#summaryFinalRepresentationTextKey").text(results.fr[6].representation);
                $("#summaryFinalTranTypeTextKey").text(results.fr[122].transactionType);
                $("#summaryFinalTranSizeTextKey").text(results.fr[124].transactionSize);
                $("#summaryFinalBuyerOriginTextKey").text(results.fr[126].buyerOrigin);
                $("#summaryFinalRegIndTextKey").text(results.fr[128].regInd);
                $("#summaryFinalCounselCoordTextKey").text(results.fr[130].counselCoord);
                $("#summaryFinalMnACounselTextKey").text(results.fr[132].mnaCounsel);

                $("#summaryFinalCTTextKey").text(results.fr[135].clientType);
                $("#summaryFinalFTTextKey").text(results.fr[137].firmType);
                $("#summaryFinalTLTextKey").text(results.fr[139].tranLengh);
                $("#summaryFinalAgreementTextKey").text(results.fr[146].agreementsText);
                $("#summaryFinalAuctionTextKey").text(results.fr[148].auctionText);
                $("#summaryFinalShareGovTextKey").text(results.fr[150].shareGovText);
                $("#summaryFinalReOrgTextKey").text(results.fr[152].reOrgText);
                $("#summaryFinalDueDilliTextKey").text(results.fr[154].dueDilliText);
                $("#summaryFinalTaxStructTextKey").text(results.fr[156].taxStructText);
                $("#summaryFinalFinanceTextKey").text(results.fr[158].financeText);

                $("#summaryFinalStaffMixTextKey").text(results.fr[66].step3TextKey);
                $("#summaryFinalPartnerTextKey").text(results.fr[35].partnersText);
                $("#summaryFinalAssociateTextKey").text(results.fr[36].associatesText);
                $("#summaryFinalOtherTextKey").text(results.fr[37].othersText);
                $("#summaryFinalTotalPartHoursTextKey").text(results.fr[43].totalPartnerHoursText);
                $("#summaryFinalTotalAssociateHoursTextKey").text(results.fr[44].totalAssociateHoursText);

                $("#summaryFinalQuotePredictTextKey").text(results.fr[92].clietViewFixedQuote);

                $("#summaryFinalProjHours").text(results.fr[60].projectedHoursKPITextKey);
                $("#summaryFinalFixedQuote").text(results.fr[61].fixedQuoteKPITextKey);
                $("#summaryFinalTotalVsEQTextKey").text(results.fr[62].partnerEQPartnerKPITextKey);
                $("#summaryFinalDisPreTextKey").text(results.fr[63].discountPremiumKPITextKey);
                $("#summaryFinalQuoteRangeTextKey").text(results.fr[96].fixedQuoteRangeText);
                $("#summaryFinalDisPrePercTextKey").text(results.fr[97].discountPercText);
                $("#spnRecapTextKey").text(results.fr[98].recapText);
                $("#spnGlossaryTextKey").text(results.fr[99].glossaryText);
                $("#bnfHeadText").text(results.fr[100].bnfHeadText);
                $("#spnQuoteSavedHeading").text(results.fr[101].savedAlertHeading);
                $("#spnQuoteSavedSubHeading").text(results.fr[102].savedAlertSubHeading);
            }
        }
    });
}

//get all partner rows by the selected location

function getAllPartnersByLocation(location, exceptionRate) {

    var data = null;

    $.ajax({
        type: 'GET',
        async: false,
        url: 'createQuote_MnA.aspx/GetAllPartnersByOfficeLocation?location=' + JSON.stringify(location),
        contentType: "application/json; charset=utf-8",
        success: function (results) {
            //try {
            data = JSON.parse(JSON.parse(JSON.stringify(results.d)));

            console.log("partners by location", data);

            $("select").each(function () {
                if ($(this)[0].id.indexOf('ddlPartner') > -1) {

                    if (data.length > 0 && $(this)[0].id.endsWith('1') || $(this)[0].id.endsWith('2') || $(this)[0].id.endsWith('3') || $(this)[0].id.endsWith('4') || $(this)[0].id.endsWith('5')) {
                        //  console.log($(this)[0].id);
                        var options = '';


                        if (exceptionRate === 'None' || exceptionRate === '--Select--') {

                            $.each(data, function (i, item) {
                                options += '<option class="pt-3" value= "' + item["tkID"] + '~' + item["standardRate"] + '~' + item["exceptionRates"] + '~' + item["title"] + '~' + item["dcRates"] + '~' + item["office"] + '">' + item["partnerName"] + '-- $' + Math.round(item["standardRate"]) + '</option>';
                            });
                            $(this).html(options);
                        }
                        else {
                            $.each(data, function (i, item) {
                                options += '<option class="pt-3" value= "' + item["tkID"] + '~' + item["standardRate"] + '~' + item["exceptionRates"] + '~' + item["title"] + '~' + item["dcRates"] + '~' + item["office"] + '">' + item["partnerName"] + '-- $' + Math.round(item["exceptionRates"]) + '</option>';
                            });
                            $(this).html(options);
                        }
                    }
                    else {
                        $(this).empty();
                    }

                }


            });
            // }
            //catch (e) {

            //}

        },
        error: function (xhr, status, error) {
            console.log(xhr.responseJSON);
            console.log(error);
            console.log(status);

        }
    });

    //  return partnerList;
}

//get all partner rows by the not selected location

function getAllPartnersByOfficeNotInLocation(location, exceptionRate) {

    var data = null;

    $.ajax({
        type: 'GET',
        async: false,
        url: 'createQuote_MnA.aspx/GetAllPartnersByOfficeNotInLocation?location=' + JSON.stringify(location),
        contentType: "application/json; charset=utf-8",
        success: function (results) {

            //try {
            data = JSON.parse(JSON.parse(JSON.stringify(results.d)));
            $("select").each(function () {
                if ($(this)[0].id.indexOf('ddlPartner') > -1) {

                    if (data.length > 0 && $(this)[0].id.endsWith('6') || $(this)[0].id.endsWith('7') || $(this)[0].id.endsWith('8')) {
                        // console.log($(this)[0].id);
                        var options = '';
                        if (exceptionRate === 'None' || exceptionRate === '--Select--') {

                            $.each(data, function (i, item) {
                                options += '<option class="pt-3" value= "' + item["tkID"] + '~' + item["standardRate"] + '~' + item["exceptionRates"] + '~' + item["title"] + '~' + item["dcRates"] + '~' + item["office"] + '">' + item["partnerName"] + '-- $' + item["standardRate"] + '</option>';
                            });

                        }
                        else {
                            $.each(data, function (i, item) {
                                options += '<option class="pt-3" value= "' + item["tkID"] + '~' + item["standardRate"] + '~' + item["exceptionRates"] + '~' + item["title"] + '~' + item["dcRates"] + '~' + item["office"] + '">' + item["partnerName"] + '-- $' + item["exceptionRates"] + '</option>';
                            });

                        }

                        $(this).html(options);
                    }
                    // else
                    //     $(this).html("");


                    $(this).prepend("<option value='select'  selected='selected'>--</option>");
                }


            });
            //  }
            //catch (e) {

            //}
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseJSON);
            console.log(error);
            console.log(status);

        }
    });

    //  return partnerList;
}

// adding the selected dela characteristics values in array and calculating total hours

function getTotalHours_DealChars(representation, dealCharColumn, dealCharColumnVal) {

    $.ajax({
        type: 'GET',
        url: './BAL/jsondata/mnaDealCharValues.json',
        cache: false,
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (results) {
            console.log(results.dealCharColumn[0].representation[0].dealCharColumnVal)
        }
    });

}

// function to add up the total partner hours X rate

function getPartnerTotalHours() {
    var totalPartnerHours = 0;
    var hour = 0;
    var rate = 0;

    $("select").each(function () {

        if ($(this)[0].id.startsWith('ddlPartner')) {

            hour = parseFloat(parseInt($(this).parent().parent().find("input").eq(1).val()) / 100);

            rate = parseFloat($(this).val().split('~')[1]);


            if (rate > 0 && hour > 0)
                totalPartnerHours += parseFloat(hour * rate);
            else
                totalPartnerHours += 0;

        }
    });

    return totalPartnerHours;
}

// function to add up the total associates hours X rate

function getAssociatesTotalHours() {
    var totalAssociatesHours = 0;
    var hour = 0;
    var rate = 0;

    $("select").each(function () {

        if ($(this)[0].id.startsWith('ddlAssociate')) {

            hour = parseFloat(parseInt($(this).parent().parent().find("input").eq(1).val()) / 100);
            rate = parseInt($(this).parent().parent().find("input").eq(0).val().replace('$', ''));


            if (rate > 0 && hour > 0)
                totalAssociatesHours += parseFloat(hour * rate);
            else
                totalAssociatesHours += 0;


        }
    });

    return totalAssociatesHours;
}

// function to get average rates for partners, associates and others

function getAvgRates_PartnerAssociatesOthers() {

    var avgRate = 0;
    var objectLength = 0;
    var arrAvgRate = [];

    $.ajax({
        dataType: "json",
        url: "BAL/JSONData/avgRates.json",
        async: false,
        cache: false,  //do not cache
        success: function (json) {
            obj = JSON.parse(JSON.stringify(json));
            $.each(obj, function (i, item) {
                if (i === 'Partner') {
                    objectLength = obj[i].length;
                    $.each(obj[i], function (j, location) {
                        $.each(location, function (k, value) {
                            avgRate += value;
                        });
                    });
                    avgRate = avgRate / parseInt(objectLength);
                    arrAvgRate.push(avgRate);
                    avgRate = 0;
                }
                else if (i === 'Associate') {
                    objectLength = obj[i].length;
                    $.each(obj[i], function (j, location) {
                        $.each(location, function (k, value) {
                            avgRate += value;
                        });
                    });
                    avgRate = avgRate / parseInt(objectLength);
                    arrAvgRate.push(avgRate);
                    avgRate = 0;
                }
                else if (i === 'Other') {
                    objectLength = obj[i].length;
                    $.each(obj[i], function (j, location) {
                        $.each(location, function (k, value) {
                            avgRate += value;
                        });
                    });
                    avgRate = avgRate / parseInt(objectLength);
                    arrAvgRate.push(avgRate);
                    avgRate = 0;
                }
            });


        }
    });

    return arrAvgRate;
}

// fetching the dropdown values from the database tables supplied as array
function fetchPartnerAndAssociateFields(arrData, ddlID) {

    var options = "";
    $.ajax({
        cache: false,
        async: true,
        success: function () {
            $.each(arrData, function (i) {

                options += '<option class="pt-3" value= "' + arrData[i].tkID + '">' + arrData[i].partnerName + '--$' + arrData[i].standardRate + '</option>';
                //  console.log(options);
                $("#" + ddlID).html(options);

            });
        }
    });




}


function getTotalHoursDistribution(titlePerc, totalHours) {

    return parseFloat(totalHours * parseInt(titlePerc)) / (100 * 100);

}


function get_TotalBlendedRate_Associates_Others(office, title) {

    var stdRate = 0;

    $.ajax({
        dataType: "json",
        url: "BAL/JSONData/avgRatesMnA.json",
        async: false,
        cache: false,  //do not cache
        success: function (json) {
            obj = JSON.parse(JSON.stringify(json));
            $.each(obj, function (i, item) {
                if (i === title) {
                    $.each(obj[i], function (j, location) {
                        if (location[office] > 0) {
                            stdRate = parseFloat(location[office]);
                            return false;
                        }

                    });
                }
            });
        }
    });

    return stdRate;

}



// Adding the data to the quote Table
function insertMNAQuoteData(jsonData) {

    var temp = null;

    $.ajax({
        type: 'POST',
        url: 'createQuote_MnA.aspx/InsertMnAQuoteData',
        data: '{param: ' + jsonData + '}',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (results) {
            console.log("data inserted successfully");
            // return results.d;
            temp = results.d;
        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    });

    console.log(temp);
    return temp;

}

// Updating the data to the quote Table
function updateMNAQuoteData_Step1(jsonData) {

    console.log("inside the function in mna data");

    $.ajax({
        type: 'POST',
        url: 'createQuote_MnA.aspx/UpdateMnAQuoteData_Step1',
        data: '{param: ' + jsonData + '}',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (results) {
            console.log("data updated successfully", results);
        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    });

}

// Updating the data to the quote Table
function updateMNAQuoteData_Step2(jsonData) {

    console.log("inside the function in mna data");

    $.ajax({
        type: 'POST',
        url: 'createQuote_MnA.aspx/UpdateMnAQuoteData_Step2',
        data: '{param: ' + jsonData + '}',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (results) {
            console.log("data updated successfully", results);
        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    });

}

// Updating the data to the quote Table
function updateMNAQuoteData_Step3(jsonData) {

    console.log("inside the function in mna data");

    $.ajax({
        type: 'POST',
        url: 'createQuote_MnA.aspx/UpdateMnAQuoteData_Step3',
        data: '{param: ' + jsonData + '}',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (results) {
            console.log("data updated successfully", results);
        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    });

}

// Updating the data to the quote Table - STEP 4
function updateMNAQuoteData_Step4(jsonData) {

    console.log("step 4 params", jsonData);

    $.ajax({
        type: 'POST',
        url: 'createQuote_MnA.aspx/UpdateMnAQuoteData_Step4',
        data: '{param: ' + jsonData + '}',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (results) {
            console.log("data updated successfully");
        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    });

}


// get all the user data by Quote ID

function getRowsbyQuoteID(jsonData) {

    var selectQuotesByQuoteID = [];

    $.ajax({
        type: 'GET',
        url: 'createQuote_MnA.aspx/GetAllRowsByQuoteID_MnA?ID=' + JSON.stringify(jsonData),
        cache: false,
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (results) {
            var ob = JSON.parse(JSON.stringify(results));
            selectQuotesByQuoteID = JSON.parse(ob.d);
            //nextOB;

        },
        error: function (xhr, status, error) {
            console.log(xhr.responseJSON);
            console.log(status);
        }
    });

    return selectQuotesByQuoteID;
}

// function to get average rates for partners, associates and others

//function getAvgRates_PartnerAssociatesOthers() {

//    var avgRate = 0;
//    var objectLength = 0;
//    var arrAvgRate = [];

//    $.ajax({
//        dataType: "json",
//        url: "BAL/JSONData/avgRates.json",
//        async: false,
//        cache: false,  //do not cache
//        success: function (json) {
//            obj = JSON.parse(JSON.stringify(json));
//            $.each(obj, function (i, item) {
//                if (i === 'Partner') {
//                    objectLength = obj[i].length;
//                    $.each(obj[i], function (j, location) {
//                        $.each(location, function (k, value) {
//                            avgRate += value;
//                        });
//                    });
//                    avgRate = avgRate / parseInt(objectLength);
//                    arrAvgRate.push(avgRate);
//                    avgRate = 0;
//                }
//                else if (i === 'Associate') {
//                    objectLength = obj[i].length;
//                    $.each(obj[i], function (j, location) {
//                        $.each(location, function (k, value) {
//                            avgRate += value;
//                        });
//                    });
//                    avgRate = avgRate / parseInt(objectLength);
//                    arrAvgRate.push(avgRate);
//                    avgRate = 0;
//                }
//                else if (i === 'Other') {
//                    objectLength = obj[i].length;
//                    $.each(obj[i], function (j, location) {
//                        $.each(location, function (k, value) {
//                            avgRate += value;
//                        });
//                    });
//                    avgRate = avgRate / parseInt(objectLength);
//                    arrAvgRate.push(avgRate);
//                    avgRate = 0;
//                }
//            });


//        }
//    });

//    return arrAvgRate;
//}

//get all associate rows by the selected client Group


function getAllAssociates() {

    var data = null;

    $.ajax({
        type: 'GET',
        async: false,
        url: 'createQuote_MnA.aspx/GetAllAssociates',
        contentType: "application/json; charset=utf-8",
        success: function (results) {

            //  try {
            data = JSON.parse(JSON.parse(JSON.stringify(results.d)));
            $("select").each(function () {
                if ($(this)[0].id.indexOf('ddlAssociate') > -1) {
                    var options = '';
                    if (data.length > 0) {

                        $.each(data, function (i, item) {
                            // options += '<option class="pt-3" value= "' + item["tkID"] + '">' + item["partnerName"] + '-- $' + item["standardRate"] + '</option>';
                            options += '<option class="pt-3" value="' + String(item["partnerName"].split(',')[1]).trim() + '_' + String(item["partnerName"].split(',')[0]).trim() + '~' + item["standardRate"] + '">' + item["partnerName"] + '-- $' + Math.round(item["standardRate"]) + '</option>';
                        });

                        $(this).html(options);

                    }
                    else
                        $(this).html("");


                    $(this).prepend("<option value='select' selected='selected'>--<option>");

                }


            });
            //}
            //catch (e) {

            //}
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseJSON);
            console.log(error);
            console.log(status);

        }
    });

    //  return partnerList;
}

function getWaterFallChartBars() {

    var stdRate = 0;

    stdRate = parseFloat($("#txtPriceAtQuoteSTDRate").text().replace('$', '').replace(',', ''))/1000;


    var discount = parseFloat($("#txtDiscount").text().replace('%', '')) * stdRate / 100;
    var fixedPrice = stdRate + discount;
    var compExlEP = parseFloat(arrQuoteValues[0].total_DC_Exl_EP) / 1000;
    var contribution = fixedPrice + compExlEP;
    var overhead = (parseFloat(arrQuoteValues[0].combinedOHRate / 1000) + parseFloat(arrQuoteValues[0].combinedFEARate / 1000));
    var profits = contribution + overhead;
    var profitAfterEPComp = parseFloat(arrQuoteValues[0].totalDC_EQPartner / 1000);
    var risks = 0; // 0
    var ProfitsAfterRisk = 0; //

    console.log("Waterfall chart values", stdRate, discount, fixedPrice, compExlEP, contribution, overhead, profits, profitAfterEPComp);

    Highcharts.setOptions({
        //blue 		- green 	- red 		- grey	- light red
        colors: ['#263f73', '#91b806', '#b74444', '#656565', '#CD6060']


    });

    var disColor;
    if (discount > 0)
        disColor = Highcharts.getOptions().colors[1];
    else
        disColor = Highcharts.getOptions().colors[2];



    var chart = Highcharts.chart('waterfallContainer', {
        chart: {
            type: 'waterfall'
        },

        title: {
            text: '<h3>Profit Summary - ' + $("#txtMatterName").val() + '</h3>'
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
                { name: 'Initial Quote', y: stdRate, color: Highcharts.getOptions().colors[0] },
                { name: 'Premium<br/>/Discount', y: discount, color: disColor },
                { name: 'Fixed Price ', isSum: true, color: Highcharts.getOptions().colors[0] },
                { name: 'Timekeeper Comp. Exl. EP', y: -compExlEP, color: Highcharts.getOptions().colors[2] },
                { name: 'Contribution', isSum: true, color: Highcharts.getOptions().colors[0] },
                { name: 'Overhead', y: -overhead, color: Highcharts.getOptions().colors[2] },
                { name: 'Profits', isSum: true, color: Highcharts.getOptions().colors[0] },
                { name: 'EP Comp.', y: -profitAfterEPComp, color: Highcharts.getOptions().colors[2] },
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

    chart.setSize(900, 500);

}

function getSenstivityChartBars(discount, office, arrQuoteValues, projectedHours, levarage, asso_levarage, other_levarage) {


    console.log("Senstivity chart calculation feeder values", discount, office, arrQuoteValues, projectedHours, levarage, asso_levarage, other_levarage);

    var arrLineChart1 = [];
    var arrLineChart2 = [];

    var partner_costRate = 0;
    var asso_costRate = 0;
    var other_costRate = 0;


    var fixedRate = 0;


    fixedRate = parseFloat(arrQuoteValues[0].fixedSTDRate);



    asso_AvgRate = parseFloat(get_TotalBlendedRate_Associates_Others(office, 'Associate'));
    other_AvgRate = parseFloat(get_TotalBlendedRate_Associates_Others(office, 'Other'));

    partner_costRate = parseFloat((arrQuoteValues[0].totalDC_Partner * arrQuoteValues[0].epPerc / 100) + (arrQuoteValues[0].totalDC_NEPartner * arrQuoteValues[0].nepPerc / 100) + arrQuoteValues[0].totalOH_Partner + arrQuoteValues[0].totalFEA_Partner);
    asso_costRate = parseFloat(getOverHead_FEACost(office, 'Associate')[2]);
    other_costRate = parseFloat(getOverHead_FEACost(office, 'Other')[2]);



    var fixedFees = parseFloat(fixedRate * (1 + (discount / 100)) / 1000);


    console.log("--Preparing senstivity chart values --  ---- price vs levarage");

    //console.log(fixedFees - 100, 0, projectedHours, (parseInt(levarage) - 5), other_levarage, partner_costRate, asso_costRate, other_costRate);
    //console.log(calculateProfits(fixedFees - 100, 0, projectedHours, (parseInt(levarage) - 5), other_levarage, partner_costRate, asso_costRate, other_costRate));

    arrLineChart1.push(calculateProfits(fixedFees - 100, 0, projectedHours, parseInt(levarage) - 5, other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees - 100, 0, projectedHours, parseInt(levarage) + 0, other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees - 100, 0, projectedHours, parseInt(levarage) + 5, other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees - 100, 0, projectedHours, parseInt(levarage) + 10, other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees - 100, 0, projectedHours, parseInt(levarage) + 15, other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees - 100, 0, projectedHours, parseInt(levarage) + 20, other_levarage, partner_costRate, asso_costRate, other_costRate));

    arrLineChart1.push(calculateProfits(fixedFees, 0, projectedHours, (parseInt(levarage) - 5), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees, 0, projectedHours, parseInt(levarage) + 0, other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees, 0, projectedHours, parseInt(levarage) + 5, other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees, 0, projectedHours, parseInt(levarage) + 10, other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees, 0, projectedHours, parseInt(levarage) + 15, other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees, 0, projectedHours, parseInt(levarage) + 20, other_levarage, partner_costRate, asso_costRate, other_costRate));

    arrLineChart1.push(calculateProfits(fixedFees + 100, 0, projectedHours, (parseInt(levarage) - 5), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 100, 0, projectedHours, parseInt(levarage) + 0, other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 100, 0, projectedHours, parseInt(levarage) + 5, other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 100, 0, projectedHours, parseInt(levarage) + 10, other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 100, 0, projectedHours, parseInt(levarage) + 15, other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 100, 0, projectedHours, parseInt(levarage) + 20, other_levarage, partner_costRate, asso_costRate, other_costRate));

    arrLineChart1.push(calculateProfits(fixedFees + 200, 0, projectedHours, (parseInt(levarage) - 5), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 200, 0, projectedHours, parseInt(levarage) + 0, other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 200, 0, projectedHours, parseInt(levarage) + 5, other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 200, 0, projectedHours, parseInt(levarage) + 10, other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 200, 0, projectedHours, parseInt(levarage) + 15, other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 200, 0, projectedHours, parseInt(levarage) + 20, other_levarage, partner_costRate, asso_costRate, other_costRate));

    arrLineChart1.push(calculateProfits(fixedFees + 300, 0, projectedHours, (parseInt(levarage) - 5), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 300, 0, projectedHours, parseInt(levarage) + 0, other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 300, 0, projectedHours, parseInt(levarage) + 5, other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 300, 0, projectedHours, parseInt(levarage) + 10, other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 300, 0, projectedHours, parseInt(levarage) + 15, other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 300, 0, projectedHours, parseInt(levarage) + 20, other_levarage, partner_costRate, asso_costRate, other_costRate));

    arrLineChart1.push(calculateProfits(fixedFees + 400, 0, projectedHours, (parseInt(levarage) - 5), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 400, 0, projectedHours, parseInt(levarage) + 0, other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 400, 0, projectedHours, parseInt(levarage) + 5, other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 400, 0, projectedHours, parseInt(levarage) + 10, other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 400, 0, projectedHours, parseInt(levarage) + 15, other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 400, 0, projectedHours, parseInt(levarage) + 20, other_levarage, partner_costRate, asso_costRate, other_costRate));


    console.log("--Preparing senstivity chart values --  ---- price vs hour change");

    arrLineChart2.push(calculateProfits(fixedFees - 100, -5, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart2.push(calculateProfits(fixedFees - 100, 0, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart2.push(calculateProfits(fixedFees - 100, 5, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart2.push(calculateProfits(fixedFees - 100, 10, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart2.push(calculateProfits(fixedFees - 100, 15, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart2.push(calculateProfits(fixedFees - 100, 20, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));

    arrLineChart2.push(calculateProfits(fixedFees, -5, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart2.push(calculateProfits(fixedFees, 0, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart2.push(calculateProfits(fixedFees, 5, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart2.push(calculateProfits(fixedFees, 10, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart2.push(calculateProfits(fixedFees, 15, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart2.push(calculateProfits(fixedFees, 20, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));

    arrLineChart2.push(calculateProfits(fixedFees + 100, -5, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart2.push(calculateProfits(fixedFees + 100, 0, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart2.push(calculateProfits(fixedFees + 100, 5, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart2.push(calculateProfits(fixedFees + 100, 10, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart2.push(calculateProfits(fixedFees + 100, 15, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart2.push(calculateProfits(fixedFees + 100, 20, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));

    arrLineChart2.push(calculateProfits(fixedFees + 200, -5, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart2.push(calculateProfits(fixedFees + 200, 0, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart2.push(calculateProfits(fixedFees + 200, 5, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart2.push(calculateProfits(fixedFees + 200, 10, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart2.push(calculateProfits(fixedFees + 200, 15, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart2.push(calculateProfits(fixedFees + 200, 20, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));

    arrLineChart2.push(calculateProfits(fixedFees + 300, -5, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart2.push(calculateProfits(fixedFees + 300, 0, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart2.push(calculateProfits(fixedFees + 300, 5, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart2.push(calculateProfits(fixedFees + 300, 10, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart2.push(calculateProfits(fixedFees + 300, 15, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart2.push(calculateProfits(fixedFees + 300, 20, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));

    arrLineChart2.push(calculateProfits(fixedFees + 400, -5, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart2.push(calculateProfits(fixedFees + 400, 0, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart2.push(calculateProfits(fixedFees + 400, 5, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart2.push(calculateProfits(fixedFees + 400, 10, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart2.push(calculateProfits(fixedFees + 400, 15, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart2.push(calculateProfits(fixedFees + 400, 20, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate));


    //console.log(arrLineChart1);
    //console.log(arrLineChart2);
    //Line Chart Begins


    var profitDelta = calculateProfits(fixedFees - 100, 0, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate) - calculateProfits(fixedFees - 100, 0, projectedHours, parseInt(levarage) + 5, other_levarage, partner_costRate, asso_costRate, other_costRate);
    var profitDelata_Hours = calculateProfits(fixedFees - 100, -5, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate) - calculateProfits(fixedFees - 100, 0, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate);
    var xInterval = (levarage - (levarage - 5));

    Highcharts.chart('senstivityChart1', {

        title: {
            text: '<span style="font-size:15px;" > What is the impact on profits as a result of changing price and Equity Partner time?</span>'
        },
        credits: { enabled: false },
        subtitle: {
            useHTML: true,
            text: '<span style="font-size:15px;">&#8595;</span>&nbsp;<span style="font-size:15px;">' + xInterval.toFixed(1) + '%</span>&nbsp;&nbsp;<span style="font-size:15px;">&#8594;</span>&nbsp; <span style="font-size:15px;">$' + profitDelta.toFixed(1) + 'K</span>&nbsp;' + '<span style="font-size:15px;">&#8593;</span>'//    'This is the subtitle'
        },

        xAxis: {

            pointStart: Math.round(levarage) - 5,//Math.round(calcPtrPerc -5) > 0 ? Math.round(calcPtrPerc -5): 0,    	
            categories: [Math.round(levarage) - 5, Math.round(levarage), Math.round(levarage) + 5, Math.round(levarage) + 10, Math.round(levarage) + 15, Math.round(levarage) + 20, Math.round(levarage) + 25],
            title: {
                text: "Partner Time %"
            }

        },

        yAxis: {
            tickInterval: 100,
            title: {
                text: 'Profits ($ 000\')'
            }

        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        tooltip: {
            formatter: function () {
                return 'Equity Partner Time' + ' : ' + this.x + '%<br/>Fixed Fees : ' + this.series.name + '<br/><b>Profits : $' + this.y.toFixed(1) + 'K</b>';
            }
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                marker: {
                    radius: 0.001,

                    states: {
                        hover: {
                            enabled: true
                        },
                        select: {
                            radius: 6,
                            enabled: true
                        }
                    }
                },


            }
        },

        exporting: {
            allowHTML: true,
            enabled: false
        },


        series: [

            { name: '<span style="font-size:10px">$ ' + parseFloat(parseFloat(fixedFees) - parseFloat(0.1)).toFixed(1) + ' K Fees</span>', color: Highcharts.getOptions().colors[0], data: [arrLineChart1[0], arrLineChart1[1], arrLineChart1[2], arrLineChart1[3], arrLineChart1[4], arrLineChart1[5]] },
            { name: '<span style="font-size:10px">$ ' + parseFloat(fixedFees).toFixed(1) + ' K</span>', color: Highcharts.getOptions().colors[2], data: [arrLineChart1[6], arrLineChart1[7], arrLineChart1[8], arrLineChart1[9], arrLineChart1[10], arrLineChart1[11]] },
            { name: '<span style="font-size:10px">$ ' + parseFloat(parseFloat(fixedFees) + parseFloat(0.1)).toFixed(1) + ' K</span>', color: Highcharts.getOptions().colors[3], data: [arrLineChart1[12], arrLineChart1[13], arrLineChart1[14], arrLineChart1[15], arrLineChart1[16], arrLineChart1[17]] },
            { name: '<span style="font-size:10px">$ ' + parseFloat(parseFloat(fixedFees) + parseFloat(0.2)).toFixed(1) + ' K</span>', color: Highcharts.getOptions().colors[1], data: [arrLineChart1[18], arrLineChart1[19], arrLineChart1[20], arrLineChart1[21], arrLineChart1[22], arrLineChart1[23]] },




        ],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });

    var chart = $('#senstivityChart1').highcharts();
    chart.series[1].data[1].select(true, true);


    Highcharts.chart('senstivityChart2', {

        title: {
            text: '<span style="font-size:15px;">How do I ensure efficiency during execution?</span>'
        },

        subtitle: {
            useHTML: true,
            text: '<span style="font-size:15px;">&#8595;</span>&nbsp;<span style="font-size:15px;">' + xInterval.toFixed(1) + '%</b>&nbsp;&nbsp;<span style="font-size:13px;">&#8594;</span>&nbsp; <span style="font-size:15px;">$' + profitDelata_Hours.toFixed(1) + 'K</span>&nbsp;' + '<span style="font-size:15px;">&#8593;</span>'//    'This is the subtitle'	    
        },

        xAxis: {
            title: {
                text: 'Hour Increase %'
            },

            pointStart: -10,
            categories: [-5, 0, 5, 10, 15, 20, 25],

        },

        yAxis: {
            tickInterval: 100,
            title: {
                text: "Profits ($ 000\')"
            }

        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        credits: { enabled: false },


        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                marker: {
                    radius: 0.001,

                    states: {
                        hover: {
                            enabled: true
                        },
                        select: {
                            radius: 6,
                            enabled: true
                        }
                    }
                },

            }
        },

        tooltip: {
            formatter: function () {
                return ' Total Hour Change : ' + this.x + '%<br/>Fixed Fees : ' + this.series.name + '<br/><b>Profits : $' + this.y.toFixed(1) + 'K</b>';
            }
        },

        exporting: {
            allowHTML: true,
            enabled: false
        },



        series: [



            //	{ name: '<span style="font-size:10px">$ '+parseFloat(parseFloat(lineChartFixedPrice/1000)-parseFloat(0.1)).toFixed(1)+' M Fees</span>',color:Highcharts.getOptions().colors[0], data: [arrLineChart2[0],arrLineChart2[1],arrLineChart2[2],arrLineChart2[3],arrLineChart2[4],arrLineChart2[5]]  },
            //	{ name: '<span style="font-size:10px">$ '+parseFloat(lineChartFixedPrice/1000).toFixed(1)+' M</span>'					     	   ,color:Highcharts.getOptions().colors[2],  	data: [arrLineChart2[6],arrLineChart2[7],arrLineChart2[8],arrLineChart2[9],arrLineChart2[10],arrLineChart2[11]]  },
            //	{ name: '<span style="font-size:10px">$ '+parseFloat(parseFloat(lineChartFixedPrice/1000)+parseFloat(0.1)).toFixed(1)+' M</span>'	   ,color:Highcharts.getOptions().colors[3],  	data: [arrLineChart2[12],arrLineChart2[13],arrLineChart2[14],arrLineChart2[15],arrLineChart2[16],arrLineChart2[17]]  },
            //	{ name: '<span style="font-size:10px">$ '+parseFloat(parseFloat(lineChartFixedPrice/1000)+parseFloat(0.2)).toFixed(1)+' M</span>'     ,color:Highcharts.getOptions().colors[1],  	data: [arrLineChart2[18],arrLineChart2[19],arrLineChart2[20],arrLineChart2[21],arrLineChart2[22],arrLineChart2[23]]  },

            { name: '<span style="font-size:10px">$ ' + parseFloat(parseFloat(fixedFees) - parseFloat(0.1)).toFixed(1) + ' K Fees</span>', color: Highcharts.getOptions().colors[0], data: [arrLineChart2[0], arrLineChart2[1], arrLineChart2[2], arrLineChart2[3], arrLineChart2[4], arrLineChart2[5]] },
            { name: '<span style="font-size:10px">$ ' + parseFloat(fixedFees).toFixed(1) + ' K</span>', color: Highcharts.getOptions().colors[2], data: [arrLineChart2[6], arrLineChart2[7], arrLineChart2[8], arrLineChart2[9], arrLineChart2[10], arrLineChart2[11]] },
            { name: '<span style="font-size:10px">$ ' + parseFloat(parseFloat(fixedFees) + parseFloat(0.1)).toFixed(1) + ' K</span>', color: Highcharts.getOptions().colors[3], data: [arrLineChart2[12], arrLineChart2[13], arrLineChart2[14], arrLineChart2[15], arrLineChart2[16], arrLineChart2[17]] },
            { name: '<span style="font-size:10px">$ ' + parseFloat(parseFloat(fixedFees) + parseFloat(0.2)).toFixed(1) + ' K</span>', color: Highcharts.getOptions().colors[1], data: [arrLineChart2[18], arrLineChart2[19], arrLineChart2[20], arrLineChart2[21], arrLineChart2[22], arrLineChart2[23]] },




        ],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });

    var chart1 = $('#senstivityChart2').highcharts();
    chart1.series[1].data[1].select(true, true);
    chart1.setSize(450, 350);

}



