import React, {Component} from 'react';
import {Action, Dispatch, AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';

import {connect} from 'react-redux';
import './App.css';
import Placeholder from '../component/Placeholder/index';
import Picker from '../component/Picker/index';

import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import Popover from 'antd/lib/popover';
import {fetchSelectList, addSelectList} from '../actions';

type SelectList = {
    items: any[];
};

/*export interface Dispatch<S> {
  <A extends Action>(action: A): A;
}*/

interface AppProps {
    allData: any[];
    //dispatch: Dispatch;
    dispatch: ThunkDispatch<SelectList, any, AnyAction>;
}

class App extends Component<AppProps> {
    state = {
        visible: false,
    }
    inputAdd
    componentDidMount(): void {
        this.props.dispatch(fetchSelectList());
    }

    hide = () => {
        this.props.dispatch(addSelectList(this.inputAdd.value))
        this.setState({
            visible: false,
        });
    }

    handleVisibleChange = (visible: Boolean) => {
        this.setState({visible});
    }

    submit() {

    }

    addSelectList() {

    }

    handleChange = value => {
        this.props.dispatch(addSelectList(value))
    }

    render() {
        let selectSubreddit = '';
        return (
            <div className="App">
                <header className="header">
                    <Input placeholder="请输入手机号" allowClear/>
                    <Placeholder/>
                    <Picker
                        value={selectSubreddit}
                        onChange={this.handleChange}
                        options={this.props.allData}
                    />
                    <div className="add-select">
                        <Popover
                            content={<button onClick={this.hide}>Close</button>}
                            title={<input type="text" ref={node=>this.inputAdd =node}/>}
                            trigger="click"
                            visible={this.state.visible}
                            onVisibleChange={this.handleVisibleChange}
                        >
                            <Icon type="plus-circle" style={{fontSize: '20px'}}/>
                        </Popover>
                    </div>
                    <Placeholder/>
                    <Button type="primary" onClick={this.submit}>提交</Button>
                </header>

            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state, '----');
    return ({
        allData: state.allData.items,
    })
};

export default connect(mapStateToProps)(App);
