

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

// fetching the dropdown values from the JSON file stored locally on the systeunder JSONDATA folder
function fetchQuoteFields(param, ddlID) {

    var obj = null;

    $.ajax({
        dataType: "json",
        url: "BAL/JSONData/bnfQuoteData.json",
        cache: false,  //do not cache
        success: function (json) {
            obj = json[param];
            // console.log(obj);
            var options = "";
            $.each(obj, function (i) {
                options += '<option class="pt-3" value= "' + obj[i].title + '">' + obj[i].title + '</option>';
                // options += '<option class="pt-3" value= "' + obj[i].title + '"></option>';
                $("#" + ddlID + "").html(options);
            });
        }
    });

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


// fetching the radiobuttons values from the JSON file stored locally on the systeunder JSONDATA folder

function fetchQuoteFieldsRadioButtons(parentID, radioGroup) {

    var obj = null;

    $.ajax({
        dataType: "json",
        url: "BAL/JSONData/bnfQuoteData.json",
        cache: false,  //do not cache
        success: function (json) {
            obj = json[radioGroup];

            var options = "";

            $.each(obj, function (i, item) {
                options += "<div><input class='mb-3' type='radio' name='" + radioGroup + "' value='" + item.title + "' />&nbsp;&nbsp; <label class='pr-3 pt-2 size14Font' for='" + radioGroup + "'>" + item.title + "</label></div>";
            });

            $("#" + parentID + "").append(options);
            $("input[name=" + radioGroup + "]")[0].checked = true;

        }
    });

}

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

            if (stepID.indexOf('step4') > -1) {
                switchButtonClass('Client View', 'disable');
                switchButtonClass('Profit View', 'disable');

            }
            else {
                switchButtonClass('Client View', 'disable');
                switchButtonClass('Profit View', 'disable');
                //switchButtonClass('Scope of Work', 'disable');
            }

            classie.toggle(thisData, 'active');
            classie.toggle(document.getElementById('cbp-spmenu-mySidenav'), 'cbp-spmenu-open');

        }
        else if (tips === "closeLeft") {

            switchButtonClass('Scope of Work', 'enable');

            if (stepID.indexOf('step4') > -1) {
                switchButtonClass('Client View', 'enable');
                switchButtonClass('Profit View', 'enable');

            }
            else {
                switchButtonClass('Client View', 'disable');
                switchButtonClass('Profit View', 'disable');
                // switchButtonClass('Scope of Work', 'disable');
            }

            classie.toggle(thisData, 'active');
            classie.toggle(document.getElementById('cbp-spmenu-mySidenav'), 'cbp-spmenu-open');
        }
    }



}

// fetching the values from the JSON file stored locally on the systeunder JSONDATA folderL
function fetchLevelDescriptionData(param, parentArrayID) {
    var obj = null;

    if ($("#btnEN").hasClass('bg-fasQuoteOrange')) {
        $.ajax({
            dataType: "json",
            url: "BAL/JSONData/glossaryLevelDescEN.json",
            cache: false,  //do not cache
            success: function (json) {
                obj = json[parentArrayID];
                $.each(obj, function (i) {

                    if (obj[i][param] !== undefined) {
                        console.log(obj[i][param][1].description);
                        $('#levelDescTitle').text(obj[i][param][0].title);
                        $('#levelDescBody').append("<tr><td>" + obj[i][param][1].description + "</td></tr>");
                    }
                });


            }
        });
    }
    else {
        $.ajax({
            dataType: "json",
            url: "BAL/JSONData/glossaryLevelDescFR.json",
            cache: false,  //do not cache
            success: function (json) {
                obj = json[parentArrayID];
                $.each(obj, function (i) {

                    if (obj[i][param] !== undefined) {
                        console.log(obj[i][param][1].description);
                        $('#levelDescTitle').text(obj[i][param][0].title);
                        $('#levelDescBody').append("<tr><td>" + obj[i][param][1].description + "</td></tr>");
                    }
                });


            }
        });
    }



}

function fetchLevelDescription_AllLevels(param) {
    $("#levelDescBody").empty();
    if ($("#btnEN").hasClass('bg-fasQuoteOrange')) {
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
                            // if (items2[0].None !== undefined || items2[1].Level1 !== undefined || items2[2].Level2 !== undefined || items2[3].Level3 !== undefined || items2[0].Minimum !== undefined || items2[1].Moderate !== undefined || items2[2].Maximum !== undefined || items2[0].Normal !== undefined || items2[0].High_Maintainance !== undefined || items2[1].Hostile !== undefined || items2[2].Friendly !== undefined) {

                            var str = '';
                            if (param === 'dueDilliNos') {
                                if (items2[0].None !== undefined || items2[1].Minimum !== undefined || items2[2].Moderate !== undefined || items2[3].Maximum !== undefined) {
                                    str = ("<tr><td width='25%' class='small'>None</td><td class='small'>" + items2[0].None + "</td></tr><tr><td class='small'>Minimum</td><td class='small'>" + items2[1].Minimum + "</td></tr><tr><td class='small'>Moderate</td><td class='small'>" + items2[2].Moderate + "</td></tr><tr><td class='small'>Maximum</td><td class='small'>" + items2[3].Maximum + "</td></tr>").replace(/\n/g, "<br>");
                                }
                            }
                            //else if (param === 'clientNeed') {
                            //    if (items2[0].Normal !== undefined || items2[1].High_Maintainance !== undefined) {
                            //        str = ("<tr><td width='25%' class='small'>Normal</td><td class='small'>" + items2[0].Normal + "</td></tr><tr><td class='small'>High Maintainance</td><td class='small'>" + items2[1].High_Maintainance + "</td></tr>").replace(/\n/g, "<br>");
                            //    }
                            //}
                            //else if (param === 'opposeFirmType') {
                            //    if (items2[0].Normal !== undefined || items2[1].Hostile !== undefined || items2[2].Friendly !== undefined) {
                            //        str = ("<tr><td width='25%' class='small'>Normal</td><td class='small'>" + items2[0].Normal + "</td></tr><tr><td class='small'>Hostile</td><td class='small'>" + items2[1].Hostile + "</td></tr><tr><td class='small'>Friendly</td><td class='small'>" + items2[2].Friendly + "</td></tr>").replace(/\n/g, "<br>");
                            //    }
                            //}
                            else {
                                if (items2[0].None !== undefined || items2[1].Level1 !== undefined || items2[2].Level2 !== undefined || items2[3].Level3 !== undefined || items2[4].Level4 !== undefined || items2[5].Level5 !== undefined || items2[6].Level6 !== undefined) {
                                    str = ("<tr><td width='25%' class='small'>None</td><td class='small'>" + items2[0].None + "</td></tr><tr><td class='small'>Level 1</td><td class='small'>" + items2[1].Level1 + "</td></tr><tr><td class='small'>Level 2</td><td class='small'>" + items2[2].Level2 + "</td></tr><tr><td class='small'>Level 3</td><td class='small'>" + items2[3].Level3 + "</td></tr><tr><td class='small'>Level 4</td><td class='small'>" + items2[4].Level4 + "</td></tr><tr><td class='small'>Level 5</td><td class='small'>" + items2[5].Level5 + "</td></tr><tr><td class='small'>Level 6</td><td class='small'>" + items2[6].Level6).replace(/\n/g, "<br>");
                                }
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
                            if (param === 'dueDilliNos') {
                                if (items2[0].None !== undefined || items2[1].Minimum !== undefined || items2[2].Moderate !== undefined || items2[3].Maximum !== undefined) {
                                    str = ("<tr><td width='25%' class='small'>Aucune</td><td class='small'>" + items2[0].None + "</td></tr><tr><td class='small'>Minimale</td><td class='small'>" + items2[1].Minimum + "</td></tr><tr><td class='small'>Moderee</td><td class='small'>" + items2[2].Moderate + "</td></tr><tr><td class='small'>Maximale</td><td class='small'>" + items2[3].Maximum + "</td></tr>").replace(/\n/g, "<br>");
                                }
                            }
                            //else if (param === 'clientNeed') {
                            //    if (items2[0].Normal !== undefined || items2[1].High_Maintainance !== undefined) {
                            //        str = ("<tr><td width='25%' class='small'>FR-Normal</td><td class='small'>" + items2[0].Normal + "</td></tr><tr><td class='small'>FR-High Maintainance</td><td class='small'>" + items2[1].High_Maintainance + "</td></tr>").replace(/\n/g, "<br>");
                            //    }
                            //}
                            //else if (param === 'opposeFirmType') {
                            //    if (items2[0].Normal !== undefined || items2[1].Hostile !== undefined || items2[2].Friendly !== undefined) {
                            //        str = ("<tr><td width='25%' class='small'>FR-Normal</td><td class='small'>" + items2[0].Normal + "</td></tr><tr><td class='small'>Hostile</td><td class='small'>" + items2[1].Hostile + "</td></tr><tr><td class='small'>Friendly</td><td class='small'>" + items2[2].Friendly + "</td></tr>").replace(/\n/g, "<br>");
                            //    }
                            //}
                            else {
                                if (items2[0].None !== undefined || items2[1].Level1 !== undefined || items2[2].Level2 !== undefined || items2[3].Level3 !== undefined) {
                                    str = ("<tr><td width='25%' class='small'>Aucune</td><td class='small'>" + items2[0].None + "</td></tr><tr><td class='small'>Niveau 1</td><td class='small'>" + items2[1].Level1 + "</td></tr><tr><td class='small'>Niveau 2</td><td class='small'>" + items2[2].Level2 + "</td></tr><tr><td class='small'>Niveau 3</td><td class='small'>" + items2[3].Level3).replace(/\n/g, "<br>");
                                }
                            }
                            $("#levelDescBody").append(str);

                            // }
                        });
                    });

                });
            }
        });
    }


}

