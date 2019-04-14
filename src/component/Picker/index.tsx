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
    render() {
        let {onChange, options, value} = this.props;
        // @ts-ignore
        console.log(options,'---options',options[0]);
        return (
            <Select
                onChange={(e: any) => onChange(e.target.value)}
                defaultValue={options[0] && options[0].text}>
                { options && options.length && options.map((item: any) =>
                    <Option key={item.id} value={item.text}>{item.text}</Option>
                )}
            </Select>
        );
    }
}

export default Picker;
