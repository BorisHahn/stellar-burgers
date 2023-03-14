function checkResponse(res) {
  if (res) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export default checkResponse;
