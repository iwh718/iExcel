import React, {Component} from 'react';
import PropTypes from 'prop-types'

class iExcel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exData: this.props.initialData,
            edit: null,
            addModalFlag: false,
            deleteDataFlag: false,//控制删除
            alertModalFlag: false,//控制alert
            temRowIdx: '',//删除记录的位置
            searchFlag: false,//搜索组件控制
            saveSearchValue: '',//搜索值
            //提示词组件
            tipsBox: {
                text: '这是默认提示',
                type: 'success',
                flag: false
            },
        }
    }


    _showEditor(e) {
        //修改edit值：添加行属性和单元格索引
        this.setState({
            edit: {
                row: parseInt(e.target.dataset.row, 10),
                cell: e.target.cellIndex,
            }
        });
    }

    //控制搜索组件
    _showSearch() {
        this.setState({
            searchFlag: !this.state.searchFlag
        })
    }


    //搜索值存储
    _saveSearchValue(e) {
        console.log(e.currentTarget.value);
        this.setState({
            saveSearchValue: e.currentTarget.value
        })
    }

    //渲染添加modal
    _addModal() {
        this.setState({
            addModalFlag: true
        }, () => {
            console.log(this.state.addModalFlag)
        })
    }

    //提交添加的数据
    _submitAdd() {
        let myData = $("#form1").serializeArray();
        let temData = [];
        let data;
        console.log(this.state.exData);
        if (this.state.exData[0] === undefined) {
            data = [];
        } else {
            data = this.state.exData
        }
        for (let i of myData) {
            temData.push(i.value);
        }

        if (Excel._checkData(myData)) {

            this.setState({
                addModalFlag: false,
                exData: [...data, temData],
                tipsBox: {
                    text: "提交完成！",
                    type: 'success',
                    flag: true
                },
                tipsFlag: true
            });

        } else {

            this.setState({

                tipsBox: {
                    text: "提交失败，请填写完整数据！",
                    type: 'danger',
                    flag: true
                }
            });
        }
    }

    //搜索数据
    _searchData() {
        if (this.state.saveSearchValue in this.state.exData) {
            console.log('found')
        } else {

            this.setState({
                tipsBox: {
                    text: '没有发现这个记录！',
                    type: 'warning',
                    flag: true
                }
            })
        }
    }

    //检验表单
    static _checkData(e) {
        for (let i of e) {
            if (i['value'].length <= 0 || i === '') {
                return false
            }
        }
        return true
    }

    //关闭添加modal
    _dismissAdd() {
        this.setState({
            addModalFlag: false
        }, () => {
            console.log(this.state.addModalFlag)
        })
    }

    //保存修改
    _save(e) {
        e.preventDefault();
        let input = e.target.firstChild;

        let data = this.state.exData;
        console.log(data);
        data[this.state.edit.row][this.state.edit.cell] = input.value;
        this.setState({
            edit: null,
            exData: data,
        });
    }


    //提交删除
    _submitAlert() {
        let data = this.state.exData.slice();
        delete data[this.state.temRowIdx];
        this.setState({
            alertModalFlag: false,
            tipsBox: {
                type: 'success',
                text: "删除完成",
                flag: true,
            },
            exData: data
        });
    }

    //弹出警告
    _addAlert(e) {

        let rowidx = e.currentTarget.dataset.id;
        this.setState({
            alertModalFlag: true,
            temRowIdx: rowidx
        });
    }

    //取消警告
    _dismissAlert() {
        this.setState({
            alertModalFlag: false
        });
    }

    //关闭提示
    _dismissTips() {

        this.setState({
            tipsBox: {
                type: 'danger',
                text: '',
                flag: false
            }
        })
    }
    //渲染搜索组件
    _renderSearch() {
        return (
            <div className="col-xs-12 col-sm-6">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder='search' id='searchValue'
                           onChange={this._saveSearchValue.bind(this)}/>
                    <span className="input-group-addon" onClick={this._searchData.bind(this)}>start</span>
                </div>
                <br/>

            </div>

        )
    }
    //渲染全局提示组件
    _renderTips() {
        return (
            <div className={`alert alert-${this.state.tipsBox.type}`}>
                <button type="button" className="close" onClick={this._dismissTips.bind(this)}
                        aria-hidden="true">
                    X
                </button>
                {this.state.tipsBox.text}
            </div>
        )
    }

    //渲染警告Modal
    _renderAdd() {
        return (
            <div className="modal show" id="modal1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <p>添加新纪录</p>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal" id='form1'>
                                <div className="form-group">
                                    <div className="col-sm-2">
                                        <label htmlFor="" className="control-label">name:</label>
                                    </div>
                                    <div className="col-sm-8">
                                        <input ref='mName'  type="text" id="mName"
                                               className="form-control" placeholder="name"
                                               required="required" name='mName'/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-2 ">
                                        <label htmlFor="" className="control-label">age:</label>
                                    </div>
                                    <div className="col-sm-8">
                                        <input type="number" id="mAge" className="form-control" placeholder="age"
                                               required="required" name='mAge'/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-2 ">
                                        <label htmlFor="" className="control-label">sex:</label>
                                    </div>
                                    <div className="col-sm-8">
                                        <div className="radio">
                                            <label><input type="radio" defaultChecked={true} name='sex' value="男"/>male</label>
                                        </div>
                                        <div className="radio">
                                            <label> <input type="radio" name='sex' value="女"/>female</label>

                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-2">
                                        <label htmlFor="" className="control-label">like:</label>
                                    </div>
                                    <div className="col-sm-8">
                                        <input type="text" id="mLIke" className="form-control" placeholder="like"
                                               required="required" name='mLike'/>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <div className="pull-left">
                                <button className="btn btn-primary" onClick={this._submitAdd.bind(this)}>提交</button>
                                <button className="btn btn-primary" onClick={this._dismissAdd.bind(this)}>取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

    //渲染工具栏
    _renderTool() {

        return (
            <div className="panel-heading">
                {this.state.searchFlag ? this._renderSearch() :
                    <div className="col-xs-12 col-sm-6"><h3 className="text-center">React 表格组件demo</h3></div>}
                <div className="btn-group">
                    <button className="btn btn-primary" onClick={this._addModal.bind(this)}>添加</button>
                    <button className="btn btn-success" onClick={this._showSearch.bind(this)}>搜索</button>

                </div>
            </div>
        )
    }

    //渲染弹窗
    _renderAlert() {


        return (
            <div className="modal show" id="alert">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <p>确定要删除吗？</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" onClick={this._submitAlert.bind(this)}>确定</button>
                            <button className="btn btn-danger" onClick={this._dismissAlert.bind(this)}>取消</button>
                        </div>
                    </div>
                </div>
            </div>
        )


    }


    //渲染表格
    _renderTable() {
        return (
            <table className="table table-bordered table-hover">
                <thead>
                <tr>{

                    this.props.headers.map(function (title, idx) {
                        return <th key={idx}>{title}</th>;
                    }, this)
                }</tr>
                </thead>
                <tbody onDoubleClick={this._showEditor.bind(this)}>
                {this.state.exData.map((row, rowidx) => {
                    // console.warn('out:'+row);
                    return (

                        <tr key={rowidx}>{

                            //object.keys传出键cell。idx是map传出的键
                            Object.keys(row).map((cell, idx) => {

                                // console.log(row);
                                //console.warn('row:'+cell,'idx:'+idx);
                                let content = row[cell];
                                let edit = this.state.edit;//默认是null
                                if (edit && edit.row === rowidx && edit.cell === idx) {
                                    content = (
                                        <form onSubmit={this._save.bind(this)}>
                                            <input type="text" defaultValue={row[idx]}/>
                                        </form>
                                    );
                                }
                                return <td key={idx} data-row={rowidx}>{content}</td>;
                            }, this)}
                            <td>
                                <button className="btn btn-danger" data-id={rowidx}
                                        onClick={this._addAlert.bind(this)}>删除
                                </button>
                            </td>
                        </tr>

                    );
                }, this)}

                </tbody>
            </table>
        );
    }
    render() {
        return (
            <div className="Excel table-responsive">
                {this.state.tipsBox.flag ? this._renderTips() : ''}
                {this.state.alertModalFlag ? this._renderAlert() : ''}
                {this.state.addModalFlag ? this._renderAdd() : ''}
                {this._renderTool()}
                {this._renderTable()}
            </div>
        );
    }


}

iExcel.propTypes = {
    //默认表格头
    headers: PropTypes.arrayOf(PropTypes.string),
    //初始化数据
    initialData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

export default Excel