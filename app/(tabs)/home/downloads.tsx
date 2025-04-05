import { View, Text, ScrollView, FlatList, ImageSourcePropType } from 'react-native';
import React from 'react';
import CustomLink from 'components/CustomLink';
import PortraitCard from 'components/PortraitCard';
import { agendaPosterData, guestsPosterData, policyGalleryData, pptGalleryData } from 'data/cards';
import BottomIndicator from 'components/BottomIndicator';
import ButtonAllinOne from 'components/ButtonAllinOne';

interface fileCoverProps {
  fileSize: string;
  imgSrc: ImageSourcePropType;
  title: string;
}

const FileCover = ({ fileSize, imgSrc, title }: fileCoverProps) => (
  <View className="gap-2">
    <PortraitCard isFile title={fileSize} img={imgSrc} />
    <View style={{ width: 130 }}>
      <Text className="font-medium" numberOfLines={1}>
        {title}
      </Text>
    </View>
  </View>
);

const PPTGallery = () => (
  <View className="gap-4">
    <CustomLink title="大会PPT集锦" />
    <View className="flex-row gap-3">
      <ButtonAllinOne label="5月17日" />
      <ButtonAllinOne variant="outline" label="5月18日" />
      <ButtonAllinOne variant="outline" label="5月19日" />
    </View>
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      data={pptGalleryData}
      contentContainerClassName="gap-4"
      renderItem={({ item }) => <FileCover {...item} />}
    />
  </View>
);

const PolicyGallery = () => (
  <View className="gap-4">
    <CustomLink title="政策文献与实务指南" />
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      data={policyGalleryData}
      contentContainerClassName="gap-4"
      renderItem={({ item }) => <FileCover {...item} />}
    />
  </View>
);

const AgendaPosterGallery = () => (
  <View className="gap-4">
    <CustomLink title="大会议程海报" />
    <View className="flex-row gap-3">
      <ButtonAllinOne label="5月17日" />
      <ButtonAllinOne variant="outline" label="5月18日" />
      <ButtonAllinOne variant="outline" label="5月19日" />
    </View>
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      data={agendaPosterData}
      contentContainerClassName="gap-4"
      renderItem={({ item }) => <FileCover {...item} />}
    />
  </View>
);

const GuestPosterGallery = () => (
  <View className="gap-4">
    <CustomLink title="嘉宾海报" />
    <View className="flex-row gap-3">
      <ButtonAllinOne label="5月17日" />
      <ButtonAllinOne variant="outline" label="5月18日" />
      <ButtonAllinOne variant="outline" label="5月19日" />
    </View>
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      data={guestsPosterData}
      contentContainerClassName="gap-4"
      renderItem={({ item }) => <FileCover {...item} />}
    />
  </View>
);

const DownloadsTabView = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-8"
      contentContainerStyle={{ paddingHorizontal: 16 }}
      className="py-3">
      <PPTGallery />
      <PolicyGallery />
      <AgendaPosterGallery />
      <GuestPosterGallery />
      <BottomIndicator />
    </ScrollView>
  );
};

export default DownloadsTabView;
