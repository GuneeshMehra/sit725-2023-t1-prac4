const addCards = (items) => {
  items.forEach(item => {
      let itemToAppend = `<div class="col-md-4">
          <div class="card" style="width: 18rem;">
              <img src="${item.path}" class="card-img-top" alt="...">
              <div class="card-body">
                  <h5 class="card-title">${item.title}</h5>
                  <p class="card-text">${item.description}</p>
                  <button type="button" class="btn btn-outline-primary">Click Me</button>
              </div>
          </div>
      </div>`;
      $("#card-section").append(itemToAppend);
  });
};

const submitForm = () => {
  console.log("Form submitted");
  let formData = {
      title: $('#title').val(),
      movie: $('#game').val(), 
      path: $('#link').val(),   
      description: $('#description').val()
  };

  console.log(formData);

  $.ajax({
      url: '/api/card',
      type: 'POST',
      data: formData,
      success: (result) => {
          if (result.statusCode === 201) {
              alert('Card posted successfully');
              getAllCards();
          }
      },
      error: (xhr, status, error) => {
          console.error(xhr.responseText);
          alert('Failed to post card');
      }
  });
};

function getAllCards() {
  $.get('/api/cards', (result) => {
      if (result.statusCode === 200) {
          addCards(result.data);
      }
  })
  .fail((jqXHR, textStatus, errorThrown) => {
      console.error(jqXHR.responseText);
  });
}

$(document).ready(function () {
  const modalInstance = M.Modal.init(document.getElementById('modal1'));

  const openModal = () => {
      modalInstance.open();
  }

  $('#clickMeButton').click(openModal);

  $('#formSubmit').click(() => {
      submitForm();
  });

  getAllCards();
});