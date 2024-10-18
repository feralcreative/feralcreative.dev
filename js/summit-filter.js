document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll("#filter-bar button");
  const posts = document.querySelectorAll(".e-loop-item");

  // Function to get URL parameter
  function getUrlParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    const results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  // Get the filter parameter from the URL
  const filterParam = getUrlParameter("filter") || "all";

  // Function to filter posts
  function filterPosts(filter) {
    posts.forEach((post) => {
      if (filter === "all") {
        post.style.display = "block";
      } else {
        if (post.classList.contains(filter)) {
          post.style.display = "block";
        } else {
          post.style.display = "none";
        }
      }
    });
  }

  // Initially filter posts based on the URL parameter
  filterPosts(filterParam);

  // Add event listeners to filter buttons
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");
      filterPosts(filter);

      // Update URL parameter
      const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?filter=${filter}`;
      window.history.pushState({ path: newUrl }, "", newUrl);
    });
  });
});
