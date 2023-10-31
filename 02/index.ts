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
  nome: "Nome Sobrenome",
  email: "Exemplo@email.com",
  cpf: "001.444.333-00",
  profissao: "Desenvolvedor Backend",
  endereco: {
    cep: "100000-000",
    rua: "A",
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

const getUsers = (): User[] => {
  return fileReader() as User[];
};

function fileReader(): unknown {
  if (existsSync("./bd.json"))
    return JSON.parse(readFileSync("./bd.json", "utf-8"));
  else return [];
}

registerUser(userExample);
