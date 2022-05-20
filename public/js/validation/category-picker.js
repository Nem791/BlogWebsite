const categoryPicker = (arrayCheckbox) => {

    defaultCheckbox(arrayCheckbox);

    // Set default checkbox
    // It nhat co 1 checkbox duoc tich 
    for (const [index, checkbox] of arrayCheckbox.entries()) {
        checkbox.addEventListener('change', () => {

            // Kiem tra neu tat ca checkbox deu` khong duoc tich 
            let check = arrayCheckbox.every((cb) => {
                return cb.checked === false;
            });

            // Neu tat ca ko dc tich => Tich Other checkbox
            if (check) {
                defaultCheckbox(arrayCheckbox);
            } else {
                resetDefaultCheckbox(arrayCheckbox);
            }
        })
        
    }
    
}

const defaultCheckbox = (arrayCheckbox) => {
    // Other checkbox mac dinh luon duoc checked 
    let otherCheckbox = arrayCheckbox.find(element => element.id === 'Other');
    otherCheckbox.checked = true;
    otherCheckbox.disabled = true;
}

const resetDefaultCheckbox = (arrayCheckbox) => {
    let otherCheckbox = arrayCheckbox.find(element => element.id === 'Other');
    otherCheckbox.disabled = false;
}

export default categoryPicker;