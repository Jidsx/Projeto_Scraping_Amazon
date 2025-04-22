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
    console.log(`[scraper] Fetching: ${url}`);

    // Fazendo a requisicao HTTP
    const { data: html } = await axios.get(url, {
        headers: {
            // Simula o navegador para nao ser bloqueado
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            "Accept-Language": "en-US,en;q=0.9",
        },
    });
    console.log(`[scraper] HTML length: ${html.length}`);

    // Carrega o html em um DOM virtual
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Seleciona todos os elementos de produto pelo atributo data-asin
    const items = Array.from(
        document.querySelectorAll('div[data-component-type="s-search-result"]')
    );
    console.log(`[scraper] Found items: ${items.length}`);

    // Extrai os campos de cada item
    const results = items
        .map((item) => {
            const title = item.querySelector("h2 span")?.textContent?.trim();
            const rating = item.querySelector("span.a-icon-alt")?.textContent?.trim();
            const reviews = item.querySelector("span.a-size-base")?.textContent?.trim();
            const image = item.querySelector("img")?.getAttribute("src");

            if (title && rating && reviews && image) {
                return { title, rating, reviews, image };
            }
        })
        .filter(Boolean) as {
            title: string;
            rating: string;
            reviews: string;
            image: string;
        }[];

    console.log(`[scraper] Parsed results count: ${results.length}`);
    return results;
}