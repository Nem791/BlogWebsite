let errorSpan = document.getElementById('error');
if (errorSpan.innerText.trim() === '') {
    console.log('Empty');
} else {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorSpan.innerText.trim()
      })
}
