/* ==========================================================================
   AUDIO — engine + player components
   --------------------------------------------------------------------------
   A single hidden <audio> element drives every player on the page, which is
   what guarantees that only one sample can ever play at a time. Components
   subscribe to engine events and ignore anything that isn't their own track.

   Audio is never autoplayed: playback only starts from a user click.
   ========================================================================== */

(function () {
  "use strict";

  /* ---------------------------------------------------------------- engine */

  var el = document.createElement("audio");
  el.preload = "none";
  el.setAttribute("aria-hidden", "true");
  el.style.display = "none";
  document.body.appendChild(el);

  var handlers = {};
  var currentId = null;
  var meterReady = false;
  var meterBroken = false;
  var ctx = null;
  var analyser = null;
  var levels = null;

  function on(evt, fn) {
    (handlers[evt] = handlers[evt] || []).push(fn);
  }

  function emit(evt, payload) {
    var list = handlers[evt];
    if (!list) return;
    for (var i = 0; i < list.length; i++) {
      try { list[i](payload); } catch (e) { /* one bad subscriber must not stop the rest */ }
    }
  }

  function duration() {
    return isFinite(el.duration) ? el.duration : 0;
  }

  el.addEventListener("loadedmetadata", function () {
    emit("loaded", { id: currentId, duration: duration() });
  });

  el.addEventListener("durationchange", function () {
    emit("loaded", { id: currentId, duration: duration() });
  });

  el.addEventListener("timeupdate", function () {
    emit("time", { id: currentId, current: el.currentTime, duration: duration() });
  });

  el.addEventListener("play", function () { emit("play", { id: currentId }); });
  el.addEventListener("playing", function () { emit("playing", { id: currentId }); });
  el.addEventListener("pause", function () { emit("pause", { id: currentId }); });
  el.addEventListener("waiting", function () { emit("loading", { id: currentId }); });
  el.addEventListener("seeking", function () { emit("loading", { id: currentId }); });
  el.addEventListener("seeked", function () { emit("playing", { id: currentId }); });

  el.addEventListener("ended", function () {
    emit("pause", { id: currentId });
    emit("ended", { id: currentId });
  });

  el.addEventListener("error", function () {
    emit("error", { id: currentId, code: el.error ? el.error.code : 0 });
  });

  /* Live spectrum meter. Wrapped defensively: if the browser refuses to route
     the media element through Web Audio, playback still works normally and the
     meter is simply never shown. */
  function ensureMeter() {
    if (meterReady) return true;
    if (meterBroken) return false;
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) { meterBroken = true; return false; }

      if (!ctx) ctx = new AC();

      if (!analyser) {
        var src = ctx.createMediaElementSource(el);
        analyser = ctx.createAnalyser();
        analyser.fftSize = 64;
        analyser.smoothingTimeConstant = 0.76;
        src.connect(analyser);
        analyser.connect(ctx.destination);
        levels = new Uint8Array(analyser.frequencyBinCount);
      }

      if (ctx.state === "suspended") ctx.resume();
      meterReady = true;
      return true;
    } catch (e) {
      meterBroken = true;
      meterReady = false;
      return false;
    }
  }

  function readLevels() {
    if (!meterReady || !analyser) return null;
    analyser.getByteFrequencyData(levels);
    return levels;
  }

  var Engine = {
    /* Start (or restart) a track. `src` is only re-assigned when it changes,
       so pausing and resuming never causes a reload. */
    play: function (id, src) {
      if (currentId !== id || el.getAttribute("data-src") !== src) {
        currentId = id;
        el.setAttribute("data-src", src);
        el.src = src;
        el.load();
      }
      ensureMeter();
      var p = el.play();
      if (p && typeof p.catch === "function") {
        p.catch(function () { emit("error", { id: currentId, code: -1 }); });
      }
    },

    pause: function () {
      el.pause();
    },

    toggle: function (id, src) {
      if (currentId === id && !el.paused) {
        el.pause();
      } else {
        Engine.play(id, src);
      }
    },

    seek: function (seconds) {
      if (!isFinite(el.duration)) return;
      el.currentTime = Math.max(0, Math.min(seconds, el.duration));
    },

    /* Swap the source of the currently loaded track without losing the
       playhead — used by the A/B player. */
    swapSource: function (src) {
      var at = el.currentTime;
      var wasPlaying = !el.paused && currentId !== null;
      el.setAttribute("data-src", src);
      el.src = src;
      el.load();

      var restore = function () {
        var end = duration();
        if (end && at < end) el.currentTime = at;
        el.removeEventListener("loadedmetadata", restore);
        if (wasPlaying) {
          var p = el.play();
          if (p && typeof p.catch === "function") p.catch(function () {});
        }
      };
      el.addEventListener("loadedmetadata", restore);
      emit("loading", { id: currentId });
    },

    currentId: function () { return currentId; },
    currentTime: function () { return el.currentTime; },
    duration: duration,
    isPlaying: function () { return currentId !== null && !el.paused; },
    on: on,
    levels: readLevels,
    hasMeter: function () { return meterReady; },
    /* Called once by the page to warm the audio graph inside a user gesture. */
    prime: ensureMeter,
  };

  /* --------------------------------------------------------------- helpers */

  function formatTime(seconds) {
    if (!isFinite(seconds) || seconds < 0) return "0:00";
    var m = Math.floor(seconds / 60);
    var s = Math.floor(seconds % 60);
    return m + ":" + (s < 10 ? "0" : "") + s;
  }

  var ICON_PLAY = '<svg class="icon icon--play" viewBox="0 0 12 14" aria-hidden="true"><path d="M1 .8l10.2 6.2L1 13.2z"/></svg>';
  var ICON_PAUSE = '<svg class="icon icon--pause" viewBox="0 0 12 14" aria-hidden="true"><path d="M0 0h4.2v14H0zM7.8 0H12v14H7.8z"/></svg>';

  function el_(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  var METER_BARS = 26;

  function buildBar(onSeek) {
    var bar = el_("div", "track__bar");
    bar.setAttribute("role", "slider");
    bar.setAttribute("tabindex", "0");
    bar.setAttribute("aria-label", "Seek");
    bar.setAttribute("aria-valuemin", "0");
    bar.setAttribute("aria-valuemax", "100");
    bar.setAttribute("aria-valuenow", "0");

    var fill = el_("div", "track__fill");
    var handle = el_("div", "track__handle");
    bar.appendChild(fill);
    bar.appendChild(handle);

    var dragging = false;

    function ratioFromEvent(e) {
      var r = bar.getBoundingClientRect();
      if (!r.width) return 0;
      return Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    }

    bar.addEventListener("pointerdown", function (e) {
      dragging = true;
      bar.classList.add("is-scrubbing");
      if (bar.setPointerCapture) { try { bar.setPointerCapture(e.pointerId); } catch (err) {} }
      onSeek(ratioFromEvent(e));
    });

    bar.addEventListener("pointermove", function (e) {
      if (dragging) onSeek(ratioFromEvent(e));
    });

    function endDrag() {
      dragging = false;
      bar.classList.remove("is-scrubbing");
    }
    bar.addEventListener("pointerup", endDrag);
    bar.addEventListener("pointercancel", endDrag);
    bar.addEventListener("lostpointercapture", endDrag);

    bar.addEventListener("keydown", function (e) {
      var step = e.shiftKey ? 10 : 5;
      var d = Engine.duration();
      if (e.key === "ArrowRight") { onSeek(null, Engine.currentTime() + step); e.preventDefault(); }
      else if (e.key === "ArrowLeft") { onSeek(null, Engine.currentTime() - step); e.preventDefault(); }
      else if (e.key === "Home") { onSeek(0); e.preventDefault(); }
      else if (e.key === "End") { onSeek(d ? 0.999 : 0); e.preventDefault(); }
      else if (e.key === " " || e.key === "Enter") {
        var p = bar.closest(".track, .ab");
        var btn = p && p.querySelector(".track__play, .ab__play");
        if (btn) { btn.click(); e.preventDefault(); }
      }
    });

    return { node: bar, fill: fill, handle: handle };
  }

  /* ------------------------------------------------------ track row render */

  function mountTrackRow(track, src, id, index) {
    var row = el_("div", "track");
    row.dataset.trackId = id;

    var btn = el_("button", "track__play");
    btn.type = "button";
    btn.innerHTML = ICON_PLAY + ICON_PAUSE;
    btn.setAttribute("aria-label", "Play " + track.title);
    row.appendChild(btn);

    var main = el_("div", "track__main");
    var top = el_("div", "track__top");
    top.appendChild(el_("span", "track__title", track.title));
    var time = el_("span", "track__time", "0:00 / 0:00");
    top.appendChild(time);
    main.appendChild(top);

    if (track.desc) main.appendChild(el_("p", "track__desc", track.desc));

    if (track.tags && track.tags.length) {
      var tags = el_("div", "track__tags");
      track.tags.forEach(function (t) { tags.appendChild(el_("span", "tag", t)); });
      main.appendChild(tags);
    }

    var lastSeek = null;

    var bar = buildBar(function (ratio, absolute) {
      var d = Engine.duration();
      if (absolute != null) { Engine.seek(absolute); return; }
      if (ratio == null) return;
      if (d) Engine.seek(ratio * d);
      paint(ratio);
      lastSeek = ratio;
    });
    main.appendChild(bar.node);

    var meter = el_("div", "track__meter");
    for (var i = 0; i < METER_BARS; i++) meter.appendChild(el_("i"));
    main.appendChild(meter);

    var status = el_("p", "track__status");
    main.appendChild(status);

    row.appendChild(main);

    function paint(ratio) {
      var pct = Math.max(0, Math.min(1, ratio)) * 100;
      bar.fill.style.width = pct + "%";
      bar.handle.style.left = pct + "%";
      bar.node.setAttribute("aria-valuenow", String(Math.round(pct)));
    }

    function reset() {
      row.classList.remove("is-active", "is-playing", "is-loading", "is-error");
      paint(0);
      time.textContent = "0:00 / 0:00";
      status.textContent = "";
      var bars = meter.children;
      for (var j = 0; j < bars.length; j++) bars[j].style.height = "2px";
    }

    btn.addEventListener("click", function () {
      Engine.prime();
      if (Engine.currentId() === id && Engine.isPlaying()) {
        Engine.pause();
      } else {
        row.classList.add("is-loading");
        Engine.play(id, src);
      }
    });

    on("loaded", function (p) {
      if (p.id !== id) return;
      var d = p.duration || 0;
      time.textContent = formatTime(lastSeek != null ? lastSeek * d : 0) + " / " + formatTime(d);
      if (lastSeek != null && d) Engine.seek(lastSeek * d);
      lastSeek = null;
    });

    on("time", function (p) {
      if (p.id !== id) return;
      var d = p.duration || 0;
      var r = d ? p.current / d : 0;
      paint(r);
      time.textContent = formatTime(p.current) + " / " + formatTime(d);
    });

    on("play", function (p) {
      if (p.id !== id) return;
      row.classList.add("is-active", "is-playing");
      row.classList.remove("is-loading", "is-error");
      btn.setAttribute("aria-label", "Pause " + track.title);
    });

    on("playing", function (p) {
      if (p.id !== id) return;
      row.classList.remove("is-loading", "is-error");
      row.classList.add("is-playing");
    });

    on("loading", function (p) {
      if (p.id !== id) return;
      row.classList.add("is-loading");
    });

    on("pause", function (p) {
      if (p.id !== id) return;
      row.classList.remove("is-playing");
      btn.setAttribute("aria-label", "Play " + track.title);
    });

    on("error", function (p) {
      if (p.id !== id) return;
      row.classList.remove("is-loading", "is-playing");
      row.classList.add("is-error");
      status.className = "track__status";
      status.textContent = "Could not load this audio file.";
    });

    return { node: row, reset: reset, trackId: id, isActive: function () { return Engine.currentId() === id; } };
  }

  /* --------------------------------------------------------- A/B component */

  function mountAB(track, idBase) {
    var variants = track.ab.variants;
    var root = el_("div", "ab");

    var head = el_("div", "ab__head");
    var headText = el_("div");
    headText.appendChild(el_("p", "ab__title", track.title));
    if (track.desc) headText.appendChild(el_("p", "ab__desc", track.desc));
    head.appendChild(headText);

    var sw = el_("div", "ab__switch");
    sw.setAttribute("role", "group");
    sw.setAttribute("aria-label", track.ab.label || "Variant");
    head.appendChild(sw);
    root.appendChild(head);

    if (track.tags && track.tags.length) {
      var tags = el_("div", "track__tags");
      track.tags.forEach(function (t) { tags.appendChild(el_("span", "tag", t)); });
      root.appendChild(tags);
    }

    var active = 0;

    var variantBtns = variants.map(function (v, i) {
      var b = el_("button", "ab__btn", v.name);
      b.type = "button";
      b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
      b.addEventListener("click", function () {
        if (i === active) return;
        setActive(i, true);
      });
      sw.appendChild(b);
      return b;
    });

    var transport = el_("div", "ab__transport");
    transport.style.marginTop = "1.35rem";

    var play = el_("button", "ab__play");
    play.type = "button";
    play.innerHTML = ICON_PLAY + ICON_PAUSE;
    play.setAttribute("aria-label", "Play " + track.title);
    transport.appendChild(play);

    var progress = el_("div", "ab__progress");
    var lastSeek = null;

    var bar = buildBar(function (ratio, absolute) {
      var d = Engine.duration();
      if (absolute != null) { Engine.seek(absolute); return; }
      if (ratio == null) return;
      if (d) Engine.seek(ratio * d);
      paint(ratio);
      lastSeek = ratio;
    });
    progress.appendChild(bar.node);

    var time = el_("span", "track__time", "0:00 / 0:00");
    time.style.display = "block";
    time.style.marginTop = "0.5rem";
    progress.appendChild(time);
    transport.appendChild(progress);

    root.appendChild(transport);

    var caption = el_("p", "ab__caption", variants[0].name);
    root.appendChild(caption);

    var status = el_("p", "track__status");
    root.appendChild(status);

    function currentVariant() { return variants[active]; }
    function id() { return idBase + ":" + active; }

    function setActive(i, keepPlaying) {
      active = i;
      variantBtns.forEach(function (b, n) {
        b.setAttribute("aria-pressed", n === i ? "true" : "false");
      });
      caption.textContent = variants[i].name;

      if (keepPlaying) {
        var wasActive = root.classList.contains("is-active");
        if (wasActive) {
          Engine.swapSource(variants[i].file);
        }
      }
      status.textContent = "";
      root.classList.remove("is-error");
    }

    function paint(ratio) {
      var pct = Math.max(0, Math.min(1, ratio)) * 100;
      bar.fill.style.width = pct + "%";
      bar.handle.style.left = pct + "%";
      bar.node.setAttribute("aria-valuenow", String(Math.round(pct)));
    }

    play.addEventListener("click", function () {
      Engine.prime();
      var v = currentVariant();
      if (Engine.currentId() === id() && Engine.isPlaying()) {
        Engine.pause();
      } else {
        Engine.play(id(), v.file);
      }
    });

    on("loaded", function (p) {
      if (p.id !== Engine.currentId()) return;
      if (!root.classList.contains("is-active")) return;
      var d = p.duration || 0;
      if (lastSeek != null && d) { Engine.seek(lastSeek * d); lastSeek = null; }
    });

    on("time", function (p) {
      if (p.id !== id()) return;
      var d = p.duration || 0;
      paint(d ? p.current / d : 0);
      time.textContent = formatTime(p.current) + " / " + formatTime(d);
    });

    on("play", function (p) {
      if (p.id !== id()) return;
      root.classList.add("is-active", "is-playing");
      root.classList.remove("is-error");
      play.setAttribute("aria-label", "Pause " + track.title);
      bar.node.setAttribute("aria-label", "Seek — " + currentVariant().name);
    });

    on("pause", function (p) {
      if (p.id !== id()) return;
      root.classList.remove("is-playing");
      play.setAttribute("aria-label", "Play " + track.title);
    });

    on("error", function (p) {
      if (p.id !== id()) return;
      root.classList.remove("is-playing");
      root.classList.add("is-error");
      status.textContent = "Could not load this audio file.";
    });

    return { node: root, trackId: idBase, isActive: function () { return root.classList.contains("is-active"); } };
  }

  /* ------------------------------------------------------------ public API */

  /* Render one audio group (heading + note + rows). */
  function mountGroup(group, projectSlug) {
    var wrap = el_("section", "audio-group");
    wrap.id = "audio-" + group.key;

    var head = el_("div", "audio-group__head");
    head.appendChild(el_("h3", "audio-group__title", group.title));
    head.appendChild(el_("span", "audio-group__count", group.tracks.length + " samples"));
    wrap.appendChild(head);

    if (group.note) wrap.appendChild(el_("p", "audio-group__note", group.note));

    var players = [];

    group.tracks.forEach(function (t, i) {
      var base = projectSlug + "/" + group.key + "/" + i;
      if (t.ab && t.ab.variants && t.ab.variants.length > 1) {
        var ab = mountAB(t, base);
        wrap.appendChild(ab.node);
        players.push(ab);
      } else {
        var row = mountTrackRow(t, t.file, base, i);
        wrap.appendChild(row.node);
        players.push(row);
      }
    });

    return { node: wrap, players: players };
  }

  /* Render every group in a project. Returns a controller. */
  function mountProjectAudio(container, project) {
    container.innerHTML = "";
    var groups = (project.audio && project.audio.groups) || [];

    if (!groups.length) {
      var empty = el_("p", "tracks-empty");
      empty.textContent =
        project.audio && project.audio.emptyMessage
          ? project.audio.emptyMessage
          : "Audio samples for this project are being prepared and will appear here.";
      container.appendChild(empty);
      return { players: [], groups: [] };
    }

    var all = [];
    groups.forEach(function (g) {
      var mounted = mountGroup(g, project.slug);
      container.appendChild(mounted.node);
      all = all.concat(mounted.players);
    });

    return { players: all, groups: groups };
  }

  /* Drives the live meter bars on whichever player is currently active. */
  function startMeterLoop(getActiveRows) {
    var raf = null;
    var last = 0;

    function frame(ts) {
      raf = requestAnimationFrame(frame);
      if (ts - last < 55) return;
      last = ts;

      var rows = getActiveRows();
      if (!rows.length) return;

      var data = Engine.levels();
      if (!data) return;

      var bars = [];
      rows.forEach(function (r) {
        var m = r.querySelectorAll(".track__meter i");
        for (var i = 0; i < m.length; i++) bars.push(m[i]);
      });
      if (!bars.length) return;

      for (var i = 0; i < bars.length; i++) {
        var v = data[Math.floor((i / bars.length) * data.length)] / 255;
        bars[i].style.height = (2 + v * 16).toFixed(1) + "px";
      }
    }

    raf = requestAnimationFrame(frame);
    return function stop() { if (raf) cancelAnimationFrame(raf); };
  }

  window.AudioEngine = Engine;
  window.AudioPlayers = {
    mountProjectAudio: mountProjectAudio,
    startMeterLoop: startMeterLoop,
    formatTime: formatTime,
  };
})();
