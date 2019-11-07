$(document).ready(function () {
  // --- our code goes here ---
  $('#tweeter-text').on('keyup', function () {
    let inputLength = $(this).val().length;
    let charLeft = 140 - Number(inputLength);

    charLeft >= 0 ? $(this).siblings().find("span").text(charLeft).css("color", "#545149") : $(this).siblings().find("span").text(charLeft).css("color", "red");

  })
});