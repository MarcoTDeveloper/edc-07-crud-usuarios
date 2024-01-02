import axios from "axios";

export type CnpjProps = {
    status: "OK",
    ultima_atualizacao: "string",
    cnpj: "string",
    tipo: "string",
    porte: "string",
    nome: "string",
    fantasia: "string",
    abertura: "string",
    atividade_principal: {
        code: "string",
        text: "string"
    }
    atividades_secundarias: {
        code: "string",
        text: "string"
    },
    natureza_juridica: "string",
    logradouro: "string",
    numero: "string",
    complemento: "string",
    cep: "string",
    bairro: "string",
    municipio: "string",
    uf: "string",
    email: "string",
    telefone: "string",
    efr: "string",
    situacao: "string",
    data_situacao: "string",
    motivo_situacao: "string",
    situacao_especial: "string",
    data_situacao_especial: "string",
    capital_social: "string",
    qsa: {
        nome: "string",
        qual: "string",
        pais_origem: "string",
        nome_rep_legal: "string",
        qual_rep_legal: "string"
    },
    billing: {
      free: true,
      database: true
    }
  }

export async function cnpjData(cnpjCode: String) {
    if (cnpjCode != null) {
        const cnpj = cnpjCode.replace(/\D/g, "");
        if (cnpj != "") {
            const validCnpj = /^[0-9]{14}$/;
            if (validCnpj.test(cnpj)) {
                const { data, status } = await axios.get<CnpjProps>(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`);
                if (status == 429) {
                    return { status: 429 };
                }
                return data;
            } else {
                return false;
            }
        }
    } else {
        return false;
    }
}