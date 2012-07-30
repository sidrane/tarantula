/*
 * Ext JS Library 1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://www.extjs.com/license
 */


Ext.grid.RowSelectionModel=function(_1){Ext.apply(this,_1);this.selections=new Ext.util.MixedCollection(false,function(o){return o.id;});this.last=false;this.lastActive=false;this.addEvents({"selectionchange":true,"beforerowselect":true,"rowselect":true,"rowdeselect":true});this.locked=false;};Ext.extend(Ext.grid.RowSelectionModel,Ext.grid.AbstractSelectionModel,{singleSelect:false,initEvents:function(){if(!this.grid.enableDragDrop&&!this.grid.enableDrag){this.grid.on("mousedown",this.handleMouseDown,this);}else{this.grid.on("rowclick",function(_3,_4,e){if(e.button===0&&!e.shiftKey&&!e.ctrlKey){this.selectRow(_4,false);_3.view.focusRow(_4);}},this);}this.rowNav=new Ext.KeyNav(this.grid.getGridEl(),{"up":function(e){if(!e.shiftKey){this.selectPrevious(e.shiftKey);}else{if(this.last!==false&&this.lastActive!==false){var _7=this.last;this.selectRange(this.last,this.lastActive-1);this.grid.getView().focusRow(this.lastActive);if(_7!==false){this.last=_7;}}else{this.selectFirstRow();}}},"down":function(e){if(!e.shiftKey){this.selectNext(e.shiftKey);}else{if(this.last!==false&&this.lastActive!==false){var _9=this.last;this.selectRange(this.last,this.lastActive+1);this.grid.getView().focusRow(this.lastActive);if(_9!==false){this.last=_9;}}else{this.selectFirstRow();}}},scope:this});var _a=this.grid.view;_a.on("refresh",this.onRefresh,this);_a.on("rowupdated",this.onRowUpdated,this);_a.on("rowremoved",this.onRemove,this);},onRefresh:function(){var ds=this.grid.dataSource,i,v=this.grid.view;var s=this.selections;s.each(function(r){if((i=ds.indexOfId(r.id))!=-1){v.onRowSelect(i);}else{s.remove(r);}});},onRemove:function(v,_11,r){this.selections.remove(r);},onRowUpdated:function(v,_14,r){if(this.isSelected(r)){v.onRowSelect(_14);}},selectRecords:function(_16,_17){if(!_17){this.clearSelections();}var ds=this.grid.dataSource;for(var i=0,len=_16.length;i<len;i++){this.selectRow(ds.indexOf(_16[i]),true);}},getCount:function(){return this.selections.length;},selectFirstRow:function(){this.selectRow(0);},selectLastRow:function(_1b){this.selectRow(this.grid.dataSource.getCount()-1,_1b);},selectNext:function(_1c){if(this.last!==false&&(this.last+1)<this.grid.dataSource.getCount()){this.selectRow(this.last+1,_1c);this.grid.getView().focusRow(this.last);}},selectPrevious:function(_1d){if(this.last){this.selectRow(this.last-1,_1d);this.grid.getView().focusRow(this.last);}},getSelections:function(){return[].concat(this.selections.items);},getSelected:function(){return this.selections.itemAt(0);},clearSelections:function(_1e){if(this.locked){return;}if(_1e!==true){var ds=this.grid.dataSource;var s=this.selections;s.each(function(r){this.deselectRow(ds.indexOfId(r.id));},this);s.clear();}else{this.selections.clear();}this.last=false;},selectAll:function(){if(this.locked){return;}this.selections.clear();for(var i=0,len=this.grid.dataSource.getCount();i<len;i++){this.selectRow(i,true);}},hasSelection:function(){return this.selections.length>0;},isSelected:function(_24){var r=typeof _24=="number"?this.grid.dataSource.getAt(_24):_24;return(r&&this.selections.key(r.id)?true:false);},isIdSelected:function(id){return(this.selections.key(id)?true:false);},handleMouseDown:function(e,t){var _29=this.grid.getView(),_2a;if(this.isLocked()||(_2a=_29.findRowIndex(t))===false){return;}if(e.shiftKey&&this.last!==false){var _2b=this.last;this.selectRange(_2b,_2a,e.ctrlKey);this.last=_2b;_29.focusRow(_2a);}else{var _2c=this.isSelected(_2a);if(e.button!=0&&_2c){_29.focusRow(_2a);}else{if(e.ctrlKey&&_2c){this.deselectRow(_2a);}else{this.selectRow(_2a,e.button==0&&(e.ctrlKey||e.shiftKey));_29.focusRow(_2a);}}}},selectRows:function(_2d,_2e){if(!_2e){this.clearSelections();}for(var i=0,len=_2d.length;i<len;i++){this.selectRow(_2d[i],true);}},selectRange:function(_31,_32,_33){if(this.locked){return;}if(!_33){this.clearSelections();}if(_31<=_32){for(var i=_31;i<=_32;i++){this.selectRow(i,true);}}else{for(var i=_31;i>=_32;i--){this.selectRow(i,true);}}},deselectRange:function(_35,_36,_37){if(this.locked){return;}for(var i=_35;i<=_36;i++){this.deselectRow(i,_37);}},selectRow:function(_39,_3a,_3b){if(this.locked||(_39<0||_39>=this.grid.dataSource.getCount())){return;}if(this.fireEvent("beforerowselect",this,_39,_3a)!==false){if(!_3a||this.singleSelect){this.clearSelections();}var r=this.grid.dataSource.getAt(_39);this.selections.add(r);this.last=this.lastActive=_39;if(!_3b){this.grid.getView().onRowSelect(_39);}this.fireEvent("rowselect",this,_39,r);this.fireEvent("selectionchange",this);}},deselectRow:function(_3d,_3e){if(this.locked){return;}if(this.last==_3d){this.last=false;}if(this.lastActive==_3d){this.lastActive=false;}var r=this.grid.dataSource.getAt(_3d);this.selections.remove(r);if(!_3e){this.grid.getView().onRowDeselect(_3d);}this.fireEvent("rowdeselect",this,_3d);this.fireEvent("selectionchange",this);},restoreLast:function(){if(this._last){this.last=this._last;}},acceptsNav:function(row,col,cm){return!cm.isHidden(col)&&cm.isCellEditable(col,row);},onEditorKey:function(_43,e){var k=e.getKey(),_46,g=this.grid,ed=g.activeEditor;if(k==e.TAB){e.stopEvent();ed.completeEdit();if(e.shiftKey){_46=g.walkCells(ed.row,ed.col-1,-1,this.acceptsNav,this);}else{_46=g.walkCells(ed.row,ed.col+1,1,this.acceptsNav,this);}}else{if(k==e.ENTER&&!e.ctrlKey){e.stopEvent();ed.completeEdit();if(e.shiftKey){_46=g.walkCells(ed.row-1,ed.col,-1,this.acceptsNav,this);}else{_46=g.walkCells(ed.row+1,ed.col,1,this.acceptsNav,this);}}else{if(k==e.ESC){ed.cancelEdit();}}}if(_46){g.startEditing(_46[0],_46[1]);}}});