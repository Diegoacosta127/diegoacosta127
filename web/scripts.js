document.addEventListener('DOMContentLoaded', function () {
  // Get references to the select element and to the paragraphs
  const select = document.getElementById('langSelector');
  const mode = document.getElementById('mode');
  const paragraphs = document.querySelectorAll('.en, .es');

  // Function to show or hide paragraphs depending on the selected option

  function showParagraph () {
    const selectedValue = select.value;
    // if value is 'en' shows all paragraphs with class 'en' and hide all with class 'es'
    if (selectedValue === 'en') {
      paragraphs.forEach(function (p) {
        if (p.classList.contains('en')) {
          p.style.display = 'inline-block';
        } else {
          p.style.display = 'none';
        }
      });
    // if value is 'es' shows all paragraphs with class 'es' and hide all with class 'en'
    } else if (selectedValue === 'es') {
      paragraphs.forEach(function (p) {
        if (p.classList.contains('es')) {
          p.style.display = 'inline-block';
        } else {
          p.style.display = 'none';
        }
      });
    }
  }

  // Add an event listener to the select to detect changes
  select.addEventListener('change', showParagraph);
  // Show the initial paragraph depending on the default selected option
  showParagraph();

  // Function to switch between light and dark mode

  function myMode (backgroundColor, textColor) {
    document.body.style.backgroundColor = backgroundColor;
    document.body.style.color = textColor;
    const inputs = document.querySelectorAll('input');
    inputs.forEach(function (input) {
      if (input.type !== 'submit') {
        input.style.backgroundColor = backgroundColor;
        input.style.color = textColor;
      }
    });
    const spans = document.querySelectorAll('span');
    spans.forEach(function (span) {
      span.style.color = textColor;
    });
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(function (textarea) {
      textarea.style.backgroundColor = backgroundColor;
      textarea.style.color = textColor;
    });
  }

  let myFlag = true;

  function switchMode () {
    if (myFlag) {
      mode.textContent = '☀️';
      myMode('#fafafa', '#121212');
    } else {
      mode.textContent = '🌙';
      myMode('#121212', '#fafafa');
    }
    myFlag = !myFlag;
  }

  mode.addEventListener('click', switchMode);

  switchMode();

  document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Perform your validation here
    const nameEs = document.getElementById('name_es');
    const nameEn = document.getElementById('name_en');
    const emailEs = document.getElementById('email_es');
    const emailEn = document.getElementById('email_en');
    const emailRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
    const messageEn = document.getElementById('message_en');
    const messageEs = document.getElementById('message_es');

    // Show error
    const showError = (input, message) => {
      // get the form-field element
      const formField = input.parentElement;
      // add the error class
      formField.classList.remove('success');
      formField.classList.add('error');
      // show the error message
      const error = formField.querySelector('small');
      error.textContent = message;
    };

    // Show success
    const showSuccess = (input) => {
      // get the form-field element
      const formField = input.parentElement;

      // remove the error class
      formField.classList.remove('error');
      formField.classList.add('success');

      // hide the error message
      const error = formField.querySelector('small');
      error.textContent = '';
    };

    // Check name español

    const checkNameEs = () => {
      let ret = false;
      if (nameEs.value.trim() === '') {
        showError(nameEs, 'Por favor ingrese su nombre');
      } else {
        showSuccess(nameEs);
        ret = true;
      }
      return ret;
    };

    // Check name english

    const checkNameEn = () => {
      let ret = false;
      if (nameEn.value.trim() === '') {
        showError(nameEn, 'Please enter your name');
      } else {
        showSuccess(nameEn);
        ret = true;
      }
      return ret;
    };

    // Check if email is valid español
    const checkEmailEs = () => {
      let ret = false;
      // First check if the email is not empty
      if (emailEs.value.trim() === '') {
        showError(emailEs, 'Por favor ingrese su dirección de correo electrónico');
      } else if (!emailRegex.test(emailEs.value)) {
        // Check if the email is valid
        showError(emailEs, 'Por favor ingrese una dirección de correo electrónico válida');
      } else {
        showSuccess(emailEs);
        ret = true;
      }
      return ret;
    };

    // Check if email is valid english
    const checkEmailEn = () => {
      let ret = false;
      // First check if the email is not empty
      if (emailEn.value.trim() === '') {
        showError(emailEn, 'Please enter your email address');
      } else if (!emailRegex.test(emailEn.value)) {
        // Check if the email is valid
        showError(emailEn, 'Please enter a valid email address');
      } else {
        showSuccess(emailEn);
        ret = true;
      }
      return ret;
    };

    checkNameEs();
    checkNameEn();
    checkEmailEs();
    checkEmailEn();

    const sender = () => {
      if (select.value === 'en') {
        return document.getElementsByClassName('mail')[0].childNodes[1].value;
      } else {
        return document.getElementsByClassName('mail')[1].childNodes[1].value;
      }
    };

    const sendname = () => {
      if (select.value === 'en') {
        return document.getElementsByClassName('name')[0].childNodes[1].value;
      } else {
        return document.getElementsByClassName('name')[1].childNodes[1].value;
      }
    };

    const sendmsg = () => {
      if (select.value === 'en') {
        return messageEn.value;
      } else {
        return messageEs.value;
      }
    };

    const myAlert = () => {
      if (select.value === 'en') {
        return 'Thank you! Your message has been sent :)';
      } else {
        return '¡Gracias! Su mensaje ha sido enviado :)';
      }
    };

    const clear = () => {
      document.getElementsByClassName('mail')[0].childNodes[1].value = '';
      document.getElementsByClassName('mail')[1].childNodes[1].value = '';
      document.getElementsByClassName('name')[0].childNodes[1].value = '';
      document.getElementsByClassName('name')[1].childNodes[1].value = '';
      messageEn.value = '';
      messageEs.value = '';
    };

    if ((checkEmailEn() && checkNameEn()) ||
     (checkEmailEs() && checkNameEs())) {
      location.replace('#');
      Email.send({
        SecureToken: '104d81de-9dc0-40f9-8fb7-68c362faa7c5',
        To: 'diegoacosta127@gmail.com',
        From: 'diegoacosta127@gmail.com',
        Subject: 'Nuevo mail desde la web',
        Body: 'De: ' + sendname() +
          '<br>Mail: ' + sender() +
          '<br>' + sendmsg()
      }).then(
        alert(myAlert())
      );
      clear();
    } else {}
  });
});
