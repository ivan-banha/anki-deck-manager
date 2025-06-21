import { TemplateV1 } from './template/TemplateV1.js';

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

  public setFrontTemplate(template: TemplateV1) {
    throw new Error('Not implemented');
  }

  public setBackTemplate(template: TemplateV1) {
    throw new Error('Not implemented');
  }
}
