/* ==========================================================================
   SITE — rendering, navigation and page behaviour
   --------------------------------------------------------------------------
   Every page loads data.js (content), audio.js (players) and this file.
   Only the parts that find their mount point in the page will run, so the
   same file serves index.html, project.html and about.html.

   To add a project you only ever edit data.js — nothing here needs changing.
   ========================================================================== */

(function () {
  "use strict";

  var S = window.SITE;
  if (!S) return;

  /* ------------------------------------------------------------- helpers */

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function clear(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  function bySlug(slug) {
    if (!slug) return null;
    for (var i = 0; i < S.projects.length; i++) {
      if (S.projects[i].slug === slug) return S.projects[i];
    }
    return null;
  }

  function ordered() {
    return S.projects.slice().sort(function (a, b) {
      return (a.order || 0) - (b.order || 0);
    });
  }

  function projectUrl(slug) {
    return "project.html?p=" + encodeURIComponent(slug);
  }

  function pad2(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function isExternal(href) {
    return /^https?:/i.test(href || "");
  }

  function setDescription(text) {
    var m = document.querySelector('meta[name="description"]');
    if (m && text) m.setAttribute("content", text);
  }

  /* ------------------------------------------------------- shared blocks */

  function mediaBlock(project, ratio, opts) {
    opts = opts || {};
    var box = el("div", "media " + (ratio || "media--16x9"));

    if (project.cover) {
      var img = el("img");
      img.src = project.cover;
      img.alt = project.title + " — key art";
      img.loading = opts.eager ? "eager" : "lazy";
      img.decoding = "async";
      box.appendChild(img);
    } else {
      var fb = el("div", "media__fallback");
      fb.appendChild(el("span", "media__fallback-mark", project.category || project.title));
      if (!opts.caption) fb.appendChild(el("span", "media__fallback-title", project.title));
      box.appendChild(fb);
    }

    if (opts.caption) {
      var cap = el("div", "media__caption");
      cap.appendChild(el("span", "media__caption-text", project.title));
      cap.appendChild(
        el("span", "media__caption-meta", [project.category, project.year].filter(Boolean).join(" · "))
      );
      box.appendChild(cap);
    }

    return box;
  }

  function sectionHead(eyebrow, title, aside) {
    var head = el("div", "section-head");
    var left = el("div", "section-head__title");
    if (eyebrow) left.appendChild(el("p", "eyebrow eyebrow--accent eyebrow--bare", eyebrow));
    if (title) left.appendChild(el("h2", "h2 mt-s", title));
    head.appendChild(left);
    if (aside) head.appendChild(el("p", "mono", aside));
    return head;
  }

  function metaBar(items) {
    var bar = el("div", "meta-bar");
    (items || []).forEach(function (it) {
      if (!it || !it.v) return;
      var cell = el("div", "meta-bar__item");
      cell.appendChild(el("div", "meta-bar__label", it.k));
      cell.appendChild(el("div", "meta-bar__value", it.v));
      bar.appendChild(cell);
    });
    return bar;
  }

  function factsList(facts) {
    var ul = el("ul", "facts");
    (facts || []).forEach(function (f) {
      var li = el("li");
      li.appendChild(el("span", "facts__k", f.k));
      li.appendChild(el("span", "facts__v", f.v));
      ul.appendChild(li);
    });
    return ul;
  }

  function linkList(links) {
    var ul = el("ul", "link-list");
    (links || []).forEach(function (l) {
      var li = el("li");
      var a = el("a");
      a.href = l.href;
      if (isExternal(l.href)) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      a.appendChild(el("span", null, l.label));
      a.appendChild(el("span", "link-list__kind", l.kind || "Link"));
      li.appendChild(a);
      ul.appendChild(li);
    });
    return ul;
  }

  function contactLinks() {
    return linkList(
      [{ label: "Email", href: "mailto:" + S.profile.email, kind: "Contact" }].concat(S.profile.links)
    );
  }

  function contactSection(withHead) {
    var s = el("section", "section section--tight");
    s.id = "contact";
    var c = el("div", "container contact-cta reveal");
    if (withHead) c.appendChild(el("p", "eyebrow eyebrow--accent eyebrow--bare is-centered", "Contact"));
    c.appendChild(el("h2", "h2 mt-s", "Let's talk about your game."));
    var mail = el("a", "contact-cta__email", S.profile.email);
    mail.href = "mailto:" + S.profile.email;
    var holder = el("p", "mt-s");
    holder.appendChild(mail);
    c.appendChild(holder);
    c.appendChild(contactLinks());
    s.appendChild(c);
    return s;
  }

  function timelineSection(eyebrow, title, items) {
    var s = el("section", "section");
    var c = el("div", "container");
    c.appendChild(sectionHead(eyebrow, title, null));
    var ul = el("ul", "timeline reveal");
    items.forEach(function (it) {
      var li = el("li", "timeline__item");
      li.appendChild(el("div", "timeline__when", it.when));
      var what = el("div", "timeline__what");
      what.appendChild(el("h3", "h3", it.role));
      what.appendChild(el("p", "timeline__org", it.org));
      what.appendChild(el("p", "timeline__body", it.body));
      if (it.tags && it.tags.length) {
        var chips = el("ul", "chips mt-s");
        it.tags.forEach(function (t) {
          chips.appendChild(el("li", null, t));
        });
        what.appendChild(chips);
      }
      li.appendChild(what);
      ul.appendChild(li);
    });
    c.appendChild(ul);
    s.appendChild(c);
    return s;
  }

  /* -------------------------------------------------------- nav & footer */

  function setupNav() {
    var nav = document.getElementById("nav");
    var toggle = document.getElementById("navToggle");
    var links = document.getElementById("navLinks");

    if (nav) {
      var onScroll = function () {
        nav.classList.toggle("is-stuck", window.scrollY > 24);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    if (!toggle || !links) return;

    var close = function () {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    links.addEventListener("click", function (e) {
      if (e.target && e.target.tagName === "A") close();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("is-open")) close();
    });
  }

  function mountFooter() {
    var year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());

    var list = document.getElementById("footer-links");
    if (!list) return;
    clear(list);
    var items = [{ label: "Email", href: "mailto:" + S.profile.email, kind: "Contact" }].concat(S.profile.links);
    items.forEach(function (l) {
      var li = el("li");
      var a = el("a", null, l.label);
      a.href = l.href;
      if (isExternal(l.href)) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      li.appendChild(a);
      list.appendChild(li);
    });
  }

  /* ---------------------------------------------------------------- home */

  function mountHome() {
    var featuredRoot = document.getElementById("featured-root");
    var listRoot = document.getElementById("project-list");
    var capsRoot = document.getElementById("capabilities-root");
    var contactRoot = document.getElementById("contact-links");

    var projects = ordered();
    if (!projects.length) return;

    var featured = null;
    for (var i = 0; i < projects.length; i++) {
      if (projects[i].featured) { featured = projects[i]; break; }
    }
    if (!featured) featured = projects[0];

    /* --- featured --- */
    if (featuredRoot) {
      clear(featuredRoot);

      var link = el("a", "card__link");
      link.href = projectUrl(featured.slug);
      link.appendChild(mediaBlock(featured, "media--21x9", { caption: true, eager: true }));
      featuredRoot.appendChild(link);

      var split = el("div", "split mt-l");

      var aside = el("div", "split__aside");
      aside.appendChild(el("h2", "h2", featured.title));
      if (featured.tagline) aside.appendChild(el("p", "lede mt-s", featured.tagline));
      if (featured.credit) aside.appendChild(el("p", "card__credit mt-s", featured.credit));

      var actions = el("div", "hero__actions");
      var cta = el("a", "btn btn--solid", "Read the case study");
      cta.href = projectUrl(featured.slug);
      actions.appendChild(cta);

      var listen = el("a", "link-arrow", "Listen to the audio");
      listen.href = projectUrl(featured.slug) + "#audio";
      listen.appendChild(el("i"));
      actions.appendChild(listen);
      aside.appendChild(actions);
      split.appendChild(aside);

      var body = el("div", "prose");
      (featured.overview || []).slice(0, 2).forEach(function (p) {
        body.appendChild(el("p", null, p));
      });
      if (featured.tools && featured.tools.length) {
        var chips = el("ul", "chips mt-m");
        featured.tools.forEach(function (t) {
          chips.appendChild(el("li", null, t));
        });
        body.appendChild(chips);
      }
      split.appendChild(body);

      featuredRoot.appendChild(split);
    }

    /* --- everything else --- */
    if (listRoot) {
      clear(listRoot);
      projects
        .filter(function (p) { return p !== featured; })
        .forEach(function (p, idx) {
          var li = el("li", "project-row");
          var a = el("a", "project-row__link");
          a.href = projectUrl(p.slug);

          a.appendChild(el("span", "project-row__index", pad2(idx + 1)));

          var mid = el("div");
          mid.appendChild(el("div", "project-row__title", p.title));
          if (p.subtitle) mid.appendChild(el("div", "project-row__sub", p.subtitle));
          a.appendChild(mid);

          a.appendChild(el("p", "project-row__desc", p.shortDescription || p.tagline || ""));

          var arrow = el("span", "project-row__arrow", "\u2192");
          arrow.setAttribute("aria-hidden", "true");
          a.appendChild(arrow);

          li.appendChild(a);
          listRoot.appendChild(li);
        });
    }

    /* --- capabilities --- */
    if (capsRoot) {
      clear(capsRoot);
      (S.capabilities || []).forEach(function (c, idx) {
        var item = el("div", "capability");
        item.appendChild(el("span", "capability__index", pad2(idx + 1)));
        item.appendChild(el("h3", "h4 capability__title", c.title));
        item.appendChild(el("p", "capability__body", c.body));
        capsRoot.appendChild(item);
      });
    }

    /* --- contact --- */
    if (contactRoot) {
      clear(contactRoot);
      var links = contactLinks();
      while (links.firstChild) contactRoot.appendChild(links.firstChild);
    }
  }

  /* ------------------------------------------------------------- project */

  function vimeoEmbed(url) {
    var m = String(url || "").match(/(\d{6,})/);
    return m ? "https://player.vimeo.com/video/" + m[1] + "?title=0&byline=0&portrait=0" : null;
  }

  function notFound(root) {
    var s = el("section", "section page");
    var c = el("div", "container container--read");
    c.appendChild(el("p", "eyebrow eyebrow--accent", "Not found"));
    c.appendChild(el("h1", "h1 mt-s", "This project could not be found."));
    c.appendChild(el("p", "lede mt-m", "The link may be out of date, or the project may have been renamed."));
    var actions = el("div", "hero__actions mt-m");
    var a = el("a", "btn btn--solid", "See all work");
    a.href = "index.html#work";
    actions.appendChild(a);
    c.appendChild(actions);
    s.appendChild(c);
    root.appendChild(s);
    document.title = "Not found — " + S.meta.shortName;
  }

  function mountProject() {
    var root = document.getElementById("project-root");
    if (!root) return;

    var slug = null;
    try {
      slug = new URLSearchParams(window.location.search).get("p");
    } catch (e) {
      slug = null;
    }

    var project = bySlug(slug);
    if (!project) {
      notFound(root);
      return;
    }

    document.title = project.title + " — " + S.meta.shortName;
    setDescription(project.shortDescription);

    var projects = ordered();
    var idx = projects.indexOf(project);
    var next = projects.length > 1 ? projects[(idx + 1) % projects.length] : null;

    /* --- hero --- */
    var hero = el("article", "project-hero");
    hero.appendChild(el("div", "project-hero__glow"));
    var hc = el("div", "container reveal");

    hc.appendChild(
      el("p", "eyebrow eyebrow--accent", [project.category, project.year].filter(Boolean).join(" · "))
    );
    hc.appendChild(el("h1", "h1 project-hero__title", project.title));
    if (project.shortDescription) {
      hc.appendChild(el("p", "lede project-hero__lede", project.shortDescription));
    }

    hc.appendChild(
      metaBar([
        { k: "Role", v: project.role },
        { k: "Year", v: project.year },
        { k: "Category", v: project.category },
        { k: "Credit", v: project.credit },
      ])
    );

    var heroMedia = el("div", "project-hero__media");
    heroMedia.appendChild(mediaBlock(project, "media--21x9", { caption: true, eager: true }));
    hc.appendChild(heroMedia);

    hero.appendChild(hc);
    root.appendChild(hero);

    /* --- overview --- */
    if (project.overview && project.overview.length) {
      var s1 = el("section", "section");
      var c1 = el("div", "container split reveal");
      var a1 = el("div", "split__aside");
      a1.appendChild(el("p", "eyebrow eyebrow--accent eyebrow--bare", "Overview"));
      a1.appendChild(el("h2", "h3 mt-s", project.subtitle || project.category));
      if (project.facts && project.facts.length) a1.appendChild(factsList(project.facts));
      c1.appendChild(a1);

      var b1 = el("div", "prose");
      project.overview.forEach(function (p) {
        b1.appendChild(el("p", null, p));
      });
      c1.appendChild(b1);
      s1.appendChild(c1);
      root.appendChild(s1);
    }

    /* --- audio --- */
    var groups = (project.audio && project.audio.groups) || [];
    var s2 = el("section", "section");
    s2.id = "audio";
    var c2 = el("div", "container");
    c2.appendChild(
      sectionHead("Audio", "Listening room", groups.length ? totalSamples(groups) + " samples" : "")
    );

    if (project.audioNote) c2.appendChild(el("p", "audio-group__note", project.audioNote));

    if (groups.length) {
      var nav = el("ul", "audio-nav mt-m");
      groups.forEach(function (g) {
        var li = el("li");
        var a = el("a", null, g.title);
        a.href = "#audio-" + g.key;
        li.appendChild(a);
        nav.appendChild(li);
      });
      c2.appendChild(nav);
    }

    var audioMount = el("div", "mt-l reveal");
    c2.appendChild(audioMount);
    s2.appendChild(c2);
    root.appendChild(s2);

    if (window.AudioPlayers) {
      window.AudioPlayers.mountProjectAudio(audioMount, project);
    }

    /* --- contributions --- */
    if (project.contributions && project.contributions.length) {
      var s3 = el("section", "section");
      s3.id = "role";
      var c3 = el("div", "container split reveal");
      var a3 = el("div", "split__aside");
      a3.appendChild(el("p", "eyebrow eyebrow--accent eyebrow--bare", "What I did"));
      a3.appendChild(el("h2", "h3 mt-s", "Contributions"));
      if (project.tools && project.tools.length) {
        var toolChips = el("ul", "chips mt-m");
        project.tools.forEach(function (t) {
          toolChips.appendChild(el("li", null, t));
        });
        a3.appendChild(toolChips);
      }
      c3.appendChild(a3);

      var ul3 = el("ul", "contribution-list");
      project.contributions.forEach(function (text) {
        var li = el("li");
        li.innerHTML = text;
        ul3.appendChild(li);
      });
      c3.appendChild(ul3);
      s3.appendChild(c3);
      root.appendChild(s3);
    }

    /* --- footage & stills --- */
    var mediaPieces = [];

    if (project.video) {
      var embedUrl = vimeoEmbed(project.video);
      if (embedUrl) {
        var box = el("div", "embed");
        var iframe = document.createElement("iframe");
        iframe.src = embedUrl;
        iframe.title = project.title + " — gameplay";
        iframe.loading = "lazy";
        iframe.allow = "fullscreen; picture-in-picture";
        iframe.setAttribute("allowfullscreen", "");
        box.appendChild(iframe);
        mediaPieces.push(box);
      }
    }

    if (project.gallery && project.gallery.length) {
      var gal = el("div", "gallery mt-l");
      project.gallery.forEach(function (item) {
        var fig = el("figure");
        fig.appendChild(
          mediaBlock(
            {
              title: item.caption || project.title,
              category: project.category,
              year: project.year,
              cover: item.src || "",
            },
            "media--16x9",
            {}
          )
        );
        if (item.caption) fig.appendChild(el("figcaption", null, item.caption));
        gal.appendChild(fig);
      });
      mediaPieces.push(gal);
    }

    if (mediaPieces.length) {
      var s4 = el("section", "section section--tight");
      var c4 = el("div", "container");
      c4.appendChild(sectionHead("In context", "Footage & stills", null));
      mediaPieces.forEach(function (piece) {
        c4.appendChild(piece);
      });
      s4.appendChild(c4);
      root.appendChild(s4);
    }

    /* --- credits & links --- */
    var hasCredits = project.credits && project.credits.length;
    var hasLinks = project.links && project.links.length;

    if (hasCredits || hasLinks) {
      var s5 = el("section", "section section--tight");
      var c5 = el("div", "container split reveal");
      var a5 = el("div", "split__aside");
      a5.appendChild(el("p", "eyebrow eyebrow--accent eyebrow--bare", "Credits & links"));
      c5.appendChild(a5);

      var b5 = el("div");
      if (hasCredits) {
        var bar = el("div", "meta-bar");
        project.credits.forEach(function (cr) {
          var cell = el("div", "meta-bar__item");
          cell.appendChild(el("div", "meta-bar__label", cr.role));
          cell.appendChild(el("div", "meta-bar__value", (cr.names || []).join(", ")));
          bar.appendChild(cell);
        });
        b5.appendChild(bar);
      }
      if (hasLinks) b5.appendChild(linkList(project.links));
      c5.appendChild(b5);
      s5.appendChild(c5);
      root.appendChild(s5);
    }

    /* --- next project --- */
    if (next && next !== project) {
      var np = el("a", "next-project");
      np.href = projectUrl(next.slug);
      var npi = el("div", "container next-project__inner");
      var t = el("div");
      t.appendChild(el("p", "eyebrow eyebrow--accent eyebrow--bare", "Next project"));
      t.appendChild(el("p", "next-project__title mt-s", next.title));
      npi.appendChild(t);
      var arrow = el("span", "project-row__arrow", "\u2192");
      arrow.setAttribute("aria-hidden", "true");
      npi.appendChild(arrow);
      np.appendChild(npi);
      root.appendChild(np);
    }
  }

  function totalSamples(groups) {
    var n = 0;
    groups.forEach(function (g) {
      n += (g.tracks || []).length;
    });
    return n;
  }

  /* --------------------------------------------------------------- about */

  function initials(name) {
    return String(name || "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(function (w) { return w.charAt(0).toUpperCase(); })
      .join("");
  }

  function mountAbout() {
    var root = document.getElementById("about-root");
    if (!root) return;

    var A = S.about || {};

    /* --- header --- */
    var hero = el("header", "project-hero");
    hero.appendChild(el("div", "project-hero__glow"));
    var hc = el("div", "container reveal");
    hc.appendChild(el("p", "eyebrow eyebrow--accent", "About"));
    hc.appendChild(el("h1", "h1 project-hero__title", S.profile.name));
    hc.appendChild(el("p", "lede project-hero__lede", S.profile.intro));
    hc.appendChild(
      metaBar([
        { k: "Title", v: S.profile.title },
        { k: "Also", v: S.profile.secondary },
        { k: "Based in", v: S.profile.location },
      ])
    );
    hero.appendChild(hc);
    root.appendChild(hero);

    /* --- profile --- */
    var s1 = el("section", "section");
    var c1 = el("div", "container about-grid reveal");
    var aside = el("div");

    var portrait = el("div", "about-portrait");
    portrait.appendChild(el("span", "about-portrait__initials", initials(S.profile.name)));
    aside.appendChild(portrait);

    if (A.facts && A.facts.length) aside.appendChild(factsList(A.facts));

    if (A.cv && A.cv.file) {
      var cvWrap = el("p", "mt-m");
      var cv = el("a", "btn btn--solid", A.cv.label || "Download CV");
      cv.href = A.cv.file;
      cv.setAttribute("download", "");
      cvWrap.appendChild(cv);
      aside.appendChild(cvWrap);
    }
    c1.appendChild(aside);

    var body = el("div");
    var prose = el("div", "prose");
    (A.paragraphs || []).forEach(function (p) {
      prose.appendChild(el("p", null, p));
    });
    body.appendChild(prose);

    var links = contactLinks();
    links.classList.add("mt-m");
    body.appendChild(links);
    c1.appendChild(body);

    s1.appendChild(c1);
    root.appendChild(s1);

    /* --- experience & education --- */
    if (A.experience && A.experience.length) {
      root.appendChild(timelineSection("Experience", "Where I have worked", A.experience));
    }
    if (A.education && A.education.length) {
      root.appendChild(timelineSection("Education", "Academic background", A.education));
    }

    /* --- skills --- */
    if (A.skills && A.skills.length) {
      var s2 = el("section", "section");
      var c2 = el("div", "container");
      c2.appendChild(sectionHead("Skills", "Tools & capabilities", null));
      var grid = el("div", "skill-groups reveal");
      A.skills.forEach(function (g) {
        var d = el("div", "skill-group");
        d.appendChild(el("p", "skill-group__title", g.title));
        var ul = el("ul");
        (g.items || []).forEach(function (t) {
          ul.appendChild(el("li", g.focus ? "is-focus" : null, t));
        });
        d.appendChild(ul);
        grid.appendChild(d);
      });
      c2.appendChild(grid);
      s2.appendChild(c2);
      root.appendChild(s2);
    }

    /* --- awards --- */
    if (A.awards && A.awards.length) {
      var s3 = el("section", "section section--tight");
      var c3 = el("div", "container");
      c3.appendChild(sectionHead("Awards", "Recognition", null));
      var box = el("div", "reveal");
      A.awards.forEach(function (a) {
        var item = el("div", "award-item");
        var left = el("div");
        left.appendChild(el("p", "award-item__title", a.title));
        left.appendChild(el("p", "award-item__org", a.org));
        if (a.body) left.appendChild(el("p", "timeline__body mt-s", a.body));
        item.appendChild(left);
        item.appendChild(el("span", "award-item__year", a.year));
        box.appendChild(item);
      });
      c3.appendChild(box);
      s3.appendChild(c3);
      root.appendChild(s3);
    }

    /* --- contact --- */
    root.appendChild(contactSection(true));
  }

  /* ---------------------------------------------------------- behaviour */

  function setupReveal() {
    var nodes = document.querySelectorAll(".reveal");
    if (!nodes.length) return;

    if (!("IntersectionObserver" in window)) {
      for (var i = 0; i < nodes.length; i++) nodes[i].classList.add("is-visible");
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.04 }
    );

    for (var j = 0; j < nodes.length; j++) io.observe(nodes[j]);
  }

  function startMeters() {
    if (!window.AudioPlayers || !window.AudioPlayers.startMeterLoop) return;
    window.AudioPlayers.startMeterLoop(function () {
      return document.querySelectorAll(".track.is-active .track__meter");
    });
  }

  function boot() {
    setupNav();
    mountFooter();
    mountHome();
    mountProject();
    mountAbout();
    setupReveal();
    startMeters();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
