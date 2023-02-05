import { RENDER_OUTPUT } from '../enums/renderOutput.enum';

export class RenderTemplateDTO {
  credentials: JSON; // VC JSON // TODO: CHANGE WITH THE TYPE FROM TYPES REPO
  schema: JSON; //SCHEMA JSON // TODO: CHANGE WITH THE TYPE FROM TYPES REPO
  template: string; //TEMPLATE JSON
  output: RENDER_OUTPUT; //OUTPUT JSON
}
