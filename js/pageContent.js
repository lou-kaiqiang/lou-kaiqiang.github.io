/**
 * Reuse Kramdown's generated table of contents and progressively enhance its mobile panel.
 */
(function() {
  var anchorBtn = document.querySelector('.anchor')
  var rightPanel = document.querySelector('#content-panel')
  var contentSide = document.querySelector('#content-side')
  var toc = document.querySelector('#markdown-toc')
  var mobileBreakpoint = 770

  if (toc && contentSide) {
    document.documentElement.classList.add('js-toc')
    contentSide.insertAdjacentHTML('afterbegin', toc.innerHTML)
    var tocLinks = contentSide.querySelectorAll('a')
    for (var i = 0; i < tocLinks.length; i++) tocLinks[i].setAttribute('data-scroll', '')
  }

  if (!anchorBtn || !rightPanel) return

  function setPanel(open, restoreFocus) {
    rightPanel.classList.toggle('right-show', open)
    anchorBtn.classList.toggle('anchor-hide', open)
    anchorBtn.setAttribute('aria-expanded', open ? 'true' : 'false')
    anchorBtn.setAttribute('aria-label', open ? '关闭文章目录' : '打开文章目录')
    if (restoreFocus) anchorBtn.focus()
  }

  anchorBtn.addEventListener('click', function(event) {
    event.stopPropagation()
    setPanel(anchorBtn.getAttribute('aria-expanded') !== 'true', false)
  })

  rightPanel.addEventListener('click', function(event) {
    if (event.target.closest && event.target.closest('a')) setPanel(false, false)
  })

  document.addEventListener('click', function(event) {
    if (!rightPanel.contains(event.target) && event.target !== anchorBtn) setPanel(false, false)
  })

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && anchorBtn.getAttribute('aria-expanded') === 'true') setPanel(false, true)
  })

  window.addEventListener('resize', function() {
    if (window.innerWidth > mobileBreakpoint) setPanel(false, false)
  })
}())
