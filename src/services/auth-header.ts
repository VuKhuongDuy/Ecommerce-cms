export const authHeader = () => {
  const user = JSON.parse(localStorage.user || "");

  if (user && user.accessToken) {
    return { Authorization: "Bearer " + user.accessToken };
  } else {
    return {};
  }
}
