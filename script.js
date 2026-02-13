const EXIT_DURATION_MS = 180;
let restoreNavIndicator = () => {};

const isSamePageNavigation = (targetUrl) => {
    const current = new URL(window.location.href);
    return (
        targetUrl.origin === current.origin &&
        targetUrl.pathname === current.pathname &&
        targetUrl.search === current.search
    );
};

window.addEventListener("pageshow", () => {
    document.body.classList.remove("is-leaving");
    restoreNavIndicator();
});

const setupNavIndicator = () => {
    const nav = document.querySelector("nav");
    if (!nav) return;

    const links = Array.from(nav.querySelectorAll("a[href]"));
    if (!links.length) return;

    const indicator = document.createElement("span");
    indicator.className = "nav-indicator";
    indicator.setAttribute("aria-hidden", "true");
    nav.appendChild(indicator);

    const placeIndicator = (link) => {
        const navRect = nav.getBoundingClientRect();
        const linkRect = link.getBoundingClientRect();

        indicator.style.width = `${linkRect.width}px`;
        indicator.style.transform = `translateX(${linkRect.left - navRect.left}px)`;
        indicator.style.opacity = "1";
    };

    const hideIndicator = () => {
        indicator.style.width = "0px";
        indicator.style.opacity = "0";
    };

    const restoreIndicator = () => {
        const activeLink = nav.querySelector("a.active");
        if (activeLink) {
            placeIndicator(activeLink);
            return;
        }

        hideIndicator();
    };

    links.forEach((link) => {
        link.addEventListener("mouseenter", () => {
            placeIndicator(link);
        });
        link.addEventListener("focus", () => {
            placeIndicator(link);
        });
    });

    nav.addEventListener("mouseleave", restoreIndicator);
    nav.addEventListener("focusout", (event) => {
        if (!nav.contains(event.relatedTarget)) {
            restoreIndicator();
        }
    });

    window.addEventListener("resize", restoreIndicator);
    restoreNavIndicator = restoreIndicator;
    restoreIndicator();
};

setupNavIndicator();

document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link) return;

    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.target && link.target !== "_self") return;
    if (link.hasAttribute("download")) return;

    const targetUrl = new URL(link.href, window.location.href);
    if (targetUrl.origin !== window.location.origin) return;
    if (isSamePageNavigation(targetUrl) && targetUrl.hash) return;

    event.preventDefault();
    if (document.body.classList.contains("is-leaving")) return;

    document.body.classList.add("is-leaving");
    window.setTimeout(() => {
        window.location.assign(targetUrl.href);
    }, EXIT_DURATION_MS);
});