function fetchLevelDescription_LevelWise(param, selectedLevel, outputSpanID) {
    console.log("outputSpanID", outputSpanID);
    var levelDescriptionText = '';
    $("#" + outputSpanID + "_Desc").empty();
    if ($("#btnEN").hasClass('bg-fasQuoteOrange')) {
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
                                else if (selectedLevel === 'Minimum' && param === 'dueDilliNos') {
                                    $("#" + outputSpanID + "_Level").text(selectedLevel);
                                    $("#" + outputSpanID + "_Desc").append((items2[1].Minimum).replace(/\n/g, "<br>"));
                                }
                                else if (selectedLevel === 'Moderate' && param === 'dueDilliNos') {
                                    $("#" + outputSpanID + "_Level").text(selectedLevel);
                                    $("#" + outputSpanID + "_Desc").append((items2[2].Moderate).replace(/\n/g, "<br>"));
                                }
                                else if (selectedLevel === 'Maximum' && param === 'dueDilliNos') {
                                    $("#" + outputSpanID + "_Level").text(selectedLevel);
                                    $("#" + outputSpanID + "_Desc").append((items2[3].Maximum).replace(/\n/g, "<br>"));
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
                                else if (selectedLevel === 'Minimum' && param === 'dueDilliNos') {
                                    $("#" + outputSpanID + "_Level").text('Minimale');
                                    $("#" + outputSpanID + "_Desc").append((items2[1].Minimum).replace(/\n/g, "<br>"));
                                }
                                else if (selectedLevel === 'Moderate' && param === 'dueDilliNos') {
                                    $("#" + outputSpanID + "_Level").text('Moderee');
                                    $("#" + outputSpanID + "_Desc").append((items2[2].Moderate).replace(/\n/g, "<br>"));
                                }
                                else if (selectedLevel === 'Maximum' && param === 'dueDilliNos') {
                                    $("#" + outputSpanID + "_Level").text('Maximale');
                                    $("#" + outputSpanID + "_Desc").append((items2[3].Maximum).replace(/\n/g, "<br>"));
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

// Adding the data to the quote Table
function insertBNFQuoteData(jsonData) {


    var temp = null;

    $.ajax({
        type: 'POST',
        url: 'createQuote_BnF.aspx/InsertBnFQuoteData',
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

// Updating the data to the quote Table (STEP 1)
function updateBNFQuoteData_step1(jsonData) {


    $.ajax({
        type: 'POST',
        url: 'createQuote_BnF.aspx/UpdateBnFQuoteData_Step1',
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
function updateBNFQuoteData(jsonData) {

    console.log("inside the function in bnfData");

    $.ajax({
        type: 'POST',
        url: 'createQuote_BnF.aspx/UpdateBnFQuoteData',
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




// Updating the data to the quote Table - STEP 3
function updateBNFQuoteData_Step3(jsonData) {

    $.ajax({
        type: 'POST',
        url: 'createQuote_BnF.aspx/UpdateBnFQuoteData_Step3',
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

// Updating the data to the quote Table - STEP 4
function updateBNFQuoteData_Step4(jsonData) {

    console.log("step 4 params", jsonData);

    $.ajax({
        type: 'POST',
        url: 'createQuote_BnF.aspx/UpdateBnFQuoteData_Step4',
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

// Deleting the selected quote

function deleteBNFQuoteData(jsonData) {

    $.ajax({
        type: 'POST',
        url: 'Home.aspx/DeleteBnFQuoteData',
        data: '{param: ' + jsonData + '}',
        contentType: "application/json; charset=utf-8",
        success: function (results) {
            console.log("data deleted successfully");
        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);

        }
    });

    if (Sys.Browser.name === "Netscape")
        __doPostBack();
}



//get all rows 


function getAllRows() {
    var selectAllQuotes = null;

    $.ajax({
        type: 'GET',
        url: 'reviewQuotes.aspx/GetAllRows',
        cache: false,
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (results) {
            var ob = JSON.parse(JSON.stringify(results));
            selectAllQuotes = JSON.parse(ob.d);
            //nextOB;

        },
        error: function (xhr, status, error) {
            console.log(xhr.responseJSON);
            console.log(status);

        }
    });

    return selectAllQuotes;
}


//get all rows by the emailID of the loggedIn user


function getRowsbyLoggedInUserEmail(jsonData) {
    var selectQuotesByEmailData = null;

    $.ajax({
        type: 'GET',
        url: 'editQuote.aspx/GetAllRowsByEmailID?loggedInEmail=' + jsonData,
        cache: false,
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (results) {
            var ob = JSON.parse(JSON.stringify(results));
            selectQuotesByEmailData = JSON.parse(ob.d);
            //nextOB;

        },
        error: function (xhr, status, error) {
            console.log(xhr.responseJSON);
            console.log(status);

        }
    });

    return selectQuotesByEmailData;
}

// get top 5 saved quotes by logged in user

function getTop5SavedQuotesbyLoggedInUserEmail(jsonData) {
    var selectQuotesByEmailData = null;

    $.ajax({
        type: 'GET',
        url: 'Home.aspx/GetTop5SavedQuotesByEmailID?loggedInEmail=' + jsonData,
        cache: false,
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (results) {
            var ob = JSON.parse(JSON.stringify(results));
            selectQuotesByEmailData = JSON.parse(ob.d);
            //nextOB;

        },
        error: function (xhr, status, error) {
            console.log(xhr.responseJSON);
            console.log(status);

        }
    });

    return selectQuotesByEmailData;
}

function getTop5SubmittedQuotesbyLoggedInUserEmail(jsonData) {
    var selectQuotesByEmailData = null;

    $.ajax({
        type: 'GET',
        url: 'Home.aspx/GetTop5SubmittedQuotesByEmailID?loggedInEmail=' + jsonData,
        cache: false,
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (results) {
            var ob = JSON.parse(JSON.stringify(results));
            selectQuotesByEmailData = JSON.parse(ob.d);
            //nextOB;

        },
        error: function (xhr, status, error) {
            console.log(xhr.responseJSON);
            console.log(status);

        }
    });

    return selectQuotesByEmailData;
}



// get all the user data by Quote ID

function getRowsbyQuoteID(jsonData) {

    var selectQuotesByQuoteID = [];

    $.ajax({
        type: 'GET',
        url: 'createQuote_BnF.aspx/GetAllRowsByQuoteID?ID=' + JSON.stringify(jsonData),
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


//get all partner rows by the selected location


function getAllPartnersByLocation(location, exceptionRate) {

    var data = null;

    $.ajax({
        type: 'GET',
        async: false,
        url: 'createQuote_BnF.aspx/GetAllPartnersByOfficeLocation?location=' + JSON.stringify(location),
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
        url: 'createQuote_BnF.aspx/GetAllPartnersByOfficeNotInLocation?location=' + JSON.stringify(location),
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
                    


                    $(this).prepend("<option value='select'  selected='selected'>--<option>");
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


function prependSelectPartnersTextForDropDown() {
    $("select").each(function () {
        if ($(this)[0].id.indexOf('ddlPartner') > -1) {
            $(this).prepend("<option value='select' selected='selected'>--Select Partners--</option>");
        }
    });
}


//get all associate rows by the selected client Group


function getAllAssociatesByClientGroup(clientGrp, exceptionRate) {

    var data = null;

    $.ajax({
        type: 'GET',
        async: false,
        url: 'createQuote_BnF.aspx/GetAllAssociatesByClientGroup?clientGrp=' + JSON.stringify(clientGrp),
        contentType: "application/json; charset=utf-8",
        success: function (results) {

            //  try {
            data = JSON.parse(JSON.parse(JSON.stringify(results.d)));
            $("select").each(function () {
                if ($(this)[0].id.indexOf('ddlAssociate') > -1) {

                    if (data.length > 0) {
                        var options = '';


                        if (exceptionRate === 'None' || exceptionRate === '--Select--') {
                            $.each(data, function (i, item) {
                                // options += '<option class="pt-3" value= "' + item["tkID"] + '">' + item["partnerName"] + '-- $' + item["standardRate"] + '</option>';
                                options += '<option class="pt-3" value="' + String(item["partnerName"].split(',')[1]).trim() + '_' + String(item["partnerName"].split(',')[0]).trim() + '~' + item["standardRate"] + '~' + item["exceptionRates"] + '">' + item["partnerName"] + '-- $' + Math.round(item["standardRate"]) + '</option>';
                            });
                        }
                        else {
                            $.each(data, function (i, item) {
                                // options += '<option class="pt-3" value= "' + item["tkID"] + '">' + item["partnerName"] + '-- $' + item["standardRate"] + '</option>';
                                options += '<option class="pt-3" value="' + String(item["partnerName"].split(',')[1]).trim() + '_' + String(item["partnerName"].split(',')[0]).trim() + '~' + item["standardRate"] + '~' + item["exceptionRates"] + '">' + item["partnerName"] + '-- $' + Math.round(item["exceptionRates"]) + '</option>';
                            });
                        }

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




// get the case types based on the values of # of legal opinions and # of FMD Jurisdictions

function getCaseType(varLegalOpinion, varFMDJurisdiction) {
    var caseType = "";

    if (varLegalOpinion === "1" && varFMDJurisdiction === "1")
        caseType = "Case1";
    else
        caseType = "Case2";


    return caseType;
}

//get the sum of all the key character values on step 1

function getStep1KeyCharValues(keyCharDiv) {
    var addVal = 0;
    $(keyCharDiv).children().find("input").each(function () {
        if ($(this).val() !== "")
            addVal += parseInt($(this).val());
    });
    return addVal;
}

//get the sum of all the key character values on step 2

function getStep2KeyCharValues(step2CharValues) {
    var addVal = parseInt(getStep1KeyCharValues());
    $(step2CharValues).children().find("select").each(function () {

        if ($(this)[0].id !== "ddlThirdPartyAck") {
            var valueVar = $(this).val();

            if (valueVar !== "--Select--" && valueVar !== "None" && valueVar.startsWith("Level"))
                addVal += parseInt(valueVar.substring(valueVar.length - 1));
            else if (valueVar === "None")
                addVal += parseInt(0);
            else
                addVal += parseInt(0);
        }

    });
    return addVal;
}

//get the values of all the key characters on step 2

function getStep2KeyCharDropDownValues(valueVar) {

    var addVal = 0;

    if (valueVar !== "--Select--" && valueVar !== "None" && valueVar.startsWith("Level"))
        addVal = parseInt(valueVar.substring(valueVar.length - 1));
    else if (valueVar === "None")
        addVal = parseInt(0);
    else
        addVal = parseInt(0);


    return addVal;
}


// get the complexity status of the quote from the values

function getStatusFromComplicationBucket(step1and2Total, officeVal, financeNatureVal) {
    var n = parseInt(step1and2Total);
    var status = "";


    $.ajax({
        dataType: 'json',
        async: false,
        url: 'BAL/JSONData/complicationBucket.json',
        cache: false,  //do not cache
        success: function (results) {
            $.each(results, function (i, item) {
                if (item[0]["natureFinance"] === financeNatureVal) {
                    if (item[1]["office"] === officeVal) {
                        if (inRange(n, parseInt(item[2]["min"]), parseInt(item[3]["max"]))) {
                            console.log(item[4]["status"]);
                            status = item[4]["status"];
                        }

                    }
                }

            });
        }
    });

    return status;
}


function inRange(n, nStart, nEnd) {
    if (n >= nStart && n <= nEnd) return true;
    else return false;
}

//********************* GETTING VARIABLES FOR CALCULATIONS **************************\\

// get the weight calculations for the quotes

//function getWeightsCalculations(case1or2, office, nature, complex, guarantorCount, legalOpinionCount, legalOpinionJurisdiction, FMDNosCount, sizeOfLoan, thirdPartyCount, propertiesCount) {

function getWeightsCalculations(arrWeightCalculations) {
    var arrRet = [];

    var case1or2 = arrWeightCalculations[3];
    var nature = arrWeightCalculations[1];
    var office = arrWeightCalculations[0];
    var complex = arrWeightCalculations[2];
    var guarantorCount = arrWeightCalculations[4];
    var legalOpinionCount = arrWeightCalculations[5];
    var FMDNosCount = arrWeightCalculations[7];
    var propertiesCount = arrWeightCalculations[10];
    var sizeOfLoan = arrWeightCalculations[8];
    var thirdPartyCount = arrWeightCalculations[9];
    var legalOpinionJurisdiction = arrWeightCalculations[6];

    $.ajax({
        dataType: 'json',
        async: false,
        url: 'BAL/JSONData/caseWeights.json',
        cache: false,  //do not cache
        success: function (results) {
            $.each(results, function () {
                console.log("case weights data", results);
                if (case1or2 === "Case1") {

                    if (office === "Toronto") {
                        if (nature === "Acquisition") {

                            if (complex === "Simple") {
                                console.log("Case1 > Toronto > Acquisition > Simple");
                                if (guarantorCount < 5)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesGuarantorLessThan5"];
                                else
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][5]["variablesGuarantorMoreThan5"];
                            }
                            else if (complex === "Mid") {
                                console.log("Case1 > Toronto > Acquisition > Mid");
                                if (guarantorCount < 5)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesGuarantorLessThan5"];
                                else
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][5]["variablesGuarantorMoreThan5"];
                            }
                            else if (complex === "Max") {
                                console.log("Case1 > Toronto > Acquisition > Max");
                                if (guarantorCount < 5)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesGuarantorLessThan5"];
                                else
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][5]["variablesGuarantorMoreThan5"];
                            }
                            else {
                                console.log("match not found");
                                return false;
                            }

                            return false;
                        }
                        else if (nature === "Corporate") {

                            if (complex === "Simple") {
                                console.log("Case1 > Toronto > Corporate > Simple");
                                arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variables"];
                            }
                            else if (complex === "Mid") {

                                console.log("Case1 > Toronto > Corporate > Mid");

                                if (legalOpinionCount < FMDNosCount)
                                    arrRet = results[nature + "_" + office + "_Case1_" + complex][7]["variablesLegalOpinionLessThanFMD"];
                                else if (propertiesCount === 0)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesPropNos0"];
                                else if (propertiesCount < 5)
                                    arrRet = results[nature + "_" + office + "_Case1_" + complex][5]["variablesPropNosLessThan5"];
                                else if (propertiesCount > 5)
                                    arrRet = results[nature + "_" + office + "_Case1_" + complex][6]["variablesPropNosMoreThan5"];

                                else {
                                    console.log("match not found");
                                    return false;
                                }

                            }
                            else if (complex === "Max") {

                                console.log("Case1 > Toronto > Corporate > Max");

                                if (sizeOfLoan < 400)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesSizeOfLoanLessThan400"];
                                else if (sizeOfLoan > 400 && thirdPartyCount > 0)
                                    arrRet = results[nature + "_" + office + "_Case1_" + complex][5]["variablesSizeOfLoanMoreThan400"];
                                else if (sizeOfLoan > 400 && thirdPartyCount === 0)
                                    arrRet = results[nature + "_" + office + "_Case1_" + complex][6]["variablesThirdPartyZeroAndLoanMoreThan400"];
                                else {
                                    console.log("match not found");
                                    return false;
                                }
                            }

                            return false;
                        }
                        else if (nature === "Project") {
                            if (complex === "Simple") {

                                console.log("Case1 > Toronto > Project > Simple");
                                arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variables"];

                            }
                            else if (complex === "Mid") {

                                console.log("Case1 > Toronto > Project > Mid");
                                if (legalOpinionCount < FMDNosCount)
                                    arrRet = results[nature + "_" + office + "_Case1_" + complex][7]["variablesLegalOpinionLessThanFMD"];
                                else if (propertiesCount === 0)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesPropNos0"];
                                else if (propertiesCount < 5)
                                    arrRet = results[nature + "_" + office + "_Case1_" + complex][5]["variablesPropNosLessThan5"];
                                else if (propertiesCount > 5)
                                    arrRet = results[nature + "_" + office + "_Case1_" + complex][6]["variablesPropNosMoreThan5"];
                                else {
                                    console.log("match not found");
                                    return false;
                                }
                            }
                            else if (complex === "Max") {

                                console.log("Case1 > Toronto > Project > Max");
                                if (sizeOfLoan < 400)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesSizeOfLoanLessThan400"];
                                else if (sizeOfLoan > 400)
                                    arrRet = results[nature + "_" + office + "_Case1_" + complex][5]["variablesSizeOfLoanMoreThan400"];
                                else if (sizeOfLoan > 400 && thirdPartyCount === 0)
                                    arrRet = results[nature + "_" + office + "_Case1_" + complex][6]["variablesThirdPartyZeroAndLoanMoreThan400"];
                                else {
                                    console.log("match not found");
                                    return false;
                                }
                            }

                            else {
                                console.log("match not found");
                                return false;
                            }

                            return false;
                        }
                        else {
                            console.log("match not found");
                            return false;
                        }

                    }
                    else if (office === "Vancouver") {

                        if (nature === "Acquisition") {
                            if (complex === "Simple") {
                                console.log("Case1 > Vancouver > Acquisition > Simple");
                                if (guarantorCount < 5)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesGuarantorLessThan5"];
                                else
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][5]["variablesGuarantorMoreThan5"];
                            }
                            else if (complex === "Mid") {
                                console.log("Case1 > Vancouver > Acquisition > Mid");
                                if (guarantorCount < 5)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesGuarantorLessThan5"];
                                else
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][5]["variablesGuarantorMoreThan5"];
                            }
                            else if (complex === "Max") {
                                console.log("Case1 > Vancouver > Acquisition > Max");
                                if (guarantorCount < 5)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesGuarantorLessThan5"];
                                else
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][5]["variablesGuarantorMoreThan5"];
                            }

                            return false;
                        }
                        else if (nature === "Corporate") {
                            if (complex === "Simple") {
                                console.log("Case1 > Vancouver > Corporate > Simple");
                                if (sizeOfLoan >= 3 && sizeOfLoan < 5)
                                    arrRet = results[nature + "_" + office + "_Case1_" + complex][5]["variablesLoanInside3and6"];
                                else
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesLoanOutside3and6"];
                            }
                            if (complex === "Mid") {
                                console.log("Case1 > Vancouver > Corporate > Mid");
                                if (sizeOfLoan >= 3 && sizeOfLoan < 5)
                                    arrRet = results[nature + "_" + office + "_Case1_" + complex][5]["variablesLoanInside3and6"];
                                else
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesLoanOutside3and6"];
                            }
                            if (complex === "Max") {
                                console.log("Case1 > Vancouver > Corporate > Max");
                                if (sizeOfLoan >= 3 && sizeOfLoan < 5)
                                    arrRet = results[nature + "_" + office + "_Case1_" + complex][5]["variablesLoanInside3and6"];
                                else
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesLoanOutside3and6"];
                            }

                            return false;
                        }
                        else if (nature === "Project") {
                            if (complex === "Simple") {
                                console.log("Case1 > Vancouver > Project > Simple");
                                if (sizeOfLoan >= 3 && sizeOfLoan < 5)
                                    arrRet = results[nature + "_" + office + "_Case1_" + complex][5]["variablesLoanInside3and6"];
                                else
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesLoanOutside3and6"];
                            }
                            if (complex === "Mid") {
                                console.log("Case1 > Vancouver > Project > Mid");
                                if (sizeOfLoan >= 3 && sizeOfLoan < 5)
                                    arrRet = results[nature + "_" + office + "_Case1_" + complex][5]["variablesLoanInside3and6"];
                                else
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesLoanOutside3and6"];
                            }
                            if (complex === "Max") {
                                console.log("Case1 > Vancouver > Project > Max");
                                if (sizeOfLoan >= 3 && sizeOfLoan < 5)
                                    arrRet = results[nature + "_" + office + "_Case1_" + complex][5]["variablesLoanInside3and6"];
                                else
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesLoanOutside3and6"];
                            }

                            return false;
                        }
                    }
                    else if (office === "Montreal") {
                        if (nature === "Acquisition") {
                            if (complex === "Simple") {
                                console.log("Case1 > Montreal > Acquisition > Simple");
                                if (guarantorCount < 5)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesGuarantorLessThan5"];
                                else
                                    arrRet = results[nature + "_" + office + "_Case1_" + complex][5]["variablesGuarantorMoreThan5"];
                            }
                            if (complex === "Mid") {
                                console.log("Case1 > Montreal > Aquisition > Mid");
                                arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variables"];
                            }
                            if (complex === "Max") {
                                console.log("Case1 > Montreal > Aquisition > Max");
                                arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variables"];
                            }

                            return false;
                        }
                        else if (nature === "Corporate") {
                            if (complex === "Simple") {
                                console.log("Case1 > Montreal > Corporate > Simple");
                                if (sizeOfLoan < 1000)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesLoanLessThan1000"];
                                else if (sizeOfLoan > 1000)
                                    arrRet = results[nature + "_" + office + "_Case1_" + complex][5]["variablesLoanLessThan1000"];

                            }
                            if (complex === "Mid") {
                                console.log("Case1 > Montreal > Corporate > Mid");
                                arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variables"];
                            }
                            if (complex === "Max") {
                                console.log("Vancouver > Corporate > Max");
                                arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variables"];
                            }

                            return false;
                        }
                        else if (nature === "Project") {
                            if (complex === "Simple") {
                                console.log("Case1 > Montreal > Project > Simple");
                                if (sizeOfLoan < 1000)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesLoanLessThan1000"];
                                else if (sizeOfLoan > 1000)
                                    arrRet = results[nature + "_" + office + "_Case1_" + complex][5]["variablesLoanLessThan1000"];
                            }
                            if (complex === "Mid") {
                                console.log("Case1 > Vancouver > Project > Mid");
                                arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variables"];
                            }
                            if (complex === "Max") {
                                console.log("Case1 > Vancouver > Project > Max");
                                arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variables"];
                            }

                            return false;
                        }
                    }

                    return false;

                }
                else if (case1or2 === "Case2") {

                    if (office === "Toronto") {

                        if (nature === "Acquisition") {

                            if (complex === "Simple") {
                                console.log("Case2 > Toronto > Acquisition > Simple");
                                // if (guarantorCount < 5)
                                //     arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variables"];
                                // else
                                arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variables"];
                            }
                            else if (complex === "Mid") {
                                console.log("Case2 > Toronto > Acquisition > Mid -- Size of Loan", sizeOfLoan);
                                if (sizeOfLoan < 100)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesSizeOfLoanLessThan100"];

                                else if (sizeOfLoan >= 100 && sizeOfLoan < 500)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][5]["variablesSizeOfLoanBetween100and500"];

                                else if (sizeOfLoan > 500)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][6]["variablesSizeOfLoanMoreThan500"];

                            }
                            else if (complex === "Max") {
                                console.log("Case2 > Toronto > Acquisition > Max");
                                if (guarantorCount <= 15)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesGuarantorLessThan15"];
                                else
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][5]["variablesGuarantorMoreThan15"];
                            }
                            else {
                                console.log("match not found");
                            }

                            return false;
                        }
                        else if (nature === "Corporate") {

                            if (complex === "Simple") {
                                console.log("Case2 > Toronto > Corporate > Simple");
                                arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variables"];
                            }
                            else if (complex === "Mid") {

                                console.log("Case2 > Toronto > Corporate > Mid");

                                if (legalOpinionCount < FMDNosCount)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][7]["variablesLegalOpinionLessThanFMD"];
                                else if (propertiesCount === 0)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesPropNos0"];
                                else if (propertiesCount < 5)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][5]["variablesPropNosLessThan5"];
                                else if (propertiesCount > 5)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][6]["variablesPropNosMoreThan5"];

                                else {
                                    console.log("match not found");
                                    return false;
                                }

                            }
                            else if (complex === "Max") {

                                console.log("Case2 > Toronto > Corporate > Max");

                                if (sizeOfLoan < 400)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesSizeOfLoanLessThan400"];
                                else if (sizeOfLoan > 400 && thirdPartyCount > 0)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][5]["variablesSizeOfLoanMoreThan400"];
                                else if (sizeOfLoan > 400 && thirdPartyCount === 0)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][6]["variablesThirdPartyZeroAndLoanMoreThan400"];
                                else {
                                    console.log("match not found");
                                    return false;
                                }
                            }

                            return false;
                        }
                        else if (nature === "Project") {
                            if (complex === "Simple") {
                                console.log("Case2 > Toronto > Corporate > Simple");
                                arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variables"];
                            }
                            else if (complex === "Mid") {

                                console.log("Case2 > Toronto > Corporate > Mid");

                                if (legalOpinionCount < FMDNosCount)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][7]["variablesLegalOpinionLessThanFMD"];
                                else if (propertiesCount === 0)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesPropNos0"];
                                else if (propertiesCount < 5)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][5]["variablesPropNosLessThan5"];
                                else if (propertiesCount > 5)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][6]["variablesPropNosMoreThan5"];

                                else {
                                    console.log("match not found");
                                    return false;
                                }

                            }
                            else if (complex === "Max") {

                                console.log("Case2 > Toronto > Corporate > Max");

                                if (sizeOfLoan < 400)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesSizeOfLoanLessThan400"];
                                else if (sizeOfLoan > 400 && thirdPartyCount > 0)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][5]["variablesSizeOfLoanMoreThan400"];
                                else if (sizeOfLoan > 400 && thirdPartyCount === 0)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][6]["variablesThirdPartyZeroAndLoanMoreThan400"];
                                else {
                                    console.log("match not found");
                                    return false;
                                }
                            }

                            else {
                                console.log("match not found");
                                return false;
                            }

                            return false;
                        }

                        else {
                            console.log("match not found");
                            return false;
                        }

                    }
                    else if (office === "Vancouver") {

                        if (nature === "Acquisition") {
                            if (complex === "Simple") {
                                console.log("Case2 > Vancouver > Acquisition > Simple");
                                // if (guarantorCount < 5)
                                //   arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesGuarantorLessThan5"];
                                //else
                                arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variables"];
                            }
                            else if (complex === "Mid") {
                                console.log("Case2 > Vancouver > Acquisition > Mid");
                                // if (guarantorCount < 5)
                                //     arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesGuarantorLessThan5"];
                                //  else
                                arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variables"];
                            }
                            else if (complex === "Max") {
                                console.log("Case2 > Vancouver > Acquisition > Max");
                                if (sizeOfLoan <= 5)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesSizeOfLoanLessThan11"];
                                else
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][5]["variablesSizeOfLoanMoreThan11"];
                            }

                            return false;
                        }

                        else if (nature === "Corporate") {
                            if (complex === "Simple") {
                                console.log("Case2 > Vancouver > Corporate > Simple");
                                if (guarantorCount === 0)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesGuarantorsZero"];
                                else if (guarantorCount > 0 && sizeOfLoan < 5)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][5]["variablesSizeOfLoanLessThan5AndGuarantorsMoreThanZero"];
                                else if (guarantorCount > 0 && sizeOfLoan > 5)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][6]["variablesSizeOfLoanMoreThan5AndGuarantorsMoreThanZero"];

                            }
                            if (complex === "Mid") {
                                console.log("Case2 > Vancouver > Corporate > Mid");
                                if (guarantorCount === 0)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesGuarantorsZero"];
                                else if (guarantorCount > 0 && sizeOfLoan < 5)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][5]["variablesSizeOfLoanLessThan5AndGuarantorsMoreThanZero"];
                                else if (guarantorCount > 0 && sizeOfLoan > 5)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][6]["variablesSizeOfLoanMoreThan5AndGuarantorsMoreThanZero"];
                            }
                            if (complex === "Max") {
                                console.log("Case2 > Vancouver > Corporate > Max");
                                if (guarantorCount === 0)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesGuarantorsZero"];
                                else if (guarantorCount > 0 && sizeOfLoan < 5)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][5]["variablesSizeOfLoanLessThan5AndGuarantorsMoreThanZero"];
                                else if (guarantorCount > 0 && sizeOfLoan > 5)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][6]["variablesSizeOfLoanMoreThan5AndGuarantorsMoreThanZero"];
                            }

                            return false;
                        }
                        else if (nature === "Project") {
                            if (complex === "Simple") {
                                console.log("Case2 > Vancouver > Corporate > Simple");
                                if (guarantorCount === 0)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesGuarantorsZero"];
                                else if (guarantorCount > 0 && sizeOfLoan < 5)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][5]["variablesSizeOfLoanLessThan5AndGuarantorsMoreThanZero"];
                                else if (guarantorCount > 0 && sizeOfLoan > 5)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][6]["variablesSizeOfLoanMoreThan5AndGuarantorsMoreThanZero"];

                            }
                            if (complex === "Mid") {
                                console.log("Case2 > Vancouver > Corporate > Mid");
                                if (guarantorCount === 0)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesGuarantorsZero"];
                                else if (guarantorCount > 0 && sizeOfLoan < 5)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][5]["variablesSizeOfLoanLessThan5AndGuarantorsMoreThanZero"];
                                else if (guarantorCount > 0 && sizeOfLoan > 5)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][6]["variablesSizeOfLoanMoreThan5AndGuarantorsMoreThanZero"];
                            }
                            if (complex === "Max") {
                                console.log("Case2 > Vancouver > Corporate > Max");
                                if (guarantorCount === 0)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesGuarantorsZero"];
                                else if (guarantorCount > 0 && sizeOfLoan < 5)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][5]["variablesSizeOfLoanLessThan5AndGuarantorsMoreThanZero"];
                                else if (guarantorCount > 0 && sizeOfLoan > 5)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][6]["variablesSizeOfLoanMoreThan5AndGuarantorsMoreThanZero"];
                            }

                            return false;
                        }
                    }
                    else if (office === "Montreal") {

                        if (nature === "Acquisition") {
                            if (complex === "Simple") {
                                console.log("Case2 > Montreal > Acquisition > Simple");
                                // if (guarantorCount < 5)
                                //   arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesGuarantorLessThan5"];
                                //else
                                arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variables"];
                            }
                            if (complex === "Mid") {
                                console.log("Case2 > Montreal > Aquisition > Mid");
                                arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variables"];
                            }
                            if (complex === "Max") {
                                console.log("Case2 > Montreal > Aquisition > Max");
                                if (sizeOfLoan <= 100)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesSizeOfLoanLessThan100"];
                                else
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesSizeOfLoanMoreThan100"];
                            }

                            return false;
                        }
                        else if (nature === "Corporate") {
                            if (complex === "Simple") {
                                console.log("Case2 > Montreal > Corporate > Simple");
                                // if (sizeOfLoan < 1000)
                                //   arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesLoanLessThan1000"];
                                //else if (sizeOfLoan > 1000)
                                arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variables"];

                            }
                            if (complex === "Mid") {
                                console.log("Case2 > Montreal > Corporate > Mid");
                                if (sizeOfLoan <= 150)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesSizeOfLoanLessThan150"];
                                else
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][5]["variablesSizeOfLoanMoreThan150"];
                            }
                            if (complex === "Max") {
                                console.log("Case2 > Montreal > Corporate > Max");
                                if (sizeOfLoan <= 150)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesSizeOfLoanLessThan150"];
                                else if (sizeOfLoan > 150 && thirdPartyCount > 0)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][5]["variablesSizeOfLoanMoreThan150"];
                                else if (sizeOfLoan > 150 && thirdPartyCount === 0)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][6]["variablesSizeOfLoanMoreThan150andThirdPartiesZero"];
                            }

                            return false;
                        }
                        else if (nature === "Project") {
                            if (complex === "Simple") {
                                console.log("Case2 > Montreal > Corporate > Simple");
                                // if (sizeOfLoan < 1000)
                                //   arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesLoanLessThan1000"];
                                //else if (sizeOfLoan > 1000)
                                arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variables"];

                            }
                            if (complex === "Mid") {
                                console.log("Case2 > Montreal > Corporate > Mid");
                                if (sizeOfLoan <= 150)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesSizeOfLoanLessThan150"];
                                else
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][5]["variablesSizeOfLoanMoreThan150"];
                            }
                            if (complex === "Max") {
                                console.log("Case2 > Montreal > Corporate > Max");
                                if (sizeOfLoan <= 150)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][4]["variablesSizeOfLoanLessThan150"];
                                else if (sizeOfLoan > 150 && thirdPartyCount > 0)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][5]["variablesSizeOfLoanMoreThan150"];
                                else if (sizeOfLoan > 150 && thirdPartyCount === 0)
                                    arrRet = results[nature + "_" + office + "_" + case1or2 + "_" + complex][6]["variablesSizeOfLoanMoreThan150andThirdPartiesZero"];
                            }

                            return false;
                        }

                    }

                    return false;
                }
            });

        }, error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);

        }
    });

    return arrRet;

}


