import { Template } from './Template';

export class Card {
  constructor() {}

  public getId() {
    throw new Error('Not implemented');
  }

  public getFront() {
    throw new Error('Not implemented');
  }

  public getBack() {
    throw new Error('Not implemented');
  }

  public buildFront() {
    throw new Error('Not implemented');
  }

  public buildBack() {
    throw new Error('Not implemented');
  }

  public setFrontTemplate(template: Template) {
    throw new Error('Not implemented');
  }

  public setBackTemplate(template: Template) {
    throw new Error('Not implemented');
  }
}
