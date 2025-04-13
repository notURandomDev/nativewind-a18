import { Image } from 'react-native';
import React, { useMemo, useRef } from 'react';

const PAVATAR_BASEURL = 'https://i.pravatar.cc/150?img=';

interface PavatarProps {
  size?: number;
}
const Pravatar = ({ size = 30 }: PavatarProps) => {
  const SOURCE_URL = useMemo(
    () => `${PAVATAR_BASEURL}${Math.floor((Math.random() * 100) % 70) + 1}`,
    []
  );
  return (
    <Image
      className="rounded-full"
      style={{ height: size, width: size }}
      source={{ uri: SOURCE_URL }}
    />
  );
};

export default Pravatar;
