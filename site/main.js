const exercises = document.querySelectorAll(".exercise");

exercises.forEach((i) => {
  i.addEventListener("click", () => {
    i.classList.toggle("strikethrough");
  });
});

const exercisesDone = () => {
  let done = [...exercises];
  return done.every((e) => e.classList.contains("strikethrough"));
};

const button = document.querySelector(".button");

const finished = document.querySelector("#success");
const success = document.querySelector("#message");

const today = () => new Date().toLocaleDateString("fr-CA");

const addDayToLocalStorage = () => {
  const totalDays = JSON.parse(localStorage.getItem("completed")) || [];
  if (![...totalDays].includes(today())) {
    totalDays.push(today());
    localStorage.setItem("completed", JSON.stringify(totalDays));
  }
};

button.addEventListener("click", () => {
  if (exercisesDone()) {
    addDayToLocalStorage();
    const days = JSON.parse(localStorage.getItem("completed")).reverse();
    days.forEach((day) => {
      let node = document.createElement("LI");
      let textnode = document.createTextNode(
        day,
      );
      node.appendChild(textnode);
      document.querySelector("#completed").appendChild(node);
    });
    button.setAttribute("disabled", "true");
    finished.classList.remove("transparent");
    [finished, success].forEach((node) => {
      node.classList.remove("transparent");
      success.textContent = days.length == 1
        ? `You've worked out for ${days.length} day in total.`
        : `You've worked out for ${days.length} days in total.`;
    });
  }
});
