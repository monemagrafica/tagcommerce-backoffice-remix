import { v4 as uuidv4 } from 'uuid';

export async function getUsersData() {
  const res = await fetch(`https://6390f7600bf398c73a97c655.mockapi.io/api/v1/users/`).then(
    (res) => res.json());
  return res;
}

export async function getProductsData() {
  const res = await fetch(`https://6390f7600bf398c73a97c655.mockapi.io/api/v1/products/`).then(
    (res) => res.json()
  );
  return res;
}

export async function getValidazioni() {
  const res = await fetch(`https://6390f7600bf398c73a97c655.mockapi.io/api/v1/users/`).then(
    (response) => response.json()
  );
  return res;
}

type userData = {
  id?: string
  mail?: string,
  password?: string
}

export function registerUsers(userData: userData) {
  const userId = uuidv4()
  userData.id = userId
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  };
  fetch(
    "https://6390f7600bf398c73a97c655.mockapi.io/api/v1/users",
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => console.log(data)
    );
}