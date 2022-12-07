import fs from "fs";
import path from 'path'

export async function getUsersData() {
  const rawMockUsers =  fs.readFileSync("./app/data/mock.json", "utf-8");
  const jMockUsers = JSON.parse(rawMockUsers);
  const MockUsers = jMockUsers.users ?? [];
  return MockUsers;
}

export async function getProductsData() {
  const rawProduct =  fs.readFileSync(path.resolve(__dirname, "./app/data/products.json"), "utf-8");
  const jProduct = JSON.parse(rawProduct);
  const product = jProduct ?? [];
  return product;
}
export async function getValidazioni() {
  const rawValidazioni =  fs.readFileSync("./app/data/validazioni.json", "utf-8");
  const jValidazioni = JSON.parse(rawValidazioni);
  const validazioni = jValidazioni ?? [];
  return validazioni;
}

export function writeProductsData(products: []) {
  return fs.writeFileSync('./app/data/products.json', JSON.stringify({ products: products || [] }))
}
export function writeUserData(users: []) {
  return fs.writeFileSync('./app/data/mock.json', JSON.stringify({ users: users || [] }))
}

