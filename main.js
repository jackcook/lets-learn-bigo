var level = 0;
var page = 0;

var content = [
    {
        title: "Level One:<br><strong>Basics</strong>",
        text: "Let's start with the basics..."
    },
    {
        text: "Big O notation is used to determine the running times of algorithms in computer science."
    },
    {
        text: "Constant runtime exists when how long the algorithm takes is unaffected by the inputs."
    },
    {
        text: "For example, determining whether a boolean is true or false will always take the same amount of time."
    },
    {
        text: "Because of this, the runtime of that algorithm could be represented as O(1), meaning it is constant."
    },
    {
        text: "If the runtime of an algorithm increased by the same amount for each increase in the number of inputs, that would be referred to as linear time."
    },
    {
        text: "For example, if we were adding together a list of numbers, exactly one additional operation has to be made for each one addition to the list. This results in a linear relationship."
    },
    {
        text: "Since it is linear, it increases by the same amount for each increase in n. Therefore, we can refer to this as O(n)."
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
