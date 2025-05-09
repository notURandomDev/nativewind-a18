import { View, Text } from 'react-native';
import React from 'react';
import PhaseIndicator, { PhaseCodeTypes } from './PhaseIndicator';

interface PhaseSectionProps {
  completedPhases: PhaseCodeTypes[];
}
const PhaseSection = ({ completedPhases }: PhaseSectionProps) => {
  return (
    <View className="gap-2">
      {completedPhases.map((phase) => (
        <PhaseIndicator phaseCode={phase} loading={false} />
      ))}
    </View>
  );
};

export default PhaseSection;
