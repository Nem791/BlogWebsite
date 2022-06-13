import categoryPicker from "/js/validation/category-picker.js";
import validateForm from "/js/validation/new-post-validation.js";

categoryPicker($.makeArray($('input:checkbox')));

// Check error 
if (localStorage.getItem('error')) {
    alert(JSON.parse(localStorage.getItem('error')));
    localStorage.clear();
} else if (localStorage.getItem('image-error')) {
    alert(JSON.parse(localStorage.getItem('image-error')));
    localStorage.clear();
}

// Xu ly category 
$("#sendMessageButton").click(function (e) {
    e.preventDefault();
    const array = [];
    // data.pop();
    // data.pop();
    console.log(this);
    $("input:checkbox:checked").each(function () {
        array.push($(this).attr("id"));
        $(this).click();
    });

    // Set array category cho hidden input 
    $("input:hidden").val(JSON.stringify(array));

    const textInputs = [...$("input:text"), $('textarea')[0]];
    if (validateForm(textInputs)) {
        $('#new-form').submit();
    }

    console.log($("input:hidden").val());
    console.log("typeof array: ", typeof array);

    let data = $("#new-form").serializeArray();
    console.log(data);

    var file = document.forms['new-form']['image'].files;
    console.log(file);
});