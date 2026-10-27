/**
 * Progressive enhancement for the shared navigation and back-to-top control.
 */
(function() {
  document.documentElement.classList.add('js')
  var menuBtn = document.querySelector('#headerMenu')
  var nav = document.querySelector('#headerNav')
  var mobileBreakpoint = 770

  if (!menuBtn || !nav) return

  function setMenu(open, restoreFocus) {
    menuBtn.classList.toggle('active', open)
    nav.classList.toggle('nav-show', open)
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false')
    menuBtn.setAttribute('aria-label', open ? '关闭导航菜单' : '打开导航菜单')
    if (restoreFocus) menuBtn.focus()
  }

  menuBtn.addEventListener('click', function(event) {
    event.stopPropagation()
    setMenu(menuBtn.getAttribute('aria-expanded') !== 'true', false)
  })

  nav.addEventListener('click', function(event) {
    if (event.target.closest && event.target.closest('a')) setMenu(false, false)
  })

  document.addEventListener('click', function(event) {
    if (!nav.contains(event.target) && event.target !== menuBtn) setMenu(false, false)
  })

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') setMenu(false, true)
  })

  window.addEventListener('resize', function() {
    if (window.innerWidth > mobileBreakpoint) setMenu(false, false)
  })
}())

(function() {
  var articleImages = document.querySelectorAll('.article-page .post-body img')
  for (var i = 0; i < articleImages.length; i++) {
    if (!articleImages[i].hasAttribute('decoding')) articleImages[i].setAttribute('decoding', 'async')
    if (i > 0 && !articleImages[i].hasAttribute('loading')) articleImages[i].setAttribute('loading', 'lazy')
  }
}())

(function() {
  var progressBar = document.querySelector('.reading-progress-bar')
  if (!progressBar) return

  function updateProgress() {
    var scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
    var progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0
    progressBar.style.transform = 'scaleX(' + Math.min(1, Math.max(0, progress)) + ')'
  }

  window.addEventListener('scroll', updateProgress, { passive: true })
  window.addEventListener('resize', updateProgress)
  updateProgress()
}())

(function() {
  var backToTop = document.querySelector('.back-to-top')
  if (!backToTop) return

  function updateVisibility() {
    var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)
    backToTop.classList.toggle('back-to-top-show', scrollTop > 200)
  }

  window.addEventListener('scroll', updateVisibility, { passive: true })
  updateVisibility()
}())
