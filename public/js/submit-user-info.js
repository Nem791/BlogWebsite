const submitBtn = document.getElementById('submit-user');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Hien modal hoi nguoi dung co muon thay doi? 
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to make these changes?",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        
        // Neu nguoi dung dong y => Thay doi info 
        if (result.isConfirmed) {
            Swal.fire(
                'Success!',
                'Your changes have been saved',
                'success'
            ).then(() => {
                const userForm = document.getElementById('user-form');
                userForm.submit();
            })
        }
    })
});
