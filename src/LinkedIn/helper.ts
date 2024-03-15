import { get as _get } from 'lodash'
import { type Job, type Jobs } from '../scrapper.interface'

export function extractMetas (data: any): Jobs {
  return {
    total: _get(data, 'paging.count'),
    jobs: data.elements.map((elt: any) => {
      return {
        jobId: _get(elt, 'jobCardUnion.jobPostingCard.jobPosting.entityUrn')?.split(':').pop(),
        title: _get(elt, 'jobCardUnion.jobPostingCard.title.text'),
        location: _get(elt, 'jobCardUnion.jobPostingCard.secondaryDescription.text'),
        companyLink: _get(elt, 'jobCardUnion.jobPostingCard.logo.actionTarget'),
        companyName: _get(elt, 'jobCardUnion.jobPostingCard.primaryDescription.text')
      }
    })
  }
}

export function extractDetails (data: any): Partial<Job> {
  return {
    description: _get(data, 'description.text'),
    type: _get(data, 'formattedEmploymentStatus'),
    category: _get(data, 'workplaceTypesResolutionResults.localizedName'),
    link: _get(data, 'jobPostingUrl'),
    applies: _get(data, 'applies'),
    views: _get(data, 'views'),
    id: _get(data, 'jobPostingId'),
    publishedAt: new Date(+_get(data, 'listedAt'))
    // companyDescription: _get(data, 'companyDescription')
  }
}
