const inputEl = document.querySelector("#input-item");
const bodyListEl = document.querySelector("#list-group");
const buttonAdd = document.querySelector("#add-item");
const messageEl = document.querySelector("#message");
const dueDate = document.querySelector("#due-date");
const hurrayEl = document.querySelector("#hurray");

let currentName = "";

const cancelId = "xmarkIcon";
const checkId = "checkIcon";

buttonAdd.addEventListener("click", () => {
  if (inputEl.value.length === 0) {
    messageEl.textContent = "*Did you forget something?";
    inputEl.focus();
    return;
  }
  messageEl.textContent = "";

  const newLi = document.createElement("li");
  newLi.className = "list-group-item";
  newLi.innerHTML = `
  <div class="text-container" contenteditable="true">${inputEl.value}</div>
  <i id="${checkId}" class="fa-solid fa-check fa-lg d-none"></i>&nbsp;
  <i id="${cancelId}" class="fa-solid fa-xmark fa-lg d-none"></i>

  <div class="badges">  <span class="badge low-icon">Low</span>
  <span class="badge medium-icon">Medium</span>
  <span class="badge high-icon">High</span></div>

  <i class="fas fa-trash-alt delete-icon"></i>
  <i class="toggle-icon fa-regular fa-circle"></i>
`;

  bodyListEl.appendChild(newLi);
  hurrayEl.classList.add("d-none");

  const badgeLow = newLi.querySelector(".low-icon");
  const badgeMedium = newLi.querySelector(".medium-icon");
  const badgeHigh = newLi.querySelector(".high-icon");


  badgeLow.classList.remove("d-none");
  badgeMedium.classList.remove("d-none");
  badgeHigh.classList.remove("d-none");

  badgeLow.addEventListener("click", () => {
    let isHidden = badgeHigh.classList.contains("d-none");

    if (!isHidden) {
      badgeMedium.classList.add("d-none");
      badgeHigh.classList.add("d-none");
    } else {
      badgeMedium.classList.remove("d-none");
      badgeHigh.classList.remove("d-none");
    }
  });

  badgeMedium.addEventListener("click", () => {
    let isHidden = badgeHigh.classList.contains("d-none");

    if (!isHidden) {
      badgeLow.classList.add("d-none");
      badgeHigh.classList.add("d-none");
    } else {
      badgeLow.classList.remove("d-none");
      badgeHigh.classList.remove("d-none");
    }
  });

  badgeHigh.addEventListener("click", () => {
    let isHidden = badgeLow.classList.contains("d-none");

    if (!isHidden) {
      badgeLow.classList.add("d-none");
      badgeMedium.classList.add("d-none");
    } else {
      badgeLow.classList.remove("d-none");
      badgeMedium.classList.remove("d-none");
    }
  });

  const cancelIcon = newLi.querySelector(`#${cancelId}`);
  const checkIcon = newLi.querySelector(`#${checkId}`);

  const textContainer = newLi.querySelector(".text-container");
  textContainer.addEventListener("input", () => {
    cancelIcon.classList.remove("d-none");
  });

  cancelIcon.addEventListener("click", () => {
    textContainer.innerText = currentName;
    cancelIcon.classList.add("d-none");
    checkIcon.classList.add("d-none");
  });

  textContainer.addEventListener("keydown", (event) => {
    checkIcon.classList.remove("d-none");
    cancelIcon.classList.remove("d-none");

    if (event.key === "Enter") {
      event.preventDefault();
      currentName = textContainer.innerText;
      checkIcon.classList.add("d-none");
      cancelIcon.classList.add("d-none");
    }

    if (event.key === "Escape") {
      textContainer.innerText = currentName;
      cancelIcon.classList.add("d-none");
      checkIcon.classList.add("d-none");
    }
  });

  currentName = inputEl.value;

  textContainer.addEventListener("keydown", (event) => {
    checkIcon.classList.remove("d-none");
    cancelIcon.classList.remove("d-none");

    if (event.key === "Enter") {
      event.preventDefault();
      currentName = textContainer.innerText;
      checkIcon.classList.add("d-none");
      cancelIcon.classList.add("d-none");
    }
  });

  checkIcon.addEventListener("click", () => {
    currentName = textContainer.innerText;
    checkIcon.classList.add("d-none");
    cancelIcon.classList.add("d-none");
  });

  const deleteButtons = document.querySelectorAll(".delete-icon");
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", () => {
      showConfirm("Are you sure you want to delete this item?", (result) => {
        if (result) {
          const listItem = deleteButton.closest(".list-group-item");
          listItem.remove();
        }
      });
    });
  });

  const showConfirm = (message, callback) => {
    const confirmElement = document.querySelector(".custom-confirm");
    const messageElement = confirmElement.querySelector(".message");
    const confirmButton = confirmElement.querySelector(".confirm-button");
    const cancelButton = confirmElement.querySelector(".cancel-button");

    messageElement.textContent = message;
    confirmButton.textContent = "Yes, please"; // "Yes" içeriği
    cancelButton.textContent = "No, don't"; // "No" içeriği

    confirmElement.style.display = "block";

    confirmButton.addEventListener("click", () => {
      confirmElement.style.display = "none";
      callback(true);
    });

    cancelButton.addEventListener("click", () => {
      confirmElement.style.display = "none";
      callback(false);
    });
  };

  const toggleIcon = newLi.querySelector(".toggle-icon");

  toggleIcon.addEventListener("click", () => {
    toggleIcon.classList.toggle("fa-circle");
    toggleIcon.classList.toggle("fa-circle-check");

    const textContainer = newLi.querySelector(".text-container");
    textContainer.classList.toggle("done");
    textContainer.contentEditable = !toggleIcon.classList.contains("fa-circle");
  });

  inputEl.value = "";
  inputEl.focus();
});

inputEl.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); 
    buttonAdd.click();
    inputEl.value = "";
    inputEl.focus();
  }
});
