import axios from "axios";
import { JSDOM } from "jsdom";

/**
 * Faz o scraping da página de resultados da Amazon para uma keyword.
 * @param keyword Palavra-chave a buscar
 * @returns Lista de produtos com título, avaliação, número de reviews e URL da imagem
 */

export async function scrapeAmazon(keyword: string) {
    // formantado a query, substituindo espacos por +
    const query = keyword.trim().replace(/\s+/g, "+");
    const url = `https://www.amazon.com/s?k=${query}`;

    // Fazendo a requisicao HTTP
    const { data: html } = await axios.get(url, {
        headers: {
            // Simula o navegador para nao ser bloqueado
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            "Accept-Language": "en-US,en;q=0.9",
        },
    });

    // Carrega o html em um DOM virtual
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Seleciona os items pela presenca de data-asin o ID do produto
    const items = Array.from(
        document.querySelectorAll("div.s-main-slot > div[data-asin]")
    );

}