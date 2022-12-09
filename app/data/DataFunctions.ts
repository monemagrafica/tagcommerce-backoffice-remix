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

export function writeProductsData(products: []) {
  return fs.writeFileSync('./app/data/products.json', JSON.stringify({ products: products || [] }))
}
export async function writeUserData(users: []) {

  let url = 'https://6390f7600bf398c73a97c655.mockapi.io/api/v1/users/';

  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(users),
  });

}

