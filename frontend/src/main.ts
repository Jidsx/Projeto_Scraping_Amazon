document.getElementById("searchBtn")?.addEventListener("click", async () => {
  const keywordInput = document.getElementById("keyword") as HTMLInputElement | null;
  const resultDiv = document.getElementById("results") as HTMLDivElement | null;

  if (!keywordInput || !resultDiv) {
    throw new Error("Elementos do DOM não encontrados");
  }

  const keyword = keywordInput.value.trim();
  if (!keyword) {
    resultDiv.innerHTML = "<p>Digite um termo para buscar.</p>";
    return;
  }

  resultDiv.innerHTML = "<p>Carregando...</p>";

  try {
    const res = await fetch(
      `http://localhost:3031/api/scrape?keyword=${encodeURIComponent(keyword)}`
    );

    if (!res.ok) {
      resultDiv.innerHTML = `<p>Erro ${res.status}: ${res.statusText}</p>`;
      return;
    }

    const text = await res.text();
    if (!text) {
      resultDiv.innerHTML = "<p>Resposta vazia do servidor.</p>";
      return;
    }

    const data  = JSON.parse(text) as {
      title: string;
      rating: string;
      reviews: string;
      image: string;
    }[];

    resultDiv.innerHTML = data
      .map(
        (item) => `
      <div class="result-item">
        <img src="${item.image}" alt="${item.title}" />
        <h3>${item.title}</h3>
        <p>${item.rating}</p>
        <p>${item.reviews}</p>
      </div>
    `
      )
      .join("");
  } catch (err) {
    console.error("Erro no frontend:", err);
    resultDiv.innerHTML = "<p>Ocorreu um erro ao buscar resultados.</p>";
  }
});
