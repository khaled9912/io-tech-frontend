import { Dispatch, SetStateAction } from "react";

export interface ISubItem {
  title: string;
  description: string;
}

export interface IServiceItem {
  slug: string;
  order: number;
  thumbnail?: string;
  banner?: string;
  titleAr: string;
  descriptionAr?: string;
  subItemsAr?: ISubItem[];
  titleEn: string;
  descriptionEn?: string;
  subItemsEn?: ISubItem[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  id?: string;
}

interface IUrl {
  url?: string;
}

export interface ISlide {
  slideImages?: IUrl[];
  logoSlider?: IUrl;
}

export interface ITeamMember {
  nameAr?: string;
  nameEn?: string;
  roleAr?: string;
  roleEn?: string;
  photo?: {
    url: string;
  };
  slug?: string;
  services?: ITeamService;
}
export interface ISubItem {
  title: string;
  buttonText: string;
}

export interface ITeamService {
  ar: ISubItem[];
  en: ISubItem[];
}

export interface SearchBarProps {
  openSearch: boolean;
  setOpenSearch: Dispatch<SetStateAction<boolean>>;
}

export interface IClient {
  clientNameAr?: string;
  clientNameEn?: string;
  clientTitleAr?: string;
  clientTitleEn?: string;
  logo?: {
    url: string;
    alt?: string;
  };
  testimonialAr?: string;
  testimonialEn?: string;
}

export interface IResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
export interface AxiosError {
  response?: {
    status?: number;
    data?: any;
  };
}
