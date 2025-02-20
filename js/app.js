$(document).ready(function () {
  const $app = $("#app");
  let users = [];
  let search = "";
  let userData = null;

  detectPageToRender();
  function detectPageToRender() {
    const userId = getUserIdFromUrl();

    if (userId) {
      renderUserPage(userId);
    } else {
      renderHomePage();
    }
  }
  window.addEventListener("popstate", detectPageToRender);

  async function renderHomePage() {
    renderSpinner();

    const loadSuccess = await loadUsers();
    if (!loadSuccess) {
      renderError("Error loading users");
      return;
    }

    removeSpinner();
    renderSearch();
    renderUsers();
    addHomeListeners();
  }

  async function renderUserPage(userId) {
    renderSpinner();

    const loadSuccess = await loadUserData(userId);
    if (!loadSuccess) {
      renderError("Error loading user data");
      return;
    }
    removeSpinner();
    renderUserData();
  }

  async function loadUsers() {
    try {
      const response = await $.ajax({
        url: "https://jsonplaceholder.typicode.com/users",
        method: "GET",
      });
      users = response;

      return true;
    } catch (error) {
      return false;
    }
  }

  async function loadUserData(userId) {
    try {
      const response = await $.ajax({
        url: `https://jsonplaceholder.typicode.com/users/${userId}`,
        method: "GET",
      });
      userData = response;

      return true;
    } catch (error) {
      return false;
    }
  }

  function renderUsers() {
    removeUsers();
    const $userLinks = $("<div class='user-links'></div>");
    const filteredUsers = filterUsers();

    filteredUsers.forEach((user) => {
      $userLinks.append(
        `<a href="?user_id=${user.id}" data-user-id="${user.id}" class="user-links__item">${user.name}</a>`
      );
    });

    $app.append($userLinks);
  }

  function removeUsers() {
    $app.find(".user-links").remove();
  }

  function renderError(errorMessage) {
    $app.html(
      `<div class="alert alert-danger" role="alert">
          ${errorMessage}
        </div>`
    );
  }

  function renderSearch() {
    const $searchContainer = $("<div class='search'></div>");
    const $inputGroup = $("<div class='input-group mb-3'></div>");
    const $input = $("<input>", {
      type: "text",
      class: "form-control",
      placeholder: "Search",
      "aria-label": "Username",
      id: "user-search",
      autocomplete: "off",
    });

    $inputGroup.append($input);
    $searchContainer.append($inputGroup);
    $app.prepend($searchContainer);
  }

  function renderSpinner() {
    $app.html(`<div class="spinner-border" id="loader" role="status"></div>`);
  }

  function removeSpinner() {
    $("#loader").remove();
  }

  function renderUserData() {
    $userDataWrap = $('<div class="user-data"></div>');

    $userDataWrap.append(generateUserDataItem("Name", userData.name));
    $userDataWrap.append(generateUserDataItem("Username", userData.username));
    $userDataWrap.append(generateUserDataItem("Email", userData.email));
    $userDataWrap.append(generateUserDataItem("Phone", userData.phone));
    $userDataWrap.append(generateUserDataItem("Website", userData.website));
    $userDataWrap.append(
      generateUserDataItem("Street", userData.address.street)
    );
    $userDataWrap.append(generateUserDataItem("Suite", userData.address.suite));
    $userDataWrap.append(generateUserDataItem("City", userData.address.city));
    $userDataWrap.append(
      generateUserDataItem("Zipcode", userData.address.zipcode)
    );
    $userDataWrap.append(
      generateUserDataItem("Latitude", userData.address.geo.lat)
    );
    $userDataWrap.append(
      generateUserDataItem("Longitude", userData.address.geo.lng)
    );

    $userDataWrap.append(
      generateUserDataItem("Company", userData.company.name)
    );
    $userDataWrap.append(
      generateUserDataItem("Company catch phrase", userData.company.catchPhrase)
    );
    $userDataWrap.append(
      generateUserDataItem("Company bs", userData.company.bs)
    );

    $("#app").html($userDataWrap);
  }

  function generateUserDataItem(label, value) {
    return `<div class="user-data__item">${label}: ${value}</div>`;
  }

  function filterUsers() {
    return users.filter((user) => {
      return user.name.toLowerCase().includes(search);
    });
  }

  function getUserIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("user_id");
  }

  function addHomeListeners() {
    $("#user-search").on("input", function () {
      search = $(this).val().toLowerCase();
      renderUsers();
    });

    $app.on("click", ".user-links__item", function (event) {
      event.preventDefault();
      const userId = $(this).data("user-id");

      if (window.location.search !== `?user_id=${userId}`) {
        history.pushState(null, "", `?user_id=${userId}`);
      }
      detectPageToRender();
    });
  }
});
