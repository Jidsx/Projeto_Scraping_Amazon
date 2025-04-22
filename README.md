# Projeto_Scraping_Amazon
Este projeto realiza web scraping na Amazon a partir de uma palavra-chave digitada pelo usuário, retornando os principais resultados com título, avaliação, número de reviews e imagem do produto.

É uma aplicação fullstack simples construída com tecnologias modernas e pensada como desafio técnico.

## Como Funciona
O usuário digita uma palavra-chave no frontend.

O frontend envia uma requisição para a rota /api/scrape.

O backend utiliza axios para obter a página de resultados da Amazon.

O HTML da página é analisado com JSDOM para extrair informações relevantes.

Os dados são enviados de volta ao frontend para exibição.

## Demonstração
![image](https://github.com/user-attachments/assets/b4ebe3f0-9c12-4d6c-bc0f-51023ecde00d)


## Tecnologias
- **Bun**: runtime JavaScript/TypeScript 
- **Express**: framework web para APIs  
- **Axios**: cliente HTTP  
- **JSDOM**: parsing de HTML em Node  
- **Vite**: bundler e dev server para frontend  
- Vanilla **HTML**, **CSS**, **TypeScript**

## Instalação do Bun

### Backend
```bash
powershell -c "irm bun.sh/install.ps1|iex" comando para instalar o bun no Windows
bun init
bun add express axios jsdom cors
npm install --save @types/express @types/axios @types/jsdom @types/cors

# Para rodar o backend
bun run index.ts
```
### Frontend
```bash
npm create vite@latest frontend --template vanilla
cd frontend
npm install

# Para rodar o frontend
npm run dev
```
