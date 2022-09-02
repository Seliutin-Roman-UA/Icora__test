class StreamingService {
  constructor() {
    this.name = "BestStreemingPlatform";
    this.show = []; // массив обьектов Show
    this.viewsByShowNames = new Map(); // об'єкт значень рейтінгу : Map (ключ Show: число - колчество просмотров)
  }

  addShow(newShow) {
    if (this.show.includes(newShow)) {
      console.log("Це шоу існує у списку");
    } else {
      this.show.push(newShow);
    }
  }

  getMostViewedShowsOfYear(year) {
    let recordset = {}; //порожній ОБ'ЄКТ {nameShow: rating, nameShow: rating....}
    let arr = [];
    for (let i of this.show) {
      let yearOfShow = i.releaseDate.getFullYear();

      if (Object.values(recordset).length <= 10 && yearOfShow === year) {
        recordset[i.name] = this.viewsByShowNames.get(i);
      } else if (yearOfShow === year) {
        arr = Object.values(recordset).sort((a, b) => a - b);

        if (arr[0] < this.viewsByShowNames.get(i)) {
          for (let prop in recordset) {
            if (recordset[prop] === arr[0]) {
              delete recordset[prop];
              break;
            }
          }
          recordset[i.name] = this.viewsByShowNames.get(i);
        }
      }
    }

    return recordset;
  }

  getMostViewedShowsOfGenre(myGenre) {
    let recordset = {}; // порожній ОБ'ЄКТ шаблона {nameShow: rating, nameShow: rating....}
    let arr = [];

    for (let i of this.show) {
      if (
        Object.values(recordset).length <= 10 &&
        i.genre[myGenre] !== undefined
      ) {
        recordset[i.name] = this.viewsByShowNames.get(i);
      } else if (i.genre[myGenre] !== undefined) {
        arr = Object.values(recordset).sort((a, b) => a - b);

        if (arr[0] < this.viewsByShowNames.get(i)) {
          for (let prop in recordset) {
            if (recordset[prop] === arr[0]) {
              delete recordset[prop];
              break;
            }
          }
          recordset[i.name] = this.viewsByShowNames.get(i);
        }
      }
    }
    return recordset;
  }
}

class Subscription {
  constructor() {
    this.streamingService = "Best Streaming Service"; //рахуємо що це все відвувається на обному сервісі
  }

  watch(showName) {
    if (striming.viewsByShowNames.get(showName) === undefined) {
      striming.viewsByShowNames.set(showName, 1);
    } else {
      let r = striming.viewsByShowNames.get(showName);
      striming.viewsByShowNames.set(showName, r + 1);
    }
  }

  getRecommendationTrending() {
    const now = new Date();
    const bestRaring = striming.getMostViewedShowsOfYear(
      now.getFullYear()
    );
    const randomNumder = Math.floor(
      Math.random() * Object.keys(bestRaring).length
    );

    let [show, rating] = Object.entries(bestRaring)[randomNumder];
    return { [show]: rating };
  }

  getRecommendationByGenre(genre) {
    const now = new Date();
    const bestRaring = striming.getMostViewedShowsOfGenre(genre);
    const randomNumder = Math.floor(
      Math.random() * Object.keys(bestRaring).length
    );
    let [show, rating] = Object.entries(bestRaring)[randomNumder];
    return { [show]: rating };
  }
}

class Show {
  constructor(name, genre, releaseDate) {
    this.name = name;
    this.genre = genre;
    this.releaseDate = releaseDate;
  }
  // ні яких данних про тривалість не має. якщо вводити додаткову властивість
  // з даними про тривалість, то мені здається, що простіше звернутися до властивості
  // чим писати метод
  getDuration() {
    console.log("Шоу триває не занадто довго");
  }
}

class Movie extends Show { };
class Episode extends Show { };
class Series extends Show { };
  

class User {
  constructor() {
    this.userName = "";
    this.subscriptions = [];
  }
  addNewUser(userName, streamingService) {
    console.log("users.usersList = ", users.usersList);

    for (let u of users.usersList) {
      console.log(" u =", u);
      console.log(" u.userName =", u.userName);

      if (u.userName === userName) {
        console.log("користувач с таким ім'ям та підпискою на сервіс існує");
        return;
      }
    }
    this.userName = userName;
    
    this.subscriptions = new Subscription();
    users.usersList.push(newUser);
  }
}
// Обьект з даними про пыдписки користувачив. До ТЗ не входив, але додав, \
// щоб було на що посилатися в перевірках у методах User
let users = {
  usersList: [], // масив об'єктів User = {username: "Ivanov" , subscribe: "Best Streaming Service"
};

let newshow = new Show(
  "Lost",
  { drama: "yes", melodrama: "yes" }, //за ТЗ було вказано що це об'єкт.
  // яку пару властивість:значення вказати я не здогодався (тому написав що зміг))) )
  // чи малось на увазі, що масив це теж об'єкт в широкому сенсі
  new Date(2010, 01, 01)
);
let newshow_1 = new Show(
  "Game of tron",
  { drama: "yes", fantasy: "yes" },
  new Date(2017, 01, 01)
);
let newshow_2 = new Show(
  "House of dragons",
  { fantasy: "yes" },
  new Date(2022, 01, 01)
);

// Перевіряємо, що створено нові шоу
console.log("Нові створені шоу");
console.log(newshow);
console.log(newshow_1);
console.log(newshow_2);

// Додаємо нові шоу на стримінговий сервіс
let striming = new StreamingService();
striming.addShow(newshow);
striming.addShow(newshow_1);
striming.addShow(newshow_2);
// Переверяємо що нові шоу додалися до платформи за допомогою метода addShow()
console.log("Стрімінговий сервіс після додавання шоу");
console.log(striming);

// Додаємо нового користувча/підписку
let newUser = new User();
newUser.addNewUser("Roman", striming.name);
console.log(" новий користувач =", newUser);
newUser.addNewUser("Roman", striming.name);
newUser.addNewUser("Roman", striming.name);

// "переглянемо" шоу та порахуємо кільксть прсмотрів

newUser.subscriptions.watch(newshow);
newUser.subscriptions.watch(newshow);
newUser.subscriptions.watch(newshow);
newUser.subscriptions.watch(newshow_1);
newUser.subscriptions.watch(newshow_1);
newUser.subscriptions.watch(newshow_2);
newUser.subscriptions.watch(newshow_2);
newUser.subscriptions.watch(newshow_2);
newUser.subscriptions.watch(newshow_2);
// Переверяемо зростання перезгядів
console.log("перевіряємо зростання переглядив на стримінговій платформі");
console.log(striming.viewsByShowNames);

// Отримуємо рекомендації по кращім фільмам за певний рік
console.log("Отримуємо рекомендації по кращім фільмам за певний рік");
console.log("за 2022р = ", striming.getMostViewedShowsOfYear(2022));
console.log("за 2000р = ", striming.getMostViewedShowsOfYear(2000));

// Отримуємо рекомендації по кращім фільмам в певному жанрі
console.log("Отримуємо рекомендації по кращім фільмам в певному жанрі");
console.log("drama =", striming.getMostViewedShowsOfGenre("drama"));
console.log("fantasy =", striming.getMostViewedShowsOfGenre("fantasy"));

// Отримуємо рандомну рекомендацию по кращому фільмам в цьому році чи за жанром
console.log(
  "Отримуємо рандомну рекомендацию по кращому фільмам в цьому році чи за жанром"
);
console.log(
  " у поточному році =",
  newUser.subscriptions.getRecommendationTrending()
);
console.log(
  " за жанром =",
  newUser.subscriptions.getRecommendationByGenre("drama")
);
