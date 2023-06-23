import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

const { Option } = Select;

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <Select className='position-absolute top-0 end-0 m-3' defaultValue={i18n.language} onChange={handleChangeLanguage}>
      <Option value="en">English</Option>
      <Option value="th">ไทย</Option>
    </Select>
  );
};

export default LanguageSwitcher;
