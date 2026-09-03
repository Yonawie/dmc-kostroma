const NAVIGATOR_URL = "https://р44.навигатор.дети";
const VK_URL = "https://vk.com/club43568843";
const OFFICIAL_URL = "https://sites.google.com/view/dmc44";

const PAGES = [
  ["index.html", "Главная"],
  ["about.html", "О центре"],
  ["programs.html", "Программы"],
  ["schedule.html", "Расписание"],
  ["teachers.html", "Педагоги"],
  ["news.html", "Новости"],
  ["gallery.html", "Галерея"],
  ["contacts.html", "Контакты"]
];

function currentPage() {
  var path = decodeURIComponent(location.pathname || "");
  var page = path.split("/").pop() || "";
  if (!page || page.indexOf(".") === -1) return "index.html";
  return page;
}

function logoMark() {
  return (
    '<span class="logo__mark" aria-hidden="true">' +
      '<svg viewBox="0 0 32 32" fill="none">' +
        '<circle cx="16" cy="16" r="13" stroke="#c9a227" stroke-width="1.4"/>' +
        '<path d="M16 4v24M4 16h24" stroke="#e8f4fb" stroke-width="1.2"/>' +
        '<path d="M16 7l1.2 6.2 6.3-1.8-4.2 4.9 5.8 2.7-6.6.4.4 6.6-2.7-5.8-4.9 4.2 1.8-6.3L7 16.2z" fill="#c9a227"/>' +
        '<circle cx="16" cy="16" r="2.4" fill="#0b3048"/>' +
      "</svg>" +
    "</span>"
  );
}

function siteHeader() {
  var page = currentPage();
  var links = PAGES.map(function (item) {
    var href = item[0];
    var label = item[1];
    var isActive = href === page;
    return '<a href="' + href + '"' + (isActive ? ' class="active" aria-current="page"' : "") + ">" + label + "</a>";
  }).join("");

  return (
    '<div class="site-head">' +
      '<a class="skip" href="#main">К содержанию</a>' +
      '<div class="topbar">' +
        '<div class="container topbar__inner">' +
          '<div class="topbar__links">' +
            '<a href="tel:+74942551621">(4942) 55-16-21</a>' +
            "<span>ул. Ивана Сусанина, 31А</span>" +
          "</div>" +
          '<div class="topbar__links">' +
            '<a href="' + VK_URL + '" target="_blank" rel="noopener">ВКонтакте</a>' +
            '<a href="mailto:koskum@kmtn.ru">koskum@kmtn.ru</a>' +
          "</div>" +
        "</div>" +
      "</div>" +
      '<header class="header">' +
        '<div class="container header__inner">' +
          '<a href="index.html" class="logo">' +
            logoMark() +
            "<div>ДМЦ Костромы<span>с 1962 года</span></div>" +
          "</a>" +
          '<nav class="nav" data-nav>' +
            links +
            '<a class="btn btn--gold" href="' + NAVIGATOR_URL + '" target="_blank" rel="noopener">Записаться</a>' +
          "</nav>" +
          '<button class="burger" type="button" aria-label="Открыть меню" aria-expanded="false" data-burger>' +
            "<span></span><span></span><span></span>" +
          "</button>" +
        "</div>" +
      "</header>" +
    "</div>"
  );
}

function siteFooter() {
  var year = new Date().getFullYear();
  return (
    '<footer class="footer">' +
      '<div class="container">' +
        '<div class="footer__grid">' +
          "<div>" +
            '<a href="index.html" class="logo">' +
              logoMark() +
              "<div>ДМЦ Костромы<span>учреждение доп. образования</span></div>" +
            "</a>" +
            "<p>Муниципальное бюджетное учреждение дополнительного образования города Костромы «Детский морской центр».</p>" +
          "</div>" +
          "<div>" +
            "<h4>Разделы</h4>" +
            "<ul>" +
              '<li><a href="about.html">О центре</a></li>' +
              '<li><a href="programs.html">Программы</a></li>' +
              '<li><a href="teachers.html">Педагоги</a></li>' +
              '<li><a href="gallery.html">Галерея</a></li>' +
            "</ul>" +
          "</div>" +
          "<div>" +
            "<h4>Родителям</h4>" +
            "<ul>" +
              '<li><a href="' + NAVIGATOR_URL + '" target="_blank" rel="noopener">Навигатор 44</a></li>' +
              '<li><a href="schedule.html">Расписание</a></li>' +
              '<li><a href="contacts.html">Контакты</a></li>' +
              '<li><a href="' + OFFICIAL_URL + '" target="_blank" rel="noopener">Официальный сайт</a></li>' +
            "</ul>" +
          "</div>" +
          "<div>" +
            "<h4>Контакты</h4>" +
            "<ul>" +
              '<li><a href="tel:+74942551621">(4942) 55-16-21</a></li>' +
              '<li><a href="tel:+79109500393">+7 910 950-03-93</a></li>' +
              '<li><a href="mailto:koskum@kmtn.ru">koskum@kmtn.ru</a></li>' +
              "<li>156005, Кострома,<br>ул. Ивана Сусанина, 31А</li>" +
            "</ul>" +
          "</div>" +
        "</div>" +
        '<div class="footer__bottom">' +
          "<span>© " + year + " МБУ ДО «Детский морской центр» города Костромы</span>" +
          "<span>Запись через Навигатор дополнительного образования</span>" +
        "</div>" +
      "</div>" +
    "</footer>"
  );
}

