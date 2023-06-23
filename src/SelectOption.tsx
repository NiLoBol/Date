import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

interface PhoneCodeProps {
  defaultValue: string;
  value: string[];
  output: string[];
}

const SelectOption: React.FC<PhoneCodeProps> = (props) => {
  const { defaultValue, value, output } = props;

  const handlePhoneCodeChange = (phoneCode: string) => {
    console.log(phoneCode);
    // Update the value and output arrays
    const newValue = [phoneCode];
    const newOutput = [phoneCode];
    // You can perform any additional logic here based on the selected phone code
    console.log(newValue, newOutput);
  };

  return (
    <Select defaultValue={defaultValue} onChange={handlePhoneCodeChange}>
      {value.map((code, index) => (
        <Option key={code} value={code}>
          {output[index]}
        </Option>
      ))}
    </Select>
  );
};

export default SelectOption;
