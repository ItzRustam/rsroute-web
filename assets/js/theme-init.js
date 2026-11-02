/* Runs before first paint so the correct theme is applied without a flash. */
(function () {
  "use strict";
  var theme = null;
  try {
    theme = window.localStorage.getItem("rsroute-theme");
  } catch (e) {
    theme = null;
  }
  if (theme !== "light" && theme !== "dark") {
    theme =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  }
  document.documentElement.setAttribute("data-theme", theme);
})();