document.addEventListener("DOMContentLoaded", function () {
  var headerHost = document.querySelector("[data-header]");
  var footerHost = document.querySelector("[data-footer]");
  if (headerHost) headerHost.outerHTML = siteHeader();
  if (footerHost) footerHost.outerHTML = siteFooter();

  initHeader();
  initMobileMenu();
  initGallery();
  initFilters();
  initQuestionForm();
  maskPhone();
});

function initHeader() {
  var header = document.querySelector(".header");
  if (!header) return;
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 12);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function setMenuOpen(burger, nav, open) {
  burger.classList.toggle("open", open);
  nav.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open ? "true" : "false");
  burger.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
  document.body.classList.toggle("menu-open", open);
}

function initMobileMenu() {
  var burger = document.querySelector("[data-burger]");
  var nav = document.querySelector("[data-nav]");
  if (!burger || !nav) return;

  burger.addEventListener("click", function () {
    setMenuOpen(burger, nav, !nav.classList.contains("open"));
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setMenuOpen(burger, nav, false);
    });
  });
}

function initFilters() {
  var buttons = document.querySelectorAll("[data-filter]");
  var shots = document.querySelectorAll("[data-cat]");
  if (!buttons.length) return;

  buttons.forEach(function (btn) {
    btn.setAttribute("aria-pressed", btn.classList.contains("is-on") ? "true" : "false");
    btn.addEventListener("click", function () {
      buttons.forEach(function (b) {
        b.classList.remove("is-on");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("is-on");
      btn.setAttribute("aria-pressed", "true");
      var cat = btn.getAttribute("data-filter");
      shots.forEach(function (shot) {
        var match = cat === "all" || shot.getAttribute("data-cat") === cat;
        shot.hidden = !match;
      });
    });
  });
}

function shotTone(el) {
  var match = (el.className || "").match(/shot-[a-z]/);
  return match ? match[0] : "shot-a";
}

function initGallery() {
  var shots = document.querySelectorAll("[data-caption]");
  var lightbox = document.querySelector(".lightbox");
  if (!shots.length || !lightbox) return;

  var visual = lightbox.querySelector("[data-lb-visual]");
  var text = lightbox.querySelector("[data-lb-text]");
  var closeBtn = lightbox.querySelector("[data-lb-close]");

  function close() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function open(shot) {
    if (visual) visual.className = "lightbox__visual " + shotTone(shot);
    if (text) text.textContent = shot.getAttribute("data-caption") || "";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (closeBtn) closeBtn.focus();
  }

  shots.forEach(function (shot) {
    shot.addEventListener("click", function () {
      open(shot);
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox.classList.contains("open")) close();
  });
}

function initQuestionForm() {
  var form = document.getElementById("question-form");
  if (!form) return;

  var ok = form.querySelector(".form__ok");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    form.querySelectorAll(".form__error").forEach(function (el) {
      el.remove();
    });
    if (ok) ok.classList.remove("show");

    var name = form.querySelector("[name='name']");
    var phone = form.querySelector("[name='phone']");
    var valid = true;

    if (!name || !name.value.trim()) {
      if (name) showError(name, "Введите имя");
      valid = false;
    }

    var digits = phone ? phone.value.replace(/\D/g, "") : "";
    if (digits.length < 11) {
      if (phone) showError(phone, "Введите корректный номер телефона");
      valid = false;
    }

    if (!valid) return;

    form.reset();
    if (ok) ok.classList.add("show");
  });
}

function showError(input, message) {
  var error = document.createElement("span");
  error.className = "form__error";
  error.textContent = message;
  if (input.parentElement) input.parentElement.appendChild(error);
  input.addEventListener(
    "input",
    function () {
      if (error.parentElement) error.remove();
    },
    { once: true }
  );
}

function maskPhone() {
  var input = document.querySelector("input[name='phone']");
  if (!input) return;

  input.addEventListener("input", function () {
    var digits = input.value.replace(/\D/g, "");
    if (!digits) {
      input.value = "";
      return;
    }
    if (digits.charAt(0) === "8") digits = "7" + digits.slice(1);
    if (digits.charAt(0) !== "7") digits = "7" + digits;
    digits = digits.slice(0, 11);

    var rest = digits.slice(1);
    var out = "+7";
    if (rest.length) out += " (" + rest.slice(0, 3);
    if (rest.length >= 3) out += ") " + rest.slice(3, 6);
    if (rest.length >= 6) out += "-" + rest.slice(6, 8);
    if (rest.length >= 8) out += "-" + rest.slice(8, 10);
    input.value = out;
  });
}
