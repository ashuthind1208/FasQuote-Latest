//rotating the chevron icons on the home page

function rotateIcons() {
    $(".iconRotate").click(function () {
        $(".rotate").toggleClass("down");
    })

    $(".leftTopQuoteRotate").click(function () {
        $(".rotateLeftTopQuotes").toggleClass("down");
    });

    $(".leftTopQuoteRotate_2").click(function () {
        $(".rotateLeftTopQuotes_2").toggleClass("down");
    });
}


//get user traffic data count

function insertUserTrafficData(jsonData) {


    var temp = null;

    $.ajax({
        type: 'POST',
        url: 'serviceAreas.aspx/InsertTrafficData',
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


//get count of service area quotes grouped by service area

function getSACount_GroupBySA(jsonData) {
    var data = null;
    $.ajax({
        type: 'GET',
        url: 'Home.aspx/GetSACount_GroupBySA?loggedInEmail=' + jsonData,       
        cache: false,
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (results) {
            var ob = JSON.parse(JSON.stringify(results));
            data = JSON.parse(ob.d);

        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);

        }
    });

    return data;
}

function getSACount_GroupBySA_Finalized(jsonData) {
    var data = null;
    $.ajax({
        type: 'GET',
        url: 'Home.aspx/GetSACount_GroupBySA_Finalized?loggedInEmail=' + jsonData,
        cache: false,
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (results) {
            var ob = JSON.parse(JSON.stringify(results));
            data = JSON.parse(ob.d);

        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);

        }
    });

    return data;
}



// calculate the sum of 3 textboxes - should be equal to 100

function getPartAssoOtherStaffingMixSum(part,asso) {

    return parseInt(100 - (parseInt(part) + parseInt(asso)));
}


// function to add the color classes to the element

function addColorClassesToValue(elementID,value) {
    if (value < 0)
        $(elementID).addClass('rangeRed').removeClass('rangeGreen');

    else if (value > 0)
        $(elementID).addClass('rangeGreen').removeClass('rangeRed');

    else if (value === 0)
        $(elementID).removeClass('rangeGreen').removeClass('rangeRed');
}



