/*
 * This mehod will show and hide
 * the options related to the 
 * radio buttons (random and search)
 * e.g: If radio button "random" is 
 * selected, then the form will submit
 * automatically.
 */

const switchOption = function () {
  $("input[name=options]").change( function() {    
    if ( $("#randomRadio").is(":checked") ) {
      $(".card").fadeIn();
      $("div.item.space.search-panel").fadeOut();
      // $(this) means 'current radio button'     
      // will get the parent of the current radiobutton and submit the request
        $(this).parents("form").submit(); //solution: https://drupal.stackexchange.com/questions/183927/how-do-i-submit-call-handler-on-radio-button-selection
    }
    if ( $("#searchRadio").is(":checked")  ) {      
      $("div.item.space.search-panel").fadeIn();
        $(".card").fadeOut();
    }
  }); 
}
/*
 * This method allow the page show randomly
 * one joke every 10s ( if random radio buttom is checked)
 */
 const reloadPage = function () {
   setTimeout(function () {
     if ($("#randomRadio").is(":checked")) {
       location.reload(true);
     }
   }, 10000);
 }

/*
 * This method show the app URL
 */
const getPageUrl = function () {
  return $(location).attr("href");
}
/*
 * This method will allow user to toggle or
 * tagger between the options.
 * e.g: If you check "all", every other categories
 * should be disabled and vice-versa
 */
const enableDisableCategories = function () {
  $("#cat-any").click(() => {
    if ($("#cat-any").is(":checked") === true) {
      // https://stackoverflow.com/questions/17420534/check-uncheck-checkbox-using-jquery
      // disable all other categories
      $("#cat-program").prop("disabled", true);
      $("#cat-program").prop("checked", false);
      $("#cat-misc").prop("disabled", true);
      $("#cat-misc").prop("checked", false);
      $("#cat-dark").prop("disabled", true);
      $("#cat-dark").prop("checked", false);
      $("#cat-pun").prop("disabled", true);
      $("#cat-pun").prop("checked", false);
      $("#cat-spooky").prop("disabled", true);
      $("#cat-spooky").prop("checked", false);
      $("#cat-christmas").prop("disabled", true);
      $("#cat-christmas").prop("checked", false);
    } else {
      $("#cat-program").prop("disabled", false);
      $("#cat-misc").prop("disabled", false);
      $("#cat-dark").prop("disabled", false);
      $("#cat-pun").prop("disabled", false);
      $("#cat-spooky").prop("disabled", false);
      $("#cat-christmas").prop("disabled", false);
    }
  });
}
/*
 * This method allows to show the results
 * and keep the search panel in the page
 */
window.onload = function() { //solution: https://stackoverflow.com/questions/16404880/javascript-onload-page-radio-checked
  if ( $("#searchRadio").is(":checked") ){   
    // allow the panel search to show again
    $(".item.space.search-panel").show();
  }
}

switchOption();

reloadPage();

enableDisableCategories();

