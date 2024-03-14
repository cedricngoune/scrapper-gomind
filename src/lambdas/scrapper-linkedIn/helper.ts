import { get as _get } from 'lodash';

export function extractMetas(data: any) {
  return {
    total: _get(data, 'paging.count'),
    jobs: data.elements.map((elt: any) => {
      return {
        jobId: _get(elt, 'jobCardUnion.jobPostingCard.jobPosting.entityUrn')?.split(':').pop(),
        title: _get(elt, 'jobCardUnion.jobPostingCard.title.text'),
        location: _get(elt, 'jobCardUnion.jobPostingCard.secondaryDescription.text'),
        company: {
          link: _get(elt, 'jobCardUnion.jobPostingCard.logo.actionTarget'),
          name: _get(elt, 'jobCardUnion.jobPostingCard.primaryDescription.text'),
        }

      }
    })
  };
}


export function extractDetails(data: any) {
  return {
    description: _get(data, 'description.text'),
    type: _get(data, 'formattedEmploymentStatus'),
    category: _get(data, 'workplaceTypesResolutionResults.localizedName'),
    link: _get(data, 'jobPostingUrl'),
    applies: _get(data, 'applies'),
    views: _get(data, 'views'),
    id: _get(data, 'jobPostingId'),
      publishedAt: new Date(+_get(data, 'listedAt')),
    // companyDescription: _get(data, 'companyDescription')
  }
}