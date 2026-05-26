const repoContainer = document.getElementById("repos");
const loading = document.getElementById("loading");

async function carregarRepositorios() {

  try {

    const response = await fetch(
      "https://api.github.com/users/Pedro8k/repos"
    );

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const repos = await response.json();

    loading.style.display = "none";

    repoContainer.innerHTML = "";

    repos
      .filter(repo => !repo.fork)
      .sort((a, b) =>
        new Date(b.created_at) - new Date(a.created_at)
      )

      .forEach(repo => {

        const card = document.createElement("div");

        card.classList.add("repo-card");

        card.innerHTML = `
          <h3>${repo.name}</h3>

          <p>
            ${repo.description || "Sem descrição disponível"}
          </p>

          <p>
            ⭐ ${repo.stargazers_count}
          </p>

          <a href="${repo.html_url}" target="_blank">
            Ver no GitHub
          </a>
        `;

        repoContainer.appendChild(card);
      });

  } catch(error) {

    console.error(error);

    loading.innerHTML = `
      Erro ao carregar repositórios.
    `;
  }
}

carregarRepositorios();