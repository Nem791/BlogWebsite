import categoryPicker from "/js/validation/category-picker.js";
import validateForm from "/js/validation/new-post-validation.js";

categoryPicker($.makeArray($('input:checkbox')));

$("#sendMessageButton").click(function (e) {
    e.preventDefault();
    const array = [];
    // data.pop();
    // data.pop();
    $("input:checkbox:checked").each(function () {
        array.push($(this).attr("id"));
        $(this).click();
    });

    $("input:hidden").val(JSON.stringify(array));

    const textInputs = [...$("input:text"), $('textarea')[0]];
    if (validateForm(textInputs)) {
        $('#new-form').submit();
    }

    console.log($("input:hidden").val());
    console.log(array);

    let data = $("#new-form").serializeArray();
    console.log(data);

    var file = document.forms['new-form']['image'].files;
    console.log(file);
});