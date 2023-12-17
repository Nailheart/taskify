import { Card, List } from "@prisma/client";

type ListWithCards = List & { cards: Card[] };

type CardWithList = Card & { list: List };

type UnsplashImage = {
  id: string;
  slug: string;
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  breadcrumbs: any[];
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: null;
  topic_submissions: {};
  user: {
    id: string;
    updated_at: string;
    username: string;
    name: string;
    first_name: string;
    last_name: string;
    twitter_username: string;
    portfolio_url: string;
    bio: string;
    location: null;
    links: {
      self: string;
      html: string;
      photos: string;
      likes: string;
      portfolio: string;
      following: string;
      followers: string;
    };
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
    instagram_username: string;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    total_promoted_photos: number;
    accepted_tos: boolean;
    for_hire: boolean;
    social: {
      instagram_username: string;
      portfolio_url: string;
      twitter_username: string;
      paypal_email: null;
    };
  };
  exif: {
    make: string;
    model: string;
    name: string;
    exposure_time: string;
    aperture: string;
    focal_length: string;
    iso: number;
  };
  location: {
    name: null;
    city: null;
    country: null;
    position: {
      latitude: null;
      longitude: null;
    };
  };
  views: number;
  downloads: number;
};

export type { ListWithCards, CardWithList, UnsplashImage, Card, List };
