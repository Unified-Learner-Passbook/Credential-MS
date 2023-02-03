import { RENDER_OUTPUT } from '../enums/renderOutput.enum';

export class RenderTemplateDTO {
  credentials: any; // VC JSON
  schema: any; //SCHEMA JSON
  template: string; //TEMPLATE JSON
  output: RENDER_OUTPUT; //OUTPUT JSON
}
