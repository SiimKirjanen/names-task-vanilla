$(document).ready(function () {
  let userData = null;
  const userId = getUserIdFromUrl();

  loadUserData();

  function getUserIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("user_id");
  }

  function loadUserData() {
    $.ajax({
      url: `https://jsonplaceholder.typicode.com/users/${userId}`,
      method: "GET",
      success: function (data) {
        userData = data;
        renderUserData();
      },
      error: function (error) {
        console.error("Error loading users:", error);
        renderError("Error loading user data");
      },
    });
  }

  function renderError(errorMessage) {
    const $userWrap = $("#user-app");

    $userWrap.html(
      `<div class="alert alert-danger" role="alert">
          ${errorMessage}
        </div>`
    );
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

    $("#user-app").html($userDataWrap);
  }

  function generateUserDataItem(label, value) {
    return `<div class="user-data__item">${label}: ${value}</div>`;
  }
});
