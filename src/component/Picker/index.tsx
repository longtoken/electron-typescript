import React from "react";
import './index.css';

import Select from 'antd/lib/select';

const Option = Select.Option;

interface PickerProps {
  onChange: (e: any) => void;
  value: string;
  options: any[];
}

//onChange={(e:HTMLElementEvent<HTMLSelectElement>) => onChange(e.target.value)}
class Picker extends React.Component<PickerProps> {
  onSelect(value) {
    console.log(value)
  }

  render() {
    let {onChange, options = [], value} = this.props;

    return (
      <Select
        onChange={(value: string) => onChange(value)}
        //defaultValue={value}
        value={value}
        onSelect={this.onSelect}
      >
        {options.map((item: any) =>
          <Option key={item.id} value={item.text}>{item.text}</Option>
        )}
      </Select>
    );
  }
}

export default Picker;
