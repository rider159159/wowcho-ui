export interface IProposalQuery {
  search: string,
  category: number,
  order: number,
  page: number,
  pageSize: number
}

export interface IBusinessProfile {
  businessName: string,
  businessIntro: string,
  businessImage: string,
  businessEmail: string,
  facebook: string,
  instagram: string,
  website: string
}