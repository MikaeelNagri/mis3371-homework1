/*
Program name: script.js
Author: Mikaeel Nagri
Date created: June 30, 2026
Date last edited: June 30, 2026
Version: 3.0
Description: On-the-fly JavaScript validation for patient registration form.
*/

window.addEventListener('DOMContentLoaded', function () {

    var form = document.getElementById('patientForm');
    var reviewSection = document.getElementById('review-section');
    var reviewButton = document.getElementById('reviewButton');
    var validateButton = document.getElementById('validateButton');
    var submitButton = document.getElementById('submitButton');
    var resetButton = document.getElementById('resetButton');

    var firstName = document.getElementById('firstName');
    var middleInitial = document.getElementById('middleInitial');
    var lastName = document.getElementById('lastName');
    var userId = document.getElementById('userId');
    var password = document.getElementById('password');
    var reEnterPassword = document.getElementById('reEnterPassword');
    var dobInput = document.getElementById('dateOfBirth');
    var socialSecurity = document.getElementById('socialSecurity');
    var addressLine1 = document.getElementById('addressLine1');
    var addressLine2 = document.getElementById('addressLine2');
    var city = document.getElementById('city');
    var state = document.getElementById('state');
    var zipCode = document.getElementById('zipCode');
    var emailAddress = document.getElementById('emailAddress');
    var phoneNumber = document.getElementById('phoneNumber');
    var symptoms = document.getElementById('symptoms');
    var healthSlider = document.getElementById('healthScale');
    var healthValueSpan = document.getElementById('healthScaleValue');

    // tracking how many fields have errors
    var errorCount = 0;
    var formPassedValidate = false;


    /* ----- helper functions ----- */

    function showError(fieldId, message) {
        var span = document.getElementById(fieldId + 'Error');
        var field = document.getElementById(fieldId);

        if (span) {
            span.textContent = message;
        }

        if (field) {
            if (message !== '') {
                field.classList.add('input-error');
            } else {
                field.classList.remove('input-error');
            }
        }
    }

    function highlightOnFocus(event) {
        event.target.style.backgroundColor = '#f5fbff';
    }

    function clearHighlightOnBlur(event) {
        event.target.style.backgroundColor = '';
    }

    function setStatusText(spanId, isOk) {
        var span = document.getElementById(spanId);
        if (!span) {
            return;
        }
        if (isOk) {
            span.textContent = 'PASS';
            span.className = 'pass-text';
        } else {
            span.textContent = 'ERROR';
            span.className = 'error-text';
        }
    }

    function setYesNo(checkboxId, spanId) {
        var cb = document.getElementById(checkboxId);
        var span = document.getElementById(spanId);
        if (cb && span) {
            span.textContent = cb.checked ? 'Y' : 'N';
        }
    }

    function getRadioValue(name) {
        var radios = document.getElementsByName(name);
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return radios[i].value;
            }
        }
        return '';
    }

    function hideSubmitButton() {
        formPassedValidate = false;
        if (submitButton) {
            submitButton.style.display = 'none';
            submitButton.disabled = true;
        }
    }

    function showSubmitButton() {
        formPassedValidate = true;
        if (submitButton) {
            submitButton.style.display = 'inline';
            submitButton.disabled = false;
        }
    }

    function countErrors() {
        var count = 0;
        var errorSpans = document.querySelectorAll('.error-message');
        for (var i = 0; i < errorSpans.length; i++) {
            if (errorSpans[i].textContent !== '') {
                count = count + 1;
            }
        }
        errorCount = count;
        return count;
    }

    function updateSubmitAfterEdit() {
        if (formPassedValidate === true) {
            hideSubmitButton();
        }
    }


    /* ----- validation functions ----- */

    function validateFirstName() {
        if (!firstName) {
            return true;
        }

        var value = firstName.value.trim();
        var pattern = /^[A-Za-z'-]{1,30}$/;
        var message = '';

        if (value === '') {
            message = 'First name is required.';
        } else if (value.length < 1 || value.length > 30) {
            message = 'First name must be 1 to 30 characters.';
        } else if (!pattern.test(value)) {
            message = 'Use letters, apostrophes and dashes only.';
        }

        showError('firstName', message);
        if (message !== '') {
            updateSubmitAfterEdit();
        }
        return message === '';
    }

    function validateMiddleInitial() {
        if (!middleInitial) {
            return true;
        }

        var value = middleInitial.value.trim();
        var pattern = /^[A-Za-z]$/;
        var message = '';

        if (value === '') {
            message = '';
        } else if (!pattern.test(value)) {
            message = 'Middle initial must be one letter only.';
        }

        showError('middleInitial', message);
        if (message !== '') {
            updateSubmitAfterEdit();
        }
        return message === '';
    }

    function validateLastName() {
        if (!lastName) {
            return true;
        }

        var value = lastName.value.trim();
        var pattern = /^[A-Za-z'-]{1,30}$/;
        var message = '';

        if (value === '') {
            message = 'Last name is required.';
        } else if (value.length < 1 || value.length > 30) {
            message = 'Last name must be 1 to 30 characters.';
        } else if (!pattern.test(value)) {
            message = 'Use letters, apostrophes and dashes only.';
        }

        showError('lastName', message);
        if (message !== '') {
            updateSubmitAfterEdit();
        }
        return message === '';
    }

    function validateUserId() {
        if (!userId) {
            return true;
        }

        userId.value = userId.value.toLowerCase();
        var value = userId.value.trim();
        var pattern = /^[a-z][a-z0-9_-]{4,19}$/;
        var message = '';

        if (value === '') {
            message = 'User ID is required.';
        } else if (!pattern.test(value)) {
            message = 'User ID must be 5-20 characters, start with a letter, and use only letters, numbers, underscore or dash.';
        }

        showError('userId', message);
        if (message !== '') {
            updateSubmitAfterEdit();
        }
        return message === '';
    }

    function validatePasswords() {
        if (!password || !reEnterPassword) {
            return true;
        }

        var pwd = password.value;
        var confirmPwd = reEnterPassword.value;
        var errorPwd = '';
        var errorConfirm = '';

        if (pwd === '') {
            errorPwd = 'Password is required.';
        } else if (pwd.length < 8) {
            errorPwd = 'Password must be at least 8 characters long.';
        } else {
            var hasUpper = /[A-Z]/.test(pwd);
            var hasLower = /[a-z]/.test(pwd);
            var hasDigit = /\d/.test(pwd);

            if (!hasUpper || !hasLower || !hasDigit) {
                errorPwd = 'Password needs at least 1 uppercase, 1 lowercase and 1 digit.';
            }

            if (errorPwd === '' && userId) {
                var lowerPwd = pwd.toLowerCase();
                var lowerUser = userId.value.toLowerCase();
                if (lowerPwd === lowerUser) {
                    errorPwd = 'Password cannot equal your User ID.';
                }
            }
        }

        if (pwd !== '' && confirmPwd === '') {
            errorConfirm = 'Please re-enter your password.';
        } else if (confirmPwd !== '' && pwd !== confirmPwd) {
            errorConfirm = 'Passwords do not match.';
        } else if (pwd !== '' && confirmPwd !== '' && pwd === confirmPwd) {
            errorConfirm = '';
        }

        showError('password', errorPwd);
        showError('reEnterPassword', errorConfirm);

        if (errorPwd !== '' || errorConfirm !== '') {
            updateSubmitAfterEdit();
        }

        return errorPwd === '' && errorConfirm === '';
    }

    function validateDateOfBirth() {
        if (!dobInput) {
            return true;
        }

        var value = dobInput.value.trim();
        var message = '';
        var pattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;

        if (value === '') {
            message = 'Date of birth is required (MM/DD/YYYY).';
        } else if (!pattern.test(value)) {
            message = 'Use format MM/DD/YYYY.';
        } else {
            var parts = value.split('/');
            var month = parseInt(parts[0], 10);
            var day = parseInt(parts[1], 10);
            var year = parseInt(parts[2], 10);
            var dobDate = new Date(year, month - 1, day);
            var today = new Date();
            var oldestDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());

            if (dobDate.getMonth() !== month - 1 || dobDate.getDate() !== day) {
                message = 'That date is not valid.';
            } else if (dobDate > today) {
                message = 'Date of birth cannot be in the future.';
            } else if (dobDate < oldestDate) {
                message = 'Date of birth cannot be more than 120 years ago.';
            }
        }

        showError('dateOfBirth', message);
        if (message !== '') {
            updateSubmitAfterEdit();
        }
        return message === '';
    }

    function formatDOBAsYouType() {
        if (!dobInput) {
            return;
        }

        var digits = dobInput.value.replace(/\D/g, '');
        if (digits.length > 8) {
            digits = digits.substring(0, 8);
        }

        var formatted = '';
        if (digits.length > 0) {
            formatted = digits.substring(0, 2);
        }
        if (digits.length > 2) {
            formatted = formatted + '/' + digits.substring(2, 4);
        }
        if (digits.length > 4) {
            formatted = formatted + '/' + digits.substring(4, 8);
        }

        dobInput.value = formatted;
    }

    function formatSSNAsYouType() {
        if (!socialSecurity) {
            return;
        }

        var digits = socialSecurity.value.replace(/\D/g, '');
        if (digits.length > 9) {
            digits = digits.substring(0, 9);
        }

        var formatted = '';
        if (digits.length > 0) {
            formatted = digits.substring(0, 3);
        }
        if (digits.length > 3) {
            formatted = formatted + '-' + digits.substring(3, 5);
        }
        if (digits.length > 5) {
            formatted = formatted + '-' + digits.substring(5, 9);
        }

        socialSecurity.value = formatted;
    }

    function validateSocialSecurity() {
        if (!socialSecurity) {
            return true;
        }

        var value = socialSecurity.value.trim();
        var pattern = /^\d{3}-\d{2}-\d{4}$/;
        var message = '';

        if (value === '') {
            message = 'Social Security Number is required (9 digits).';
        } else if (!pattern.test(value)) {
            message = 'Enter 9 digits. Example: 123-45-6789.';
        }

        showError('socialSecurity', message);
        if (message !== '') {
            updateSubmitAfterEdit();
        }
        return message === '';
    }

    function validateAddressLine1() {
        if (!addressLine1) {
            return true;
        }

        var value = addressLine1.value.trim();
        var message = '';

        if (value === '') {
            message = 'Address line 1 is required.';
        } else if (value.length < 2 || value.length > 30) {
            message = 'Address line 1 must be 2 to 30 characters.';
        }

        showError('addressLine1', message);
        if (message !== '') {
            updateSubmitAfterEdit();
        }
        return message === '';
    }

    function validateAddressLine2() {
        if (!addressLine2) {
            return true;
        }

        var value = addressLine2.value.trim();
        var message = '';

        if (value !== '' && (value.length < 2 || value.length > 30)) {
            message = 'Address line 2 must be 2 to 30 characters if used.';
        }

        showError('addressLine2', message);
        if (message !== '') {
            updateSubmitAfterEdit();
        }
        return message === '';
    }

    function validateCity() {
        if (!city) {
            return true;
        }

        var value = city.value.trim();
        var pattern = /^[A-Za-z \-']{2,30}$/;
        var message = '';

        if (value === '') {
            message = 'City is required.';
        } else if (!pattern.test(value)) {
            message = 'City must be 2 to 30 characters. Letters, spaces, apostrophes and dashes only.';
        }

        showError('city', message);
        if (message !== '') {
            updateSubmitAfterEdit();
        }
        return message === '';
    }

    function validateState() {
        if (!state) {
            return true;
        }

        var value = state.value;
        var message = '';

        if (value === '') {
            message = 'Please select a state.';
        }

        showError('state', message);
        if (message !== '') {
            updateSubmitAfterEdit();
        }
        return message === '';
    }

    function validateZipCode() {
        if (!zipCode) {
            return true;
        }

        var value = zipCode.value.trim();
        var pattern = /^\d{5}$/;
        var message = '';

        if (value === '') {
            message = 'Zip code is required.';
        } else if (!pattern.test(value)) {
            message = 'Zip code must be exactly 5 digits.';
        }

        showError('zipCode', message);
        if (message !== '') {
            updateSubmitAfterEdit();
        }
        return message === '';
    }

    function validateEmail() {
        if (!emailAddress) {
            return true;
        }

        emailAddress.value = emailAddress.value.toLowerCase();
        var value = emailAddress.value.trim();
        var pattern = /^[^@]+@[^@]+\.[A-Za-z]{2,}$/;
        var message = '';

        if (value === '') {
            message = 'Email address is required.';
        } else if (!pattern.test(value)) {
            message = 'Enter a valid email like name@domain.com.';
        }

        showError('emailAddress', message);
        if (message !== '') {
            updateSubmitAfterEdit();
        }
        return message === '';
    }

    function formatPhoneAsYouType() {
        if (!phoneNumber) {
            return;
        }

        var digits = phoneNumber.value.replace(/\D/g, '');
        if (digits.length > 10) {
            digits = digits.substring(0, 10);
        }

        var formatted = '';
        if (digits.length > 0) {
            formatted = digits.substring(0, 3);
        }
        if (digits.length > 3) {
            formatted = formatted + '-' + digits.substring(3, 6);
        }
        if (digits.length > 6) {
            formatted = formatted + '-' + digits.substring(6, 10);
        }

        phoneNumber.value = formatted;
    }

    function validatePhone() {
        if (!phoneNumber) {
            return true;
        }

        var value = phoneNumber.value.trim();
        var pattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
        var message = '';

        if (value === '') {
            message = 'Phone number is required.';
        } else if (!pattern.test(value)) {
            message = 'Phone must be in format 000-000-0000.';
        }

        showError('phoneNumber', message);
        if (message !== '') {
            updateSubmitAfterEdit();
        }
        return message === '';
    }

    function validateSymptoms() {
        if (!symptoms) {
            return true;
        }

        var value = symptoms.value;
        var message = '';

        if (value.indexOf('"') !== -1) {
            message = 'Please do not use double quotes in symptoms.';
        }

        showError('symptoms', message);
        if (message !== '') {
            updateSubmitAfterEdit();
        }
        return message === '';
    }

    function validateRadioGroup(name, errorFieldId, labelText) {
        var value = getRadioValue(name);
        var message = '';

        if (value === '') {
            message = 'Please select an option for ' + labelText + '.';
        }

        showError(errorFieldId, message);
        if (message !== '') {
            updateSubmitAfterEdit();
        }
        return message === '';
    }


    /* ----- run all validations (Validate button) ----- */

    function retrieveFormData() {
        var formData = {};
        var myForm = document.forms['patientForm'];

        if (!myForm) {
            return formData;
        }

        // loop through all controls in the form 
        for (var i = 0; i < myForm.elements.length; i++) {
            var el = myForm.elements[i];
            var elName = el.name;
            var elType = el.type;

            if (elName === '' || elName === undefined) {
                continue;
            }

            if (elType === 'submit' || elType === 'button' || elType === 'reset') {
                continue;
            }

            if (elType === 'checkbox') {
                if (el.checked) {
                    if (formData[elName] === undefined) {
                        formData[elName] = el.value;
                    } else {
                        formData[elName] = formData[elName] + ', ' + el.value;
                    }
                }
            } else if (elType === 'radio') {
                if (el.checked) {
                    formData[elName] = el.value;
                }
            } else {
                formData[elName] = el.value;
            }
        }

        return formData;
    }

    function runAllValidations(showAlerts) {
        var formOk = true;

        // retrieve all form data into an object 
        var allFormData = retrieveFormData();

        if (!validateFirstName()) {
            formOk = false;
        }
        if (!validateMiddleInitial()) {
            formOk = false;
        }
        if (!validateLastName()) {
            formOk = false;
        }
        if (!validateUserId()) {
            formOk = false;
        }
        if (!validatePasswords()) {
            formOk = false;
        }
        if (!validateDateOfBirth()) {
            formOk = false;
        }
        if (!validateSocialSecurity()) {
            formOk = false;
        }
        if (!validateAddressLine1()) {
            formOk = false;
        }
        if (!validateAddressLine2()) {
            formOk = false;
        }
        if (!validateCity()) {
            formOk = false;
        }
        if (!validateState()) {
            formOk = false;
        }
        if (!validateZipCode()) {
            formOk = false;
        }
        if (!validateEmail()) {
            formOk = false;
        }
        if (!validatePhone()) {
            formOk = false;
        }
        if (!validateSymptoms()) {
            formOk = false;
        }
        if (!validateRadioGroup('gender', 'gender', 'Gender')) {
            formOk = false;
        }
        if (!validateRadioGroup('vaccinated', 'vaccinated', 'Vaccinated')) {
            formOk = false;
        }
        if (!validateRadioGroup('insurance', 'insurance', 'Insurance')) {
            formOk = false;
        }

        countErrors();

        if (formOk === true) {
            showSubmitButton();
            if (showAlerts !== false) {
                alert('All fields passed validation. You may now click Submit.');
            }
        } else {
            hideSubmitButton();
            if (showAlerts !== false) {
                alert('Please fix the ' + errorCount + ' error(s) shown on the form.');
            }
        }

        return formOk;
    }


    /* ----- review section ----- */

    function updateReviewSection() {
        if (!reviewSection) {
            return;
        }

        var nameOk = validateFirstName() && validateMiddleInitial() && validateLastName();

        var middle = '';
        if (middleInitial) {
            middle = middleInitial.value;
        }

        var first = firstName ? firstName.value : '';
        var last = lastName ? lastName.value : '';
        var fullName = first;

        if (middle !== '') {
            fullName = fullName + ' ' + middle;
        }
        if (last !== '') {
            fullName = fullName + ' ' + last;
        }

        document.getElementById('reviewFullName').textContent = fullName;
        setStatusText('reviewNameStatus', nameOk);

        if (dobInput) {
            document.getElementById('reviewDOB').textContent = dobInput.value;
        }
        setStatusText('reviewDOBStatus', validateDateOfBirth());

        setStatusText('reviewSSNStatus', validateSocialSecurity());

        if (emailAddress) {
            document.getElementById('reviewEmail').textContent = emailAddress.value;
            setStatusText('reviewEmailStatus', validateEmail());
        }

        if (phoneNumber) {
            document.getElementById('reviewPhone').textContent = phoneNumber.value;
            setStatusText('reviewPhoneStatus', validatePhone());
        }

        if (addressLine1) {
            document.getElementById('reviewAddressLine1').textContent = addressLine1.value;
        }
        if (addressLine2) {
            document.getElementById('reviewAddressLine2').textContent = addressLine2.value;
        }

        var cityStateZip = '';
        if (city) {
            cityStateZip = city.value;
        }
        if (state && state.value !== '') {
            if (cityStateZip !== '') {
                cityStateZip = cityStateZip + ', ';
            }
            cityStateZip = cityStateZip + state.value;
        }
        if (zipCode && zipCode.value !== '') {
            cityStateZip = cityStateZip + ' ' + zipCode.value;
        }

        document.getElementById('reviewCityStateZip').textContent = cityStateZip;

        var addressOk = validateAddressLine1() && validateAddressLine2() &&
            validateCity() && validateState() && validateZipCode();
        setStatusText('reviewAddressStatus', addressOk);

        setYesNo('chickenPox', 'reviewChickenPox');
        setYesNo('measles', 'reviewMeasles');
        setYesNo('covid19', 'reviewCovid19');
        setYesNo('smallPox', 'reviewSmallPox');
        setYesNo('tetanus', 'reviewTetanus');
        setYesNo('mumps', 'reviewMumps');

        document.getElementById('reviewVaccinated').textContent = getRadioValue('vaccinated');
        document.getElementById('reviewGender').textContent = getRadioValue('gender');
        document.getElementById('reviewInsurance').textContent = getRadioValue('insurance');

        if (healthSlider) {
            document.getElementById('reviewHealthScale').textContent = healthSlider.value;
        }

        if (symptoms) {
            document.getElementById('reviewSymptoms').textContent = symptoms.value;
        }

        if (userId) {
            document.getElementById('reviewUserId').textContent = userId.value;
            setStatusText('reviewUserIdStatus', validateUserId());
        }

        if (password) {
            document.getElementById('reviewPassword').textContent = password.value;
            setStatusText('reviewPasswordStatus', validatePasswords());
        }

        reviewSection.style.display = 'block';
        reviewSection.scrollIntoView();
    }


    /* ----- attach event listeners ----- */

    // hide submit until Validate passes
    hideSubmitButton();

    // slider display
    if (healthSlider && healthValueSpan) {
        healthValueSpan.textContent = healthSlider.value;

        healthSlider.addEventListener('input', function () {
            healthValueSpan.textContent = healthSlider.value;
        });
    }

    // first name
    if (firstName) {
        firstName.addEventListener('focus', highlightOnFocus);
        firstName.addEventListener('blur', clearHighlightOnBlur);
        firstName.addEventListener('blur', validateFirstName);
        firstName.addEventListener('input', validateFirstName);
    }

    // middle initial
    if (middleInitial) {
        middleInitial.addEventListener('focus', highlightOnFocus);
        middleInitial.addEventListener('blur', clearHighlightOnBlur);
        middleInitial.addEventListener('blur', validateMiddleInitial);
        middleInitial.addEventListener('input', validateMiddleInitial);
    }

    // last name
    if (lastName) {
        lastName.addEventListener('focus', highlightOnFocus);
        lastName.addEventListener('blur', clearHighlightOnBlur);
        lastName.addEventListener('blur', validateLastName);
        lastName.addEventListener('input', validateLastName);
    }

    // user id
    if (userId) {
        userId.addEventListener('focus', highlightOnFocus);
        userId.addEventListener('blur', clearHighlightOnBlur);
        userId.addEventListener('input', validateUserId);
        userId.addEventListener('blur', validateUserId);
    }

    // passwords
    if (password) {
        password.addEventListener('focus', highlightOnFocus);
        password.addEventListener('blur', clearHighlightOnBlur);
        password.addEventListener('input', validatePasswords);
        password.addEventListener('blur', validatePasswords);
    }
    if (reEnterPassword) {
        reEnterPassword.addEventListener('focus', highlightOnFocus);
        reEnterPassword.addEventListener('blur', clearHighlightOnBlur);
        reEnterPassword.addEventListener('input', validatePasswords);
        reEnterPassword.addEventListener('blur', validatePasswords);
    }

    // date of birth
    if (dobInput) {
        dobInput.addEventListener('focus', highlightOnFocus);
        dobInput.addEventListener('blur', clearHighlightOnBlur);
        dobInput.addEventListener('input', function () {
            formatDOBAsYouType();
            validateDateOfBirth();
        });
        dobInput.addEventListener('blur', validateDateOfBirth);
    }

    // social security 
    if (socialSecurity) {
        socialSecurity.addEventListener('focus', highlightOnFocus);
        socialSecurity.addEventListener('blur', clearHighlightOnBlur);
        socialSecurity.addEventListener('input', function () {
            formatSSNAsYouType();
            validateSocialSecurity();
        });
        socialSecurity.addEventListener('blur', validateSocialSecurity);
    }

    // address
    if (addressLine1) {
        addressLine1.addEventListener('focus', highlightOnFocus);
        addressLine1.addEventListener('blur', clearHighlightOnBlur);
        addressLine1.addEventListener('blur', validateAddressLine1);
        addressLine1.addEventListener('input', validateAddressLine1);
    }
    if (addressLine2) {
        addressLine2.addEventListener('focus', highlightOnFocus);
        addressLine2.addEventListener('blur', clearHighlightOnBlur);
        addressLine2.addEventListener('blur', validateAddressLine2);
        addressLine2.addEventListener('input', validateAddressLine2);
    }

    // city state zip
    if (city) {
        city.addEventListener('focus', highlightOnFocus);
        city.addEventListener('blur', clearHighlightOnBlur);
        city.addEventListener('blur', validateCity);
        city.addEventListener('input', validateCity);
    }
    if (state) {
        state.addEventListener('focus', highlightOnFocus);
        state.addEventListener('blur', clearHighlightOnBlur);
        state.addEventListener('change', validateState);
        state.addEventListener('blur', validateState);
    }
    if (zipCode) {
        zipCode.addEventListener('focus', highlightOnFocus);
        zipCode.addEventListener('blur', clearHighlightOnBlur);
        zipCode.addEventListener('input', function () {
            zipCode.value = zipCode.value.replace(/\D/g, '').substring(0, 5);
            validateZipCode();
        });
        zipCode.addEventListener('blur', validateZipCode);
    }

    // email
    if (emailAddress) {
        emailAddress.addEventListener('focus', highlightOnFocus);
        emailAddress.addEventListener('blur', clearHighlightOnBlur);
        emailAddress.addEventListener('blur', validateEmail);
        emailAddress.addEventListener('input', validateEmail);
    }

    // phone 
    if (phoneNumber) {
        phoneNumber.addEventListener('focus', highlightOnFocus);
        phoneNumber.addEventListener('blur', clearHighlightOnBlur);
        phoneNumber.addEventListener('input', function () {
            formatPhoneAsYouType();
            validatePhone();
        });
        phoneNumber.addEventListener('blur', validatePhone);
    }

    // symptoms
    if (symptoms) {
        symptoms.addEventListener('focus', highlightOnFocus);
        symptoms.addEventListener('blur', clearHighlightOnBlur);
        symptoms.addEventListener('blur', validateSymptoms);
        symptoms.addEventListener('input', validateSymptoms);
    }

    // radio groups
    var genderRadios = document.getElementsByName('gender');
    for (var g = 0; g < genderRadios.length; g++) {
        genderRadios[g].addEventListener('change', function () {
            validateRadioGroup('gender', 'gender', 'Gender');
        });
    }

    var vaccinatedRadios = document.getElementsByName('vaccinated');
    for (var v = 0; v < vaccinatedRadios.length; v++) {
        vaccinatedRadios[v].addEventListener('change', function () {
            validateRadioGroup('vaccinated', 'vaccinated', 'Vaccinated');
        });
    }

    var insuranceRadios = document.getElementsByName('insurance');
    for (var ins = 0; ins < insuranceRadios.length; ins++) {
        insuranceRadios[ins].addEventListener('change', function () {
            validateRadioGroup('insurance', 'insurance', 'Insurance');
        });
    }

    // validate button
    if (validateButton) {
        validateButton.addEventListener('click', function () {
            runAllValidations();
        });
    }

    // review button
    if (reviewButton) {
        reviewButton.addEventListener('click', function () {
            runAllValidations(false);
            updateReviewSection();
        });
    }

    // reset button - clear errors and hide submit
    if (resetButton) {
        resetButton.addEventListener('click', function () {
            var errorSpans = document.querySelectorAll('.error-message');
            for (var e = 0; e < errorSpans.length; e++) {
                errorSpans[e].textContent = '';
            }

            var inputs = form.querySelectorAll('input, select, textarea');
            for (var j = 0; j < inputs.length; j++) {
                inputs[j].classList.remove('input-error');
            }

            hideSubmitButton();
            if (reviewSection) {
                reviewSection.style.display = 'none';
            }
        });
    }

    // submit - one more check before going to thank you page
    if (form) {
        form.addEventListener('submit', function (event) {
            var ok = runAllValidations(false);
            if (!ok) {
                event.preventDefault();
                alert('Please fix the errors on the form before submitting.');
            }
        });
    }

});
