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

  let currentExpandedButton
  let currentExpandedButtonParent

  shareBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      currentExpandedButton = this
      currentExpandedButtonParent = this.parentNode
      const expanded = this.getAttribute('aria-expanded')
      const list = currentExpandedButtonParent.querySelector('.addtoany_list')

      if (expanded === 'false') {
        this.setAttribute('aria-expanded', 'true')
        list.classList.add('is-active')
        document.addEventListener('click', outsideClickListener)
      } else {
        this.setAttribute('aria-expanded', 'false')
        list.classList.remove('is-active')
        document.removeEventListener('click', outsideClickListener)
      }
    })
  })

  // Close the expanded share menu if the user clicked anywhere outside of it
  function outsideClickListener(event) {
    const isClickInside = currentExpandedButtonParent.contains(event.target)

    if (!isClickInside) {
      currentExpandedButton.click()
    }
  }
})
