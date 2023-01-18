import { FieldValues } from 'react-hook-form';
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
export async function getSingleProductData(id: string) {
  const res = await fetch(`https://6390f7600bf398c73a97c655.mockapi.io/api/v1/products/${id}`).then(
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
    .then((response) => response.json());
}

export function postNewProduct(prodotto: FieldValues) {

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(prodotto),
  };
  fetch(
    "https://6390f7600bf398c73a97c655.mockapi.io/api/v1/products",
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => console.log(data)
    );
}


export function addAttribute(attribute: FieldValues, id: string) {

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(attribute),
  };
  fetch(
    `https://6390f7600bf398c73a97c655.mockapi.io/api/v1/products:${id}`,
    requestOptions
  )
    .then((response) => response.json());
}