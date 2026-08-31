(function () {
  "use strict";

  var PROFILES = [
    {
      id: "etudiant",
      label: "Étudiant en santé",
      icon: "ph ph-student",
      tag: "Dès la première année",
      title: "Grandir, entouré de celles et ceux qui sont passés avant vous",
      desc: "L'adhésion à l'OMAS est simple, ouverte à tous, sans sélection : tutorat, concours blancs, communauté de votre filière. Le parcours omassien va plus loin : une formation intégrale accessible sur candidature, dès la rentrée.",
      bullets: [
        "Adhésion simple à 30 € / an (20 € pour les boursiers, exonération possible)",
        "Tutorat et concours blancs, ouverts à tous les adhérents",
        "Le parcours omassien, sur candidature dès la rentrée"
      ],
      ctaLabel: "Découvrir l'adhésion étudiante",
      ctaHref: "rejoindre.html",
      imageLabel: "photo · étudiants en tutorat"
    },
    {
      id: "professionnel",
      label: "Professionnel de santé",
      icon: "ph ph-briefcase-metal",
      tag: "En exercice",
      title: "Rester relié à votre réseau, à chaque étape de votre carrière",
      desc: "De l'internat à l'installation, l'OMAS reste à vos côtés : réseau de votre filière dans chaque localité.",
      bullets: [
        "Adhésion professionnelle à 90 € / an (50 € pour les internes)",
        "Réseau et communauté de votre filière, dans chaque localité",
        "Événements et rencontres du réseau professionnel"
      ],
      ctaLabel: "Découvrir l'adhésion professionnelle",
      ctaHref: "rejoindre.html",
      imageLabel: "photo · soignant en exercice"
    },
    {
      id: "association",
      label: "Association · Entreprise",
      icon: "ph ph-buildings",
      tag: "Construire ensemble",
      title: "Un partenariat durable avec un réseau national de soignants",
      desc: "Entreprises, institutions, fondations et associations peuvent soutenir l'OMAS, son réseau et ses actions au service de la santé pour tous.",
      bullets: [
        "Partenariat entreprise & institution à partir de 200 € / an",
        "Partenariats, mécénat et projets communs",
        "Rencontres Partenaires annuelles avec le réseau OMAS"
      ],
      ctaLabel: "Devenir partenaire",
      ctaHref: "contact.html",
      imageLabel: "photo · rencontre partenaires"
    },
    {
      id: "particulier",
      label: "Particulier · soutien",
      icon: "ph ph-heart",
      tag: "Hors du monde de la santé",
      title: "La santé est l'affaire de tous, nos actions sont ouvertes à tous",
      desc: "Sans être vous-même acteur de santé, vous pouvez bénéficier de nos actions de prévention et soutenir le projet OMAS par un don libre.",
      bullets: [
        "Formations premiers secours, ouvertes gratuitement",
        "Journées de dépistage au plus près des quartiers",
        "Soutenir l'OMAS par un don, en toute indépendance"
      ],
      ctaLabel: "Voir nos actions",
      ctaHref: "actions.html",
      imageLabel: "photo · action de prévention"
    }
  ];

  function initProfileSelector() {
    var tabsEl = document.getElementById("profile-tabs");
    var panelTag = document.getElementById("profile-tag");
    var panelTitle = document.getElementById("profile-title");
    var panelDesc = document.getElementById("profile-desc");
    var panelBullets = document.getElementById("profile-bullets");
    var panelCta = document.getElementById("profile-cta");
    var panelVisual = document.getElementById("profile-visual-label");
    if (!tabsEl) return;

    function render(activeId) {
      tabsEl.innerHTML = "";
      var active = PROFILES.find(function (p) { return p.id === activeId; }) || PROFILES[0];

      PROFILES.forEach(function (p) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "profile-tab" + (p.id === active.id ? " active" : "");
        btn.setAttribute("aria-pressed", p.id === active.id ? "true" : "false");
        btn.innerHTML = '<i class="' + p.icon + '"></i><span>' + p.label + "</span>";
        btn.addEventListener("click", function () { render(p.id); });
        tabsEl.appendChild(btn);
      });

      panelTag.textContent = active.tag;
      panelTitle.textContent = active.title;
      panelDesc.textContent = active.desc;
      panelBullets.innerHTML = "";
      active.bullets.forEach(function (b) {
        var li = document.createElement("li");
        li.innerHTML = '<i class="ph-fill ph-check-circle"></i><span></span>';
        li.querySelector("span").textContent = b;
        panelBullets.appendChild(li);
      });
      panelCta.textContent = active.ctaLabel + " ";
      var arrow = document.createElement("i");
      arrow.className = "ph ph-arrow-right";
      panelCta.appendChild(arrow);
      panelCta.href = active.ctaHref;
      panelVisual.textContent = "[ " + active.imageLabel + " ]";
    }

    render("etudiant");
  }

  function initDropdown() {
    var dropdown = document.querySelector(".dropdown");
    if (!dropdown) return;
    var trigger = dropdown.querySelector(".dropdown-trigger");
    trigger.addEventListener("click", function (e) {
      if (window.matchMedia("(max-width: 980px)").matches) {
        e.preventDefault();
        dropdown.classList.toggle("open");
      }
    });
  }

  function initMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      toggle.innerHTML = isOpen ? '<i class="ph ph-x"></i>' : '<i class="ph ph-list"></i>';
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.innerHTML = '<i class="ph ph-list"></i>';
      });
    });
  }

  function initNewsletterForm() {
    var form = document.getElementById("newsletter-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = document.getElementById("newsletter-note");
      var input = form.querySelector("input[type=email]");
      if (note) note.textContent = "Merci ! Nous vous tiendrons informé·e.";
      if (input) input.value = "";
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initProfileSelector();
    initDropdown();
    initMobileNav();
    initNewsletterForm();
  });
})();
