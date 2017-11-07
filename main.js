---
# main.js
---

var level = 0;
var round = 0;
var page = 0;

var levels = {{ site.data.levels | jsonify }};
var numbers = ["Zero", "One", "Two", "Three", "Four", "Five"];

function contractAndExpandContainer(changeContentCallback) {
    var originalHeight = parseInt($("#main").css("height"));
    var originalWidth = parseInt($("#main").css("width"));
    var originalLeftPadding = parseInt($("#main").css("padding-left"));
    var originalTopMargin = parseInt($("#main").css("margin-top"));

    var originalBorderRadius = $("#main").css("border-radius");
    var originalPadding = $("#main").css("padding");

    var fullSize = originalWidth + 2 * originalLeftPadding;
    var newSize = fullSize * (7 / 6);

    var newBorderRadius = newSize / 2 + "px";
    var newPadding = (newSize - originalHeight) / 2 + "px " + (newSize - originalWidth) / 2 + "px";

    $("#main").css("overflow", "hidden");

    $("#main").animate({
        borderRadius: newBorderRadius,
        padding: newPadding
    }, 100, function() {
        $("#main").animate({
            width: "0",
            height: "0",
            padding: "0"
        }, 300, function() {
            setTimeout(function() {
                changeContentCallback();
                $("#main").animate({
                    height: originalHeight,
                    padding: newPadding,
                    width: originalWidth
                }, 300, function() {
                    $("#main").css("overflow", "visible");
                    $("#main").animate({
                        borderRadius: originalBorderRadius,
                        padding: originalPadding
                    }, 100);
                });
            }, 500);
        });
    });
}

function updateContainerContent() {
    var currentPage = levels[level].rounds[round].pages[page];

    if (currentPage != null && currentPage.type == "question") {
        $("#content").removeClass();
        $("#content").addClass("lesson");
        $("#main").css("overflow", "visible");
    }

    if (page + 1 == levels[level].rounds[round].pages.length) {
        // Round is complete
        page = -1;

        if (round + 1 == levels[level].rounds.length) {
            // Level is complete
            round = 0;
            level += 1;

            contractAndExpandContainer(function() {
                if (level == 1) {
                    $("#indicator").removeClass("hidden");
                    $("#content").addClass("lesson");
                    $("#main a").text("Continue");
                }

                $("#main .indicator").removeClass("round");
                $("#main .indicator").addClass("level");
                $("#main .indicator").text(level);
                $(".level.update").text(level);

                $("#main h1").html("Level " + numbers[level] + ":<br><strong>" + levels[level].name + "</strong>");
                $("#main p").text(levels[level].description);

                $("#main h1").removeClass("hidden");
            });
        } else {
            // Round is complete
            round += 1;

            contractAndExpandContainer(function() {
                $("#main .indicator").removeClass("level");
                $("#main .indicator").addClass("round");
                $("#main .indicator").text(round);
                $(".round.update").text(round);

                $("#main h1").html("Round " + numbers[round] + ":<br><strong>" + levels[level].rounds[round].name + "</strong>");

                $("#main h1").removeClass("hidden");
                $("#main p").addClass("hidden");
            });
        }
    } else {
        // Next page
        page += 1;

        var content = levels[level].rounds[round].pages[page];

        if (content.type == "text") {
            $("#main p").text(content.text);
        } else if (content.type == "question") {
            $("#main p").html(content.code);

            $("#content").removeClass("lesson");
            $("#content").addClass("question");
        }

        $("#main h1").addClass("hidden");
        $("#main p").removeClass("hidden")
    }
}

$("#main .button").click(function() {
    updateContainerContent();
});

$("#indicator").click(function() {
    $("#map").removeClass("hidden");
});

$("#close-button").click(function() {
    $("#map").addClass("hidden");
});

$("#answer input").keyup(function(e) {
    // If the enter key was hit
    if (e.keyCode == 13) {
        var correctAnswer = levels[level].rounds[round].pages[page].answer;
            if ($("#answer input").val() == correctAnswer) {
            $("#answer input").addClass("correct");
            $("#answer input").prop("disabled", true);
            $("#answer p").text("CORRECT!");
            $("#answer .button").removeClass("hidden");
        } else {
            $("#answer input").val("");
        }
    }
});

$("#answer .button").click(function() {
    updateContainerContent();
});
