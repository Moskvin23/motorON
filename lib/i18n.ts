// All page copy in Ukrainian and English. Facts (address, phone, services, experience)
// come from the shop's public Google Maps and Instagram profiles; nothing else is invented.

export type Lang = 'uk' | 'en';

export const PHONE = '+380738550999';
export const PHONE_HUMAN = '+38 073 855 0999';
export const INSTAGRAM = 'https://www.instagram.com/motoron_sto/';
// Opens turn-by-turn directions to the shop (Google Maps app on phones).
export const MAPS = 'https://www.google.com/maps/dir/?api=1&destination=49.8974506,23.9629972&travelmode=driving';
// Place card opened directly on the Reviews tab.
export const GOOGLE_REVIEWS = 'https://www.google.com/maps/place/MotorON+%D0%A1%D0%A2%D0%9E/@49.8974506,23.9629972,17z/data=!4m8!3m7!1s0x473adf1c47b48b1b:0x2cc2996db4eca30e!8m2!3d49.8974506!4d23.9629972!9m1!1b1!16s%2Fg%2F11zytg2zp3';
export const GEO = { lat: 49.8974506, lng: 23.9629972 };

// Google Maps rating — update when new reviews arrive (checked 09.10.2026).
export const RATING = 5.0;
export const REVIEW_COUNT = 10;

/** "10 відгуків" / "1 відгук" / "3 відгуки" / "10 reviews" */
export function reviewsLabel(n: number, lang: Lang) {
  if (lang === 'en') return `${n} ${n === 1 ? 'review' : 'reviews'}`;
  const m10 = n % 10, m100 = n % 100;
  const w = m10 === 1 && m100 !== 11 ? 'відгук' : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? 'відгуки' : 'відгуків';
  return `${n} ${w}`;
}

