var level = 0;
var round = 0;
var page = 0;

var content = [
    {
        rounds: [
            {
                pages: [
                    ""
                ]
            }
        ]
    },
    {
        name: "Basics",
        description: "Let's start with the basics...",
        rounds: [
            {
                pages: [
                    "Big O notation is used to determine the running times of algorithms in computer science.",
                    "Some content for the second page"
                ],
            },
            {
                name: "Constant Runtime",
                pages: [
                    "An algorithm's runtime is constant if it is unaffected by changes in inputs.",
                    "Because of this, the runtime of that algorithm could be represented as O(1)."
                ]
            }
        ]
    },
    {
        name: "Basics 2",
        description: "Let's start with the basics...",
        rounds: [
            {
                pages: [
                    "Level 2 introduction page 1",
                    "Level 2 introduction page 2"
                ],
            },
            {
                name: "Constant Runtime 2",
                pages: [
                    "Level 2 round 1 page 1",
                    "Level 2 round 1 page 2"
                ]
            }
        ]
    }
];

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

function updateContainerContent(firstLevel) {
    if (page + 1 == content[level].rounds[round].pages.length) {
        // Round is complete
        page = -1;

        if (round + 1 == content[level].rounds.length) {
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

                $("#container h1").html("Level One:<br><strong>" + content[level].name + "</strong>");
                $("#container p").text(content[level].description);
            });
        } else {
            // Round is complete
            round += 1;

            contractAndExpandContainer(function() {
                $("#container .stage").removeClass("level");
                $("#container .stage").addClass("round");
                $("#container .stage").text(round);
                $(".round").text(round);

                $("#container h1").html("Round One:<br><strong>" + content[level].rounds[round].name + "</strong>");
                $("#container p").text("");
            });
        }
    } else {
        // Next page
        page += 1;

        $("#container h1").text("");
        $("#container p").text(content[level].rounds[round].pages[page]);
    }
}

$("#begin").click(function() {
    updateContainerContent(false);
});
