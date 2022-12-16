import mesto from '../images/mesto.jpg';
import portfolio from '../images/portfolio.jpg';
import armaggedon from '../images/armaggedon.gif';
import chat from '../images/chat.jpg';
import { IInitialProjects } from '../interface/IInitialProject';

export const initialProjects: IInitialProjects[] = [
  {
    name: 'Portfolio',
    link: 'https://kazarinov.nomoredomains.club',
    github: 'https://github.com/SergeyKazarinov/movies-explorer-frontend',
    description: `Это онлайн-сервис по поиску на основе данных API "Beatfilm‑movies" с возможностью сохранения понравившихся. 
    На сайте реализованы динамические роуты, пагинация на стороне клиента. Для доступа необходима авторизация.`,
    stack: [
      'HTML',
      'Sass',
      'React',
      'TypeScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Git',
      'Redux',
      'Redux Toolkit',
      'Rest API',
    ],
    scrin: portfolio,
  },
  {
    name: 'Mesto',
    link: 'https://kazarinov.mesto.nomoredomains.icu',
    github: 'https://github.com/SergeyKazarinov/react-mesto-api-full',
    description: `Это упрощенный аналог социальной сети "Instagram". 
    В проекте реализован функционал с API удаленного backend сервера в части создания карточек, удаления карточек, установки "лайков", 
    редактирования данных пользователя, смена аватар пользователя, с динамическим отражением измененных данных на странице пользователя.`,
    stack: [
      'HTML', 
      'CCS3', 
      'Node.js',
      'Express.js',
      'React',
      'MongoDB',
      'Git',
      'Rest API',
    ],
    scrin: mesto,
  },
  {
    name: 'Armaggedon',
    link: '',
    github: 'https://github.com/SergeyKazarinov/armaggedon-next-js',
    description: `Онлайн-сервис по мониторингу и уничтожению опасных астероидов на основе данных API NASA.
    На главной странице список подлетов астероидов к Земле от текущей даты в бесконечность (пагинация на стороне сервера).
    В онлайн-сервисе также имеется некая корзина, где отображаются выбранные подлеты астероидов.
    В конце страницы кнопка заказа бригады им. Брюса Уиллиса на выбранные астероиды.
    Бригада будет доставлена на астероид в нужный момент и выполнит свою нелёгкую работу.
    Так же в фоне шапки изображение, которое получено в API NASA APOD (картинка дня).`,
    stack: [
      'HTML', 
      'CCS3', 
      'Next.js',
      'Git',
      'Rest API',
    ],
    scrin: armaggedon,
  },
  {
    name: 'Chat-bot',
    link: '',
    github: 'https://github.com/SergeyKazarinov/chat',
    description: `Диалоговое окно чата с ботом с возможностью ответа на сообщения и форматирования текста перед отправкой.`,
    stack: [
      'HTML', 
      'CCS3',
      'TS',
      'React',
      'Git',
    ],
    scrin: chat,
  },
];