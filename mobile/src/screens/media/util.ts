import { useEffect, useState } from 'react';
import { useGet, useNetwork } from '@shesha/mobile-core';
import { type IResponse } from '@shesha/mobile-designer';
import type { IMedia, StoredFile } from './interface';
import { FILE_MAPPER, type IFileMapperProps } from './mapper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { type ImageURISource, Dimensions } from 'react-native';
import RNFetchBlob from 'react-native-blob-util';
import Config from 'react-native-config';

const { config } = RNFetchBlob;

export const useMedia = (mediaItem: IMedia) => {
  const { headers } = useNetwork();
  const { data, isFetching, refetch } = useGet<IResponse<StoredFile>>({
    path: `/api/StoredFile?id=${mediaItem?.id}`,
  });

  const [localFilePath, setLocalFilePath] = useState<string | null>(null);
  const [mediaHeight, setMediaHeight] = useState<number | undefined>(undefined);
  const [mediaWidth, setMediaWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    const downloadAndSave = async () => {
      const filePath = await downloadAndSaveFile();
      if (filePath) {
        setLocalFilePath(filePath);
        const { height, width } = Dimensions.get('window');
        setMediaHeight(height);
        setMediaWidth(width);
      }
    };

    if (data?.result) {
      downloadAndSave();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const downloadAndSaveFile = async () => {
    try {
      if (!data?.result) {
        return null;
      }

      const fileUrl = `${Config.BASE_URL}${data.result.url}`;
      const filePathCached = await getFromCache(fileUrl);

      if (filePathCached) {
        return filePathCached;
      }

      const fileExtension = getFileExtension(data.result.type);
      const response = await config({
        fileCache: true,
        appendExt: fileExtension,
      }).fetch('GET', fileUrl, {
        Authorization: (headers?.Authorization as string) ?? '',
      });

      const _localFilePath = response.path();

      // Save to cache
      await saveToCache(fileUrl, _localFilePath);

      return _localFilePath;
    } catch (error) {
      console.error('Error downloading and saving file:', error);
      return null;
    }
  };

  const getFileType = (type: string | undefined): IFileMapperProps['type'] => {
    if (!type) {
      return 'image';
    }

    const extension = getFileExtension(type);

    for (const fileMapper of FILE_MAPPER) {
      if (fileMapper.extensions.includes(extension)) {
        return fileMapper.type;
      }
    }

    // Default to 'image' if the extension is not found
    return 'image';
  };

  const getFileExtension = (mediaFile: string) =>
    mediaFile.split('.').pop()?.toLowerCase() || '';

  const getSource = (): ImageURISource => {
    return localFilePath
      ? { uri: `file://${localFilePath}` }
      : { uri: data?.result?.url ? Config.BASE_URL + data.result.url : '' };
  };

  const saveToCache = async (key: string, value: string) => {
    await AsyncStorage.setItem(key, value);
  };

  const getFromCache = async (key: string) => {
    const value = await AsyncStorage.getItem(key);
    return value;
  };

  return {
    retry: refetch,
    isFetching,
    storedFile: data?.result,
    source: getSource(),
    url:
      localFilePath || (data?.result ? Config.BASE_URL + data.result?.url : ''),
    type: data ? getFileType(data?.result.type) : 'image',
    mediaHeight,
    mediaWidth,
  };
};
