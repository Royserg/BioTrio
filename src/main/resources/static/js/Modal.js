

class Modal {
  constructor($modal, $submitBtn) {
    this.modal = $modal;
    this.submitBtn = $submitBtn;

    // Enable submit button when modal is shown
    $modal.on('shown.bs.modal', function() {
      // Enable booking btn and reset width so it takes needed space
      $submitBtn.prop('disabled', false).css('width', '');
    });
  }

  /**
   * Sets submit button to disabled state and inserts a spinner instead of previous text.
   */
  disableButton() {
    // Disable button, so only one click is possible and keep the same width of the button after inserting spinner below
    this.submitBtn.prop('disabled', true).css('width', this.submitBtn.outerWidth());
    // Place spinner inside button
    this.submitBtn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
  }

  showModal(isEdit, modalTitle, submitBtnText) {
    // Change modal title
    this.modal.find('.modal-title').text(modalTitle);

    if (isEdit) {
      // Attach .warning class to submit button removing .primary if has
      this.submitBtn.removeClass('btn-primary').addClass('btn-warning');
    } else {
      this.submitBtn.removeClass('btn-warning').addClass('btn-primary');
    }

    // Change button text
    this.submitBtn.text(submitBtnText);

    // Show modal
    this.modal.modal('show');
  }
}