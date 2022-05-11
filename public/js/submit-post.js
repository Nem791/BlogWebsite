$("#sendMessageButton").click(function (e) {
    e.preventDefault();
    let data = $("#new-form").serializeArray();
    // data.pop();
    // data.pop();
    console.log(data);
});