import { LinkedInService } from "./LinkedIn/linkedIn.service";
import { Scrapper } from "./scrapper.interface";

export const platforms: Scrapper[] = [
  new LinkedInService(),
];