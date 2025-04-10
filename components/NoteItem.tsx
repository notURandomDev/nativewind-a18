import { View, Text, ColorValue, TouchableOpacity } from 'react-native';
import { useRef, useState } from 'react';
import React from 'react';
import ReanimatedSwipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, { SharedValue, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import ButtonAllinOne from 'components/ButtonAllinOne';
import Avatar from './Avatar';
import { deleteNote, NoteCategory, updateNoteTimestamp } from 'storage/noteStorage';
import { useModal } from 'hooks/useModal';
import { CategoryConfigs } from 'providers/ModalProvider';

interface RightActionProps {
  progress: SharedValue<number>;
  dragX: SharedValue<number>;
}

export interface RightActionCbsProps {
  onEdit: () => void;
  onDelete: () => void;
  onCategorize: () => void;
  onPin: () => void;
}

const RightAction: React.FC<{
  prog: SharedValue<number>;
  drag: SharedValue<number>;
  closeSwipeableCb: () => void;
  cbs: RightActionCbsProps;
}> = ({ prog, drag, closeSwipeableCb, cbs }) => {
  const { onCategorize, onDelete, onPin, onEdit } = cbs;
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + 228 }],
    };
  });

  const withCloseSwipable = (fn: () => void) => {
    closeSwipeableCb();
    fn();
  };

  return (
    <Reanimated.View
      className="flex-row items-center gap-4"
      style={[styleAnimation, { paddingHorizontal: 12 }]}>
      <ButtonAllinOne
        onPress={() => withCloseSwipable(onPin)}
        rounded="full"
        containerStyles="bg-blue-faint"
        variant="ghost">
        <Ionicons color="#1556F0" size={26} name="chevron-up" />
      </ButtonAllinOne>
      <ButtonAllinOne
        onPress={onCategorize}
        rounded="full"
        containerStyles="bg-blue-faint"
        variant="ghost">
        <Ionicons color="#1556F0" size={26} name="grid-outline" />
      </ButtonAllinOne>
      <ButtonAllinOne
        onPress={() => withCloseSwipable(onEdit)}
        rounded="full"
        containerStyles="bg-blue-faint"
        variant="ghost">
        <Ionicons color="#1556F0" size={26} name="create-outline" />
      </ButtonAllinOne>
      <ButtonAllinOne
        onPress={() => withCloseSwipable(onDelete)}
        rounded="full"
        containerStyles="bg-blue-faint"
        variant="ghost">
        <Ionicons color="#1556F0" size={26} name="close-circle-outline" />
      </ButtonAllinOne>
    </Reanimated.View>
  );
};

interface NoteItemProps {
  id: string;
  title?: string;
  date?: string;
  preview?: string;
  category: NoteCategory;
  updateSelectedNote?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onCategorize?: () => void;
  onPin?: () => void;
}

const NoteItem = ({
  id,
  updateSelectedNote,
  category,
  title = '云计算与AI融合：共创数字智能新时代',
  date = '2025年5月18日',
  preview = '随着大语言模型与云的结合，技...',
  onEdit = () => {},
  onDelete = () => {},
  onCategorize = () => {},
  onPin = () => {},
}: NoteItemProps) => {
  const swipeableRef = useRef<SwipeableMethods>(null);
  const modalContext = useModal();

  const closeSwipeable = () => {
    console.log('It Worked');
    if (swipeableRef.current) {
      swipeableRef.current.close();
      return () => {};
    }
    return () => {};
  };

  const handleDelete = async () => {
    // modalContext?.setOnDismissCb(closeSwipeable);
    await deleteNote(id);
    onDelete();
  };

  const handleCategorize = async () => {
    modalContext?.showModal({ id, category });
    modalContext?.setOnDismissCb(() => {
      closeSwipeable();
      onCategorize();
    });
  };

  const handlePin = async () => {
    await updateNoteTimestamp(id);
    onPin();
  };

  return (
    <ReanimatedSwipeable
      ref={swipeableRef}
      onSwipeableOpen={updateSelectedNote}
      overshootRight={false}
      childrenContainerStyle={{ flex: 1 }}
      friction={1}
      renderRightActions={(progress, dragX) => (
        <RightAction
          closeSwipeableCb={closeSwipeable}
          prog={progress}
          drag={dragX}
          cbs={{
            onEdit,
            onDelete: handleDelete,
            onCategorize: handleCategorize,
            onPin: handlePin,
          }}
        />
      )}>
      <Reanimated.View
        style={[
          {
            position: 'relative',
            borderRadius: 17,
            backgroundColor:
              category === 'default'
                ? '#ffffff'
                : CategoryConfigs.find((config) => config.category === category)?.color,
            borderWidth: 1,
            borderColor:
              category === 'default'
                ? '#E8E8E8'
                : CategoryConfigs.find((config) => config.category === category)?.color,
          },
        ]}
        className={`gap-0.5 p-4`}>
        {/* {category === 'default' && (
          <LinearGradient
            colors={['#E9E8FF', '#F5F8FF']}
            locations={[0, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.55 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 17,
              padding: 12,
              flexGrow: 1,
            }}
          />
        )} */}
        <Text className="text-xl font-medium">{title}</Text>
        <View className="flex-row items-center">
          <Text className="font-light text-gray-solid">{date}</Text>
          <Text>｜</Text>
          <Text numberOfLines={1} className="flex-1 font-light text-gray-solid">
            {preview}
          </Text>
        </View>
      </Reanimated.View>
    </ReanimatedSwipeable>
  );
};

interface NoteNodeProps {
  timestamp?: string;
  content?: string;
  speaker?: string;
  color?: ColorValue;
}

const PLACEHOLDER =
  '尊敬的各位来宾，女士们、先生们，大家上午好，尊敬的各位来宾，女士们、先生们，大家上午好......';
const NoteNode = ({
  timestamp = '00:00:46',
  content = PLACEHOLDER,
  speaker = '发言人',
  color,
}: NoteNodeProps) => {
  const [checked, setChecked] = useState(false);
  return (
    <View className="flex-1 flex-row gap-2 py-2">
      <TouchableOpacity onPress={() => setChecked(!checked)}>
        <Ionicons size={20} name={`checkmark-circle${checked ? '' : '-outline'}`} color={color} />
      </TouchableOpacity>
      <Text className="text-lg font-medium">{timestamp}</Text>
      <View className="flex-1 gap-2">
        <Text className="text-lg text-gray-text">{content}</Text>
        <View className="flex-row items-center gap-2">
          <Avatar />
          <Text className="text-base">{speaker}</Text>
        </View>
      </View>
    </View>
  );
};

export { NoteItem, NoteNode, NoteItemProps };
