import { existsSync, readFileSync, writeFileSync } from "fs";

type Adress = {
  cep: string;
  rua: string;
  complemento?: string;
  bairro: string;
  cidade: string;
};

type User = {
  nome: string;
  email: string;
  cpf: string;
  profissao?: string;
  endereco?: Adress | null;
};

const userExample = {
  nome: "Arodo Sobrenome",
  email: "Exemplo2@email.com",
  cpf: "002.444.333-00",
  profissao: "Desenvolvedor Backend",
  endereco: {
    cep: "100002-000",
    rua: "B",
    bairro: "Liberdade",
    cidade: "São Paulo",
  },
};

const registerUser = (user: User): User => {
  let bd: User[] = [];
  if (!user.endereco) user.endereco = null;
  if (existsSync("./bd.json")) {
    bd = getUsers();
  }

  bd.push(user);
  writeFileSync("./bd.json", JSON.stringify(bd));
  return user;
};

const detailUser = (cpf: string): User => {
  const bd = fileReader() as User[];
  const userFound = bd.find((user) => user.cpf === cpf);
  if (!userFound) {
    throw new Error("User not found");
  }
  return userFound;
};

const updateUser = (cpf: string, data: User): User => {
  const bd = fileReader() as User[];
  const userFound = bd.find((user) => user.cpf === cpf);
  if (!userFound) {
    throw new Error("User not found");
  }

  Object.assign(userFound, data);
  writeFileSync("./bd.json", JSON.stringify(bd));
  return userFound;
};

const deleteUser = (cpf: string): User => {
  const bd = fileReader() as User[];
  const userFound = bd.find((user) => user.cpf === cpf);
  if (!userFound) {
    throw new Error("User not found");
  }
  bd.splice(bd.indexOf(userFound), 1);

  writeFileSync("./bd.json", JSON.stringify(bd));
  return userFound;
};

const getUsers = (): User[] => {
  return fileReader() as User[];
};

function fileReader(): unknown {
  if (existsSync("./bd.json"))
    return JSON.parse(readFileSync("./bd.json", "utf-8"));
  else return [];
}
