import { Output } from "src/app/interfaces/output";

export class Sport implements Output {
  public title: string;
  public description: string;
  public image: string;
  public moreInfo: string;
  constructor(object: Sport) {
    this.title = object.title;
    this.description = object.description;
    this.image = object.image;
    this.moreInfo = object.moreInfo;
  }
}
