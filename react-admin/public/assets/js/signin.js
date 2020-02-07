document.addEventListener('DOMContentLoaded', () => {
  const errorsBox = document.getElementById('errors-alert');
  if (errorsBox instanceof HTMLElement) {
    setTimeout(() => {
      errorsBox.style.display = 'none';
    }, 2000);
  }
});
