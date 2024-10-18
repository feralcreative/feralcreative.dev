document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll("#filter-bar button");
  const posts = document.querySelectorAll(".post-item");

  function applyFilter(filter) {
    posts.forEach((post) => {
      post.classList.add("hidden");
      setTimeout(() => {
        if (filter === "all" || post.classList.contains(filter)) {
          post.style.display = "block";
          post.classList.remove("hidden");
        } else {
          post.style.display = "none";
        }
      }, 500);
    });


    document.addEventListener('DOMContentLoaded', function() {
        const filterButtons = document.querySelectorAll('#filter-bar button');
        const posts = document.querySelectorAll('.e-loop-item');
    
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
    
                posts.forEach(post => {
                    if (filter === 'all') {
                        post.style.display = 'block';
                    } else {
                        if (post.classList.contains(filter)) {
                            post.style.display = 'block';
                        } else {
                            post.style.display = 'none';
                        }
                    }
                });
            });
        });
    });
    
  }

  // Check URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const filterParam = urlParams.get("filter") || "all";
  applyFilter(filterParam);

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");
      applyFilter(filter);
    });
  });
});





document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('#filter-bar button');
    const posts = document.querySelectorAll('.post-item');

    function applyFilter(filter) {
        posts.forEach(post => {
            post.classList.add('hidden');
            setTimeout(() => {
                if (filter === 'all' || post.classList.contains(filter)) {
                    post.style.display = 'block';
                    post.classList.remove('hidden');
                } else {
                    post.style.display = 'none';
                }
            }, 500);
        });
    }

    // Check URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter') || 'all';
    applyFilter(filterParam);

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            applyFilter(filter);
        });
    });
});
