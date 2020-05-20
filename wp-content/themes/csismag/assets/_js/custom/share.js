/**
 * File skip-link-focus-fix.js.
 *
 * Helps with accessibility for keyboard only users.
 *
 * This is the source file for what is minified in the csismag_skip_link_focus_fix() PHP function.
 *
 * Learn more: https://git.io/vWdr2
 */
document.addEventListener('DOMContentLoaded', function () {
  const shareBtns = document.querySelectorAll('.csis-block__share-btn')

  if (shareBtns.length < 1) {
    return
  }

  shareBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded')
      const list = this.parentNode.querySelector('.addtoany_list')

      if (expanded === 'false') {
        this.setAttribute('aria-expanded', 'true')
        list.classList.add('is-active')
      } else {
        this.setAttribute('aria-expanded', 'false')
        list.classList.remove('is-active')
      }
    })
  })
})
