import React from 'react';
import ApplicationSettingsFormLogic from './ApplicationSettingsFormLogic';

interface Props {
  onComplete: () => void
}

const ApplicationSettingsForm: React.FC<Props> = ({ onComplete }) => {
  const handleSubmit = () => {
    onComplete();
  };

  return (
    <ApplicationSettingsFormLogic onSubmit={handleSubmit} />
  );
};

export default ApplicationSettingsForm;
