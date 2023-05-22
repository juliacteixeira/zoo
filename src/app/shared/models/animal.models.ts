export interface Animal {
  id: number;
  nome: string;
  dataNascimento: any;
  especie: string;
  sexo: string;
  vinculoMae?: Animal;
  vinculoPai?: Animal;
}
