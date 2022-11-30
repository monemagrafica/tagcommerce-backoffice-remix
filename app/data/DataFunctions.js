import fs from "fs/promises";

export async function getMockupData() {
  const rawMock = await fs.readFile("./app/data/mock.json", "utf-8");
  const jMock = JSON.parse(rawMock);
  const mock = jMock.mock ?? [];
  return mock;
}
export async function getUsersData() {
  const rawMock = await fs.readFile("./app/data/mock.json", "utf-8");
  const jMock = JSON.parse(rawMock);
  const mock = jMock.users ?? [];
  return mock;
}

export async function getProductsData() {
  const rawProduct = await fs.readFile("./app/data/products.json", "utf-8");
  const jProduct = JSON.parse(rawProduct);
  const product = jProduct ?? [];
  return product;
}

export function writeProductsData(products) {
  return fs.writeFile('./app/data/products.json', JSON.stringify({ products: products || [] }))
}
export function writeUserData(users) {
  return fs.writeFile('./app/data/mock.json', JSON.stringify({ users: users || [] }))
}
