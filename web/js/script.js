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
