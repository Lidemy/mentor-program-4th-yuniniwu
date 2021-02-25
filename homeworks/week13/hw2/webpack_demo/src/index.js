import { getComments, addComments} from './api'
import { appendCommentToDOM, appendStyle} from './utils'
import { cssTemplate, getLoadMoreButton, getForm} from './templates'
import $ from 'jquery'

export function init(options) {
  let siteKey = ''
  let apiUrl = ''
  let containerElement = null
  let cursorID = null
  let lastID = null
  let isEnd = false
  let commentDOM = null
  let loadMoreClassName
  let loadMoreSelector
  let commentsClassName
  let commentsSelector
  let formClassName
  let formSelector

  siteKey = options.siteKey
  apiUrl = options.apiUrl
  loadMoreClassName = `${siteKey}-load-more`
  loadMoreSelector = '.' + loadMoreClassName
  commentsClassName = `${siteKey}-comments`
  commentsSelector = '.' + commentsClassName
  formClassName = `${siteKey}-add-comment-form`
  formSelector = '.' + formClassName

  containerElement = $(options.containerSelector)
  containerElement.append(getForm(formClassName, commentsClassName))

  appendStyle(cssTemplate)

  commentDOM = $(commentsSelector)
  // 印出最新的五筆資料
  displayComments()

  // 按下載入更多，印出接下來的 5 筆資料
  commentDOM.on('click', loadMoreSelector, () => {
    displayComments()
  })

  // 新增留言
  $(formSelector).submit(e => {
    e.preventDefault();
    const nicknameDOM = `${formSelector} input[name=nickname]`
    const contentDOM = `${formSelector} textarea[name=content]`
    const newCommentData = {
      site_key: siteKey,
      nickname: $(nicknameDOM).val(),
      content: $(contentDOM).val()
    }
    addComments(apiUrl, siteKey, newCommentData, data => {
      if (!data.ok) {
        alert(data.message)
        return
      }
      $(nicknameDOM).val('')
      $(contentDOM).val('')
      appendCommentToDOM(commentDOM, newCommentData, true)
    })
  })

  // 把拿到的資料印出來
function displayComments() {
  $(loadMoreSelector).hide()
  if (isEnd) {
    return
  }

  getComments(apiUrl, siteKey, lastID, data => {
    if (!data.ok) {
      alert(data.message)
      return
    }

    const comments = data.discussions
    for (let comment of comments) {
      appendCommentToDOM(commentDOM, comment)
    }
    let length = comments.length

    // 當特定條件(最舊的一筆資料已經顯示)成立時，載入更多按鈕就不會出現
    if (length === 0) {
      isEnd = true
      $(loadMoreSelector).hide()
    } else {
      lastID = comments[length - 1].id
      const loadMoreButton = getLoadMoreButton(loadMoreClassName)
      commentDOM.append(loadMoreButton)
    }
  })
}
}
