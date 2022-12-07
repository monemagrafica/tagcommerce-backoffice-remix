import fs from "fs/promises";


export async function getUsersData() {
  const rawMockUsers = await fs.readFile("~/data/mock.json", "utf-8");
  const jMockUsers = JSON.parse(rawMockUsers);
  const MockUsers = jMockUsers.users ?? [];
  return MockUsers;
}

export async function getProductsData() {
  const rawProduct = await fs.readFile("~/data/products.json", "utf-8");
  const jProduct = JSON.parse(rawProduct);
  const product = jProduct ?? [];
  return product;
}

export async function getValidazioni() {
  const rawValidazioni = await fs.readFile("~/data/validazioni.json", "utf-8");
  const jValidazioni = JSON.parse(rawValidazioni);
  const validazioni = jValidazioni ?? [];
  return validazioni;
}

export function writeProductsData(products: []) {
  return fs.writeFile('./products.json', JSON.stringify({ products: products || [] }))
}
export function writeUserData(users: []) {
  return fs.writeFile('./mock.json', JSON.stringify({ users: users || [] }))
}

