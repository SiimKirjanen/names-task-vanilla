import { filterUsers } from "./utils.js";

function renderSpinner($container) {
  $container.html(
    `<div class="spinner-border" id="loader" role="status"></div>`
  );
}

function removeSpinner($container) {
  $container.find("#loader").remove();
}

function renderError($container, errorMessage) {
  $container.html(
    `<div class="alert alert-danger" role="alert">
          ${errorMessage}
        </div>`
  );
}

function removeUsers($container) {
  $container.find(".user-links").remove();
}

function renderSearch($container) {
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
  $container.prepend($searchContainer);
}

function renderUsers($container, users, search) {
  removeUsers($container);
  const $userLinks = $("<div class='user-links'></div>");
  const filteredUsers = filterUsers(users, search);

  filteredUsers.forEach((user) => {
    $userLinks.append(
      `<a href="?user_id=${user.id}" data-user-id="${user.id}" data-action="navigate" class="user-links__link">${user.name}</a>`
    );
  });

  $container.append($userLinks);
}

function renderUserData($container, userData) {
  const $userDataWrap = $('<div class="user-data"></div>');

  $userDataWrap.append(generateUserDataItem("Name", userData.name));
  $userDataWrap.append(generateUserDataItem("Username", userData.username));
  $userDataWrap.append(generateUserDataItem("Email", userData.email));
  $userDataWrap.append(generateUserDataItem("Phone", userData.phone));
  $userDataWrap.append(generateUserDataItem("Website", userData.website));
  $userDataWrap.append(generateUserDataItem("Street", userData.address.street));
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

  $userDataWrap.append(generateUserDataItem("Company", userData.company.name));
  $userDataWrap.append(
    generateUserDataItem("Company catch phrase", userData.company.catchPhrase)
  );
  $userDataWrap.append(generateUserDataItem("Company bs", userData.company.bs));

  $container.html($userDataWrap);
}

function generateUserDataItem(label, value) {
  return `<div class="user-data__item">${label}: ${value}</div>`;
}

export {
  renderSpinner,
  removeSpinner,
  renderError,
  removeUsers,
  renderSearch,
  renderUsers,
  renderUserData,
};