const uk = {
  nav: { services: 'Послуги', cases: 'Приклади', gallery: 'Фото', process: 'Як працюємо', reviews: 'Відгуки', contacts: 'Контакти', book: 'Записатись' },
  theme: { light: 'Світла тема', dark: 'Темна тема' },
  hero: {
    badge: 'Нове СТО у Брюховичах',
    title1: 'Вирішуємо проблеми,',
    title2: 'а не створюємо їх',
    lead: 'Двигуни, ГРМ, ходова, ТО та автоелектрика. Понад 7 років практичного досвіду — тепер у Брюховичах, 10 хвилин від Львова.',
    book: 'Записатись онлайн',
    call: 'Подзвонити',
    stats: [
      { v: '5.0 ★', l: 'GOOGLE_COUNT' },
      { v: '7+ років', l: 'практичного досвіду' },
      { v: '6 напрямків', l: 'від ТО до двигуна' },
    ],
  },
  services: {
    title: 'Що ремонтуємо',
    lead: 'Точна діагностика перед ремонтом — платите за те, що справді потрібно.',
    items: [
      { icon: 'engine', t: 'Двигун', d: 'Діагностика, ремонт і капітальний ремонт двигунів, усунення стуків, вібрацій і втрат потужності.' },
      { icon: 'belt', t: 'ГРМ', d: 'Заміна ременя або ланцюга ГРМ, роликів і помпи — за регламентом або при перших симптомах.' },
      { icon: 'shock', t: 'Ходова', d: 'Пошук сторонніх звуків, заміна півосей, амортизаторів, сайлентблоків, кульових опор.' },
      { icon: 'oil', t: 'Технічне обслуговування', d: 'Заміна масла й фільтрів, перевірка рідин і гальм, огляд ходової під час кожного ТО.' },
      { icon: 'bolt', t: 'Автоелектрика', d: 'Діагностика помилок, проводка, стартер, генератор, датчики та освітлення.' },
      { icon: 'scan', t: 'Комп’ютерна діагностика', d: 'Зчитування помилок, аналіз параметрів і зрозумілий звіт про стан авто.' },
    ],
    note: 'Вартість залежить від авто — назвемо ціну після огляду, до початку робіт.',
  },
  cases: {
    title: 'Приклади ремонтів',
    lead: 'Типові історії, з якими до нас приїжджають.',
    items: [
      { tag: 'Ходова', t: 'Сторонній звук одразу після купівлі', p: 'Інше СТО перед покупкою сказало, що з ходовою все гаразд. У нас знайшли причину: обидві передні півосі були в поганому стані.', r: 'Замінили — звук зник.' },
      { tag: 'Ходова', t: '«Звук тролейбуса» в Hyundai Kona / Kia Niro', p: 'Характерне виття на ходу, через яке власники роками їздять по сервісах.', r: 'Знаходимо джерело звуку й усуваємо причину, а не симптом.' },
      { tag: 'ТО', t: 'Заміна масла — і знайдений стук', p: 'Клієнт записався на планове ТО. Під час огляду майстри виявили причину стуку в ходовій.', r: 'Проблему помітили до того, як вона стала дорогою.' },
    ],
  },
  gallery: {
    title: 'Майстерня і наші роботи',
    lead: 'Як виглядає сервіс зсередини та що ми робимо з авто.',
    tags: { photo: 'Фото', video: 'Відео', beforeAfter: 'До / Після' },
    items: {
      shop: { t: 'Наша майстерня в Брюховичах', d: 'Робоча зона, підйомники та обладнання.' },
      video: { t: 'Пошук стороннього звуку', d: 'Коротке відео з діагностики ходової.' },
      ba1: { t: 'Заміна півосей', d: 'Зношені деталі та нові після заміни.' },
      lift: { t: 'Авто на підйомнику', d: 'Огляд ходової під час ТО.' },
      diag: { t: 'Комп’ютерна діагностика', d: 'Зчитування помилок і аналіз параметрів.' },
      ba2: { t: 'Заміна ременя ГРМ', d: 'Старий і новий комплект ГРМ.' },
    },
    note: 'Тут будуть реальні фото й відео з нашого сервісу.',
  },
  process: {
    title: 'Як ми працюємо',
    steps: [
      { t: 'Запис', d: 'Онлайн, телефоном або в Instagram — обираєте зручний час.' },
      { t: 'Діагностика', d: 'Перевіряємо авто й пояснюємо, що знайшли, простими словами.' },
      { t: 'Погодження', d: 'Називаємо вартість і терміни до початку робіт. Без сюрпризів.' },
      { t: 'Ремонт і видача', d: 'Робимо якісно й вчасно, показуємо замінені деталі.' },
    ],
  },
  reviews: {
    title: 'Що кажуть клієнти',
    lead: 'Усі відгуки — з Google Maps.',
    onGoogle: 'у Google',
    all: 'Усі відгуки в Google',
    items: [
      { n: 'Ігор Л.', t: 'Записався на заміну масла і ТО авто. Гарно і якісно поміняли масло, а головне визначили проблему «стуку» у ходовій. Ретельно усе перевіряють.' },
      { n: 'Дмитро С.', t: 'Гарна робота, все вчасно, якісно і відповідально.' },
      { n: 'Павло М.', t: 'Приїхав через сторонній звук після купівлі. Інше СТО сказало, що з ходовою все гаразд, а тут майстри швидко знайшли причину: обидві передні півосі були в поганому стані.' },
      { n: 'StomatClinic BM', t: 'Давно знаю цих хлопців, хороші майстри і супер, що тепер в Брюховичах. Рекомендую!' },
    ],
  },
  book: {
    title: 'Запис на ремонт',
    lead: 'Залиште заявку — майстер зателефонує, щоб уточнити деталі й погодити час.',
    car: 'Марка й модель', carPh: 'Наприклад, Hyundai Kona',
    year: 'Рік', service: 'Послуга', choose: 'Оберіть послугу', other: 'Інше / не знаю',
    problem: 'Що турбує?', problemPh: 'Опишіть симптоми: звук, вібрація, помилка на панелі…',
    date: 'Коли зручно приїхати?', today: 'Сьогодні', tomorrow: 'Завтра', otherDate: 'Інша дата', pick: 'обрати', partLabel: 'Час доби', parts: ['Зранку', 'Вдень', 'Під вечір', 'Будь-коли'], name: 'Ім’я', phone: 'Телефон', phonePh: '+38 0XX XXX XX XX',
    submit: 'Надіслати заявку', sending: 'Надсилаємо…',
    okTitle: 'Дякуємо! Заявку прийнято', okText: 'Майстер зателефонує вам найближчим часом.',
    again: 'Нова заявка',
    demo: 'Демо-версія сайту: заявка нікуди не надсилається. У робочій версії вона миттєво приходить майстрам у Telegram.',
    errName: 'Вкажіть ім’я', errPhone: 'Вкажіть номер телефону', errCar: 'Вкажіть авто',
    or: 'або зателефонуйте',
  },
  faq: {
    title: 'Часті питання',
    items: [
      { q: 'Скільки коштує ремонт?', a: 'Залежить від авто й несправності. Після діагностики ми називаємо точну вартість і погоджуємо її з вами до початку робіт.' },
      { q: 'Чи можна приїхати без запису?', a: 'Краще записатися — так ми виділимо час саме під ваше авто. Якщо проблема термінова, телефонуйте.' },
      { q: 'Чи показуєте замінені деталі?', a: 'Так. Старі деталі віддаємо або показуємо, щоб ви бачили, за що платите.' },
      { q: 'Де ви знаходитесь?', a: 'Брюховичі, вулиця Львівська — близько 10 хвилин від Львова. Маршрут є нижче на карті.' },
    ],
  },
  contacts: {
    title: 'Контакти', address: 'вул. Львівська, Брюховичі, Львівська обл., 79491', hours: 'Відкриваємось о 9:30', route: 'Прокласти маршрут', insta: 'Instagram',
  },
  contact: { title: 'Як зв’язатися?', call: 'Подзвонити', copy: 'Скопіювати номер', copied: 'Номер скопійовано' },
  footer: { rights: 'MotorON СТО', demo: 'Демо-сайт, підготовлений як пропозиція для MotorON.' },
};