// get the Due dillinence variance number

function getDDVarianceCalculations(office, nature, ddValue) {

    var arrRet = [];

    $.ajax({
        dataType: 'json',
        async: false,
        url: 'BAL/JSONData/predictionDDValues.json',
        cache: false,  //do not cache
        success: function (results) {
            $.each(results, function () {
                if (office === "Toronto") {
                    arrRet = results[office + nature + ddValue];
                    return false;
                }
                else {
                    arrRet = results["Others" + nature + ddValue];
                    return false;
                }
            });
        }
    });
    return arrRet;
}

// function to get all the prediction values from the selected weights and inputs


//function getPrediction1and2Values(sizeOfLoan, guarantorCount, legalOpinionCount, legalOpinionJurisdiction, FMDNosCount, propertiesCount, thirdPartyCount, creditAgreement, interCreditorAgreement, corpOfficerDocs, thirdPartyAck, arrWeights, arrDDVariance) {
function getPrediction1and2Values(arrInitialInputs, arrWeights, arrDDVariance) {
    var prediction1 = 0;
    var prediction2 = 0;
    var prediction3 = 0;

    //adding up the inputs X weights to get the prediction 1 value

    prediction1 += parseFloat(arrInitialInputs[8]) * parseFloat(arrWeights[0]["sizeOfLoan"]);
    prediction1 += parseFloat(arrInitialInputs[4]) * parseFloat(arrWeights[1]["nosOfGuarantors"]);
    prediction1 += parseFloat(arrInitialInputs[5]) * parseFloat(arrWeights[2]["legalOpinionNos"]);
    prediction1 += parseFloat(arrInitialInputs[6]) * parseFloat(arrWeights[3]["legalOpinionJurisdiction"]);
    prediction1 += parseFloat(arrInitialInputs[7]) * parseFloat(arrWeights[4]["fmdJurisdictionNos"]);
    prediction1 += parseFloat(arrInitialInputs[10]) * parseFloat(arrWeights[5]["propertiesNos"]);
    prediction1 += parseFloat(arrInitialInputs[9]) * parseFloat(arrWeights[6]["thirdPartyNos"]);
    prediction1 += parseFloat(getStep2KeyCharDropDownValues(arrInitialInputs[14])) * parseFloat(arrWeights[7]["creditAgreementComplex"]);
    prediction1 += parseFloat(getStep2KeyCharDropDownValues(arrInitialInputs[15])) * parseFloat(arrWeights[8]["interCreditAgreementLevels"]);
    prediction1 += parseFloat(getStep2KeyCharDropDownValues(arrInitialInputs[16])) * parseFloat(arrWeights[9]["corpOfficerDocs"]);



    //console.log("variables values", sizeOfLoan, guarantorCount, legalOpinionCount, legalOpinionJurisdiction, FMDNosCount, propertiesCount, thirdPartyCount, creditAgreement, interCreditorAgreement, corpOfficerDocs, thirdPartyAck, arrWeights, arrDDVariance);
    //console.log("weights values", arrWeights);
    // console.log("prediction1", prediction1);

    //adding up the inputs X ( weights X (1 - DDVariance) ) to get the prediction 2 value

    prediction2 += parseFloat(arrInitialInputs[8]) * calculateDDVarianceAmount(parseFloat(arrWeights[0]["sizeOfLoan"]), parseFloat(arrDDVariance[0]["sizeOfLoan"]));
    prediction2 += parseFloat(arrInitialInputs[4]) * calculateDDVarianceAmount(parseFloat(arrWeights[1]["nosOfGuarantors"]), parseFloat(arrDDVariance[1]["nosOfGuarantors"]));
    prediction2 += parseFloat(arrInitialInputs[5]) * calculateDDVarianceAmount(parseFloat(arrWeights[2]["legalOpinionNos"]), parseFloat(arrDDVariance[2]["nosOfLegalOpinions"]));
    prediction2 += parseFloat(arrInitialInputs[6]) * calculateDDVarianceAmount(parseFloat(arrWeights[3]["legalOpinionJurisdiction"]), parseFloat(0));
    prediction2 += parseFloat(arrInitialInputs[7]) * calculateDDVarianceAmount(parseFloat(arrWeights[4]["fmdJurisdictionNos"]), parseFloat(arrDDVariance[3]["nosOfFMDJurisdictions"]));
    prediction2 += parseFloat(arrInitialInputs[10]) * calculateDDVarianceAmount(parseFloat(arrWeights[5]["propertiesNos"]), parseFloat(arrDDVariance[8]["nosOfProperties"]));
    prediction2 += parseFloat(arrInitialInputs[9]) * calculateDDVarianceAmount(parseFloat(arrWeights[6]["thirdPartyNos"]), parseFloat(arrDDVariance[4]["nosOfThirdParties"]));
    prediction2 += parseFloat(getStep2KeyCharDropDownValues(arrInitialInputs[14])) * calculateDDVarianceAmount(parseFloat(arrWeights[7]["creditAgreementComplex"]), parseFloat(arrDDVariance[6]["creditAgreementLevels"]));
    prediction2 += parseFloat(getStep2KeyCharDropDownValues(arrInitialInputs[15])) * calculateDDVarianceAmount(parseFloat(arrWeights[8]["interCreditAgreementLevels"]), parseFloat(arrDDVariance[7]["interCreditAgreementLevels"]));
    prediction2 += parseFloat(getStep2KeyCharDropDownValues(arrInitialInputs[16])) * calculateDDVarianceAmount(parseFloat(arrWeights[9]["corpOfficerDocs"]), parseFloat(arrDDVariance[5]["corpOfficerDocs"]));
    prediction2 += parseInt(arrDDVariance[9]["hoursAdded"]);




    // checking the value of the third party acknowledgement levels for the prediction3 values

    /* if level == none -> use prediction 2 value
     * if level == 1 -> use prediction 2 value + 1
     * if level == 2 -> use prediction 2 value + 3
     * if level == 3 -> use prediction 2 value + 25
     */
    prediction3 = getThirdPartyAckVariance(arrInitialInputs[13], prediction2);

    return parseFloat(prediction1) + "," + parseFloat(prediction2) + "," + prediction3;
}

