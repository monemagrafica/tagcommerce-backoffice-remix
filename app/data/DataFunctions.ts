import fs from "fs";


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

