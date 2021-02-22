export const cssTemplate = '.card { margin-bottom: 10px;}'

export function getForm(className, commentsClassName) {
  return `
    <div>
      <nav class="navbar navbar-light bg-light mb-3">
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1">留言板</span>
        </div>
      </nav>
      <form class="${className}">
        <div class="form-group">
          <div class="mb-3">
            <label class="form-label">暱稱</label>
            <input name="nickname" type="text" class="form-control" >
          </div>
        </div>
        <div class="form-group mb-3">
          <label>來留言吧</label>
          <textarea class="form-control"
            rows="3" name="content"></textarea>
        </div>
        <button type="submit" class="btn btn-primary mb-3">send</button>
      </form>
      <div class="${commentsClassName} mb-5">
      </div>
    </div>
  `
}

export function getLoadMoreButton(className) {
  return `<button type="button" class="btn btn-success ${className}">載入更多</button>`
}