// Get hours category based on the value of prediction # 2

function getHoursCategory(predictions2) {

    var hoursPredictedCategory = 0;
    // conditions to check the hours prediction category
    /*
     * if prediction3( "predictions.split(',')[2]" ) is less than 100, the hours prediction category is short or 1
     * if prediction3( "predictions.split(',')[2]" ) is between 100 and 500, the hours prediction category is medium or 2
     * if prediction3( "predictions.split(',')[2]" ) is more than 500, the hours prediction category is long or 3                             
     */



    if (parseFloat(predictions2) <= 100)
        hoursPredictedCategory = 1;
    else if (parseFloat(predictions2) > 100 && parseFloat(predictions2) <= 500)
        hoursPredictedCategory = 2;
    else if (parseFloat(predictions2) > 500)
        hoursPredictedCategory = 3;


    return hoursPredictedCategory;
}

// function to calculate the actual variance of the weights when value of due dilligence is not none
function calculateDDVarianceAmount(weightVal, ddVariance) {
    return parseFloat(weightVal * (1 - ddVariance));
}

// function to get the third party acknowledgement value for prediction 3

function getThirdPartyAckVariance(thirdPartyAckVal, prediction2) {
    if (thirdPartyAckVal === "None" || thirdPartyAckVal === "--Select--")
        return parseFloat(prediction2);
    else if (thirdPartyAckVal === "Level1")
        return parseFloat(prediction2 + 1);
    else if (thirdPartyAckVal === "Level2")
        return parseFloat(prediction2 + 3);
    else if (thirdPartyAckVal === "Level3")
        return parseFloat(prediction2 + 25);
}


// get the sdelta hours change to calculate the prediction # 4 of the quote

function getDeltaHours(hoursPredictedCategory, nature) {

    var deltaHours = 0;

    $.ajax({
        dataType: 'json',
        async: false,
        url: 'BAL/JSONData/staffingMixPercentage.json',
        cache: false,  //do not cache
        success: function (results) {
            $.each(results, function () {
                if (results[nature + "_" + hoursPredictedCategory + "_DeltaHours"][0]["natureFinance"] === nature && results[nature + "_" + hoursPredictedCategory + "_DeltaHours"][1]["HoursPrediction"] === hoursPredictedCategory) {
                    deltaHours = parseFloat(results[nature + "_" + hoursPredictedCategory + "_DeltaHours"][2]["DeltaHours"]);
                    return false;
                }
            });
        }
    });

    return deltaHours;
}


// get the suggested staffinx mix percentages to calculate the prediction # 4 of the quote

