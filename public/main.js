const clerkPublishableKey =
  "pk_test_cmVsYXhpbmctZ29waGVyLTkuY2xlcmsuYWNjb3VudHMuZGV2JA";
const frontendApi = "relaxing-gopher-9.clerk.accounts.dev";
const version = "@latest";

const startClerk = async () => {
  const Clerk = window.Clerk;

  try {
    await Clerk.load();

    const userButton = document.getElementById("user-button");
    const authLinks = document.getElementById("auth-links");

    Clerk.addListener(({ user }) => {
      authLinks.style.display = user ? "none" : "block";
    });

    if (Clerk.user) {
      Clerk.mountUserButton(userButton);
      userButton.style.margin = "auto";
    }
  } catch (err) {
    console.error("Error starting Clerk: ", err);
  }
};

(() => {
  const script = document.createElement("script");
  script.setAttribute("data-clerk-publishable-key", clerkPublishableKey);
  script.async = true;
  script.src = `https://${frontendApi}/npm/@clerk/clerk-js${version}/dist/clerk.browser.js`;
  script.crossOrigin = "anonymous";
  script.addEventListener("load", startClerk);
  script.addEventListener("error", () => {
    document.getElementById("no-frontend-api-warning").hidden = false;
  });
  document.body.appendChild(script);
})();
