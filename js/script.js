// Category filter
document.querySelectorAll('input[name="category"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    let selectedCategory = this.id;
    document.querySelectorAll(".col").forEach((post) => {
      if (
        selectedCategory === "all" ||
        post.getAttribute("data-category") === selectedCategory
      ) {
        post.style.display = "block";
      } else {
        post.style.display = "none";
      }
    });
  });
});
// category filter end

// Alert
const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
const appendAlert = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertPlaceholder.append(wrapper);
};

const alertTrigger = document.getElementById("liveAlertBtn");
if (alertTrigger) {
  alertTrigger.addEventListener("click", () => {
    appendAlert("Developer will be fix this soon!", "success");
  });
}

document.addEventListener(
  "contextmenu",
  function (e) {
    e.preventDefault();
  },
  false
);

document.addEventListener(
  "selectstart",
  function (e) {
    e.preventDefault();
  },
  false
);

document.addEventListener(
  "copy",
  function (e) {
    e.preventDefault();
  },
  false
);

document.addEventListener(
  "cut",
  function (e) {
    e.preventDefault();
  },
  false
);

document.addEventListener(
  "paste",
  function (e) {
    e.preventDefault();
  },
  false
);

document.addEventListener(
  "dragstart",
  function (e) {
    e.preventDefault();
  },
  false
);

document.addEventListener("keydown", function (e) {
  // F12, Ctrl+Shift+I, Ctrl+U, Ctrl+Shift+C, Ctrl+Shift+J
  if (
    e.key === "F12" ||
    (e.ctrlKey &&
      e.shiftKey &&
      (e.key === "I" || e.key === "C" || e.key === "J")) ||
    (e.ctrlKey && e.key === "U")
  ) {
    e.preventDefault();
    return false;
  }
});
