export class Trend{

    id?: number;
    name: string;
    mentioned?: number;
  
    constructor(model: any = null) {
      if (model) {
        this.id = model.id != null ? model.id : null;
        this.name = model.name;
        this.mentioned = model.mentioned != null ? model.mentioned : 1;
      }
    }
  }