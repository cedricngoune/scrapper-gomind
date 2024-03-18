import { LinkedInService } from './LinkedIn/linkedIn.service'
import { type Scrapper } from './scrapper.interface'

export const platforms: Scrapper[] = [new LinkedInService()]
