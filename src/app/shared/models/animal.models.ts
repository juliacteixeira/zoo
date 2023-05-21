export interface Animal {
  id: number;
  nome: string;
  dataNascimento: Date;
  especie: string;
  sexo: string;
  vinculoMae?: Animal;
  vinculoPai?: Animal;
}
