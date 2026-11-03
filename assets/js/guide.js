/* ==========================================================================
   RSRoute — guide pages
   Sidebar scroll-spy + copy buttons. Vanilla JS, no dependencies.
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------------ */
  /* Sidebar scroll-spy                                                 */
  /* ------------------------------------------------------------------ */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll(".guide-nav a[href^='#']")
  );

  if (navLinks.length && "IntersectionObserver" in window) {
    var targets = navLinks
      .map(function (link) {
        var id = link.getAttribute("href").slice(1);
        var el = document.getElementById(id);
        return el ? { link: link, el: el } : null;
      })
      .filter(Boolean);

    var setActive = function (activeLink) {
      navLinks.forEach(function (link) {
        var on = link === activeLink;
        link.classList.toggle("is-active", on);
        if (on) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    };

    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var match = targets.filter(function (t) {
            return t.el === entry.target;
          })[0];
          if (match) setActive(match.link);
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    targets.forEach(function (t) {
      spy.observe(t.el);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Copy-to-clipboard on code blocks                                   */
  /* ------------------------------------------------------------------ */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll(".guide-content .code-wrap").forEach(function (wrap) {
    var pre = wrap.querySelector("pre");
    if (!pre) return;

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "copy-btn";
    btn.textContent = "Copy";
    btn.setAttribute("aria-label", "Copy code to clipboard");

    btn.addEventListener("click", function () {
      var text = pre.innerText;

      var done = function (ok) {
        btn.textContent = ok ? "Copied" : "Failed";
        btn.classList.toggle("is-done", ok);
        window.setTimeout(function () {
          btn.textContent = "Copy";
          btn.classList.remove("is-done");
        }, 1600);
      };

      // Fallback for non-secure contexts (file://, plain http on a LAN IP)
      // and for browsers that expose the API but reject the write.
      var legacyCopy = function () {
        try {
          var ta = document.createElement("textarea");
          ta.value = text;
          ta.setAttribute("readonly", "");
          ta.style.position = "fixed";
          ta.style.top = "-1000px";
          document.body.appendChild(ta);
          ta.select();
          var ok = document.execCommand("copy");
          document.body.removeChild(ta);
          done(ok);
        } catch (e) {
          done(false);
        }
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () {
            done(true);
          },
          legacyCopy
        );
      } else {
        legacyCopy();
      }
    });

    wrap.appendChild(btn);
  });

  /* ------------------------------------------------------------------ */
  /* Smooth in-page anchors (respect reduced motion)                    */
  /* ------------------------------------------------------------------ */
  document.querySelectorAll(".guide-nav a[href^='#']").forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href").slice(1);
      var el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      if (history.replaceState) history.replaceState(null, "", "#" + id);
    });
  });
})();
