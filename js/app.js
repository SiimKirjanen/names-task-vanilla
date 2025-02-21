import {
  renderSpinner,
  removeSpinner,
  renderError,
  renderSearch,
  renderUsers,
  renderUserData,
} from "./render.js";
import { getUserIdFromUrl } from "./utils.js";

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
    renderSpinner($app);

    const loadSuccess = await loadUsers();
    if (!loadSuccess) {
      renderError($app, "Error loading users");
      return;
    }

    removeSpinner($app);
    renderSearch($app);
    renderUsers($app, users, search);
    addHomeListeners();
  }

  async function renderUserPage(userId) {
    renderSpinner($app);

    const loadSuccess = await loadUserData(userId);
    if (!loadSuccess) {
      renderError($app, "Error loading user data");
      return;
    }
    removeSpinner($app);
    renderUserData($app, userData);
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

  function cleanUpHomeListeners() {
    $("#user-search").off("input");
    $app.off("click", "a[data-action='navigate']");
  }

  function addHomeListeners() {
    cleanUpHomeListeners();
    $("#user-search").on("input", function () {
      search = $(this).val().toLowerCase();
      renderUsers($app, users, search);
    });

    $app.on("click", "a[data-action='navigate']", function (event) {
      event.preventDefault();
      const userId = $(this).data("user-id");

      if (window.location.search !== `?user_id=${userId}`) {
        history.pushState(null, "", `?user_id=${userId}`);
      }
      detectPageToRender();
    });
  }
});
