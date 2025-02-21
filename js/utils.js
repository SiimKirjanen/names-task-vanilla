function filterUsers(users, search) {
  return users.filter((user) => {
    return user.name.toLowerCase().includes(search);
  });
}

function getUserIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("user_id");
}

export { filterUsers, getUserIdFromUrl };
