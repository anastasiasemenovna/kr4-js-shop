const feedbackDialog = document.getElementById('feedback-dialog');
const openFeedbackBtn = document.getElementById('open-feedback-dialog');
const closeFeedbackBtn = document.getElementById('close-feedback-dialog');
const feedbackForm = document.getElementById('feedback-form');
const feedbackSuccess = document.getElementById('feedback-success');

openFeedbackBtn.addEventListener('click', () => feedbackDialog.showModal());
closeFeedbackBtn.addEventListener('click', () => feedbackDialog.close());

feedbackForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!feedbackForm.checkValidity()) {
    feedbackForm.reportValidity();
    return;
  }

  feedbackSuccess.hidden = false;
  feedbackForm.reset();
  feedbackDialog.close();
});