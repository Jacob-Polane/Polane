import { ShaMedia, ShaText, ShaView } from '@shesha/mobile-components';
import { useEffect, type FC } from 'react';
import { ActivityIndicator } from 'react-native';
import { useToolbar } from './hook';
import { type StoredFile } from './interface';
import { styles } from './style';
import { useMedia } from './util';

const MediaScreen: FC<any> = (props) => {
  const mediaItem = props?.route?.params?.file as StoredFile;
  const { getToolbarOptions } = useToolbar();
  useEffect(() => {
    props.navigation.setOptions(getToolbarOptions(`${mediaItem?.name}`));
  }, [props.navigation, mediaItem]);

  const { type, isFetching, url, mediaHeight, mediaWidth } =
    useMedia(mediaItem);

  return isFetching ? (
    <ShaView style={styles.loaderContainer}>
      <ActivityIndicator size={'large'} />
      <ShaText style={styles.loaderTxt}>Fetching media details</ShaText>
    </ShaView>
  ) : (
    <ShaView style={styles.container}>
      <ShaView style={styles.mediaContainer}>
        <ShaMedia
          type={type}
          resizeMode="contain"
          source={
            type === 'image'
              ? {
                  uri: `file://${url}`,
                  height: mediaHeight,
                  width: mediaWidth,
                }
              : { uri: url }
          }
        />
      </ShaView>
    </ShaView>
  );
};

export default MediaScreen;
