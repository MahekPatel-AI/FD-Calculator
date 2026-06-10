
$(document).ready(function () {

    var n = 4;

    function updateGraph(P, R, n) {

        $(".bar").each(function (index) {

            var year = index + 1;

            var amount = P * Math.pow((1 + (R / 100) / n), n * year);

            var interest = amount - P;

            var height = (interest / 60000) * 180;

            if (height > 180)
                height = 180;

            $(this).find(".fill").css("height", height + "px");

            $(this).find("p").text(year);
        });
    }

    function calculate() {

        var P = parseFloat($("#amount").val()) || 0;
        var R = parseFloat($("#rate").val()) || 0;
        var T = parseFloat($("#year").val()) || 0;

        var rate = R / 100;

        // Compound Interest
        var A = P * Math.pow((1 + rate / n), n * T);

        var I = A - P;

        $("#maturity").html("₹" + Math.round(A).toLocaleString("en-IN"));

        $("#interest").html("₹" + Math.round(I).toLocaleString("en-IN"));

        // Effective Annual Return
        var cumulative =
            (Math.pow(1 + rate / n, n) - 1) * 100;

        $("#cumRate").html(cumulative.toFixed(2) + "%");

        // Update Graph
        updateGraph(P, R, n);
    }

    // Deposit Amount
    $("#amountRange").on("input", function () {

        $("#amount").val($(this).val());

        calculate();

    });

    $("#amount").on("input", function () {

        $("#amountRange").val($(this).val());

        calculate();

    });

    // Rate
    $("#rateRange").on("input", function () {

        $("#rate").val($(this).val());

        calculate();

    });

    $("#rate").on("input", function () {

        $("#rateRange").val($(this).val());

        calculate();

    });

    // Time
    $("#yearRange").on("input", function () {

        $("#year").val($(this).val());

        calculate();

    });

    $("#year").on("input", function () {

        $("#yearRange").val($(this).val());

        calculate();

    });

    // Interest Payout
    $(".btns button").click(function () {

        $(".btns button").removeClass("active");

        $(this).addClass("active");

        var payout = $(this).text().trim();

        if (payout == "Quarterly")
            n = 4;

        else if (payout == "Half yearly")
            n = 2;

        else if (payout == "Yearly")
            n = 1;

        else
            n = 4;

        calculate();

    });

    // Calculate Button
    $("#calculate").click(function () {

        calculate();

    });

    // Initial Load
    calculate();

});