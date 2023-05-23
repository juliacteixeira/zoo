export interface Animal {
  id: number;
  nome: string;
  dataNascimento: any;
  especie: string;
  sexo: string;
  vinculoMae?: Animal;
  vinculoPai?: Animal;
}

export interface TableAnimal {
  id: number;
  nome: string;
  dataNascimento: any;
  especie: string;
  sexo: string;
  vinculoMae?: string;
  vinculoPai?: string;
}
