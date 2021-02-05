let id
let totalItems // 全部 todo items 的數量，包含已完成、未完成
let uncompletedItems // 未完成 todo items 的數量

const template = `<li class="list-group-item justify-content-between align-items-center {todoClass}">
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input check-todo" id="check{id}">
          <label class="custom-control-label" for="check{id}">{content}</label>
        </div>
        <span class="badge badge-danger badge-pill delete-btn">x</span>
      </li>`

let params = (new URL(document.location)).searchParams;
const urlId = params.get('id')

if (urlId) {
  $.getJSON('https://nijigamieta.tw/project/week12/hw2/api_get_todo.php?id=' + urlId, function(data) {
    const todos = JSON.parse(data.data.todo)
    loadingTodos(todos)
  });
} else {
  id = 1
  totalItems = 0
  uncompletedItems = 0
}


// 按下 enter 鍵就可以新增 todo
$('input[name=enter_todos]').keydown((e) => {
  // enter 的 keycode 是 13
  if (e.keyCode === 13) {
    const value = $('input[name=enter_todos]').val()
    if(!value) return
    $('.list-group').append(
      template
        .replace('{content}', escapeHtml(value))
        .replace(/{id}/g, id)
    )
    id++
    totalItems++
    uncompletedItems++
    updateCounter()
    $('input[name=enter_todos]').val('')
  }    
})

// 刪除 todo
$('.list-group').on('click','.delete-btn', (e) => {
  const deleteItem = $(e.target).parent()
  const isChecked = deleteItem.find('.check-todo').is(':checked')
  deleteItem.remove()
  totalItems--
  if (!isChecked) {
    uncompletedItems--
  }
  updateCounter()
})

// 對 todo 的內容 double click 可以編輯，按下 enter 會顯示編輯後的內容
$('.list-group').on('dblclick','.custom-control-label', (e) => {
  const selectedTodo = $(e.target)
  const originContent = selectedTodo.html()
  const inputTemplate = `<input class="form-control form-control-sm" type="text" value="${originContent}" id="${selectedTodo.attr('for')}" name="edit_todos">`

  selectedTodo.html(inputTemplate)

  $('input[name=edit_todos]').keydown((e) => {
    if (e.keyCode === 13) {
      const value = $('input[name=edit_todos]').val()
      if(!value) return
      selectedTodo.html(escapeHtml(value))
    }    
  })
})

// 監聽 todo 的狀態（checked/ unchecked），改變未完成 todo items 的數量
$('.list-group').on('change', '.check-todo', (e) => {
  const todoItem = $(e.target)
  const isChecked = todoItem.is(':checked')
  if(isChecked) {
    todoItem.parents('.list-group-item').addClass('checked')
    uncompletedItems--
  } else {
    todoItem.parents('.list-group-item').removeClass('checked')
    uncompletedItems++
  }
  updateCounter()
})

// 全選 todo、全不選 todo
$('.select-option-btn').click( () => {
  let todoItems = $('input[type=checkbox]')

  // 如果沒有全部被勾選的話，沒勾的變成有勾選，有勾選的保持有勾選
  if ($('input[type=checkbox]:checked').length !== todoItems.length) {
    todoItems.each(function(i, el){
      let isChecked = $(el).prop('checked')
      if (!isChecked) {
        $(el).prop('checked', !isChecked)
        $(el).parents('.list-group-item').addClass('checked')
        uncompletedItems--
      }
    })
  } else {
    // 有全部勾選的話，可以在[全勾]、[全不勾]之間切換
    todoItems.each(function(i, el){
      let isChecked = $(el).prop('checked')
      if (!isChecked) {
        $(el).prop('checked', !isChecked)
        $(el).parents('.list-group-item').addClass('checked')
        uncompletedItems--
      } else {
        $(el).prop('checked', !isChecked)
        $(el).parents('.list-group-item').removeClass('checked')
        uncompletedItems++
      }
    })
  }
  updateCounter()
})

// 清除全部已完成 todo
$('.clear-all').click( () => {
  $('.list-group-item.checked').each(function(i, el){
    totalItems--
    el.remove()
  })
})

// 篩選：全部、已完成、未完成
$('.btn-group').on('click','button[data-filter]', (e) => {
  let filter = $(e.target).attr('data-filter')
  const todo = $('.list-group-item')
  const checkedTodo = $('.list-group-item.checked')
  if (filter === 'All') {
    todo.show()
  } else if (filter === 'Active') {
    todo.show()
    checkedTodo.hide()
  } else if (filter === 'Completed'){
    todo.hide()
    checkedTodo.show()
  }
})

// 儲存 todo
$('.save-btn').click( () => {
  let todos = []
  $('.list-group-item').each((i, el) => {
    const inputTag = $(el).find('input[type=checkbox]')
    const label = $(el).find('label')
    todos.push({
        id: inputTag.attr('id').replace('check',''),
        content: label.text(),
        isChecked: $(el).hasClass('checked')
    })
  })

  const data = JSON.stringify(todos)

  if (!urlId) {
    $.ajax({
      type: 'POST',
      url: 'https://nijigamieta.tw/project/week12/hw2/api_add_todo.php',
      data: {
        content: data
      },
      success: function(resp) {
        const userID = resp.id
        window.location = 'index.html?id=' + userID
      },
      error: function() {
        alert('Error')
      }
    });
  }

  if (urlId) {
    $.ajax({
      type: 'POST',
      url: 'https://nijigamieta.tw/project/week12/hw2/api_update_todo.php',
      data: {
        content: data,
        id: urlId
      },
      success: function(resp) {
        const userID = resp.id
        window.location = 'index.html?id=' + userID
      },
      error: function() {
        alert('Error')
      }
    });
  }
})

// function //

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
  }

function updateCounter() {
  $('.uncompleted-count').text(uncompletedItems)
}

function loadingTodos(todos) {
  if (todos.length === 0) return
  id = todos.length + 1
  totalItems = todos.length
  uncompletedItems = 0
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i]
    $('.list-group').append(
      template
        .replace('{content}', escapeHtml(todo.content))
        .replace(/{id}/g, todo.id)
        .replace('{todoClass}', todo.isChecked ? 'checked' : '')
    )
    if (!todo.isChecked) {
      uncompletedItems++
    }
    if (todo.isChecked) {
      $('#check' + todo.id).prop('checked', true)
    }
  }
  updateCounter()
}
