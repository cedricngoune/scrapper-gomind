import { ClientService } from '../http/client.service'
import { type Job, type Jobs, type Scrapper } from '../scrapper.interface'
import { extractDetails, extractMetas } from './helper'

export class LinkedInService implements Scrapper {
  private readonly http = new ClientService({
    baseUrl: 'https://www.linkedin.com/voyager/api',
    headers: {
      authority: 'www.linkedin.com',
      cookie:
        'bcookie="v=2&e02cce26-e4b9-499b-8d62-b965c203f5ab"; bscookie="v=1&20240213160343fc7f3b4d-3a9a-4a86-8277-88bddc479f65AQFdD-2K4v001p7QnQoODUYcHCd4CTXU"; li_alerts=e30=; g_state={"i_p":1707847428064,"i_l":1}; li_gc=MTsyMTsxNzA3ODQwMjM3OzI7MDIxEJ1IrG5mfod3yBZVWChoHj3js0ZJ/NHsX9DqdvlQXIQ=; li_sugr=0114474f-dec4-4402-b1d3-7177d0a229bd; AMCVS_14215E3D5995C57C0A495C55%40AdobeOrg=1; aam_uuid=32021172120867478033698090682631603027; _gcl_au=1.1.2117469086.1709031847; PLAY_SESSION=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImZsb3dUcmFja2luZ0lkIjoiZXd6eHFVMkxTQ2FCeDRGSU5KRnlSUT09In0sIm5iZiI6MTcwOTExNzg4NywiaWF0IjoxNzA5MTE3ODg3fQ.XONQMgkeIA0bReoljgjZ-WBy_Z4TVvxsI-Ud3_XEeMM; liap=true; JSESSIONID="ajax:5646250682565143557"; lang=v=2&lang=fr-fr; timezone=Europe/Paris; li_theme=light; li_theme_set=app; _guid=9159c83d-2567-4caf-abb2-de252926ac60; dfpfpt=7e83abc2ae0c41eb8a5a699c02b1c2eb; li_at=AQEDASkGI4wFMGMCAAABje9dlioAAAGOdfPZYU4AVezaVy51YOeaD5YHp1iA7aTj1NDEHRn0YwbFr5sJbFxP38qCz-vILKCBBxwhH4b9_K1yCLLZad8fJIlkMk4iMRyEJL2RM9dIuhrOShAVdQkmmIGz; li_mc=MTsyMTsxNzEwNzcxMDk4OzI7MDIxMdc/AnkHWLSLHxVPXzl3S38YOOvWSFe9ocZQNG3APN4=; UserMatchHistory=AQKru2pSZLyfugAAAY5R54dgKF_TYjne70M8ZsoAt_9g4ux5sCQTUgs6piVZRWoc-4nOETBzf3DXNG9OsVWYIPVxggeVtGi9cmM8e2SEgC80VyP_X3xQgjKAjc1A2rnzVtcpoMFos4UXYKEiLwBVW2N5xC81BPSHctJQoawGv-Upz11HcoKct6yzYl7X3_Qifl1CNYa9127usrZtksW3YVT4YnxTC5jYPnO1BkDF0KNyBWUYbQSmbWcbJX6QRkjwqeLrfTIXCG3WISvnaDavyLtpLEzM1fvg8emfT5xvEXwqeJNdxutdWzklYZnbRN8XdgD21mE; AnalyticsSyncHistory=AQKddLt4gXyqPwAAAY5R54dgvjykupD11qwrytWY_lTmMofAP-vFPUDdJlrIEnHryjb8vT9tMlMA6GAD6lFD6g; lms_ads=AQHRJ4H26l9DegAAAY5R54h_7GBMnAIlLXkI7NsZHIz-plf6MmsZ7JkFHlI8xGjBlb_PzvfEIspooz6YvvzrSY3MsOZL-h9G; lms_analytics=AQHRJ4H26l9DegAAAY5R54h_7GBMnAIlLXkI7NsZHIz-plf6MmsZ7JkFHlI8xGjBlb_PzvfEIspooz6YvvzrSY3MsOZL-h9G; fptctx2=taBcrIH61PuCVH7eNCyH0LNKRXFdWqLJ6b8ywJyet7Vv7plIkh63Gupq80BIydt78uZ0LBMxh6IpiCV7kIa%252bVORegUgpW9tyPqaz0CJJ%252brm%252bSOE2jBLztSKjHYjk6Z5xk16UdmgKywKC9DXDHCcHyKmNc0s8a4XFi2gGWFyI7cMBlODmxtVyi%252bN8tZW2hAMbrpe442qiBqGw3q8P6bphOUq%252fwEhjRU51eqHdxg3pdTbI1R8raAukiD0bA3CKhHu1HLy95H3bhgVHq%252frB3SK3l8C7xngdVvB%252ft4gbjjr00wnjHJwdoEbt4YuY8nTs%252bFADXPqX4pPnqK8ETm4PbfvLBTD6JsmpHzbqylnR4Kr6Hbo%253d; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C19801%7CMCMID%7C32243262288640535843719250764112244888%7CMCAAMLH-1711375933%7C6%7CMCAAMB-1711375933%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1710778333s%7CNONE%7CvVersion%7C5.1.1%7CMCCIDH%7C-970376672; sdsc=22%3A1%2C1710771147926%7EJAPP%2C0U75SH%2FqQnhKIhNDRMe0q7zjaDbY%3D; lidc="b=TB72:s=T:r=T:a=T:p=T:g=3932:u=686:x=1:i=1710771172:t=1710836929:v=2:sig=AQE0eVgVw7_Z6WDdOKbY3iE1pjm4Ipr-"',
      'csrf-token': 'ajax:5646250682565143557',
      referer:
        'https://www.linkedin.com/jobs/search/?currentJobId=3860529649&f_TPR=r86400&f_WT=3%2C1%2C2&geoId=106383538&keywords=Javascript&location=Ville%20de%20Paris%2C%20%C3%8Ele-de-France%2C%20France&origin=JOB_SEARCH_PAGE_JOB_FILTER&refresh=true'
    }
  })

  async searchByKey(key: string): Promise<Jobs> {
    const params = {
      decorationId: 'com.linkedin.voyager.dash.deco.jobs.search.JobSearchCardsCollection-195',
      count: 25,
      q: 'jobSearch',
      query: `(origin:JOB_SEARCH_PAGE_JOB_FILTER,keywords:${key},locationUnion:(geoId:106383538),selectedFilters:(timePostedRange:List(r86400),workplaceType:List(3,1,2)),spellCorrectionEnabled:true)`,
      start: 25
    }

    const data = extractMetas(await this.http.get('/voyagerJobsDashJobCards', { params }))
    console.log(data)
    const promises = data.jobs.map(async (job: any) => await this.extractJobDeatails(job.jobId))
    const details = await Promise.all(promises)
    data.jobs.forEach((job: any, id: number) => {
      data.jobs[id] = { ...job, ...details.find((detail) => detail.id === job.jobId) }
    })
    return data
  }

  private async extractJobDeatails(id: string): Promise<Partial<Job>> {
    const params = {
      decorationId: 'com.linkedin.voyager.deco.jobs.web.shared.WebFullJobPosting-65',
      topN: 1,
      topNRequestedFlavors:
        'List(TOP_APPLICANT,IN_NETWORK,COMPANY_RECRUIT,SCHOOL_RECRUIT,HIDDEN_GEM,ACTIVELY_HIRING_COMPANY)'
    }
    const data = await this.http.get(`/jobs/jobPostings/${id}`, { params })
    return extractDetails(data)
  }
}
