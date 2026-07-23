export interface IFileMapperProps {
  readonly extensions: string[];
  readonly type: 'image' | 'video' | 'audio' | 'pdf' | 'html' | 'url';
}

export const FILE_MAPPER: IFileMapperProps[] = [
  {
    extensions: [
      'jpeg',
      'jpg',
      'png',
      'gif',
      'bmp',
      'tiff',
      'tif',
      'svg',
      'ico',
      'webp',
      'heic',
      'heif',
      'raw',
    ],
    type: 'image',
  },
  {
    extensions: [
      'mp4',
      'avi',
      'mkv',
      'mov',
      'wmv',
      'flv',
      'webm',
      'm4v',
      '3gp',
    ],
    type: 'video',
  },
  {
    extensions: [
      'mp3',
      'wav',
      'ogg',
      'flac',
      'aac',
      'wma',
      'm4a',
      'aiff',
      'alac',
    ],
    type: 'audio',
  },
  {
    extensions: [
      'pdf',
      'doc',
      'docx',
      'xls',
      'xlsx',
      'ppt',
      'pptx',
      'txt',
      'zip',
      'rar',
    ],
    type: 'pdf',
  },
];
