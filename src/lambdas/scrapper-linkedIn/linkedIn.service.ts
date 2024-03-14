import { ClientService } from '../../http/client.service';
import { extractDetails, extractMetas } from './helper';

export class LinkedInService {
  private http = new ClientService({
    baseUrl: 'https://www.linkedin.com/voyager/api',
    headers: {
      authority: 'www.linkedin.com',
      cookie: 'bcookie="v=2&e2db9ec5-6ab8-4252-8b47-8bc81da3d92c"; bscookie="v=1&20230927125421cfed801f-e902-40c7-8731-53aefdba77d3AQFcSptnYGvfU1wI7pDYfcui8JlTjBkJ"; li_rm=AQGCAjgrT_IaZQAAAYrWtGbpnTIqHKqjHUrCunQJsRIN2lfDQdhKmXExrWkTnKfVK_8dTbenF0i8OzZB-BZCx3SNIo3bBvGnw82k0vYqLbhOO2wwvWauvmz1; li_alerts=e30=; g_state={"i_l":0}; JSESSIONID="ajax:8734411299002903308"; li_theme=light; li_theme_set=app; timezone=Europe/Paris; dfpfpt=427e13ca73b345ed9686a1520e4d1cf4; li_gc=MTs0MjsxNzA4NzE3MjU5OzI7MDIxPun2gFnjJf2rgv9inFaZ9febbAIckkS7iouY/H7l3VA=; lang=v=2&lang=fr-fr; fid=AQG-orpy7v6NRgAAAY4dxsBszX1hw6vskrTs3F7PB2Ax2O6jkCZHjs5noTo_4mdQ5sSLJpsfHO0IWg; liap=true; li_sugr=e48b7b05-5d3b-4cc2-bb06-0ea524dafee4; fptctx2=taBcrIH61PuCVH7eNCyH0LNKRXFdWqLJ6b8ywJyet7V0P3N1AXDBDUcgMwmM7ch2QmAQrdH0wzGkyFhHpjj4p4OgLVVmtiQcqzvVmPMwleRodV7ZPVm1H84G3yIIn1gUTBtd3JXjJ%252fbnJpqyVj5fTKf8n7Jwf1wVLRjDsOWlxDREHMUOhl8SW5pqB%252bUZMnZVrnhgoBEcA5v1vicWRf%252b6c2RQMj%252bPpRgVMbPi1nOZuIGfpHaZzRvO%252bi2LARsZ8HSgE9kLwzq5BTP08Dm0XZpCjWcmeLkr2FouOyvexMDIdovkKJMPVMP0%252flaMYKxDm0fMtDGMyDHh4VDQhE%252fsogC8G2ytxmnQkbuCaf%252fiAdT1dkw%253d; s_fid=4E591A845CA34D72-2E1BF9282C9DD764; s_cc=true; df_ts=1709975301700; PLAY_SESSION=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImZsb3dUcmFja2luZ0lkIjoibEg5dzlMV0JSN20vbDRCajlpcDRydz09In0sIm5iZiI6MTcxMDE0NjU1MiwiaWF0IjoxNzEwMTQ2NTUyfQ.12aPxvbzXQzsi0jpLifknVLlWP13Da5b_V5QxSIuIGY; li_at=AQEDAQY-0rkEhIBaAAABjiytqzYAAAGOULovNk4AHhw0jVeGb7koCPgw0JkoXiPjR7k7gx7KUP7x723pggQ_5vJJMnjGaQQbK7B16LGHzYDK7cBvYaBIjMQR-29DErBE8xbN7wmq9qHaLJvOclShPzN-; sdsc=1%3A1SZM1shxDNbLt36wZwCgPgvN58iw%3D; AnalyticsSyncHistory=AQLHvrzynICK7AAAAY48Ow3jOK45QR6HZl2amiwZtUjmxN-LpPffAJA1q0fHxnL4aTdy8MyQL5WfZzBJxMlqmw; lms_ads=AQEahSV9ro4ndgAAAY48Ow8rkFdglPa6NXvhKOXbmUrh2QuC5DzP4lzJrgKRMQzHiBNnFoRskCqhs-jAY8J8YTEWDaVNd82m; lms_analytics=AQEahSV9ro4ndgAAAY48Ow8rkFdglPa6NXvhKOXbmUrh2QuC5DzP4lzJrgKRMQzHiBNnFoRskCqhs-jAY8J8YTEWDaVNd82m; at_check=true; gpv_pn=developer.linkedin.com%2Fproduct-catalog; s_sq=%5B%5BB%5D%5D; s_tp=5562; mbox=session#b3f80bbb5f9e4306a88482100d25d0d7#1710411120|PC#b3f80bbb5f9e4306a88482100d25d0d7.37_0#1725961260; s_plt=1.53; s_pltp=developer.linkedin.com%2Fproduct-catalog; s_ips=3493; s_ppv=developer.linkedin.com%2Fproduct-catalog%2C100%2C63%2C5562%2C5%2C5; s_tslv=1710409313298; UserMatchHistory=AQInt9dZ4Yn6sAAAAY48WOCaTdAMSWOVdTPigSLLCgn42E2CAqPwoPxG3BJp1BFWHFYo0gNVLIEjg3Tu7POe-s3Sc_zaTyqBwcM8QwhYXqubTtgsm7_GWjd7TwOYWFVzwBVvl9v2CVotHryjCPd_j_0rcJ7mhQ11ydvJhSpZdUT-paheKcwMI1BvlZSMn8I6QcXy9RHiJUQQhFVZwTAAuxDaaDGknO_lHuqJCSu-XCOOCoV_0GtCYO1uoNYUaTi1U-zXhf7Y3d9iI2Eo__xjCiLKM5G746DC2BE9IErKorSiKLnOqGPvhq1OtziRhsvdCBUqBgc; lidc="b=TB73:s=T:r=T:a=T:p=T:g=3729:u=855:x=1:i=1710409443:t=1710443498:v=2:sig=AQGztqhNZHsTCE9Q3SNDRwPohWV5Ka4t"; __cf_bm=1rv8VrWDfe5.a0yhwHtwxRB_D4O0qpMRxmHSHX7dVQk-1710411263-1.0.1.1-AjQyhx0ex0rkpPNJ169dJJ9gYkpSr4PT9LALK6YfFoDz0JDKLBpvlIwcDWjcKgP8EdBrcMYEFTNhYzdoZ_MTnw; li_mc=MTsyMTsxNzEwNDEyMjcxOzI7MDIx64vQk/0lRGTFGqF7WSAZagYO1Cfepig4XaVrbLT7dhY=',
      'csrf-token': 'ajax:8734411299002903308',
      referer: 'https://www.linkedin.com/jobs/search/?currentJobId=3855600291&f_E=3&f_TPR=r86400&f_WT=3%2C1%2C2&geoId=105015875&keywords=node&location=France&origin=JOB_SEARCH_PAGE_JOB_FILTER&refresh=true',
    }
  });

