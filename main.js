---
# main.js
---

var level = 0;
var round = 0;
var page = 0;

var levels = {{ site.data.levels | jsonify }};
var numbers = ["Zero", "One", "Two", "Three", "Four", "Five"];

function contractAndExpandContainer(changeContentCallback) {
    var originalHeight = parseInt($("#container").css("height"));
    var originalWidth = parseInt($("#container").css("width"));
    var originalLeftPadding = parseInt($("#container").css("padding-left"));
    var originalTopMargin = parseInt($("#container").css("margin-top"));

    var originalBorderRadius = $("#container").css("border-radius");
    var originalPadding = $("#container").css("padding");

    var fullSize = originalWidth + 2 * originalLeftPadding;
    var newSize = fullSize * (7 / 6);

    var newBorderRadius = newSize / 2 + "px";
    var newPadding = (newSize - originalHeight) / 2 + "px " + (newSize - originalWidth) / 2 + "px";

    $("#container").removeClass("overflow");

    $("#container").animate({
        borderRadius: newBorderRadius,
        padding: newPadding
    }, 100, function() {
        $("#container").animate({
            width: "0",
            height: "0",
            padding: "0"
        }, 300, function() {
            setTimeout(function() {
                changeContentCallback();
                $("#container").animate({
                    height: originalHeight,
                    padding: newPadding,
                    width: originalWidth
                }, 300, function() {
                    $("#container").addClass("overflow");
                    $("#container").animate({
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
        $("#container").removeClass();
        $("#container").addClass("lesson");
        $("#container").addClass("overflow");
        $("#answer").addClass("hidden");
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
                    $("#stage").removeClass("hidden");
                    $("#container").addClass("lesson");
                    $("#container a").text("Continue");
                    $("#container .stage").removeClass("hidden");
                }

                $("#container .stage").removeClass("round");
                $("#container .stage").addClass("level");
                $("#container .stage").text(level);
                $(".level").text(level);

                $("#container h1").html("Level " + numbers[level] + ":<br><strong>" + levels[level].name + "</strong>");
                $("#container p").text(levels[level].description);

                $("#container h1").removeClass("hidden");
            });
        } else {
            // Round is complete
            round += 1;

            contractAndExpandContainer(function() {
                $("#container .stage").removeClass("level");
                $("#container .stage").addClass("round");
                $("#container .stage").text(round);
                $(".round").text(round);

                $("#container h1").html("Round " + numbers[round] + ":<br><strong>" + levels[level].rounds[round].name + "</strong>");

                $("#container h1").removeClass("hidden");
                $("#container p").addClass("hidden");
            });
        }
    } else {
        // Next page
        page += 1;

        var content = levels[level].rounds[round].pages[page];

        if (content.type == "text") {
            $("#container p").text(content.text);
        } else if (content.type == "question") {
            $("#container p").html(content.code);

            $("#container").removeClass();
            $("#container").addClass("question")
            $("#answer").removeClass("hidden");
        }

        $("#container h1").addClass("hidden");
        $("#container p").removeClass("hidden");
    }
}

$("#begin").click(function() {
    updateContainerContent();
});

$("#stage").click(function() {
    $("#level-selector").removeClass("hidden");
});

$("#close-button").click(function() {
    $("#level-selector").addClass("hidden");
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
