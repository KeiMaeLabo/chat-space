$(function() {
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="chat__message-box">
          <div class="chat__user-date">
            <div class="chat__user">
              ${message.user_name}
            </div>
            <div class="chat__date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat__message">
            <p class="message-content">
              ${message.content}
            </p>
            <img class="message-image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="chat__message-box">
        <div class="chat__user-date">
          <div class="chat__user">
            ${message.user_name}
          </div>
          <div class="chat__date">
            ${message.created_at}
          </div>
        </div>
        <div class="chat__message">
          <p class="message-content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      let html = buildHTML(data);
      $('.chat__message-list').append(html);      
      $('form')[0].reset();
      $('.chat__message-list').animate({ scrollTop: $('.chat__message-list')[0].scrollHeight});
      $('.form-submit').prop('disabled', false);
    })
    .fail(function(){
      alert('error');
    })
  });
});