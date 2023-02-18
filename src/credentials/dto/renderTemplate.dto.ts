import { VCV2 } from '@prisma/client';
import { RENDER_OUTPUT } from '../enums/renderOutput.enum';

export class RenderTemplateDTO {
  credential: VCV2; // VC JSON // TODO: CHANGE WITH THE TYPE FROM TYPES REPO
  schema: JSON; //SCHEMA JSON // TODO: CHANGE WITH THE TYPE FROM TYPES REPO
  template: string; //TEMPLATE JSON
  output: RENDER_OUTPUT; //OUTPUT JSON
}
