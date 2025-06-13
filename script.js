let tabs = document.querySelectorAll(".tab");
loadfile("Partie1.html");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    /* const target = tab.dataset.tab;
    contents.forEach((content) => {
      content.classList.add("hidden");
      if (content.id === `tab-${target}`) {
        content.classList.remove("hidden");
      }
    });*/
  });
});

async function loadfile(filename) {
  let response = await fetch(filename);
  const text = await response.text();

  let fragment = document.createDocumentFragment();

  // Récupéré le contenu du fichier
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = text;

  // Récupérer le <script>
  const scripts = tempDiv.querySelectorAll("script");
  scripts.forEach((script) => script.remove());
  document.getElementById("tab-content").innerHTML = tempDiv.innerHTML;
  scripts.forEach((script) => {
    const newScript = document.createElement("script");
    // Remplacer l'ancien script par le nouveau dans le body
    newScript.textContent = script.textContent;

    fragment.appendChild(newScript);
  });

  // Supprimer tous les anciens <script> du body
  document.querySelectorAll("script").forEach((script) => script.remove());
  // Ajouter les nouveaux scripts du fragment
  document.body.appendChild(fragment);
}
