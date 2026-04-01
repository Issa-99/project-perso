const navItems = document.querySelectorAll('.nav-item');
const views = document.querySelectorAll('.view');
const sessionSelect = document.getElementById('session-select');
const campusSelect = document.getElementById('campus-select');
const dashboardContext = document.getElementById('dashboard-context');
const welcomeTitle = document.getElementById('welcome-title');

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
const copyShareLinkBtn = document.getElementById('copy-share-link');
const shareLinkInput = document.getElementById('share-link-input');
const copyFeedback = document.getElementById('copy-feedback');

const updateDashboardContext = () => {
  dashboardContext.textContent = `You are viewing: ${sessionSelect.value} · ${campusSelect.value}`;
};

const updateWelcomeTitle = () => {
  const hour = new Date().getHours();
  const period = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
  welcomeTitle.textContent = `Good ${period}, welcome back 👋`;
};

sessionSelect.addEventListener('change', updateDashboardContext);
campusSelect.addEventListener('change', updateDashboardContext);
updateDashboardContext();
updateWelcomeTitle();

shareBtn.addEventListener('click', () => shareModal.classList.remove('hidden'));
copyShareLinkBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(shareLinkInput.value);
    copyFeedback.classList.remove('hidden');
    window.setTimeout(() => copyFeedback.classList.add('hidden'), 1800);
  } catch {
    copyFeedback.textContent = 'Unable to copy automatically. Please copy manually.';
    copyFeedback.classList.remove('hidden');
  }
});

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

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    document.querySelectorAll('.modal:not(.hidden)').forEach((modal) => {
      modal.classList.add('hidden');
    });
  }
});
