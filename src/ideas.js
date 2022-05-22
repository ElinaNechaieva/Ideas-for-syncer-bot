export class Idea {
  static create(idea) {
    fetch(
      "https://ideas-for-syncer-bot-default-rtdb.firebaseio.com/ideas.json",
      {
        method: "POST",
        body: JSON.stringify(idea),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        idea.id = response.name;
        return idea;
      })
      .then(addToLocalStorage)
      .then(Idea.renderList);
  }
  static renderList() {
    const ideas = getIdeasFromLocalStorage();
    const html = ideas.length
      ? ideas.map(toCard).join(" ")
      : `<div class="mui--text-headline">Your ideas will be displayed here</div>`;
    const list = document.getElementById("list");
    list.innerHTML = html;
  }
}
function addToLocalStorage(idea) {
  const all = getIdeasFromLocalStorage();
  all.push(idea);
  localStorage.setItem("idea", JSON.stringify(all));
}
function getIdeasFromLocalStorage() {
  return JSON.parse(localStorage.getItem("idea") || "[]");
}

function toCard(idea) {
  return "11";
}
