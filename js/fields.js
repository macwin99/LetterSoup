function addLetters() 
{
    var number_r = document.getElementById("Number_Rows").value;
    var number_c = document.getElementById("Number_Colums").value;
    var container = document.getElementById("letter-form");
    while (container.hasChildNodes()) 
    {
        container.removeChild(container.lastChild);
    }
    for (i=0;i<number_r;i++)
    {
        container.appendChild(document.createTextNode("Letters for Row " + (i+1)));
        var input = document.createElement("input");
        input.id = "letters" + i;
        input.type = "text";
        input.measureText = "2";
        input.name = "letters" + i;
        container.appendChild(input);
        container.appendChild(document.createElement("br"));
        $("#letters" + i).attr('maxlength',number_c);
    }
    $("#submit_letters").css( "display", "none" );
}

function addWords() 
{
    word_number = word_number + 1;
    var container = document.getElementById("word-form");
    container.appendChild(document.createTextNode("Word Number " + word_number));
    var input = document.createElement("input");
    input.id = "word" + word_number;
    input.type = "text";
    input.measureText = "2";
    input.name = "word";
    container.appendChild(input);
    container.appendChild(document.createElement("br"));
}