function getSuggestedStaffingMixDataPercentages(hoursPredictedCategory, clientType) {

    var arrSuggestedValues = [];
    var newClientType = "";
    // console.log(clientType);

    if (clientType.indexOf(' ') > 0)
        newClientType = clientType.split(" ").join("");
    else
        newClientType = clientType;

    // console.log(newClientType);

    $.ajax({
        dataType: 'json',
        async: false,
        url: 'BAL/JSONData/staffingMixPercentage.json',
        cache: false,  //do not cache
        success: function (results) {
            $.each(results, function () {

                if (results[hoursPredictedCategory + "_" + newClientType][0]["hoursCategory"] === hoursPredictedCategory && results[hoursPredictedCategory + "_" + newClientType][1]["clientType"] === clientType) {
                    arrSuggestedValues.push(parseFloat(results[hoursPredictedCategory + "_" + newClientType][2]["partnerPerc"]));
                    arrSuggestedValues.push(parseFloat(results[hoursPredictedCategory + "_" + newClientType][3]["associatePerc"]));
                    arrSuggestedValues.push(parseFloat(results[hoursPredictedCategory + "_" + newClientType][4]["otherPerc"]));
                    return false;
                }
            });
        }
    });

    return arrSuggestedValues;
}


// get the suggested staffing mix percentages to calculate the prediction # 4 of the quote

function getRevisedStaffingMixDataPercentages(arrPartnerPerc, arrAssoPerc, arrOtherPerc) {

    var arrRevisedVal = [];
    var partTotal = 0;
    var assoTotal = 0;
    var otherTotal = 0;

    $.each(arrPartnerPerc, function (i, item) {
        partTotal += parseInt(item);
    });

    partTotal = partTotal / parseInt(arrPartnerPerc.length);
    arrRevisedVal.push(partTotal);

    $.each(arrAssoPerc, function (i, item) {
        assoTotal += parseInt(item);
    });

    assoTotal = assoTotal / parseInt(arrAssoPerc.length);
    arrRevisedVal.push(assoTotal);

    $.each(arrOtherPerc, function (i, item) {
        otherTotal += parseInt(item);
    });


    otherTotal = otherTotal / parseInt(arrOtherPerc.length);
    arrRevisedVal.push(otherTotal);


    return arrRevisedVal;

}



// function to add up the total partner hours X rate

