// Importar pacotes/bibliotecas
import express from "express";
import dotenv from "dotenv";

// Importar Lista de Array
import dados from "./src/data/dados.js";
const { bruxos, varinhas, pocoes, animais} = dados;

// Criar aplicação com Express e configurar para aceitar JSON
const app = express();
app.use(express.json());

// Carregar variáveis de ambiente e definir constante para porta do servidor
dotenv.config();
const serverPort = process.env.PORT || 3001;

// Rota principal GET para "/"
app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando...");
});

// Listar bruxos com  filtro (query)
app.get("/bruxos", (req, res) => {
    const { casa, ano, especialidade, nome } = req.query;
    let resultado = bruxos;

    if (casa) {
        resultado = resultado.filter((b) => b.casa.toLowerCase().includes(casa.toLowerCase()));
    }

    if (ano) {
        resultado = resultado.filter((b) => b.ano == ano);
    }

    if (especialidade) {
        resultado = resultado.filter((b) => b.especialidade.toLowerCase().includes(especialidade.toLowerCase()));
    }

    if (nome) {
        resultado = resultado.filter((b) => b.nome.toLowerCase().includes(nome.toLowerCase()));
    }

    res.status(200).json({
        total: resultado.length,
        data: resultado,
    });
});

// Rota para criar Bruxo
app.post("/bruxos", (req, res) => {
    const {nome, casa, ano, varinha, mascote, patrono, especialidade, vivo} = req.body;

    if (nome === false || !casa) {
        return res.status(400).json({
            success: false,
            menssage: "Nome e casa são obrigatórios para um bruxo!",
        });
    }

const novoBruxo = {
    id: bruxos.lenght + 1,
    nome,
    casa: casa,
    ano: parseInt(ano),
    varinha: varinha,
    mascote,
    patrono,
    especialidade: especialidade || "Ainda não atribuido!",
    vivo: vivo
};

bruxos.push(novoBruxo);

res.status(201).json ({
    success: true,
    message: "Novo bruxo adicionado a Hogwarts!",
    data: novoBruxo
});
});

// Listar varinhas com  filtro (query)
app.get("/varinhas", (req, res) => {
    const { material, nucleo } = req.query;
    let resultado = varinhas;

    if (material) {
        resultado = resultado.filter((b) => b.material.toLowerCase().includes(material.toLowerCase()));
    }

    if (nucleo) {
        resultado = resultado.filter((b) => b.nucleo.toLowerCase().includes(nucleo.toLowerCase()));
    }

    res.status(200).json({
        total: resultado.length,
        data: resultado,
    });
});

app.post("/varinhas", (req, res) => {
    const {material, nucleo, comprimento} = req.body;

    if (material || !nucleo || !comprimento) {
        return res.status(400).json({
            success: false,
            menssage: "Material, nucleo e comprimento sao obrigatórios!",
        });
    }})

    const novaVarinha = {
        id: varinhas.length + 1,
        material,
        nucleo,
        comprimento
    }

    varinhas.push (novaVarinha);

    res.status(200).json({
        success: true,
        message: "Nova varinha adicionada"
        data: novaVarinha
    })

    
// Listar pocoes com  filtro (query)
app.get("/pocoes", (req, res) => {
    const { nome, efeito } = req.query;
    let resultado = pocoes;

    if (nome) {
        resultado = resultado.filter((b) => b.nome.toLowerCase().includes(nome.toLowerCase()));
    }

    if (efeito) {
        resultado = resultado.filter((b) => b.efeito.toLowerCase().includes(efeito.toLowerCase()));
    }

    res.status(200).json({
        total: resultado.length,
        data: resultado,
    });
});



// Listar animais com filtro (query)
app.get("/animais", (req, res) => {
    const { tipo, nome } = req.query;
    let resultado = animais;

    if (tipo) {
        resultado = resultado.filter((b) => b.tipo.toLowerCase().includes(tipo.toLowerCase()));
    }

    if (nome) {
        resultado = resultado.filter((b) => b.nome.toLowerCase().includes(nome.toLowerCase()));
    }

    res.status(200).json({
        total: resultado.length,
        data: resultado,
    });
});

// Iniciar servidor escutando na porta definida
app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});
