function enableBackNextFunctions(nextButton, backButton, finishAndSaveButton) {


    $(nextButton).click(function (e) {

        e.preventDefault();
        var next_tab = $('#pills-tab').children().find("a[class*='active']").parentsUntil("ul").next("li").find('a');
        var tabID = $('#pills-tab').children().find("a[class*='active']").parentsUntil("ul").next("li").find('a').attr("ID");
        console.log(tabID);
        if (next_tab.length > 0) {
            next_tab.trigger('click');
        } else {
            $('.nav-tabs li:eq(0) a').trigger('click');
        }

        //display finish and save link instead of Next when reached the last tab
        if (tabID !== "pills-step4-tab") {
            $(nextButton).show();
            $(finishAndSaveButton).hide();
        }
       else if (tabID === "pills-step3-tab") {
            $(nextButton).text("Build Your Quote");
            //$(finishAndSaveButton).hide();
        }
        else {
            $(finishAndSaveButton).show();
            $(nextButton).hide();
        }
    });

    $(backButton).click(function (e) {
        e.preventDefault();
        var next_tab = $('#pills-tab').children().find("a[class*='active']").parentsUntil("ul").prev("li").find('a');
        var tabID = $('#pills-tab').children().find("a[class*='active']").parentsUntil("ul").next("li").find('a').attr("ID");
        // console.log(next_tab);
        if (next_tab.length > 0) {
            next_tab.trigger('click');
            $(finishAndSaveButton).hide();
            $(nextButton).show();
        } else {
            $('.nav-tabs li:eq(0) a').trigger('click');

        }

        if (tabID === "pills-step1-tab") {
            $(backButton).addClass("badge-secondary");
            $(backButton).removeClass("badge-fasQuoteOrange");
        }
        else {
            $(backButton).removeClass("badge-secondary");
            $(backButton).addClass("badge-fasQuoteOrange");

        }
    });
}

function modifiedNextFunctions(nextButton, finishAndSaveButton) {

    //e.preventDefault();
    var next_tab = $('#pills-tab').children().find("a[class*='active']").parentsUntil("ul").next("li").find('a');
    var tabID = $('#pills-tab').children().find("a[class*='active']").parentsUntil("ul").next("li").find('a').attr("ID");
    //console.log(tabID);
    if (next_tab.length > 0) {
        next_tab.trigger('click');
    } else {
        $('.nav-tabs li:eq(0) a').trigger('click');
    }

    //display finish and save link instead of Next when reached the last tab
    if (tabID !== "pills-step4-tab") {
        $(nextButton).show();
        $(finishAndSaveButton).hide();
    }   
    
    else {
        $(finishAndSaveButton).show();
        $(nextButton).hide();
    }

}



function modifiedBackFunctions(backButton, nextButton, finishAndSaveButton) {

    var next_tab = $('#pills-tab').children().find("a[class*='active']").parentsUntil("ul").prev("li").find('a');
    var tabID = $('#pills-tab').children().find("a[class*='active']").parentsUntil("ul").next("li").find('a').attr("ID");
    // console.log(next_tab);
    if (next_tab.length > 0) {
        next_tab.trigger('click');
        $(finishAndSaveButton).hide();
        $(nextButton).show();
    } else {
        $('.nav-tabs li:eq(0) a').trigger('click');

    }

    if (tabID === "pills-step1-tab") {
        $(backButton).addClass("badge-secondary");
        $(backButton).removeClass("badge-fasQuoteOrange");
    }
    else {
        $(backButton).removeClass("badge-secondary");
        $(backButton).addClass("badge-fasQuoteOrange");

    }

}