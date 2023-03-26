const checkResponse = (res) =>{
  if (res) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res?.payload?.message}`);
}

export default checkResponse;
