export interface Tarefa {
  id?: string;
  titulo: string;
  descricao: string;
  responsavel: string;
  prioridade: Prioridade;
  deadline: string;
  situacao: Situacao;
  dataCriacao?: string;
  dataConclusao?: string;
}

export enum Prioridade {
  ALTA = 'Alta',
  MEDIA = 'Media',
  BAIXA = 'Baixa'
}

export enum Situacao {
  EM_ANDAMENTO = 'Em andamento',
  CONCLUIDA = 'Concluida'
}

export interface FiltroTarefa {
  numero?: string;
  tituloDescricao?: string;
  responsavel?: string;
  situacao?: Situacao;
}
