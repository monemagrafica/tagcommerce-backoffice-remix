import fs from "fs/promises";


export async function getUsersData() {
  const rawMockUsers = await fs.readFile("./app/data/mock.json", "utf-8");
  const jMockUsers = JSON.parse(rawMockUsers);
  const MockUsers = jMockUsers.users ?? [];
  return MockUsers;
}

export async function getProductsData(data: any) {
  const rawProduct = await fs.readFile(data, "utf-8");
  const jProduct = JSON.parse(rawProduct);
  const product = jProduct ?? [];
  return product;
}
export async function getValidazioni() {
  const rawValidazioni = await fs.readFile("./app/data/validazioni.json", "utf-8");
  const jValidazioni = JSON.parse(rawValidazioni);
  const validazioni = jValidazioni ?? [];
  return validazioni;
}

export function writeProductsData(products: []) {
  return fs.writeFile('./app/data/products.json', JSON.stringify({ products: products || [] }))
}
export function writeUserData(users: []) {
  return fs.writeFile('./app/data/mock.json', JSON.stringify({ users: users || [] }))
}

