import type { Schema, Attribute } from '@strapi/strapi';

export interface PicturePicture extends Schema.Component {
  collectionName: 'components_picture_pictures';
  info: {
    displayName: 'picture';
    icon: 'picture';
    description: '';
  };
  attributes: {};
}

export interface TextText extends Schema.Component {
  collectionName: 'components_text_texts';
  info: {
    displayName: 'text';
    icon: 'italic';
  };
  attributes: {
    text: Attribute.Text;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'picture.picture': PicturePicture;
      'text.text': TextText;
    }
  }
}
