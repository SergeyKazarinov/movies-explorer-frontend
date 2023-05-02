import mesto from '../images/mesto.jpg';
import portfolio from '../images/portfolio.jpg';
import armaggedon from '../images/armaggedon.gif';
import chat from '../images/chat.jpg';
import stellar from '../images/stellar-burger.jpg';
import calculator from '../images/calculator.jpg';
import { IInitialProjects } from '../interface/IInitialProject';
//поле desctiption имеет свойство white-space: pre-wrap
export const initialProjects: IInitialProjects[] = [
  {
    name: 'Calculator',
    link: 'https://calculator-navy-seven.vercel.app/',
    github: 'https://github.com/SergeyKazarinov/calculator',
    description: `Проект представляет собой drag-and-drop конструктор, с помощью которого можно собрать калькулятор.

Правая часть экрана - холст. На холст можно бросать компоненты из палитры. При перетаскивании светится зона, куда вставится элемент.
Каждый элемент можно бросить на холст только один раз, затем они становятся неактивными. Элемент удаляется с холста по dblclick.
    
Переключатель между режимом конструктора и runtime:
- в режиме конструктора можно собирать интерфейс, но при нажатии на кнопки, они ничего не делают. Дисплей на холсте может быть только вверху, поэтому двигать мы его не можем.
- в режиме runtime перетаскивать ничего нельзя (сайдбар скрывается), но работает калькулятор. Нажимаем на кнопки и видим результат на дисплее.
- переключение сбрасывает состояние дисплея.

Приложение имеет модульную архитектуру.`,
    stack: [
      'HTML',
      'Sass module',
      'React',
      'React-DnD',
      'React-Routes',
      'TypeScript',
      'Redux Toolkit',
      'ESLint',
    ],
    scrin: calculator,
  },
  {
    name: 'Stellar-Burger',
    link: 'https://stellar-burger.ru/',
    github: 'https://github.com/SergeyKazarinov/stellar-burger',
    description: `P.S. Проект рассчитан для десктопных устройв и не имеет адаптивной верстки для мобильных устройств.

Проект Stella-Burger представляет из себя веб-приложения для заказов бургеров.
Лента заказов обновляется в режиме реального времени благодаря WebSocket соединению.
Приложение имеет следующую функциональность:
    
- Конструктор бургеров. Для создания используется Drag and Drop;
- Личный кабинет пользователя с возможностью сброса пароля;
- Лента заказов, как общая, так и для конкретного пользователя в личном кабинете. Лента заказов обновляется в режиме реального времени благодаря WebSocket соединению;
- Приложение имеет динамические роуты. Также в зависимости от того, как открыть этот роут (кликом на заказ или ингридет, или же напрямую ввести URL), появляется модальное окно или переход на другую страницу.`,
    stack: [
      'HTML',
      'Sass module',
      'React',
      'React-DnD',
      'React-Routes',
      'WebSocket',
      'TypeScript',
      'Redux',
      'Redux Toolkit',
      'Rest API',
      'ESLint',
    ],
    scrin: stellar,
  },
  {
    name: 'Portfolio',
    link: 'https://kazarinov.nomoredomains.club',
    github: 'https://github.com/SergeyKazarinov/movies-explorer-frontend',
    description: 
    `Это онлайн-сервис по поиску на основе данных API "Beatfilm‑movies" с возможностью сохранения понравившихся.
    
На сайте реализованы динамические роуты, пагинация на стороне клиента. Для доступа необходима авторизация.

В проекте велась разработка как над Frontend частью, так и над Backend частью.`,
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
    
В проекте реализован функционал с API удаленного backend сервера в части создания карточек, удаления карточек, установки "лайков", редактирования данных пользователя, смена аватар пользователя, с динамическим отражением измененных данных на странице пользователя.

В проекте велась разработка как над Frontend частью, так и над Backend частью.`,
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