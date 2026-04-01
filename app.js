const navItems = document.querySelectorAll('.nav-item');
const views = document.querySelectorAll('.view');

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    navItems.forEach((i) => i.classList.remove('active'));
    item.classList.add('active');
    const target = item.dataset.view;
    views.forEach((view) => view.classList.toggle('active', view.id === target));
  });
});

const shareBtn = document.getElementById('share-link');
const shareModal = document.getElementById('share-modal');
const openModalBtns = document.querySelectorAll('.open-modal');
const closeModalBtns = document.querySelectorAll('.close-modal');

shareBtn.addEventListener('click', () => shareModal.classList.remove('hidden'));

openModalBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    document.getElementById(btn.dataset.modal).classList.remove('hidden');
  });
});

closeModalBtns.forEach((btn) => {
  btn.addEventListener('click', () => btn.closest('.modal').classList.add('hidden'));
});

window.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal')) {
    event.target.classList.add('hidden');
  }
});
