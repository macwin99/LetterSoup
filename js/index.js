$( "#submit_letters" ).click(function() {
    createSoup();
    addLetters();
});

$( "#submit_words" ).click(function() {
    addWords();
});

$( "#search_words" ).click(function() {
    search_word();
});