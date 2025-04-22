import express, { type RequestHandler } from "express";
import cors from "cors";
import { scrapeAmazon } from "./utils/scraper";

// Criando o express
const app = express();

// Porta do servidor
const PORT = 3031;

// Cors para permitir chamadas do frontend
app.use(cors());

// Definindo o handler tipando para a rota /api/scraper
const scrapeHandler: RequestHandler = async(req, res) => {
    // query da keyword
    const keyword = req.query.keyword as string;

    // validacao simples
    if (!keyword){
        res.status(400).json({ error: "Keyword is required."});
        return;
    }

    try{
        // Chamando a funcao de scraping e retornando JSON
        const results = await scrapeAmazon(keyword);
        res.json(results);
    } catch(error){
        console.error("Erro no scraping", error);
        res.status(500).json({ error: "Falei to scrape data."});
    }
};

// Registrando a rota para GET /api/scrape.
app.get("/api/scrape", scrapeHandler);

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
});
