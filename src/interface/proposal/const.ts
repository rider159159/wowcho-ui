import { IProposalQuery,IBusinessProfile } from './interface'

export const proposalQuery:IProposalQuery ={
  search: '',
  category: 0,
  order: 0,
  page: 1,
  pageSize: 12
}

export const BusinessProfile:IBusinessProfile = {
  businessName: '',
  businessIntro: '',
  businessImage: '',
  businessEmail: '',
  facebook: '',
  instagram: '',
  website: ''
}