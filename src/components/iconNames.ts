/**
 * Имена иконок набора (Icon.astro). Вынесено в .ts, чтобы другие компоненты
 * могли типизировать пропс `icon` без хрупких import-type из .astro-фронтматтера.
 * Список должен совпадать с ключами PATHS в Icon.astro.
 */
export type IconName =
  | 'arrow-right'
  | 'search'
  | 'check'
  | 'map-pin'
  | 'receipt'
  | 'home-heart'
  | 'menu'
  | 'x'
  | 'compass'
  | 'sparkles'
  | 'utensils'
  | 'route'
  | 'building'
  | 'mountain'
  | 'car'
  | 'shield'
  | 'book-open'
  | 'star'
  | 'users'
  | 'refresh-cw'
  | 'calendar'
  | 'coins'
  | 'clock'
  | 'flag'
  | 'milestone'
  | 'send'
  | 'mail'
  | 'globe'
  | 'instagram';
