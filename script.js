const repoContainer = document.getElementById("repos");

fetch("https://api.github.com/users/Pedro8k/repos")
  .then(response => response.json())
  .then(data => {
    data.forEach(repo => {
      const card = document.createElement("div");
      card.classList.add("repo-card");

      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description ? repo.description : "Sem descrição"}</p>
        <a href="${repo.html_url}" target="_blank">Ver no GitHub</a>
      `;

      repoContainer.appendChild(card);
    });
  });