/*
 * Reveal при скролле + stagger-вход hero — нативный vanilla ES-модуль (§15).
 * Внешний файл из public/js → отдаётся со 'self' (script-src 'self', §18), без inline.
 * Движение: только transform/opacity (CSS под .js-anim в global.css) → ноль CLS.
 *
 * Гейт движения (класс .js-anim на <html>) ставит anim-init.js синхронно в <head>.
 * Здесь работаем ТОЛЬКО если класс уже есть: значит JS активен И движение разрешено.
 * Без этого — выходим, контент остаётся видимым и статичным (FOUC-safe).
 */
const root = document.documentElement;

if (root.classList.contains('js-anim')) {
  const STAGGER_MS = 40; // шаг каскада детей (ui-ux-pro-max §7)

  /*
   * 1. Hero-вход: задаём CSS-переменную задержки каждому прямому ребёнку
   *    [data-hero-stagger]. Анимация запускается сразу (animation в CSS),
   *    суммарно ≤ ~450мс при 3–4 детях.
   */
  const hero = document.querySelector('[data-hero-stagger]');
  if (hero) {
    [...hero.children].forEach((child, i) => {
      child.style.animationDelay = i * 90 + 'ms';
    });
  }

  /*
   * 2. Раскрываем элементы при появлении во вьюпорте. Цель — все [data-reveal]
   *    плюс прямые дети контейнеров [data-reveal-stagger] (им навешиваем
   *    data-reveal и каскадную задержку прямо здесь, чтобы разметка осталась чистой).
   */
  const groups = document.querySelectorAll('[data-reveal-stagger]');
  groups.forEach((group) => {
    [...group.children].forEach((child, i) => {
      child.setAttribute('data-reveal', '');
      child.style.transitionDelay = i * STAGGER_MS + 'ms';
    });
  });

  const targets = document.querySelectorAll('[data-reveal]:not(.is-revealed)');

  if (!('IntersectionObserver' in window) || targets.length === 0) {
    // Нет observer'а — показываем всё сразу, без скрытого состояния.
    targets.forEach((el) => el.classList.add('is-revealed'));
  } else {
    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed'); // срабатывает один раз
            obs.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );
    targets.forEach((el) => io.observe(el));

    /*
     * Фикс: сразу раскрываем то, что уже видно при загрузке (выше сгиба).
     * Без этого контент, попавший в исключённую rootMargin зону у нижнего
     * края (или весь блок-список каталога на коротком/мобильном экране),
     * оставался скрытым до первого скролла. requestAnimationFrame — чтобы
     * лейаут уже посчитался. Ниже сгиба элементы по-прежнему ждут IO.
     */
    requestAnimationFrame(() => {
      targets.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          el.classList.add('is-revealed');
          io.unobserve(el);
        }
      });
    });
  }

  /*
   * Страховка надёжности (аудит 2026-06-17): что бы ни случилось с IO/раскрытием,
   * через 2с принудительно показываем все ещё скрытые [data-reveal] — смысловой и
   * LCP-контент не должен «застрять» на opacity:0.
   */
  setTimeout(() => {
    document
      .querySelectorAll('[data-reveal]:not(.is-revealed)')
      .forEach((el) => el.classList.add('is-revealed'));
  }, 2000);
}
