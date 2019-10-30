$(document).ready(function() {

  $('.input').focus(function() {
    $(this).parent().find(".animated").addClass('label-active');
  });

  $(".input").focusout(function() {
    if ($(this).val() == '') {
      $(this).parent().find(".animated").removeClass('label-active');
    };
  });

});

function nextPage() {
  console.log("Travel to next page");
  var active = $(".tab.active");
  $("#prevBtn").prop("disabled", false);
  $("#prevBtn").removeAttr("disabled");
  if (active.next().hasClass("tab")) {
    active.removeClass("active");
    active = active.next();
    active.addClass("active");
    progressBar(20);
  }
  if (!active.next().hasClass("tab")) {
    $("#nextBtn").attr("disabled", "");
  }
}

function previousPage() {
  var active = $(".tab.active");
  $("#nextBtn").prop("disabled", false);
  $("#nextBtn").removeAttr("disabled");
  if (active.prev().hasClass("tab")) {
    active.removeClass("active");
    active = active.prev();
    active.addClass("active");
    progressBar(-20);
  }
  if (!active.prev().hasClass("tab")) {
    $("#prevBtn").attr("disabled", "");
  }
}

function progressBar(add) {
  var bar = $("#registerProgress");
  var arianow = bar.attr("aria-valuenow");
  var curVal = parseInt(arianow);
  var newVal = curVal + add;
  bar.attr("aria-valuenow", newVal);
  bar.css("width", newVal + "%");
  bar.text(newVal + "%");
}
