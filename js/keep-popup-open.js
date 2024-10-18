jQuery(document).ready(function ($) {
  // Replace with your actual Gravity Form ID and Elementor Popup ID
  var gravityFormId = "gform_wrapper_1";
  var elementorPopupClass = ".elementor-popup";

  // Listen for the Gravity Form's AJAX complete event
  $(document).on("gform_post_render", function (event, formId, currentPage) {
    if (formId === YOUR_FORM_ID) {
      // Check if it's the last page/step of the form
      var isLastPage = currentPage === YOUR_LAST_PAGE_NUMBER; // Replace with your actual last page number

      // If it's not the last page, keep the popup open
      if (!isLastPage) {
        $(elementorPopupClass).addClass("elementor-popup-open");
      }
    }
  });

  // Prevent default close behavior on form step submission
  $(document).on("submit", "#" + gravityFormId + " form", function (e) {
    // Prevent popup from closing
    e.preventDefault();

    // Simulate form submission
    var form = $(this);
    $.post(form.attr("action"), form.serialize(), function (response) {
      // Handle form response, move to next step
      // Assuming Gravity Forms handles this internally
    });
  });
});