function getPartnerTotalHours() {
    var totalPartnerHours = 0;
    var hour = 0;
    var rate = 0;

    $("select").each(function () {

        if ($(this)[0].id.startsWith('ddlPartner')) {

            hour = parseFloat(parseInt($(this).parent().parent().find("input").eq(1).val()) / 100);
            if ($("#ddlExceptionalRates").val() === '--Select--' || $("#ddlExceptionalRates").val() === 'None')
                rate = parseFloat($(this).val().split('~')[1]);
            else
                rate = parseFloat($(this).val().split('~')[2]);
            //rate = parseInt($(this).parent().parent().find("input").eq(0).val().replace('$', ''));

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


// function to add up the total equity and non equity partner hours X rate

function getTotal_Weighted_DirectCost_OH_FEA_Rates(office, rateToFind, title, percentage) {
    var totalHours = 0;
    // var totalNEPartnerHours = 0;

    var hour = 0;
    var rate = 0;

    $("select").each(function () {

        if ($(this)[0].id.startsWith('ddlPartner')) {
            // console.log("select value", $(this).val().split('~')[3]);
            if ($(this).val() !== null && $(this).val().split('~')[3] === title) {

                hour = parseFloat(parseInt($(this).parent().parent().find("input").eq(1).val()) / 100);

                if (rateToFind === 'Weighted')
                    rate = parseFloat($(this).val().split('~')[1]);
                else if (rateToFind === 'DirectCost')
                    rate = parseFloat($(this).val().split('~')[4]);
                else if (rateToFind === 'Overhead')
                    rate = parseFloat(getOverHead_FEACost(office, 'Partner')[0]);
                else if (rateToFind === 'FEA')
                    rate = parseFloat(getOverHead_FEACost(office, 'Partner')[1]);
                else if (rateToFind === 'Exception') {
                    rate = parseFloat($(this).val().split('~')[2]);
                }

                if (rate > 0 && hour > 0)
                    totalHours += parseFloat(hour * rate);
                else
                    totalHours += 0;
            }
        }

        if ($(this)[0].id.startsWith('ddlAssociate')) {
            // console.log("select value", $(this).val().split('~')[3]);
            if ($(this).val() !== null && $(this).val().split('~')[3] === title) {

                hour = parseFloat(parseInt($(this).parent().parent().find("input").eq(1).val()) / 100);

                if (rateToFind === 'Weighted')
                    rate = parseFloat($(this).val().split('~')[1]);
                else if (rateToFind === 'DirectCost')
                    rate = parseFloat($(this).val().split('~')[4]);
                else if (rateToFind === 'Overhead')
                    rate = parseFloat(getOverHead_FEACost(office, 'Partner')[0]);
                else if (rateToFind === 'FEA')
                    rate = parseFloat(getOverHead_FEACost(office, 'Partner')[1]);
                else if (rateToFind === 'Exception') {
                    rate = parseFloat($(this).val().split('~')[2]);
                }

                if (rate > 0 && hour > 0)
                    totalHours += parseFloat(hour * rate);
                else
                    totalHours += 0;
            }
        }
    });


    if (percentage > 0)
        return parseFloat(totalHours * 100 / percentage);
    else
        return parseFloat(0);
}

// function to get the STD Rates for associates and others

function get_TotalBlendedRate_Associates_Others(office, title) {

    var stdRate = 0;

    $.ajax({
        dataType: "json",
        url: "BAL/JSONData/avgRates.json",
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

// function to get the direct cost rate from avg cost rate json sheet fro associates and others

function get_DCRates_Associates_Others(office, title) {

    var dcRate = 0;
    if (office === 'Quebec City')
        office = 'QuebecCity';

    $.ajax({
        dataType: "json",
        url: "BAL/JSONData/avgCostRate.json",
        async: false,
        cache: false,  //do not cache
        success: function (json) {
            obj = JSON.parse(JSON.stringify(json));

            $.each(obj, function (i) {
                if (obj[office + title][0]["office"] === office && obj[office + title][1]["title"] === title) {
                    dcRate = parseFloat(obj[office + title][3]["direct"]) * parseFloat(1 + obj[office + title][2]["bl"]);
                    return false;
                }
            });
        }
    });

    return dcRate;

}

// function to get the total overhead and FEA rates for given office and title

function get_OverHead_FEA_Rates_Associates_Others(office, title, rateToFind, type) {

    var rates = 0;
    if (office === 'Quebec City')
        office = 'QuebecCity';

    $.ajax({
        dataType: "json",
        url: "BAL/JSONData/avgCostRate.json",
        async: false,
        cache: false,  //do not cache
        success: function (json) {
            obj = JSON.parse(JSON.stringify(json));

            $.each(obj, function (i) {
                if (obj[office + title][0]["office"] === office && obj[office + title][1]["title"] === title && rateToFind === 'overhead' && type === 'Suggested') {
                    rates = parseFloat(obj[office + title][4]["overhead"]) + parseFloat(obj[office + title][5]["ohAdjust"]);
                    return false;
                }
                else if (obj[office + title][0]["office"] === office && obj[office + title][1]["title"] === title && rateToFind === 'overhead' && type === 'Avg') {
                    rates = parseFloat(obj[office + title][4]["overhead"]);
                    return false;
                }
                else if (obj[office + title][0]["office"] === office && obj[office + title][1]["title"] === title && rateToFind === 'FEA' && type === 'Suggested' || type === 'Avg') {
                    rates = parseFloat(obj[office + title][6]["fea"]);
                    return false;
                }
            });
        }
    });

    return rates;
}

// function to get the total overhead and FEA rates for given office and title

function getOverHead_FEACost(office, title) {

    var param = [];

    if (office === 'Quebec City')
        office = 'QuebecCity';

    $.ajax({
        dataType: "json",
        url: "BAL/JSONData/avgCostRate.json",
        async: false,
        cache: false,  //do not cache
        success: function (json) {
            obj = JSON.parse(JSON.stringify(json));

            $.each(obj, function (i) {
                if (obj[office + title][0]["office"] === office && obj[office + title][1]["title"] === title) {
                    param.push(parseFloat(obj[office + title][4]["overhead"]) + parseFloat(obj[office + title][5]["ohAdjust"]));
                    param.push(parseFloat(obj[office + title][6]["fea"]));
                    param.push(parseFloat(obj[office + title][7]["costRate"]) + parseFloat(obj[office + title][5]["ohAdjust"]));
                }
            });
        }
    });

    return param;
}

// function to get the hours distribution among partners, associates and others

function getTotalHoursDistribution(title, titlePerc, suggestedTitlePerc, totalHours) {

    var titleHours = parseFloat((totalHours * suggestedTitlePerc * titlePerc) / (100 * 100));

    return titleHours;

}


function getWaterFallChartBars() {

    var stdRate = 0;

    if ($("#ddlExceptionalRates").val() === "None" || $("#ddlExceptionalRates").val() === "--Select--")
        stdRate = parseFloat($("#txtPriceAtQuoteSTDRate").text().replace('$', '').replace(',', '')) / 1000;
    else
        stdRate = parseFloat($("#txtPriceAtQuoteFileMatter").text().replace('$', '').replace(',', '')) / 1000;

    var discount = parseFloat($("#txtDiscount").text().replace('%', '')) * stdRate / 100;
    var fixedPrice = stdRate + discount;
    var compExlEP = (parseFloat(arrQuoteValues[0].total_DC_Exl_EP) / 1000);
    var contribution = fixedPrice + compExlEP;
    var overhead = ((parseFloat(arrQuoteValues[0].combinedOHRate / 1000) + parseFloat(arrQuoteValues[0].combinedFEARate / 1000)));
    var profits = contribution + overhead;
    var profitAfterEPComp = (parseFloat(arrQuoteValues[0].totalDC_EQPartner / 1000));
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

function getSenstivityChartBars(discount, office, exceptionRateVal, arrQuoteValues, projectedHours, levarage, asso_levarage, other_levarage) {


    console.log("Senstivity chart calculation feeder values", discount, office, exceptionRateVal, arrQuoteValues, projectedHours, levarage, asso_levarage, other_levarage);

    var arrLineChart1 = [];
    var arrLineChart2 = [];

    var partner_costRate = 0;
    var asso_costRate = 0;
    var other_costRate = 0;


    var fixedRate = 0;

    if (exceptionRateVal === "None" || exceptionRateVal === "--Select--")
        fixedRate = parseFloat(arrQuoteValues[0].fixedSTDRate);
    else
        fixedRate = parseFloat(arrQuoteValues[0].fixedExceptionRateRate);



    asso_AvgRate = parseFloat(get_TotalBlendedRate_Associates_Others(office, 'Associate'));
    other_AvgRate = parseFloat(get_TotalBlendedRate_Associates_Others(office, 'Other'));

    partner_costRate = parseFloat((arrQuoteValues[0].totalDC_Partner * arrQuoteValues[0].epPerc / 100) + (arrQuoteValues[0].totalDC_NEPartner * arrQuoteValues[0].nepPerc / 100) + arrQuoteValues[0].totalOH_Partner + arrQuoteValues[0].totalFEA_Partner);
    asso_costRate = parseFloat(getOverHead_FEACost(office, 'Associate')[2]);
    other_costRate = parseFloat(getOverHead_FEACost(office, 'Other')[2]);



    var fixedFees = parseFloat(fixedRate * (1 + (discount / 100)) / 1000);


    console.log("--Preparing senstivity chart values --  ---- price vs levarage");

    //console.log(fixedFees - 100, 0, projectedHours, (parseInt(levarage) - 5), other_levarage, partner_costRate, asso_costRate, other_costRate);
    //console.log(calculateProfits(fixedFees - 100, 0, projectedHours, (parseInt(levarage) - 5), other_levarage, partner_costRate, asso_costRate, other_costRate));

    arrLineChart1.push(calculateProfits(fixedFees - 100, 0, projectedHours, (parseInt(levarage) - 5), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees - 100, 0, projectedHours, (parseInt(levarage) + 0), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees - 100, 0, projectedHours, (parseInt(levarage) + 5), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees - 100, 0, projectedHours, (parseInt(levarage) + 10), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees - 100, 0, projectedHours, (parseInt(levarage) + 15), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees - 100, 0, projectedHours, (parseInt(levarage) + 20), other_levarage, partner_costRate, asso_costRate, other_costRate));

    arrLineChart1.push(calculateProfits(fixedFees, 0, projectedHours, (parseInt(levarage) - 5), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees, 0, projectedHours, (parseInt(levarage) + 0), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees, 0, projectedHours, (parseInt(levarage) + 5), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees, 0, projectedHours, (parseInt(levarage) + 10), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees, 0, projectedHours, (parseInt(levarage) + 15), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees, 0, projectedHours, (parseInt(levarage) + 20), other_levarage, partner_costRate, asso_costRate, other_costRate));

    arrLineChart1.push(calculateProfits(fixedFees + 100, 0, projectedHours, (parseInt(levarage) - 5), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 100, 0, projectedHours, (parseInt(levarage) + 0), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 100, 0, projectedHours, (parseInt(levarage) + 5), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 100, 0, projectedHours, (parseInt(levarage) + 10), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 100, 0, projectedHours, (parseInt(levarage) + 15), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 100, 0, projectedHours, (parseInt(levarage) + 20), other_levarage, partner_costRate, asso_costRate, other_costRate));

    arrLineChart1.push(calculateProfits(fixedFees + 200, 0, projectedHours, (parseInt(levarage) - 5), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 200, 0, projectedHours, (parseInt(levarage) + 0), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 200, 0, projectedHours, (parseInt(levarage) + 5), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 200, 0, projectedHours, (parseInt(levarage) + 10), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 200, 0, projectedHours, (parseInt(levarage) + 15), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 200, 0, projectedHours, (parseInt(levarage) + 20), other_levarage, partner_costRate, asso_costRate, other_costRate));

    arrLineChart1.push(calculateProfits(fixedFees + 300, 0, projectedHours, (parseInt(levarage) - 5), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 300, 0, projectedHours, (parseInt(levarage) + 0), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 300, 0, projectedHours, (parseInt(levarage) + 5), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 300, 0, projectedHours, (parseInt(levarage) + 10), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 300, 0, projectedHours, (parseInt(levarage) + 15), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 300, 0, projectedHours, (parseInt(levarage) + 20), other_levarage, partner_costRate, asso_costRate, other_costRate));

    arrLineChart1.push(calculateProfits(fixedFees + 400, 0, projectedHours, (parseInt(levarage) - 5), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 400, 0, projectedHours, (parseInt(levarage) + 0), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 400, 0, projectedHours, (parseInt(levarage) + 5), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 400, 0, projectedHours, (parseInt(levarage) + 10), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 400, 0, projectedHours, (parseInt(levarage) + 15), other_levarage, partner_costRate, asso_costRate, other_costRate));
    arrLineChart1.push(calculateProfits(fixedFees + 400, 0, projectedHours, (parseInt(levarage) + 20), other_levarage, partner_costRate, asso_costRate, other_costRate));


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


    var profitDelta = calculateProfits(fixedFees - 100, 0, projectedHours, parseInt(levarage), other_levarage, partner_costRate, asso_costRate, other_costRate) - calculateProfits(fixedFees - 100, 0, projectedHours, (parseInt(levarage) + 5), other_levarage, partner_costRate, asso_costRate, other_costRate);
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

function calculateProfits(fixedFees, hourChange, totalProjectedHours, part_Levarge, other_Levarge, part_ttlCostRate, asso_ttlCostRate, other_ttlCostRate) {

    console.log("values", fixedFees, hourChange, totalProjectedHours, part_Levarge, other_Levarge, part_ttlCostRate, asso_ttlCostRate, other_ttlCostRate);

    var totalCosts = 0;

    totalCosts += parseFloat((1 + (hourChange / 100)) * totalProjectedHours * part_Levarge * part_ttlCostRate / (1000 * 100));
    totalCosts += parseFloat((1 + (hourChange / 100)) * totalProjectedHours * (100 - part_Levarge - other_Levarge) * asso_ttlCostRate / (1000 * 100));
    totalCosts += parseFloat((1 + (hourChange / 100)) * totalProjectedHours * other_Levarge * other_ttlCostRate / (1000 * 100));



    var totalProfit = parseFloat(fixedFees - totalCosts);
    var totalProfitPerc = parseFloat(totalProfit / fixedFees) * 100;


    return totalProfit;
}


function calculateClientViewData() {

    var fixedQuote = parseFloat($("#txtFixedRateQuote").text().replace('$', ''));

}


//get all rows by the emailID of the loggedIn user


function getRowsbySelectedCompareQuotes(jsonData) {
    var selectQuotesByCompareQuotes = null;

    $.ajax({
        type: 'GET',
        url: 'editQuote.aspx/GetAllRowsByCompareQuoteID?param=' + jsonData,
        cache: false,
        async: false,
        contentType: "application/json; charset=ISO-8859-1",
        beforeSend: function (jqXHR) {
            jqXHR.overrideMimeType('application/json;charset=iso-8859-1');
        },  
        success: function (results) {
            var ob = JSON.parse(JSON.stringify(results));
            selectQuotesByCompareQuotes = JSON.parse(ob.d);
            //nextOB;

        },
        error: function (xhr, status, error) {
            console.log(xhr.responseJSON);
            console.log(status);

        }
    });

    return selectQuotesByCompareQuotes;
}

// function to send Email 

// Updating the data to the quote Table (STEP 1)
function sendQuoteEmail(jsonData) {

    console.log('{param: ' + jsonData + '}');

    $.ajax({
        type: 'POST',
        url: 'createQuote_BnF.aspx/sendQuoteEmail',
        data: '{param: ' + jsonData + '}',
        async: false,
        contentType: "application/json; charset=ISO-8859-1",
        beforeSend: function (jqXHR) {
            jqXHR.overrideMimeType('application/json;charset=iso-8859-1');
        },  
        success: function (results) {
            console.log("email sent successfully", results);
        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    });

}


// CREATE QUOTE PAGE TRANSLATIONS
function languageSwitch(lang, ddVal, rbVal, step2Val) {

    if (ddVal === undefined || ddVal === null || ddVal === '')
        ddVal = '--Select--~--Select--';

    if (step2Val === undefined || step2Val === null || step2Val === '')
        step2Val = '--Select--~--Select--~--Select--~--Select--~--Select--~--Select--~--Select--';

    if (rbVal === undefined || rbVal === null || rbVal === '')
        rbVal = 'Syndicate~Acquisition';

    $.ajax({
        type: 'GET',
        url: './BAL/jsondata/translationdata.json',
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

            if (lang === 'en') {

                $("#spnMatterNameKey").text(results.en[0].matterName);
                $("#txtMatterName").attr("placeholder", results.en[0].matterName);
                $("#spnOfficeKey").text(results.en[1].office);

                $("#txtOpeningDate").attr("placeholder", results.en[74].openDateText);
                $("#txtClosingDate").attr("placeholder", results.en[75].closeDateText);

                //clear the existing dropdown options
                $("#ddlOffices").html("");

                //loop through the values and add to the dropdown fetched from the translation.json
                $.each(results.en[2].officeVal, function (i) {
                    options += '<option class="pt-3" value= "' + results.en[2].officeVal[i].title.split('~')[0] + '">' + results.en[2].officeVal[i].title.split('~')[1] + '</option>';
                    $("#ddlOffices").html(options);
                });

                // get the selected value of the dropdown from the variable
                $("#ddlOffices").val(ddVal.split('~')[0]);

                $("#spnExpRateKey").text(results.en[3].exceptionRate);


                $("#ddlExceptionalRates").html("");
                $.each(results.en[4].exceptionalRateVal, function (i) {
                    options1 += '<option class="pt-3" value= "' + results.en[4].exceptionalRateVal[i].title.split('~')[0] + '">' + results.en[4].exceptionalRateVal[i].title.split('~')[1] + '</option>';
                    $("#ddlExceptionalRates").html(options1);
                });
                $("#ddlExceptionalRates").val(ddVal.split('~')[1]);

                $("#spnLoanSizeKey").text(results.en[5].sizeOfLoan);
                $("#txtLoanSize").attr("placeholder", results.en[5].sizeOfLoan);


                $("#spnLoanTypeKey").text(results.en[6].typeOfLoan);

                $("#loanTypeRB").html("");
                $.each(results.en[7].typeOfLoanVal, function (i, item) {
                    options2 += "<div><input class='mb-3' type='radio' name='TypeOfLoan' value='" + item.title.split('~')[0] + "' />&nbsp;&nbsp; <label class='pr-3 pt-2 size14Font' for='TypeOfLoan'>" + item.title.split('~')[0] + "</label></div>";
                });
                $("#loanTypeRB").append(options2);

                $("input[name='TypeOfLoan'][value='" + rbVal.split('~')[0] + "']").attr('checked', true);

                $("#spnDatesKey").text(results.en[8].datesText);
                $("#spnTentativeKey").text(results.en[9].tentativeText);
                $("#spnNatureFinanceText").text(results.en[10].natureofFinanceText);

                $("#naturefinanceRB").html("");
                $.each(results.en[11].financeNatureVal, function (i, item) {
                    options3 += "<div><input class='mb-3' type='radio' name='FinanceNature' value='" + item.title.split('~')[0] + "' />&nbsp;&nbsp; <label class='pr-3 pt-2 size14Font' for='FinanceNature'>" + item.title.split('~')[0] + "</label></div>";
                });
                $("#naturefinanceRB").append(options3);

                $("input[name='FinanceNature'][value='" + rbVal.split('~')[1] + "']").attr('checked', true);

                $("#spnPleaseIdentifyTextKey").text(results.en[12].pleaseIdentifyText);

                $("#spnGuarantorKey").text(results.en[13].guarantorText);
                $("#spnLOKey").text(results.en[14].legalOpText);
                $("#spnJLO").text(results.en[15].jurisdLOText);
                $("#spnPropsKey").text(results.en[16].propsText);
                $("#spnFMDJuriKey").text(results.en[17].fmdJuriText);
                $("#spnThirdPartyKey").text(results.en[18].thirdPartyText);

                $("#lnkGetDays").text(results.en[19].getDaysText);
                $("#step2PleaseSelectKey").text(results.en[20].step2PleaseSelectText);
                $("#spnTPATextKey").text(results.en[21].thirdPartyAckText);

                $("#ddlThirdPartyAck").html("");
                $.each(results.en[22].thirdPartyAckVal, function (i) {
                    options4 += '<option class="pt-3" value= "' + results.en[22].thirdPartyAckVal[i].title.split('~')[0] + '">' + results.en[22].thirdPartyAckVal[i].title.split('~')[0] + '</option>';
                    $("#ddlThirdPartyAck").html(options4);
                });
                $("#ddlThirdPartyAck").val(step2Val.split('~')[0]);

                $("#spnCACTextKey").text(results.en[23].creditAgreeComplexText);
                $("#ddlCreditAgreement").html("");
                $.each(results.en[24].creditAgreementVal, function (i) {
                    options5 += '<option class="pt-3" value= "' + results.en[24].creditAgreementVal[i].title.split('~')[0] + '">' + results.en[24].creditAgreementVal[i].title.split('~')[1] + '</option>';
                    $("#ddlCreditAgreement").html(options5);
                });
                $("#ddlCreditAgreement").val(step2Val.split('~')[1]);


                $("#spnICATextKey").text(results.en[25].interCreditText);
                $("#ddlInterCreditAgreement").html("");
                $.each(results.en[26].interCreditAgreementVal, function (i) {
                    options6 += '<option class="pt-3" value= "' + results.en[26].interCreditAgreementVal[i].title.split('~')[0] + '">' + results.en[26].interCreditAgreementVal[i].title.split('~')[1] + '</option>';
                    $("#ddlInterCreditAgreement").html(options5);
                });
                $("#ddlInterCreditAgreement").val(step2Val.split('~')[2]);

                $("#spnCODTextKey").text(results.en[27].corpOfficerDocsText);
                $("#ddlCorpOfficerDocs").html("");
                $.each(results.en[28].corpOfficerDocsVal, function (i) {
                    options7 += '<option class="pt-3" value= "' + results.en[28].corpOfficerDocsVal[i].title.split('~')[0] + '">' + results.en[28].corpOfficerDocsVal[i].title.split('~')[1] + '</option>';
                    $("#ddlCorpOfficerDocs").html(options7);
                });
                $("#ddlCorpOfficerDocs").val(step2Val.split('~')[3]);

                $("#spnDueDilliTextKey").text(results.en[29].dueDilliText);
                $("#ddlDueDilli").html("");
                $.each(results.en[30].dueDilliVal, function (i) {
                    options8 += '<option class="pt-3" value= "' + results.en[30].dueDilliVal[i].title.split('~')[0] + '">' + results.en[30].dueDilliVal[i].title.split('~')[1] + '</option>';
                    $("#ddlDueDilli").html(options8);
                });
                $("#ddlDueDilli").val(step2Val.split('~')[4]);

                $("#spnClientTypeTextKey").text(results.en[31].clientTypeText);
                $("#ddlClientType").html("");
                $.each(results.en[32].clientTypeVal, function (i) {
                    options9 += '<option class="pt-3" value= "' + results.en[32].clientTypeVal[i].title.split('~')[0] + '">' + results.en[32].clientTypeVal[i].title.split('~')[1] + '</option>';
                    $("#ddlClientType").html(options9);
                });
                $("#ddlClientType").val(step2Val.split('~')[5]);

                $("#spnOFTTextKey").text(results.en[33].opposeFirmTypeText);
                $("#ddlOpposingLawFirm").html("");
                $.each(results.en[34].opposeFirmTypeVal, function (i) {
                    options10 += '<option class="pt-3" value= "' + results.en[34].opposeFirmTypeVal[i].title.split('~')[0] + '">' + results.en[34].opposeFirmTypeVal[i].title.split('~')[1] + '</option>';
                    $("#ddlOpposingLawFirm").html(options10);
                });
                $("#ddlOpposingLawFirm").val(step2Val.split('~')[6]);

                $("#spnPartnerText").text(results.en[35].partnersText);
                $("#spnAssociateText").text(results.en[36].associatesText);
                $("#spnOtherText").text(results.en[37].othersText);

                $("#spnPartnerText2").text(results.en[35].partnersText);
                $("#spnAssociateText2").text(results.en[36].associatesText);
                $("#spnOtherText2").text(results.en[37].othersText);

                $("#spnAggregateStaffMixText").text(results.en[38].aggregatedStaffText);

                $("#btnSuggested").val(results.en[39].suggestedButtonText);
                $("#spnRevisedQuoteTextToggle").text(results.en[40].revisedQuoteText);

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

                $("#spnProjHoursKPITextKey").text(results.en[60].projectedHoursKPITextKey);
                $("#spnFixQuoteKPITextKey").text(results.en[61].fixedQuoteKPITextKey);
                $("#spnPartEQPartKPITextKey").text(results.en[62].partnerEQPartnerKPITextKey);
                $("#spnDisPreKPITextKey").text(results.en[63].discountPremiumKPITextKey);
                $("#pills-step1-tab").text(results.en[64].step1TextKey);
                $("#pills-step2-tab").text(results.en[65].step2TextKey);
                $("#pills-step3-tab").text(results.en[66].step3TextKey);
                $("#pills-step4-tab").text(results.en[67].step4TextKey);

                $("#spnCreateQuoteText").text(results.en[68].createQuoteTextKey);
                $("#spnEditQuoteText").text(results.en[69].editQuoteTextKey);

                $("#spnSaveQuoteTextKey").text(results.en[70].saveQuoteTextKey);



                // recap view

                $("#step1Collapse").text(results.en[71].step1CollapseText);
                $("#step2Collapse").text(results.en[72].step2CollapseText);
                $("#step3Collapse").text(results.en[73].step3CollapseText);
                $("#summaryMatterNameTextKey").text(results.en[0].matterName);
                $("#summaryOpenDateTextKey").text(results.en[74].openDateText);
                $("#summaryCloseDateTextKey").text(results.en[75].closeDateText);



                $("#summaryLocationTextKey").text(results.en[1].office);
                $("#summaryExceptionTextKey").text(results.en[3].exceptionRate);
                $("#summaryLoanSizeTextKey").text(results.en[5].sizeOfLoan);
                $("#summaryLoanTypeTextKey").text(results.en[6].typeOfLoan);
                $("#summaryFinanceNatureTextKey").text(results.en[10].natureofFinanceText);
                $("#summaryTPATextKey").text(results.en[21].thirdPartyAckText);
                $("#summaryCACTextKey").text(results.en[23].creditAgreeComplexText);
                $("#summaryICATextKey").text(results.en[25].interCreditText);
                $("#summaryCODTextKey").text(results.en[27].corpOfficerDocsText);
                $("#summaryDDTextKey").text(results.en[29].dueDilliText);
                $("#summaryCTTextKey").text(results.en[31].clientTypeText);
                $("#summaryOFTTextKey").text(results.en[33].opposeFirmTypeText);
                $("#summaryPartnersTextKey").text(results.en[35].partnersText);
                $("#summaryAssociateTextKey").text(results.en[36].associatesText);
                $("#summaryOthersTextKey").text(results.en[37].othersText);
                $("#summaryPartnerHoursTextKey").text(results.en[43].totalPartnerHoursText);
                $("#summaryAssociateHoursTextKey").text(results.en[44].totalAssociateHoursText);

                //Scope of work modal data

                $("#sowTPATextKey").text(results.en[21].thirdPartyAckText);
                $("#sowCACTextKey").text(results.en[23].creditAgreeComplexText);
                $("#sowICATextKey").text(results.en[25].interCreditText);
                $("#sowCODTextKey").text(results.en[27].corpOfficerDocsText);
                $("#sowDDTextKey").text(results.en[29].dueDilliText);
                $("#sowModalHeading").text(results.en[76].sowHeadingModalHeadText);
                $("#sowHeadingProjChar").text(results.en[77].sowHeadingProjCharText);
                $("#sowHeadingLevelSelect").text(results.en[78].sowHeadingLevelSelectText);
                $("#sowHeadingAssumption").text(results.en[79].sowHeadingAssumumptionText);


                // Client View Modal Popup Data
                $("#clientViewHeading").text(results.en[80].clientViewHeading);
                $("#clientViewMatterNameText").text(results.en[0].matterName);
                $("#clientViewServiceAreaText").text(results.en[81].serviceAreaText);
                $("#clientViewLocationText").text(results.en[1].office);
                $("#clientViewOpeningDate").text(results.en[74].openDateText);
                $("#clientViewTypeOfLoan").text(results.en[6].typeOfLoan);
                $("#spnClientViewMatterDetailsTextKey").text(results.en[82].clientViewMatterDetails);
                $("#spnClientViewKeyFactorsTextKey").text(results.en[83].clientViewKeyFactors);
                $("#spnClientViewFinancenatureID").text("Financing");
                $("#spnClientViewCACTextKey").text(results.en[84].clientViewCreditAgreemtnComplexity);
                $("#spnClientViewGuarantorTextKey").text(results.en[85].clientViewGuarantors);
                $("#spnClientViewLegalOpinionTextKey").text(results.en[86].clientViewLegalOp);
                $("#spnClientViewPropsNosTextKey").text(results.en[87].clientViewPropsNos);
                $("#spnClientViewThirdPartyTextKey").text(results.en[88].clientViewThirdParties);
                $("#spnClientViewICATextKey").text(results.en[89].clientViewInterCreditAgree);
                $("#spnClientViewCODTextKey").text(results.en[90].clientViewCorpOfficerDocs);
                $("#spnClientViewDDTextKey").text(results.en[91].clientViewDueDilligence);
                $("#spnClientViewFixedQuoteTextKey").text(results.en[92].clietViewFixedQuote);

                // back next and finish buttons

                $("#lnkBack").text(results.en[93].backButtonText);
                $("#lnkNext").text(results.en[94].nextButtonText);
                $("#lnkFinish").text(results.en[95].finishAndSaveButtonText);


                //SUMMARY VIEW

                $("#summaryFinalGeneralMatterNameTextKey").text(results.en[64].step1TextKey);
                $("#summaryFinalMatterNameTextKey").text(results.en[0].matterName);
                $("#summaryFinalOpenDateTextKey").text(results.en[74].openDateText);
                $("#summaryFinalCloseDateTextKey").text(results.en[75].closeDateText);
                $("#summaryFinalLoanSizeTextKey").text(results.en[5].sizeOfLoan);
                $("#summaryFinalFinanceNatureTextKey").text(results.en[10].natureofFinanceText);
                $("#summaryFinalLocationTextKey").text(results.en[1].office);
                $("#summaryFinalExceptionRateTextKey").text(results.en[3].exceptionRate);
                $("#summaryFinalLoanTypeTextKey").text(results.en[6].typeOfLoan);

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

                $("#spnMatterNameErrorText").text(results.en[103].matterNameErrorText);
                $("#spnOfficeErrorText").text(results.en[104].officeLocationErrorText);
                $("#spnOpenDateErrorText").text(results.en[105].openDateErrorText);
                $("#spnCloseDateErrorText").text(results.en[106].closeDateErrorText);
                $("#spnLoanSizeErrorText").text(results.en[107].loanSizeErrorText);
                $("#spnGuarantorNosErrorText").text(results.en[108].guarantorNosErrorText);
                $("#spnLOErrorText").text(results.en[109].LOErrorText);
                $("#spnLOJErrorText").text(results.en[110].LOJErrorText);
                $("#spnPropsErrorText").text(results.en[111].propsNosErrorText);
                $("#spnFMDErrorText").text(results.en[112].FMDErrorText);
                $("#spnThirdPartyErrorText").text(results.en[113].ThirdPartyErrorText);
                $("#spnTPAErrorText").text(results.en[114].TPAErrorText);
                $("#spnCACErrorText").text(results.en[115].CACErrorText);
                $("#spICAErrorText").text(results.en[116].ICAErrorText);
                $("#spnCODErrorText").text(results.en[117].CODErrorText);
                $("#spnDDErrorText").text(results.en[118].DDErrorText);
                $("#spnCTErrorText").text(results.en[119].CTErrorText);
                $("#spnOFTErrorText").text(results.en[120].OFTErrorText);



            }
            else if (lang === 'fr') {
                $("#spnMatterNameKey").text(results.fr[0].matterName);
                $("#txtMatterName").attr("placeholder", results.fr[0].matterName);
                $("#spnOfficeKey").text(results.fr[1].office);

                $("#txtOpeningDate").attr("placeholder", results.fr[74].openDateText);
                $("#txtClosingDate").attr("placeholder", results.fr[75].closeDateText);

                // var options = "";
                $("#ddlOffices").html("");
                $.each(results.fr[2].officeVal, function (i) {
                    options += '<option class="pt-3" value= "' + results.fr[2].officeVal[i].title.split('~')[0] + '">' + results.fr[2].officeVal[i].title.split('~')[1] + '</option>';
                    $("#ddlOffices").html(options);
                });
                $("#ddlOffices").val(ddVal.split('~')[0]);

                $("#spnExpRateKey").text(results.fr[3].exceptionRate);

                $("#ddlExceptionalRates").html("");
                $.each(results.fr[4].exceptionalRateVal, function (i) {
                    options1 += '<option class="pt-3" value= "' + results.fr[4].exceptionalRateVal[i].title.split('~')[0] + '">' + results.fr[4].exceptionalRateVal[i].title.split('~')[1] + '</option>';
                    $("#ddlExceptionalRates").html(options1);
                });
                $("#ddlExceptionalRates").val(ddVal.split('~')[1]);



                $("#spnLoanSizeKey").text(results.fr[5].sizeOfLoan);
                $("#txtLoanSize").attr("placeholder", results.fr[5].sizeOfLoan);
                $("#spnLoanTypeKey").text(results.fr[6].typeOfLoan);
                $("#loanTypeRB").html("");
                $.each(results.fr[7].typeOfLoanVal, function (i, item) {
                    options2 += "<div><input class='mb-3' type='radio' name='TypeOfLoan' value='" + item.title.split('~')[0] + "' />&nbsp;&nbsp; <label class='pr-3 pt-2 size14Font' for='TypeOfLoan'>" + item.title.split('~')[1] + "</label></div>";
                });
                $("#loanTypeRB").append(options2);

                $("input[name='TypeOfLoan'][value='" + rbVal.split('~')[0] + "']").attr('checked', true);

                $("#spnDatesKey").text(results.fr[8].datesText);
                $("#spnTentativeKey").text(results.fr[9].tentativeText);
                $("#spnNatureFinanceText").text(results.fr[10].natureofFinanceText);

                $("#naturefinanceRB").html("");
                $.each(results.fr[11].financeNatureVal, function (i, item) {
                    options3 += "<div><input class='mb-3' type='radio' name='FinanceNature' value='" + item.title.split('~')[0] + "' />&nbsp;&nbsp; <label class='pr-3 pt-2 size14Font' for='FinanceNature'>" + item.title.split('~')[1] + "</label></div>";
                });
                $("#naturefinanceRB").append(options3);

                $("input[name='FinanceNature'][value='" + rbVal.split('~')[1] + "']").attr('checked', true);

                $("#spnPleaseIdentifyTextKey").text(results.fr[12].pleaseIdentifyText);

                $("#spnGuarantorKey").text(results.fr[13].guarantorText);
                $("#spnLOKey").text(results.fr[14].legalOpText);
                $("#spnJLO").text(results.fr[15].jurisdLOText);
                $("#spnPropsKey").text(results.fr[16].propsText);
                $("#spnFMDJuriKey").text(results.fr[17].fmdJuriText);
                $("#spnThirdPartyKey").text(results.fr[18].thirdPartyText);

                $("#lnkGetDays").text(results.fr[19].getDaysText);
                $("#step2PleaseSelectKey").text(results.fr[20].step2PleaseSelectText);
                $("#spnTPATextKey").text(results.fr[21].thirdPartyAckText);
                $("#ddlThirdPartyAck").html("");
                $.each(results.fr[22].thirdPartyAckVal, function (i) {
                    options4 += '<option class="pt-3" value= "' + results.fr[22].thirdPartyAckVal[i].title.split('~')[0] + '">' + results.fr[22].thirdPartyAckVal[i].title.split('~')[1] + '</option>';
                    $("#ddlThirdPartyAck").html(options4);
                });
                $("#ddlThirdPartyAck").val(step2Val.split('~')[0]);

                $("#spnCACTextKey").text(results.fr[23].creditAgreeComplexText);
                $("#ddlCreditAgreement").html("");
                $.each(results.fr[24].creditAgreementVal, function (i) {
                    options5 += '<option class="pt-3" value= "' + results.fr[24].creditAgreementVal[i].title.split('~')[0] + '">' + results.fr[24].creditAgreementVal[i].title.split('~')[1] + '</option>';
                    $("#ddlCreditAgreement").html(options5);
                });
                $("#ddlCreditAgreement").val(step2Val.split('~')[1]);

                $("#spnICATextKey").text(results.fr[25].interCreditText);
                $("#ddlInterCreditAgreement").html("");
                $.each(results.fr[26].interCreditAgreementVal, function (i) {
                    options6 += '<option class="pt-3" value= "' + results.fr[26].interCreditAgreementVal[i].title.split('~')[0] + '">' + results.fr[26].interCreditAgreementVal[i].title.split('~')[1] + '</option>';
                    $("#ddlInterCreditAgreement").html(options6);
                });
                $("#ddlInterCreditAgreement").val(step2Val.split('~')[2]);

                $("#spnCODTextKey").text(results.fr[27].corpOfficerDocsText);
                $("#ddlCorpOfficerDocs").html("");
                $.each(results.fr[28].corpOfficerDocsVal, function (i) {
                    options7 += '<option class="pt-3" value= "' + results.fr[28].corpOfficerDocsVal[i].title.split('~')[0] + '">' + results.fr[28].corpOfficerDocsVal[i].title.split('~')[1] + '</option>';
                    $("#ddlCorpOfficerDocs").html(options7);
                });
                $("#ddlCorpOfficerDocs").val(step2Val.split('~')[3]);

                $("#spnDueDilliTextKey").text(results.fr[29].dueDilliText);
                $("#ddlDueDilli").html("");
                $.each(results.fr[30].dueDilliVal, function (i) {
                    options8 += '<option class="pt-3" value= "' + results.fr[30].dueDilliVal[i].title.split('~')[0] + '">' + results.fr[30].dueDilliVal[i].title.split('~')[1] + '</option>';
                    $("#ddlDueDilli").html(options8);
                });
                $("#ddlDueDilli").val(step2Val.split('~')[4]);

                $("#spnClientTypeTextKey").text(results.fr[31].clientTypeText);
                $("#ddlClientType").html("");
                $.each(results.fr[32].clientTypeVal, function (i) {
                    options9 += '<option class="pt-3" value= "' + results.fr[32].clientTypeVal[i].title.split('~')[0] + '">' + results.fr[32].clientTypeVal[i].title.split('~')[1] + '</option>';
                    $("#ddlClientType").html(options9);
                });
                $("#ddlClientType").val(step2Val.split('~')[5]);

                $("#spnOFTTextKey").text(results.fr[33].opposeFirmTypeText);
                $("#ddlOpposingLawFirm").html("");
                $.each(results.fr[34].opposeFirmTypeVal, function (i) {
                    options10 += '<option class="pt-3" value= "' + results.fr[34].opposeFirmTypeVal[i].title.split('~')[0] + '">' + results.fr[34].opposeFirmTypeVal[i].title.split('~')[1] + '</option>';
                    $("#ddlOpposingLawFirm").html(options10);
                });
                $("#ddlOpposingLawFirm").val(step2Val.split('~')[6]);

                $("#spnPartnerText").text(results.fr[35].partnersText);
                $("#spnAssociateText").text(results.fr[36].associatesText);
                $("#spnOtherText").text(results.fr[37].othersText);

                $("#spnPartnerText2").text(results.fr[35].partnersText);
                $("#spnAssociateText2").text(results.fr[36].associatesText);
                $("#spnOtherText2").text(results.fr[37].othersText);

                $("#spnAggregateStaffMixText").text(results.fr[38].aggregatedStaffText);

                $("#btnSuggested").val(results.fr[39].suggestedButtonText);
                $("#spnRevisedQuoteTextToggle").text(results.fr[40].revisedQuoteText);

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

                $("#spnProjHoursKPITextKey").text(results.fr[60].projectedHoursKPITextKey);
                $("#spnFixQuoteKPITextKey").text(results.fr[61].fixedQuoteKPITextKey);
                $("#spnPartEQPartKPITextKey").text(results.fr[62].partnerEQPartnerKPITextKey);
                $("#spnDisPreKPITextKey").text(results.fr[63].discountPremiumKPITextKey);
                $("#pills-step1-tab").text(results.fr[64].step1TextKey);
                $("#pills-step2-tab").text(results.fr[65].step2TextKey);
                $("#pills-step3-tab").text(results.fr[66].step3TextKey);
                $("#pills-step4-tab").text(results.fr[67].step4TextKey);

                $("#spnCreateQuoteText").text(results.fr[68].createQuoteTextKey);
                $("#spnEditQuoteText").text(results.fr[69].editQuoteTextKey);

                $("#spnSaveQuoteTextKey").text(results.fr[70].saveQuoteTextKey);

                $("#step1Collapse").text(results.fr[71].step1CollapseText);
                $("#step2Collapse").text(results.fr[72].step2CollapseText);
                $("#step3Collapse").text(results.fr[73].step3CollapseText);

                $("#summaryMatterNameTextKey").text(results.fr[0].matterName);
                $("#summaryOpenDateTextKey").text(results.fr[74].openDateText);
                $("#summaryCloseDateTextKey").text(results.fr[75].closeDateText);
                $("#summaryLocationTextKey").text(results.fr[1].office);
                $("#summaryExceptionTextKey").text(results.fr[3].exceptionRate);
                $("#summaryLoanSizeTextKey").text(results.fr[5].sizeOfLoan);
                $("#summaryLoanTypeTextKey").text(results.fr[6].typeOfLoan);
                $("#summaryFinanceNatureTextKey").text(results.fr[10].natureofFinanceText);

                $("#summaryTPATextKey").text(results.fr[21].thirdPartyAckText);
                $("#summaryCACTextKey").text(results.fr[23].creditAgreeComplexText);
                $("#summaryICATextKey").text(results.fr[25].interCreditText);
                $("#summaryCODTextKey").text(results.fr[27].corpOfficerDocsText);
                $("#summaryDDTextKey").text(results.fr[29].dueDilliText);
                $("#summaryCTTextKey").text(results.fr[31].clientTypeText);
                $("#summaryOFTTextKey").text(results.fr[33].opposeFirmTypeText);

                $("#summaryPartnersTextKey").text(results.fr[35].partnersText);
                $("#summaryAssociateTextKey").text(results.fr[36].associatesText);
                $("#summaryOthersTextKey").text(results.fr[37].othersText);
                $("#summaryPartnerHoursTextKey").text(results.fr[43].totalPartnerHoursText);
                $("#summaryAssociateHoursTextKey").text(results.fr[44].totalAssociateHoursText);

                $("#sowTPATextKey").text(results.fr[21].thirdPartyAckText);
                $("#sowCACTextKey").text(results.fr[23].creditAgreeComplexText);
                $("#sowICATextKey").text(results.fr[25].interCreditText);
                $("#sowCODTextKey").text(results.fr[27].corpOfficerDocsText);
                $("#sowDDTextKey").text(results.fr[29].dueDilliText);

                $("#sowModalHeading").text(results.fr[76].sowHeadingModalHeadText);
                $("#sowHeadingProjChar").text(results.fr[77].sowHeadingProjCharText);
                $("#sowHeadingLevelSelect").text(results.fr[78].sowHeadingLevelSelectText);
                $("#sowHeadingAssumption").text(results.fr[79].sowHeadingAssumumptionText);


                $("#clientViewHeading").text(results.fr[80].clientViewHeading);
                $("#clientViewMatterNameText").text(results.fr[0].matterName);
                $("#clientViewServiceAreaText").text(results.fr[81].serviceAreaText);
                $("#clientViewLocationText").text(results.fr[1].office);
                $("#clientViewOpeningDate").text(results.fr[74].openDateText);
                $("#clientViewTypeOfLoan").text(results.fr[6].typeOfLoan);
                $("#spnClientViewMatterDetailsTextKey").text(results.fr[82].clientViewMatterDetails);
                $("#spnClientViewKeyFactorsTextKey").text(results.fr[83].clientViewKeyFactors);


                $("#spnClientViewFinancenatureID").text("FR-Financing");
                $("#spnClientViewCACTextKey").text(results.fr[84].clientViewCreditAgreemtnComplexity);
                $("#spnClientViewGuarantorTextKey").text(results.fr[85].clientViewGuarantors);
                $("#spnClientViewLegalOpinionTextKey").text(results.fr[86].clientViewLegalOp);
                $("#spnClientViewPropsNosTextKey").text(results.fr[87].clientViewPropsNos);
                $("#spnClientViewThirdPartyTextKey").text(results.fr[88].clientViewThirdParties);
                $("#spnClientViewICATextKey").text(results.fr[89].clientViewInterCreditAgree);
                $("#spnClientViewCODTextKey").text(results.fr[90].clientViewCorpOfficerDocs);
                $("#spnClientViewDDTextKey").text(results.fr[91].clientViewDueDilligence);
                $("#spnClientViewFixedQuoteTextKey").text(results.fr[92].clietViewFixedQuote);

                $("#lnkBack").text(results.fr[93].backButtonText);
                $("#lnkNext").text(results.fr[94].nextButtonText);
                $("#lnkFinish").text(results.fr[95].finishAndSaveButtonText);




                //SUMMARY VIEW

                $("#summaryFinalGeneralMatterNameTextKey").text(results.fr[64].step1TextKey);
                $("#summaryFinalMatterNameTextKey").text(results.fr[0].matterName);
                $("#summaryFinalOpenDateTextKey").text(results.fr[74].openDateText);
                $("#summaryFinalCloseDateTextKey").text(results.fr[75].closeDateText);
                $("#summaryFinalLoanSizeTextKey").text(results.fr[5].sizeOfLoan);
                $("#summaryFinalFinanceNatureTextKey").text(results.fr[10].natureofFinanceText);
                $("#summaryFinalLocationTextKey").text(results.fr[1].office);
                $("#summaryFinalExceptionRateTextKey").text(results.fr[3].exceptionRate);
                $("#summaryFinalLoanTypeTextKey").text(results.fr[6].typeOfLoan);

                $("#summaryFinalProjCharacterTextKey").text(results.fr[65].step2TextKey);
                $("#summaryFinalTPATextKey").text(results.fr[21].thirdPartyAckText);
                $("#summaryFinalCACTextKey").text(results.fr[23].creditAgreeComplexText);
                $("#summaryFinalICATextKey").text(results.fr[25].interCreditText);
                $("#summaryFinalCODTextKey").text(results.fr[27].corpOfficerDocsText);
                $("#summaryFinalDDTextKey").text(results.fr[29].dueDilliText);
                $("#summaryFinalCTTextKey").text(results.fr[31].clientTypeText);
                $("#summaryFinalOFTTextKey").text(results.fr[33].opposeFirmTypeText);

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

                $("#spnMatterNameErrorText").text(results.fr[103].matterNameErrorText);
                $("#spnOfficeErrorText").text(results.fr[104].officeLocationErrorText);
                $("#spnOpfrDateErrorText").text(results.fr[105].opfrDateErrorText);
                $("#spnCloseDateErrorText").text(results.fr[106].closeDateErrorText);
                $("#spnLoanSizeErrorText").text(results.fr[107].loanSizeErrorText);
                $("#spnGuarantorNosErrorText").text(results.fr[108].guarantorNosErrorText);
                $("#spnLOErrorText").text(results.fr[109].LOErrorText);
                $("#spnLOJErrorText").text(results.fr[110].LOJErrorText);
                $("#spnPropsErrorText").text(results.fr[111].propsNosErrorText);
                $("#spnFMDErrorText").text(results.fr[112].FMDErrorText);
                $("#spnThirdPartyErrorText").text(results.fr[113].ThirdPartyErrorText);
                $("#spnTPAErrorText").text(results.fr[114].TPAErrorText);
                $("#spnCACErrorText").text(results.fr[115].CACErrorText);
                $("#spICAErrorText").text(results.fr[116].ICAErrorText);
                $("#spnCODErrorText").text(results.fr[117].CODErrorText);
                $("#spnDDErrorText").text(results.fr[118].DDErrorText);
                $("#spnCTErrorText").text(results.fr[119].CTErrorText);
                $("#spnOFTErrorText").text(results.fr[120].OFTErrorText);
            }

        },
        error: function (xhr, status, error) {
            console.log(xhr.responseJSON);
            console.log(status);

        }
    });

}