import {Trend} from './trend.model';

export class Kwetter {

  id?: number;
  date?: any;
  message?: number;
  owner?: string;
  trends?: Array<Trend>;
  likes?: Array<string>;
  mentions?: Array<string>;

  constructor(model: any = null) {
    if (model) {
      this.id = model.id != null ? model.id : null;
      const date = new Date(model.dateToString);
      this.date = model.dateToString != null ? new Date(model.dateToString) : new Date(Date.now());
      this.message = model.message != null ? model.message : null;
      this.owner = model.owner != null ? model.owner : null;
      this.trends = [];
      this.likes = [];
      this.mentions = [];
      const thiz = this;
      if ( model.trends != null) {
        model.trends.forEach( function (element) {
          thiz.trends.push(new Trend(element));
        });
      }

      if ( model.mentions != null) {
        model.mentions.forEach( function (element) {
          thiz.mentions.push(element);
        });
      }

      if ( model.likes != null) {
        model.likes.forEach( function (element) {
          thiz.likes.push(element);
        });
      }

    }
  }

  addTrend(trend: Trend) {
    let inArray = false;
    this.trends.forEach(kwetterTrend => {
      if (kwetterTrend.id === trend.id) {
        inArray = true;
      }
    });
    if (!inArray) {
      this.trends.push(trend);
    }
  }
  removeTrend(trend: Trend) {
    const index = this.trends.indexOf(trend);
    if (index !== -1) {
      this.trends.slice(index, 1);
    }
  }
  addLike(username) {
    if (this.likes.indexOf(username) === -1){
      this.likes.push(username);
    }
  }
  removeLike(username) {
    const index = this.likes.indexOf(username);
    if (index !== -1) {
      this.likes.slice(index, 1);
    }
  }

  addMention(username) {
    if (this.mentions.indexOf(username) === -1){
      this.mentions.push(username);
    }
  }
  removeMention(username) {
    const index = this.mentions.indexOf(username);
    if (index !== -1) {
      this.mentions.slice(index, 1);
    }
  }
}