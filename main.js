var level = 0;
var page = 0;

var content = [
    {
        title: "Level One:<br><strong>Basics</strong>",
        text: "Let's start with the basics..."
    },
    {
        text: "Big O notation is used to determine the running times of algorithms in computer science."
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

    $("#container").animate({
        borderRadius: newBorderRadius,
        padding: newPadding
    }, 100, function() {
        $("#container").animate({
            width: "0",
            height: "0",
            padding: "0"
        }, 300, function() {
            changeContentCallback();
            setTimeout(function() {
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

function updateContainerContent(page) {
    $("#container h1").html("title" in page ? page.title : "");
    $("#container p").text("text" in page ? page.text : "");
}

$("#begin").click(function() {
    if (page == 0) {
        contractAndExpandContainer(function() {
            $("#container").addClass("lesson");
            $("#container a").text("Continue");
            updateContainerContent(content[page]);
            page += 1;
        });
    } else {
        updateContainerContent(content[page]);
        page += 1;
    }
});
