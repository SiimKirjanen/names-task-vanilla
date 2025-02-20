$(document).ready(function () {
  let users = [];
  let search = "";

  loadUsers();

  function loadUsers() {
    $.ajax({
      url: "https://jsonplaceholder.typicode.com/users",
      method: "GET",
      success: function (data) {
        users = data;
        renderUsers();
      },
      error: function (error) {
        console.error("Error loading users:", error);
        renderError("Error loading users");
      },
    });
  }

  function renderUsers() {
    const $usersWrap = $("#users-wrap");
    const $userLinks = $("<div class='user-links'></div>");
    const filteredUsers = filterUsers();

    filteredUsers.forEach((user) => {
      $userLinks.append(
        `<a href="user.html?user_id=${user.id}" class="user-links__item">${user.name}</a>`
      );
    });

    $usersWrap.html($userLinks);
  }

  function renderError(errorMessage) {
    const $usersWrap = $("#users-wrap");
    $usersWrap.html(
      `<div class="alert alert-danger" role="alert">
          ${errorMessage}
        </div>`
    );
  }

  function filterUsers() {
    return users.filter((user) => {
      return user.name.toLowerCase().includes(search);
    });
  }

  $("#user-search").on("input", function () {
    search = $(this).val().toLowerCase();
    renderUsers();
  });
});
