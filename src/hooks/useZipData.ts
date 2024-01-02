import axios from "axios";

type CepProps = {
    erro?: boolean;
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
}

export async function zipData(zipCode: String) {
    if (zipCode != null) {
        const zip = zipCode.replace(/\D/g, "");
        if (zip != "") {
            const validZip = /^[0-9]{8}$/;
            if (validZip.test(zip)) {
                const { data } = await axios.get<CepProps>(`https://viacep.com.br/ws/${zip}/json/`);
                if (data.erro) {
                    return false;
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