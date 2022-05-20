const validateForm = (arrayInput) => {

    let errMessages = document.querySelectorAll('.err-message');
    console.log(errMessages);
    let inputImage = document.getElementById('image');

    let check = true;

    for (const [index, input] of arrayInput.entries()) {

        // Focus se ko hien thi loi~ 
        input.addEventListener('focus', () => {
            errMessages[index].hidden = true;
        });

        // Neu nguoi dung ko nhap => Bao loi~
        if (input.value === '') {
            errMessages[index].hidden = false;
            check = false;
        }

        
    }

    // Kiem tra ng dung da chon image hay chua
    if (inputImage.files.length == 0) {
        errMessages[errMessages.length - 1].hidden = false;
        check = false;
    }
    
    inputImage.addEventListener('change', () => {
        errMessages[errMessages.length - 1].hidden = true;
    })

    return check;
}

export default validateForm;