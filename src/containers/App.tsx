import React, {Component} from 'react';
import {Action, Dispatch, AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';

import {connect} from 'react-redux';
import './App.css';
import Placeholder from '../component/Placeholder/index';
import Picker from '../component/Picker/index';
import ContentList from '../component/ContentList/index';

import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import Popover from 'antd/lib/popover';
import {
  fetchSelectList,
  addSelectList,
  setActiveSelect,
  getContentList, deleteContentItem,
} from '../actions';

import Base64 from 'Base64'

type SelectList = {
  items: any[];
};

/*export interface Dispatch<S> {
  <A extends Action>(action: A): A;
}*/

interface AppProps {
  allData: any[];
  contentData: any[];
  loading: boolean;
  error: any;
  //dispatch: Dispatch;
  activeSelect: string;
  dispatch: ThunkDispatch<SelectList, any, AnyAction>;
}

const content = (e) => {
  return (
    <div>
      <p className="wordBreak">{Base64.atob(e)}</p>
      <p className="wordBreak">{e}</p>
    </div>
  );
};

class App extends Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  state = {
    visible: false,
  }
  columns = [
    {title: '用户', dataIndex: 'account', key: 'account'},
    {title: '环境', dataIndex: 'env', key: 'env'},
    {title: 'token', dataIndex: 'token', key: 'token', render: (e) => <Popover content={content(e)} title="Title" trigger="click" placement="bottom">
        <Button>查看token</Button>
      </Popover>},
    {
      title: 'Action', dataIndex: 'del', key: 'del', render: (e) => <Button type="danger" onClick={this.deleteItem.bind(this,e)}>删除</Button>,
    },
  ]

  InputValue: null
  InputPhone: null

  deleteItem(e) {
    console.log('11');
    this.props.dispatch(deleteContentItem(e))
  }
  componentDidMount(): void {
    this.props.dispatch(fetchSelectList());
  }

  addSelectList = () => {
    this.props.dispatch(addSelectList(this.InputValue));
    this.setState({
      visible: false,
    });
  }

  handleVisibleChange = (visible: Boolean) => {
    this.setState({visible});
  }

  submit() {
    if (this.InputPhone) {
      this.props.dispatch(getContentList(this.InputPhone, this.props.activeSelect));
    } else {
      message.info('请输入手机号', 2);
    }
  }

  InputPhoneChange = e => {
    this.InputPhone = e.target.value;
  }

  InputChange = e => {
    this.InputValue = e.target.value;
  }

  handleChange = value => {
    this.props.dispatch(setActiveSelect(value))
  }

  render() {
    let {activeSelect, allData, loading, contentData} = this.props;
    console.log(activeSelect, allData, 'render');
    if (loading) {
      return <div>loading...</div>
    }
    return (
      <div className="App">
        <header className="header">
          <Input placeholder="请输入手机号" maxLength={11} allowClear onChange={this.InputPhoneChange}/>
          <Placeholder/>
          <Picker
            value={activeSelect}
            onChange={this.handleChange}
            options={allData}
          />
          <div className="add-select">
            <Popover
              content={<Button className="customAdd" type="primary" onClick={this.addSelectList}>使用自定义环境</Button>}
              //title={<input type="text" ref={node => this.inputAdd = node}/>}
              title={<Input allowClear onChange={this.InputChange}/>}
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
        <ContentList
          data={contentData}
          columns={this.columns}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state, '---- App.tsx');
  return ({
    allData: state.allData.items,
    contentData: state.contentData.list,
    activeSelect: state.allData.activeSelect,
    loading: state.allData.loading,
    error: state.allData.error,
  })
};

export default connect(mapStateToProps)(App);