  async searchByKey(key: string) {
    const params = {
      decorationId: 'com.linkedin.voyager.dash.deco.jobs.search.JobSearchCardsCollection-195',
      count: 25,
      q: 'jobSearch',
      query: `(origin:JOB_SEARCH_PAGE_JOB_FILTER,keywords:${key},locationUnion:(geoId:105015875),selectedFilters:(experience:List(3),timePostedRange:List(r86400),workplaceType:List(3,1,2)),spellCorrectionEnabled:true)`,
      start: 0
    }
    const data = extractMetas(await this.http.get('/voyagerJobsDashJobCards', { params }));
    const promises = data.jobs.map((job: any) => this.extractJobDeatails(job.jobId));
    const details = await Promise.all(promises);
    data.jobs.forEach((job: any, id: number) => {
      data.jobs[id] = { ...job, ...(details.find(detail => detail.id == job.jobId)) };
    })
    return data;
  }

  private async extractJobDeatails(id: string) {
    const params = {
      decorationId: 'com.linkedin.voyager.deco.jobs.web.shared.WebFullJobPosting-65',
      topN: 1,
      topNRequestedFlavors: 'List(TOP_APPLICANT,IN_NETWORK,COMPANY_RECRUIT,SCHOOL_RECRUIT,HIDDEN_GEM,ACTIVELY_HIRING_COMPANY)'
    }
    const data = await this.http.get(`/jobs/jobPostings/${id}`, { params });
    return extractDetails(data);
  }

}
