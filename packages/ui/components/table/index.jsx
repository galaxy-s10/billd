import { getScrollBarWidth } from '../utils/common';

const Table = {
  name: 'BTable',
  inheritAttrs: false,
  props: {
    rowKey: {
      type: String,
      default: undefined,
    },
    bordered: {
      type: Boolean,
    },
    sourceData: {
      type: Array,
      default() {
        return [];
      },
    },
    rowSelection: {
      type: Object,
      default() {
        return {};
      },
    },
    scroll: {
      type: Object,
      default() {
        return {};
      },
    },
    // columns: {
    //   type: Array,
    //   default: function () {
    //     return []
    //   }
    // },
  },
  render() {
    return (
      <div class={{ 'billd-table': true, border: this.bordered }}>
        <div class="table-scroll">
          <div
            class="billd-table-header billd-hide-scrollbar"
            style={{
              overflow: 'scroll',
              marginBottom: `-${this.scrollBarWidth}px`,
            }}
            ref="billd-table-scroll-head"
            vOn:scroll_self={(e) => this.normalScroll(e)}
          >
            <table
              style={{ width: this.scroll.x ? `${this.scroll.x}px` : '100%' }}
            >
              <colgroup>
                {this.rowSelection.type && (
                  <col class="billd-table-selection-col" />
                )}
                {this.columns.map((item, index) => (
                  <col
                    key={item.key}
                    column-key={this.getColumnKey(item) || index}
                    style={{
                      minWidth: `${item.width}px`,
                      width: `${item.width}px`,
                    }}
                  />
                ))}
              </colgroup>
              <thead class="billd-table-thead">
                <tr>
                  <th>
                    <div
                      class="billd-checkbox"
                      vOn:click={() => this.onSelectAll()}
                    >
                      <input
                        type="checkbox"
                        class={{
                          'billd-checkbox-input': true,
                          'billd-checkbox-checked': this.tableIsSelectAll,
                        }}
                        vModel={this.tableIsSelectAll}
                      />
                      {/* <!-- ????????????????????????????????????????????????????????????????????????????????????????????? --> */}
                      <span
                        class={{
                          'billd-checkbox-inner': true,
                          'none-selected':
                            this.selectedList.length -
                              this.intersection.length ===
                            0,
                          'no-all':
                            !(
                              this.selectedList.length -
                                this.intersection.length ===
                              0
                            ) &&
                            this.selectedList.length !== 0 &&
                            this.selectedList.length < this.sourceData.length,
                        }}
                      ></span>
                    </div>
                  </th>
                  {this.columns.map((item, index) => (
                    <th
                      key={index}
                      column-key={this.getColumnKey(item) || index}
                      style={{
                        'text-align': item.align ? item.align : 'left',
                      }}
                    >
                      {item.title}
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
          </div>
          <div
            class="billd-table-body billd-table-scroll-body"
            style={{ overflow: 'scroll', maxHeight: `${this.scroll.y}px` }}
            ref="billd-table-scroll-body"
            vOn:scroll_self={(e) => this.normalScroll(e)}
          >
            <table
              style={{ width: this.scroll.x ? `${this.scroll.x}px` : '100%' }}
            >
              <colgroup>
                {this.rowSelection.type && (
                  <col class="billd-table-selection-col" />
                )}
                {this.columns.map((item, index) => (
                  <col
                    key={index}
                    column-key={this.getColumnKey(item) || index}
                    style={{
                      minWidth: `${item.width}px`,
                      width: `${item.width}px`,
                    }}
                  />
                ))}
              </colgroup>
              <tbody class="billd-table-tbody" ref="billd-table-tbody">
                {this.sourceData.map((rowItem, rowIndex) => (
                  <tr
                    class={{ hovertr: rowIndex === this.nowTr }}
                    key={this.sourceData[rowIndex][this.getRowKey(rowItem)]}
                    row-key={this.sourceData[rowIndex][this.getRowKey(rowItem)]}
                    vOn:mouseenter={(e) => this.mouseEnter(e, rowIndex)}
                    vOn:mouseleave={(e) => this.mouseLeave(e)}
                  >
                    <td>
                      <div
                        class={{
                          'billd-checkbox': true,
                          'billd-checkbox-disabled':
                            this._getCheckboxProps(rowItem).disabled,
                        }}
                        vOn:click={(e) =>
                          this.onSelect(rowItem, this.isSelected(rowItem), e)
                        }
                      >
                        <input
                          type="checkbox"
                          class={{
                            'billd-checkbox-input': true,
                            'billd-checkbox-checked': this.isSelected(rowItem),
                            'billd-checkbox-disabled':
                              this._getCheckboxProps(rowItem).disabled,
                          }}
                          disabled={this._getCheckboxProps(rowItem).disabled}
                          value={rowItem}
                          vModel={this.selectedList}
                        />
                        {/* <!-- <input type="checkbox" disabled> --> */}
                        <span class={{ 'billd-checkbox-inner': true }}></span>
                      </div>
                    </td>
                    {this.columns.map((columnsItem, columnsIndex) => (
                      <td
                        key={this.getColumnKey(columnsItem) || columnsIndex}
                        row-key={this.getColumnKey(columnsItem) || columnsIndex}
                        class={{ ellipsis: columnsItem.ellipsis }}
                        style={{
                          'text-align': columnsItem.align
                            ? columnsItem.align
                            : 'left',
                        }}
                      >
                        {typeof columnsItem.render === 'function'
                          ? this.tempRender(
                              `${columnsItem.dataIndex}-${rowIndex}`,
                              rowItem,
                              columnsItem.render
                            )
                          : ''}
                        {typeof columnsItem.render === 'function'
                          ? this.$slots[`${columnsItem.dataIndex}-${rowIndex}`]
                          : this.getRowData(columnsItem, rowItem)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {this.fixedLeftData.length && (
          <div class="fixed-left">
            <div>
              <table style="min-width:auto">
                <colgroup>
                  {this.rowSelection.type && (
                    <col class="billd-table-selection-col" />
                  )}
                  {this.fixedLeftData.map((item, index) => (
                    <col
                      key={index}
                      column-key={item.column.key || index}
                      style={{
                        minWidth: `${item.column.col.width}px`,
                        width: `${item.column.col.width}px`,
                      }}
                    />
                  ))}
                </colgroup>
                <thead class="billd-table-thead">
                  <tr>
                    <th>
                      <div
                        class="billd-checkbox"
                        vOn:click={() => this.onSelectAll()}
                      >
                        <input
                          type="checkbox"
                          class={{
                            'billd-checkbox-input': true,
                            'billd-checkbox-checked': this.tableIsSelectAll,
                          }}
                          vModel={this.tableIsSelectAll}
                        />
                        {/* <!-- ????????????????????????????????????????????????????????????????????????????????????????????? --> */}
                        <span
                          class={{
                            'billd-checkbox-inner': true,
                            'none-selected':
                              this.selectedList.length -
                                this.intersection.length ===
                              0,
                            'no-all':
                              !(
                                this.selectedList.length -
                                  this.intersection.length ===
                                0
                              ) &&
                              this.selectedList.length !== 0 &&
                              this.selectedList.length < this.sourceData.length,
                          }}
                        ></span>
                      </div>
                    </th>
                    {this.fixedLeftData.map((item, index) => (
                      <th
                        key={index}
                        column-key={item.column.key || index}
                        style={{
                          'text-align': item.column.col.align
                            ? item.column.col.align
                            : 'left',
                        }}
                      >
                        {item.column.col.title}
                      </th>
                    ))}
                  </tr>
                </thead>
              </table>
            </div>
            <div
              style={{
                marginRight: `-${this.scrollBarWidth}px`,
                marginBottom: `-${this.scrollBarWidth}px`,
              }}
            >
              <div
                style={{
                  maxHeight: `${this.scroll.y}px`,
                  overflow: 'scroll',
                }}
                ref="billd-table-fixed-left-body"
                vOn:scroll_self={(e) => this.normalScroll(e)}
              >
                <table style="background:white">
                  <colgroup>
                    {this.rowSelection.type && (
                      <col class="billd-table-selection-col" />
                    )}
                    {this.fixedLeftData.map((item, index) => (
                      <col
                        key={item.column.key}
                        column-key={item.column.key || index}
                        style={{
                          minWidth: `${item.column.col.width}px`,
                          width: `${item.column.col.width}px`,
                        }}
                      />
                    ))}
                  </colgroup>
                  <tbody class="billd-table-tbody">
                    {this.sourceData.map((item, index) => (
                      <tr
                        key={this.sourceData[index][this.getRowKey(item)]}
                        row-key={this.sourceData[index][this.getRowKey(item)]}
                        style={{
                          height: `${this.trList[index]}px` || 'auto',
                        }}
                        class={{ hovertr: index === this.nowTr }}
                        vOn:mouseenter={(e) => this.mouseEnter(e, index)}
                        vOn:mouseleave={(e) => this.mouseLeave(e)}
                      >
                        <td>
                          <div
                            class={{
                              'billd-checkbox': true,
                              'billd-checkbox-disabled': this._getCheckboxProps(
                                this.fixedLeftData[0].data[index]
                              ).disabled,
                            }}
                            vOn:click={(e) =>
                              this.onSelect(
                                this.fixedLeftData[0].data[index],
                                this.isSelected(
                                  this.fixedLeftData[0].data[index]
                                ),
                                e
                              )
                            }
                          >
                            <input
                              type="checkbox"
                              class={{
                                'billd-checkbox-input': true,
                                'billd-checkbox-checked': this.isSelected(
                                  this.fixedLeftData[0].data[index]
                                ),
                                'billd-checkbox-disabled':
                                  this._getCheckboxProps(
                                    this.fixedLeftData[0].data[index]
                                  ).disabled,
                              }}
                              disabled={
                                this._getCheckboxProps(
                                  this.fixedLeftData[0].data[index]
                                ).disabled
                              }
                              value={this.fixedLeftData[0].data[index]}
                              vModel={this.selectedList}
                            />
                            <span
                              class={{ 'billd-checkbox-inner': true }}
                            ></span>
                          </div>
                        </td>
                        {this.fixedLeftData.map((col, colIndex) => (
                          <td
                            key={col.column.key || colIndex}
                            column-key={col.column.key || colIndex}
                            style={{
                              'text-align': col.column.col.align
                                ? col.column.col.align
                                : 'left',
                            }}
                          >
                            {typeof col.column.col.render === 'function'
                              ? this.tempRender(
                                  `fixed-left-${col.column.col.dataIndex}-${colIndex}-${index}`,
                                  col.data[index],
                                  col.column.col.render
                                )
                              : ''}
                            {typeof col.column.col.render === 'function'
                              ? this.$slots[
                                  `fixed-left-${col.column.col.dataIndex}-${colIndex}-${index}`
                                ]
                              : this.getRowData(
                                  col.column.col,
                                  col.data[index]
                                )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {this.fixedRightData.length && (
          <div class="fixed-right">
            <div>
              <table style="min-width:auto">
                <colgroup>
                  {this.fixedRightData.map((item, index) => (
                    <col
                      key={item.column.key}
                      column-key={item.column.key || index}
                      style={{
                        minWidth: `${item.column.col.width}px`,
                        width: `${item.column.col.width}px`,
                        color: 'red',
                      }}
                    />
                  ))}
                </colgroup>
                <thead class="billd-table-thead">
                  <tr>
                    {this.fixedRightData.map((item, index) => (
                      <th
                        key={item.column.key || index}
                        column-key={item.column.key || index}
                        style={{
                          'text-align': item.column.col.align
                            ? item.column.col.align
                            : 'left',
                        }}
                      >
                        {item.column.col.title}
                      </th>
                    ))}
                  </tr>
                </thead>
              </table>
            </div>
            <div
              style={{
                maxHeight: `${this.scroll.y}px`,
                overflow: 'scroll',
                marginBottom: `-${this.scrollBarWidth}px`,
              }}
              ref="billd-table-fixed-right-body"
              vOn:scroll_self={(e) => this.normalScroll(e)}
            >
              <table>
                <colgroup>
                  {this.fixedRightData.map((item, index) => (
                    <col
                      key={item.column.key || index}
                      column-key={item.column.key || index}
                      style={{
                        minWidth: `${item.column.col.width}px`,
                        width: `${item.column.col.width}px`,
                      }}
                    />
                  ))}
                </colgroup>
                <tbody class="billd-table-tbody">
                  {this.sourceData.map((item, index) => (
                    <tr
                      key={this.sourceData[index][this.getRowKey(item)]}
                      row-key={this.sourceData[index][this.getRowKey(item)]}
                      style={{ height: `${this.trList[index]}px` || 'auto' }}
                      class={{ hovertr: index === this.nowTr }}
                      vOn:mouseenter={(e) => this.mouseEnter(e, index)}
                      vOn:mouseleave={(e) => this.mouseLeave(e)}
                    >
                      {this.fixedRightData.map((col, colIndex) => (
                        <td
                          key={col.column.key || colIndex}
                          column-key={col.column.key || colIndex}
                          style={{
                            'text-align': col.column.col.align
                              ? col.column.col.align
                              : 'left',
                          }}
                        >
                          {typeof col.column.col.render === 'function'
                            ? this.tempRender(
                                `fixed-right-${col.column.col.key}-${colIndex}-${index}`,
                                col.data[index],
                                col.column.col.render
                              )
                            : ''}
                          {typeof col.column.col.render === 'function'
                            ? this.$slots[
                                `fixed-right-${col.column.col.key}-${colIndex}-${index}`
                              ]
                            : this.getRowData(col.column.col, col.data[index])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  },
  data() {
    return {
      // rowKey: "idd",
      // bordered: true,
      lastScrollTop: 0,
      lastScrollLeft: 0,
      fixedScrolling: false,
      normalScrolling: false,
      scrollBarWidth: 15,
      selectedIndex: [],
      selectedList: [], // ??????????????????
      canSelected: [],
      // tableIsSelectAll: false,
      nowTr: -1,
      trList: [],
      // scroll: { x: 1000, y: 300 }, // ???????????? scroll.x ???????????????????????????????????????????????????????????????????????????????????????????????? scroll.x
      // fixedLeft: [],
      // fixedRight: [],
      fixedLeftData: [],
      fixedRightData: [],
      allData: {},
      defaultCheckedList: [],
      defaultDisabledList: [],
      // defaultCheckedList: [200],
      // defaultDisabledList: [100, 200],
      intersection: [], // ??????
      union: [], // ??????
      difference: [], // ??????
      columns: this.$attrs.columns,
    };
  },
  watch: {
    selectedList(newVal, oldVal) {
      // console.log(newVal, oldVal);
      newVal.length === this.sourceData.length &&
        (this.tableIsSelectAll = true);
      // let key = this.getRowKey()
      const newSelectedRowKeys = newVal.map(
        (v) =>
          // console.log(v, "vv");
          v.key
      );
      const newSelectedRows = newVal;
      const oldSelectedRowKeys = oldVal.map((v) => v.key);
      const oldSelectedRows = oldVal;
      // console.log(
      //   '?????????????????????????????????onChange:',
      //   newSelectedRowKeys,
      //   newSelectedRows,
      //   oldSelectedRowKeys,
      //   oldSelectedRows
      // );
      this.$emit(
        'onChange',
        newSelectedRowKeys,
        newSelectedRows,
        oldSelectedRowKeys,
        oldSelectedRows
      );
      // function(newSelectedRowKeys, newSelectedRows,oldSelectedRowKeys,oldSelectedRows) {}
    },
  },
  computed: {
    tableIsSelectAll: {
      get() {
        const res =
          this.sourceData.length - this.intersection.length ===
          this.selectedList.length;
        const res1 =
          this.sourceData.length - this.difference.length ===
          this.selectedList.length;
        return res || res1;
      },
      set(v) {
        return v;
      },
    },
    isSelected() {
      return (v) => {
        const key = this.getRowKey(v);
        return (
          this.selectedList.filter((item) => item[key] === v[key]).length === 1
        );
      };
    },
    // nowHoverTr() {
    //   return (v) => {
    //     console.log(v);
    //     // console.log(this.nowTr);
    //     return v == this.nowTr;
    //   };
    // },
    getHeight() {
      return () =>
        // console.log(v);
        // console.log(this.$refs);
        // console.log(Object.keys(this.$refs).length, 9999);
        // console.log(this.$refs['billd-table-tbody']);
        `${100}px`;
    },
  },
  created() {
    // ?????????
    this.initTable();
  },
  mounted() {
    // ????????????
    this.asyncRowHeight();
    // ?????????????????????
    this.scrollBarWidth = getScrollBarWidth();
    console.log('?????????????????????', this.scrollBarWidth);
  },
  methods: {
    initTable() {
      /**
       * ??????????????????????????????
       * ???columns??????????????????????????????????????????????????????col??????????????????????????????????????????
       * ?????????????????????????????????????????????????????????
       */
      const allData = { left: [], normal: [], right: [] };
      const sortColumns = [];
      this.columns.forEach((item) => {
        // console.log(item);
        // ??????columnKey????????????
        const columnKey = this.getColumnKey(item);
        if (!columnKey) {
          console.error(
            'columnKey?????????column???key??????dataIndex?????????,?????????v-for????????????index??????columnKey'
          );
        }
        const fixed = item.fixed ? item.fixed : false;
        if (item.fixed === true || fixed === 'left') {
          const fixedLeftRowData = this.sourceData.filter((v) => {
            // row???key????????????rowKey > key
            const rowKey = this.getRowKey(v);
            if (!rowKey) {
              console.error(
                '?????????dataSource????????????????????????key??????????????????????????????rowKey???'
              );
            }
            return rowKey && v[rowKey];
          });
          allData.left.push({
            // column: { key: columnKey, col: item },
            // ?????????columnKey?????????key???????????????????????????col????????????columnKey???
            column: { key: columnKey, col: item },
            data: fixedLeftRowData,
          });
        } else if (fixed === 'right') {
          const fixedRightRowData = this.sourceData.filter((v) => {
            const rowKey = this.getRowKey(v);
            if (!rowKey) {
              console.error(
                '?????????dataSource????????????????????????key??????????????????????????????rowKey???'
              );
            }
            return rowKey && v[rowKey];
          });
          allData.right.push({
            column: { key: columnKey, col: item },
            data: fixedRightRowData,
          });
        } else {
          const normalRowData = this.sourceData.filter((v) => {
            // console.log(v, 39, item.key, item);
            const rowKey = this.getRowKey(v);
            if (!rowKey) {
              console.error(
                '?????????dataSource????????????????????????key??????????????????????????????rowKey???'
              );
            }
            return rowKey && v[rowKey];
          });
          allData.normal.push({
            column: { key: columnKey, col: item },
            data: normalRowData,
          });
        }
      });
      this.allData = allData;
      this.fixedLeftData = allData.left;
      this.fixedRightData = allData.right;
      const arr1 = Object.values(allData);
      console.log(arr1);
      arr1.forEach((item) => {
        console.log(item);
        item.forEach((v) => {
          console.log(v.column.title);
          sortColumns.push(v.column.col);
        });
      });
      console.log(sortColumns);
      this.columns = sortColumns;

      // ??????????????????????????????????????????
      const intersection = this.defaultCheckedList.filter(
        (v) => this.defaultDisabledList.indexOf(v) > -1
      );
      this.intersection = intersection;
      console.log('??????????????????????????????????????????', intersection);

      // ??????????????????????????????????????????
      this.union = Array.from(
        new Set(this.defaultCheckedList.concat(this.defaultDisabledList))
      );
      console.log('??????????????????????????????????????????', this.union);

      // ??????????????????????????????????????????
      this.difference = this.defaultDisabledList.filter(
        (v) => this.defaultCheckedList.indexOf(v) === -1
      );
      console.log('??????????????????????????????????????????', this.union);

      // ???????????????disabled?????????
      const canSelected = this.sourceData.filter(
        (v) => this.defaultDisabledList.indexOf(v.key) === -1
      );
      this.canSelected = canSelected;

      // ????????????????????????
      this.selectedList = this.sourceData.filter((item) => {
        console.log('????????????????????????', item);
        return this.defaultCheckedList.indexOf(item.key) !== -1;
      });
    },
    _getCheckboxProps(rowItem) {
      // console.log(rowItem,'============');
      const prop = this.rowSelection.getCheckboxProps(rowItem);
      if (prop.disabled) {
        // console.log(
        //   "???????????????disabled",
        //   this.getRowKey(rowItem),
        //   prop,
        //   rowItem
        // );
        // ??????????????????You may have an infinite update loop in a component render function.
        this.defaultDisabledList.indexOf(rowItem[this.getRowKey(rowItem)]) ===
          -1 && this.defaultDisabledList.push(rowItem[this.getRowKey(rowItem)]);
      } else if (prop.defaultChecked) {
        // console.log('???????????????defaultChecked',prop,rowItem);
        this.defaultCheckedList.indexOf(rowItem[this.getRowKey(rowItem)]) ===
          -1 && this.defaultCheckedList.push(rowItem[this.getRowKey(rowItem)]);
      }
      return prop;
    },
    /**
     * ?????????column???v-for??????key,????????????column.key>column.dataIndex
     * ??????column?????????????????????key????????????v-for??????????????????index??????columnKey
     */
    getColumnKey(column) {
      // columns???v-for??????key
      const columnKey = column.key || column.dataIndex;
      return columnKey;
    },
    // ?????????data-source???v-for??????key
    getRowKey(row) {
      // data-source???v-for??????key
      // console.log("columns???v-for??????key", row);
      const rowKey = this.rowKey || (row.key && 'key');
      return rowKey;
    },
    // ??????dataIndex,colunmItem:??????column???dataIndex,rowItem:??????data?????????
    getRowData(colunmItem, rowItem) {
      // let dataIndex = colunmItem.dataIndex
      // console.log(colunmItem, rowItem,colunmItem.dataIndex, "433333333333");
      return rowItem[colunmItem.dataIndex];
    },
    // ??????????????????/???????????????????????????
    onSelect(row, isSelected, event) {
      setTimeout(() => {
        // console.log(
        //   '??????????????????/???????????????????????????onSelect',
        //   '??????????????????',
        //   row,
        //   '????????????????????????',
        //   !isSelected,
        //   '????????????????????????',
        //   this.selectedList,
        //   'event???',
        //   event
        // );
        this.$emit('onSelect', row, !isSelected, this.selectedList, event);
      }, 0);
      // Function(row, isSelected, selectedRows, event){}
    },
    // ????????????
    onSelectAll() {
      // console.log(v);
      // console.log('????????????onSelectAll');
      let isAll = null;
      if (this.tableIsSelectAll) {
        // ????????????????????????????????????
        isAll = false;
        const selectKey = this.selectedList.map((v) => v.key);
        // console.log(selectKey);
        const changeData = this.sourceData.filter(
          (item) => selectKey.indexOf(item.key) === -1
        );
        console.log(
          '????????????',
          '???????????????',
          isAll,
          '?????????????????????',
          this.selectedList,
          '?????????????????????',
          // nowSelectedList,
          '??????????????????',
          changeData
        );
        this.$emit('onSelectAll', isAll, this.selectedList, changeData);
        this.selectedList = this.sourceData.filter(
          (v) => this.intersection.indexOf(v.key) !== -1
        );
      } else {
        // ?????????????????????????????????
        // console.log(changeData);
        isAll = true;
        // ??????????????????????????????key
        const selectKey = this.selectedList.map((v) => v.key);
        // // ???????????????disabled?????????
        // let canSelected = this.sourceData.filter(v => {
        //   return this.defaultDisabledList.indexOf(v.key) != -1;
        // });
        // this.canSelected = canSelected;

        // console.log(selectKey);
        // ????????????????????????
        const changeRows = this.canSelected.filter(
          (item) => selectKey.indexOf(item.key) === -1
        );
        // ?????????????????????(??????????????????????????????????????????????????????+????????????????????????)
        const nowSelectedRows = this.canSelected.concat(
          this.sourceData.filter((v) => v.key === this.intersection)
        );
        // let nowSelectedRows = this.sourceData.filter(
        //   item => this.defaultDisabledList.indexOf(item.key) == -1
        // );
        // function(isAll,oldSelectRows,nowSelectedRows,changeRows){}
        // console.log(
        //   '????????????',
        //   '???????????????',
        //   isAll,
        //   '?????????????????????',
        //   this.selectedList,
        //   '?????????????????????',
        //   nowSelectedRows,
        //   '??????????????????',
        //   changeRows
        // );
        this.$emit(
          'onSelectAll',
          isAll,
          this.selectedList,
          nowSelectedRows,
          changeRows
        );

        this.selectedList = nowSelectedRows;
      }
    },
    asyncRowHeight() {
      // console.log(this.$refs["billd-table-tbody"].children);
      const tr = this.$refs['billd-table-tbody'].children;
      const trList = [];
      for (let i = 0; i < tr.length; i += 1) {
        console.log(tr[i], tr[i].offsetHeight, '====================');
        trList.push(tr[i].offsetHeight);
      }
      this.trList = trList;
    },
    mouseEnter(e, v) {
      // console.log("mouseEnter");
      if (this.fixedLeftData.length || this.fixedRightData.length) {
        this.nowTr = v;
      }
    },
    mouseLeave() {
      // console.log("mouseLeave");
      if (this.fixedLeftData.length || this.fixedRightData.length) {
        this.nowTr = -1;
      }
    },
    normalScroll(e) {
      if (e.target === this.$refs['billd-table-scroll-head']) {
        // console.log(e.target);
      }
      const l = e.target.scrollLeft;
      const t = e.target.scrollTop;
      if (this.lastScrollTop !== t) {
        if (e.target === this.$refs['billd-table-scroll-body']) {
          // this.$refs["billd-table-scroll-body"] &&
          //   (this.$refs["billd-table-scroll-body"].scrollTop = t);
          // if (!this.fixedScrolling) {
          this.$refs['billd-table-fixed-left-body'] &&
            (this.$refs['billd-table-fixed-left-body'].scrollTop = t);
          this.$refs['billd-table-fixed-right-body'] &&
            (this.$refs['billd-table-fixed-right-body'].scrollTop = t);
        }
        if (e.target === this.$refs['billd-table-fixed-left-body']) {
          // console.log(e.target);
          this.$refs['billd-table-fixed-right-body'] &&
            (this.$refs['billd-table-fixed-right-body'].scrollTop = t);
          this.$refs['billd-table-scroll-body'] &&
            (this.$refs['billd-table-scroll-body'].scrollTop = t);
        }
        if (e.target === this.$refs['billd-table-fixed-right-body']) {
          // console.log(e.target);
          this.$refs['billd-table-fixed-left-body'] &&
            (this.$refs['billd-table-fixed-left-body'].scrollTop = t);
          this.$refs['billd-table-scroll-body'] &&
            (this.$refs['billd-table-scroll-body'].scrollTop = t);
        }
      }
      // ??????table-head?????????????????????????????????????????????????????????????????????table-head????????????bug
      if (this.lastScrollLeft !== l) {
        if (e.target === this.$refs['billd-table-scroll-body']) {
          // console.log("????????????");
          // this.$refs["billd-table-scroll-body"] &&
          //   (this.$refs["billd-table-scroll-body"].scrollTop = t);
          // normal-head????????????
          this.$refs['billd-table-scroll-head'] &&
            (this.$refs['billd-table-scroll-head'].scrollLeft = l);
          // this.$refs["billd-table-scroll-body"] &&
          //   (this.$refs["billd-table-scroll-body"].scrollLeft = l);
        }
        if (e.target === this.$refs['billd-table-scroll-head']) {
          console.log(e.target);
          this.$refs['billd-table-scroll-body'] &&
            (this.$refs['billd-table-scroll-body'].scrollLeft = l);
        }
      }
      // if (e.target == this.$refs["billd-table-scroll-body"]) {
      //   console.log("????????????");
      //   this.$refs["billd-table-scroll-body"] &&
      //     (this.$refs["billd-table-scroll-body"].scrollTop = t);
      // }
      // if (e.target == this.$refs["billd-table-scroll-head"]) {
      //   this.$refs["billd-table-scroll-body"] &&
      //     (this.$refs["billd-table-scroll-body"].scrollLeft = l);
      // }
      this.lastScrollTop = t; // ?????????????????????????????????
      this.lastScrollLeft = l; // ?????????????????????????????????
      // console.log("tttttttttttt", t);

      // this.normalScrolling = false;
    },
    // ????????????????????????????????????????????????????????????????????????????????????render?????????
    tempRender(name, row, dom) {
      const VNode = dom.call(this, this.$createElement, row);
      // console.log(VNode,'VNodeVNodeVNode');
      this.$slots[name] = VNode;
    },
  },
};

Table.install = function (Vue) {
  Vue.component(Table.name, Table);
};

export default Table;
