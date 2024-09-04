function getToken() {
  return window.sessionStorage.getItem("token");
}

function setToken(token) {
  window.sessionStorage.setItem("token", token);
}

function clearSession() {
  window.sessionStorage.clear();
}

export { getToken, setToken, clearSession };