type Dict = typeof uk;

const en: Dict = {
  nav: { services: 'Services', cases: 'Examples', gallery: 'Photos', process: 'How we work', reviews: 'Reviews', contacts: 'Contacts', book: 'Book now' },
  theme: { light: 'Light theme', dark: 'Dark theme' },
  hero: {
    badge: 'New car service in Briukhovychi',
    title1: 'We fix problems,',
    title2: 'not create them',
    lead: 'Engines, timing belts, suspension, maintenance and auto electrics. 7+ years of hands-on experience — now in Briukhovychi, 10 minutes from Lviv.',
    book: 'Book online',
    call: 'Call us',
    stats: [
      { v: '5.0 ★', l: 'GOOGLE_COUNT' },
      { v: '7+ years', l: 'of hands-on experience' },
      { v: '6 areas', l: 'from service to engine' },
    ],
  },
  services: {
    title: 'What we fix',
    lead: 'Accurate diagnostics before any repair — you pay only for what is actually needed.',
    items: [
      { icon: 'engine', t: 'Engine', d: 'Diagnostics, repair and rebuilds; knocks, vibrations and loss of power.' },
      { icon: 'belt', t: 'Timing belt / chain', d: 'Belt or chain replacement with tensioners and water pump — on schedule or at the first symptoms.' },
      { icon: 'shock', t: 'Suspension', d: 'Tracking down noises, replacing drive shafts, shock absorbers, bushings and ball joints.' },
      { icon: 'oil', t: 'Maintenance', d: 'Oil and filter changes, fluids and brakes check, suspension inspection at every service.' },
      { icon: 'bolt', t: 'Auto electrics', d: 'Fault codes, wiring, starter, alternator, sensors and lighting.' },
      { icon: 'scan', t: 'Computer diagnostics', d: 'Reading fault codes, live data analysis and a clear report on your car.' },
    ],
    note: 'Price depends on the car — we quote after inspection, before any work starts.',
  },
  cases: {
    title: 'Repair examples',
    lead: 'Typical stories our customers come with.',
    items: [
      { tag: 'Suspension', t: 'Strange noise right after buying the car', p: 'Another shop said the suspension was fine before the purchase. We found the cause: both front drive shafts were in bad shape.', r: 'Replaced — the noise is gone.' },
      { tag: 'Suspension', t: '“Trolleybus sound” in Hyundai Kona / Kia Niro', p: 'A distinctive whine while driving that owners chase from shop to shop for years.', r: 'We find the real source and fix the cause, not the symptom.' },
      { tag: 'Service', t: 'An oil change — and a knock found', p: 'A customer booked routine maintenance. During the inspection our mechanics found what was causing a knock in the suspension.', r: 'Caught before it became expensive.' },
    ],
  },
  gallery: {
    title: 'Our shop & work',
    lead: 'What the workshop looks like inside and what we do with cars.',
    tags: { photo: 'Photo', video: 'Video', beforeAfter: 'Before / After' },
    items: {
      shop: { t: 'Our workshop in Briukhovychi', d: 'Work bays, lifts and equipment.' },
      video: { t: 'Tracking down a noise', d: 'A short clip from a suspension diagnosis.' },
      ba1: { t: 'Drive shaft replacement', d: 'Worn parts and the new ones after the job.' },
      lift: { t: 'Car on the lift', d: 'Suspension inspection during a service.' },
      diag: { t: 'Computer diagnostics', d: 'Reading fault codes and live data.' },
      ba2: { t: 'Timing belt replacement', d: 'Old and new timing kit.' },
    },
    note: 'Real photos and videos from our shop will appear here.',
  },
  process: {
    title: 'How we work',
    steps: [
      { t: 'Booking', d: 'Online, by phone or on Instagram — pick a time that suits you.' },
      { t: 'Diagnostics', d: 'We check the car and explain what we found in plain words.' },
      { t: 'Approval', d: 'You get the price and timing before any work starts. No surprises.' },
      { t: 'Repair & pickup', d: 'Done right and on time — and we show you the replaced parts.' },
    ],
  },
  reviews: {
    title: 'What customers say',
    lead: 'All reviews are from Google Maps (translated).',
    onGoogle: 'on Google',
    all: 'All reviews on Google',
    items: [
      { n: 'Ihor L.', t: 'Booked an oil change and service. They changed the oil well and, most importantly, found the cause of a “knock” in the suspension. They check everything thoroughly.' },
      { n: 'Dmytro S.', t: 'Great work — on time, high quality and responsible.' },
      { n: 'Pavlo M.', t: 'Came in because of a noise after buying the car. Another shop said the suspension was fine, but here they quickly found the cause: both front drive shafts were in bad shape.' },
      { n: 'StomatClinic BM', t: 'I have known these guys for a long time — good mechanics, and great that they are now in Briukhovychi. Recommended!' },
    ],
  },
  book: {
    title: 'Book a repair',
    lead: 'Leave a request — a mechanic will call you to clarify the details and agree on a time.',
    car: 'Make & model', carPh: 'e.g. Hyundai Kona',
    year: 'Year', service: 'Service', choose: 'Choose a service', other: 'Other / not sure',
    problem: 'What is the problem?', problemPh: 'Describe the symptoms: noise, vibration, warning light…',
    date: 'When would you like to come?', today: 'Today', tomorrow: 'Tomorrow', otherDate: 'Other date', pick: 'pick', partLabel: 'Time of day', parts: ['Morning', 'Afternoon', 'Evening', 'Any time'], name: 'Name', phone: 'Phone', phonePh: '+38 0XX XXX XX XX',
    submit: 'Send request', sending: 'Sending…',
    okTitle: 'Thank you! Request received', okText: 'A mechanic will call you shortly.',
    again: 'New request',
    demo: 'Demo version: the request is not sent anywhere. In production it goes straight to the mechanics’ Telegram.',
    errName: 'Enter your name', errPhone: 'Enter a phone number', errCar: 'Enter your car',
    or: 'or call',
  },
  faq: {
    title: 'FAQ',
    items: [
      { q: 'How much does a repair cost?', a: 'It depends on the car and the fault. After diagnostics we give you an exact price and agree on it before starting.' },
      { q: 'Can I come without booking?', a: 'Booking is better — we reserve time for your car. If it is urgent, just call.' },
      { q: 'Do you show the replaced parts?', a: 'Yes. We return or show the old parts so you can see what you are paying for.' },
      { q: 'Where are you?', a: 'Briukhovychi, Lvivska street — about 10 minutes from Lviv. Directions are on the map below.' },
    ],
  },
  contacts: {
    title: 'Contacts', address: 'Lvivska St, Briukhovychi, Lviv region, 79491', hours: 'Opens at 9:30', route: 'Get directions', insta: 'Instagram',
  },
  contact: { title: 'How to reach us?', call: 'Call', copy: 'Copy number', copied: 'Number copied' },
  footer: { rights: 'MotorON car service', demo: 'Demo website prepared as a proposal for MotorON.' },
};

export const DICT: Record<Lang, Dict> = { uk, en };
