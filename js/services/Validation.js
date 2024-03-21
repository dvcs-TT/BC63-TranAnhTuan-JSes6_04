class Validation {
  constructor() {}

  isEmpty(value, elementErrorId, messageError) {
    if (value === "") {
      // Throw an error message to the UI
      document.querySelector(`#${elementErrorId}`).innerHTML = messageError;
      return false;
    }

    document.querySelector(`#${elementErrorId}`).innerHTML = "";
    return true;
  }

  isLength(value, elementErrorId, messageError, min, max) {
    if (value.length < min || value.length > max) {
      document.querySelector(`#${elementErrorId}`).innerHTML = messageError;
      return false;
    }

    document.querySelector(`#${elementErrorId}`).innerHTML = "";
    return true;
  }

  isNumber(value, elementErrorId, messageError) {
    var pattern = /^[0-9]+$/;
    var val = value.toString();

    if (val.match(pattern)) {
      document.querySelector(`#${elementErrorId}`).innerHTML = "";
      return true;
    }

    document.querySelector(`#${elementErrorId}`).innerHTML = messageError;
    return false;
  }

  isMatch(value, elementErrorId, messageError, pattern) {
    if (value.match(pattern)) {
        document.querySelector(`#${elementErrorId}`).innerHTML = "";
      return true;
    }

    document.querySelector(`#${elementErrorId}`).innerHTML = messageError;
    return false;
  }

  isMatchAccount(maSV, dssv, elementErrorId, messageError) {
    var index = -1;
    
    dssv.findIndex((vl) => vl.maSV === maSV)

    if (index === -1) {
        document.querySelector(`#${elementErrorId}`).innerHTML = "";
      return true;
    }

    document.querySelector(`#${elementErrorId}`).innerHTML = messageError;
    return false;
  }
}
