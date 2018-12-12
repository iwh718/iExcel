'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Excel = function (_Component) {
    _inherits(Excel, _Component);

    function Excel(props) {
        _classCallCheck(this, Excel);

        var _this = _possibleConstructorReturn(this, (Excel.__proto__ || Object.getPrototypeOf(Excel)).call(this, props));

        _this.state = {
            exData: _this.props.initialData,
            edit: null,
            addModalFlag: false,
            deleteDataFlag: false, //控制删除
            alertModalFlag: false, //控制alert
            temRowIdx: '', //删除记录的位置
            searchFlag: false, //搜索组件控制
            saveSearchValue: '', //搜索值
            //提示词组件
            tipsBox: {
                text: '这是默认提示',
                type: 'success',
                flag: false
            }
        };
        return _this;
    }

    _createClass(Excel, [{
        key: '_showEditor',
        value: function _showEditor(e) {
            //修改edit值：添加行属性和单元格索引
            this.setState({
                edit: {
                    row: parseInt(e.target.dataset.row, 10),
                    cell: e.target.cellIndex
                }
            });
        }

        //控制搜索组件

    }, {
        key: '_showSearch',
        value: function _showSearch() {
            this.setState({
                searchFlag: !this.state.searchFlag
            });
        }

        //搜索值存储

    }, {
        key: '_saveSearchValue',
        value: function _saveSearchValue(e) {
            console.log(e.currentTarget.value);
            this.setState({
                saveSearchValue: e.currentTarget.value
            });
        }

        //渲染添加modal

    }, {
        key: '_addModal',
        value: function _addModal() {
            var _this2 = this;

            this.setState({
                addModalFlag: true
            }, function () {
                console.log(_this2.state.addModalFlag);
            });
        }

        //提交添加的数据

    }, {
        key: '_submitAdd',
        value: function _submitAdd() {
            var myData = $("#form1").serializeArray();
            var temData = [];
            var data = void 0;
            console.log(this.state.exData);
            if (this.state.exData[0] === undefined) {
                data = [];
            } else {
                data = this.state.exData;
            }
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = myData[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var i = _step.value;

                    temData.push(i.value);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            if (Excel._checkData(myData)) {

                this.setState({
                    addModalFlag: false,
                    exData: [].concat(_toConsumableArray(data), [temData]),
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

    }, {
        key: '_searchData',
        value: function _searchData() {
            if (this.state.saveSearchValue in this.state.exData) {
                console.log('found');
            } else {

                this.setState({
                    tipsBox: {
                        text: '没有发现这个记录！',
                        type: 'warning',
                        flag: true
                    }
                });
            }
        }

        //检验表单

    }, {
        key: '_dismissAdd',


        //关闭添加modal
        value: function _dismissAdd() {
            var _this3 = this;

            this.setState({
                addModalFlag: false
            }, function () {
                console.log(_this3.state.addModalFlag);
            });
        }

        //保存修改

    }, {
        key: '_save',
        value: function _save(e) {
            e.preventDefault();
            var input = e.target.firstChild;

            var data = this.state.exData;
            console.log(data);
            data[this.state.edit.row][this.state.edit.cell] = input.value;
            this.setState({
                edit: null,
                exData: data
            });
        }

        //提交删除

    }, {
        key: '_submitAlert',
        value: function _submitAlert() {
            var data = this.state.exData.slice();
            delete data[this.state.temRowIdx];
            this.setState({
                alertModalFlag: false,
                tipsBox: {
                    type: 'success',
                    text: "删除完成",
                    flag: true
                },
                exData: data
            });
        }

        //弹出警告

    }, {
        key: '_addAlert',
        value: function _addAlert(e) {

            var rowidx = e.currentTarget.dataset.id;
            this.setState({
                alertModalFlag: true,
                temRowIdx: rowidx
            });
        }

        //取消警告

    }, {
        key: '_dismissAlert',
        value: function _dismissAlert() {
            this.setState({
                alertModalFlag: false
            });
        }

        //关闭提示

    }, {
        key: '_dismissTips',
        value: function _dismissTips() {

            this.setState({
                tipsBox: {
                    type: 'danger',
                    text: '',
                    flag: false
                }
            });
        }
        //渲染搜索组件

    }, {
        key: '_renderSearch',
        value: function _renderSearch() {
            return _react2.default.createElement(
                'div',
                { className: 'col-xs-12 col-sm-6' },
                _react2.default.createElement(
                    'div',
                    { className: 'input-group' },
                    _react2.default.createElement('input', { type: 'text', className: 'form-control', placeholder: 'search', id: 'searchValue',
                        onChange: this._saveSearchValue.bind(this) }),
                    _react2.default.createElement(
                        'span',
                        { className: 'input-group-addon', onClick: this._searchData.bind(this) },
                        'start'
                    )
                ),
                _react2.default.createElement('br', null)
            );
        }
        //渲染全局提示组件

    }, {
        key: '_renderTips',
        value: function _renderTips() {
            return _react2.default.createElement(
                'div',
                { className: 'alert alert-' + this.state.tipsBox.type },
                _react2.default.createElement(
                    'button',
                    { type: 'button', className: 'close', onClick: this._dismissTips.bind(this),
                        'aria-hidden': 'true' },
                    'X'
                ),
                this.state.tipsBox.text
            );
        }

        //渲染警告Modal

    }, {
        key: '_renderAdd',
        value: function _renderAdd() {
            return _react2.default.createElement(
                'div',
                { className: 'modal show', id: 'modal1' },
                _react2.default.createElement(
                    'div',
                    { className: 'modal-dialog' },
                    _react2.default.createElement(
                        'div',
                        { className: 'modal-content' },
                        _react2.default.createElement(
                            'div',
                            { className: 'modal-header text-center' },
                            _react2.default.createElement(
                                'p',
                                null,
                                '\u6DFB\u52A0\u65B0\u7EAA\u5F55'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'modal-body' },
                            _react2.default.createElement(
                                'form',
                                { className: 'form-horizontal', id: 'form1' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'col-sm-2' },
                                        _react2.default.createElement(
                                            'label',
                                            { htmlFor: '', className: 'control-label' },
                                            'name:'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'col-sm-8' },
                                        _react2.default.createElement('input', { ref: 'mName', type: 'text', id: 'mName',
                                            className: 'form-control', placeholder: 'name',
                                            required: 'required', name: 'mName' })
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'col-sm-2 ' },
                                        _react2.default.createElement(
                                            'label',
                                            { htmlFor: '', className: 'control-label' },
                                            'age:'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'col-sm-8' },
                                        _react2.default.createElement('input', { type: 'number', id: 'mAge', className: 'form-control', placeholder: 'age',
                                            required: 'required', name: 'mAge' })
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'col-sm-2 ' },
                                        _react2.default.createElement(
                                            'label',
                                            { htmlFor: '', className: 'control-label' },
                                            'sex:'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'col-sm-8' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'radio' },
                                            _react2.default.createElement(
                                                'label',
                                                null,
                                                _react2.default.createElement('input', { type: 'radio', defaultChecked: true, name: 'sex', value: '\u7537' }),
                                                'male'
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'radio' },
                                            _react2.default.createElement(
                                                'label',
                                                null,
                                                ' ',
                                                _react2.default.createElement('input', { type: 'radio', name: 'sex', value: '\u5973' }),
                                                'female'
                                            )
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'col-sm-2' },
                                        _react2.default.createElement(
                                            'label',
                                            { htmlFor: '', className: 'control-label' },
                                            'like:'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'col-sm-8' },
                                        _react2.default.createElement('input', { type: 'text', id: 'mLIke', className: 'form-control', placeholder: 'like',
                                            required: 'required', name: 'mLike' })
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'modal-footer' },
                            _react2.default.createElement(
                                'div',
                                { className: 'pull-left' },
                                _react2.default.createElement(
                                    'button',
                                    { className: 'btn btn-primary', onClick: this._submitAdd.bind(this) },
                                    '\u63D0\u4EA4'
                                ),
                                _react2.default.createElement(
                                    'button',
                                    { className: 'btn btn-primary', onClick: this._dismissAdd.bind(this) },
                                    '\u53D6\u6D88'
                                )
                            )
                        )
                    )
                )
            );
        }

        //渲染工具栏

    }, {
        key: '_renderTool',
        value: function _renderTool() {

            return _react2.default.createElement(
                'div',
                { className: 'panel-heading' },
                this.state.searchFlag ? this._renderSearch() : _react2.default.createElement(
                    'div',
                    { className: 'col-xs-12 col-sm-6' },
                    _react2.default.createElement(
                        'h3',
                        { className: 'text-center' },
                        'React \u8868\u683C\u7EC4\u4EF6demo'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'btn-group' },
                    _react2.default.createElement(
                        'button',
                        { className: 'btn btn-primary', onClick: this._addModal.bind(this) },
                        '\u6DFB\u52A0'
                    ),
                    _react2.default.createElement(
                        'button',
                        { className: 'btn btn-success', onClick: this._showSearch.bind(this) },
                        '\u641C\u7D22'
                    )
                )
            );
        }

        //渲染弹窗

    }, {
        key: '_renderAlert',
        value: function _renderAlert() {

            return _react2.default.createElement(
                'div',
                { className: 'modal show', id: 'alert' },
                _react2.default.createElement(
                    'div',
                    { className: 'modal-dialog' },
                    _react2.default.createElement(
                        'div',
                        { className: 'modal-content' },
                        _react2.default.createElement(
                            'div',
                            { className: 'modal-header text-center' },
                            _react2.default.createElement(
                                'p',
                                null,
                                '\u786E\u5B9A\u8981\u5220\u9664\u5417\uFF1F'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'modal-footer' },
                            _react2.default.createElement(
                                'button',
                                { className: 'btn btn-primary', onClick: this._submitAlert.bind(this) },
                                '\u786E\u5B9A'
                            ),
                            _react2.default.createElement(
                                'button',
                                { className: 'btn btn-danger', onClick: this._dismissAlert.bind(this) },
                                '\u53D6\u6D88'
                            )
                        )
                    )
                )
            );
        }

        //渲染表格

    }, {
        key: '_renderTable',
        value: function _renderTable() {
            var _this4 = this;

            return _react2.default.createElement(
                'table',
                { className: 'table table-bordered table-hover' },
                _react2.default.createElement(
                    'thead',
                    null,
                    _react2.default.createElement(
                        'tr',
                        null,
                        this.props.headers.map(function (title, idx) {
                            return _react2.default.createElement(
                                'th',
                                { key: idx },
                                title
                            );
                        }, this)
                    )
                ),
                _react2.default.createElement(
                    'tbody',
                    { onDoubleClick: this._showEditor.bind(this) },
                    this.state.exData.map(function (row, rowidx) {
                        // console.warn('out:'+row);
                        return _react2.default.createElement(
                            'tr',
                            { key: rowidx },


                            //object.keys传出键cell。idx是map传出的键
                            Object.keys(row).map(function (cell, idx) {

                                // console.log(row);
                                //console.warn('row:'+cell,'idx:'+idx);
                                var content = row[cell];
                                var edit = _this4.state.edit; //默认是null
                                if (edit && edit.row === rowidx && edit.cell === idx) {
                                    content = _react2.default.createElement(
                                        'form',
                                        { onSubmit: _this4._save.bind(_this4) },
                                        _react2.default.createElement('input', { type: 'text', defaultValue: row[idx] })
                                    );
                                }
                                return _react2.default.createElement(
                                    'td',
                                    { key: idx, 'data-row': rowidx },
                                    content
                                );
                            }, _this4),
                            _react2.default.createElement(
                                'td',
                                null,
                                _react2.default.createElement(
                                    'button',
                                    { className: 'btn btn-danger', 'data-id': rowidx,
                                        onClick: _this4._addAlert.bind(_this4) },
                                    '\u5220\u9664'
                                )
                            )
                        );
                    }, this)
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'Excel table-responsive' },
                this.state.tipsBox.flag ? this._renderTips() : '',
                this.state.alertModalFlag ? this._renderAlert() : '',
                this.state.addModalFlag ? this._renderAdd() : '',
                this._renderTool(),
                this._renderTable()
            );
        }
    }], [{
        key: '_checkData',
        value: function _checkData(e) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = e[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var i = _step2.value;

                    if (i['value'].length <= 0 || i === '') {
                        return false;
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return true;
        }
    }]);

    return Excel;
}(_react.Component);

Excel.propTypes = {

    headers: _propTypes2.default.arrayOf(_propTypes2.default.string),
    initialData: _propTypes2.default.arrayOf(_propTypes2.default.arrayOf(_propTypes2.default.string))
};

exports.default = Excel;