var form = document.getElementById('voluntarForm');
var alertBox = document.getElementById('formAlert');

if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();

    if (alertBox) {
      alertBox.style.display = 'none';
      alertBox.className = '';
    }

    var acordCheckbox = document.getElementById('acord');

    if (form.checkValidity() && acordCheckbox.checked) {
      form.classList.remove('was-validated');
      form.reset();
      if (alertBox) {
        alertBox.style.display = 'block';
        alertBox.className = 'alert alert-success';
        alertBox.innerHTML = '<i class="fas fa-check-circle me-2"></i>Mulțumim! Înregistrarea ta a fost trimisă cu succes. Te vom contacta în curând!';
        alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      form.classList.add('was-validated');
      if (alertBox) {
        alertBox.style.display = 'block';
        alertBox.className = 'alert alert-danger';
        if (!acordCheckbox.checked) {
          alertBox.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i>Trebuie să fii de acord cu Termenii și Condițiile pentru a trimite formularul.';
        } else {
          alertBox.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i>Te rugăm să completezi corect toate câmpurile obligatorii.';
        }
      }
    }
  });

  // Validarea vârstă am facut 
  var varstaInput = document.getElementById('varsta');
  if (varstaInput) {
    varstaInput.addEventListener('input', function () {
      var val = parseInt(this.value);
      if (val < 14 || val > 99) {
        this.setCustomValidity('Vârsta trebuie să fie între 14 și 99 ani.');
      } else {
        this.setCustomValidity('');
      }
    });
  }

  // Aici e validare formatului moldovenesc nr telefon
  var telefonInput = document.getElementById('telefon');
  if (telefonInput) {
    telefonInput.addEventListener('input', function () {
      var val = this.value.replace(/\s/g, '');
      var pattern = /^(\+373[0-9]{8}|373[0-9]{8}|0[0-9]{8})$/;
      if (!pattern.test(val)) {
        this.setCustomValidity('Introduceți un număr valid (ex: 069123456 sau +37369123456).');
      } else {
        this.setCustomValidity('');
      }
    });
  }
}