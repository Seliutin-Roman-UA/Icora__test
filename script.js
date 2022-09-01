console.log("Hello");
let StreamingService = {
  name: BestStreemingPlatform,
  show: [], // массив обьектов Show
  viewsByShowNames: {}, // об'єкт значень рейтінгу : Map (ключ Show: число - колчество просмотров)
  addShow(newShow) {
    if (this.show.includes(newShow)) {
      console.log("Це шоу існує у списку");
    } else {
      this.show.push(newShow);
    }
  },
  getMostViewedShowsOfYear(year) {
    let recordset = {}; //порожній ОБ'ЄКТ
    for (let i of this.show) {
      if (
        Object.values(recordset).length <= 10 &&
        this.show.releaseDate.getFullYear() === year
      ) {
        recordset.showName = i.name; //i - тип Show
        recordset.rating = this.viewsByShowNames[i.name];
      } else if (this.show.releaseDate.getFullYear() === year) {
        let arr = [];
        arr = Object.values(recordset).sort((a, b) => a - b);
        if (arr[0] < this.viewsByShowNames[i.name]) {
          recordset.splice(0, 1, [i.name, this.viewsByShowNames[i.name]]);
        }
      }
    }
    return recordset;
  },
  getMostViewedShowsOfGenre(genre) {
    let recordset = {}; //порожній ОБ'ЄКТ
    for (let i of this.show) {
      if (
        Object.values(recordset).length <= 10 &&
        this.show.genre[genre] !== undefined
      ) {
        recordset.showName = i.name; //i - тип Show
        recordset.rating = this.viewsByShowNames[i.name];
      } else if (this.show.genre[genre] !== undefined) {
        let arr = [];
        arr = Object.values(recordset).sort((a, b) => a - b);
        if (arr[0] < this.viewsByShowNames[i.name]) {
          recordset.splice(0, 1, [i.name, this.viewsByShowNames[i.name]]);
        }
      }
    }
    return recordset;
  },
};
let Show = function (name, genre, releaseDate) {
  this.name = name;
  this.genre = genre;
  this.releaseDate = releaseDate;
};
let newshow1 = new Show(
  "Lost",
  { drama: yes, melodrama: yes },
  new Date(2010, 01, 01)
);
StreamingService.addShow(newshow1);
let newshow2 = new Show(
  "Game of tron",
  { drama: yes, fantasy: yes },
  new Date(2017, 01, 01)
);
StreamingService.addShow(newshow2);
let newshow3 = new Show(
  "House of dragons",
  { fantasy: yes },
  new Date(2022, 01, 01)
);
StreamingService.addShow(newshow3);

