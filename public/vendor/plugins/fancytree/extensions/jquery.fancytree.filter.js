/*!
* jquery.fancytree.filter.js
*
* Remove or highlight tree nodes, based on a filter.
* (Extension module for jquery.fancytree.js: https://github.com/mar10/fancytree/)
*
* Copyright (c) 2014, Martin Wendt (http://wwWendt.de)
*
* Released under the MIT license
* https://github.com/mar10/fancytree/wiki/LicenseInfo
*
* @version 2.6.0
* @date 2014-11-29T08:33
*/;(function($,window,document,undefined){"use strict";function _escapeRegex(str){return(str+"").replace(/([.?*+\^\$\[\]\\(){}|-])/g,"\\$1");}
$.ui.fancytree._FancytreeClass.prototype._applyFilterImpl=function(filter,branchMode,leavesOnly){var match,re,count=0,hideMode=this.options.filter.mode==="hide";leavesOnly=!!leavesOnly&&!branchMode;if(typeof filter==="string"){match=_escapeRegex(filter);re=new RegExp(".*"+match+".*","i");filter=function(node){return!!re.exec(node.title);};}
this.enableFilter=true;this.lastFilterArgs=arguments;this.$div.addClass("fancytree-ext-filter");if(hideMode){this.$div.addClass("fancytree-ext-filter-hide");}else{this.$div.addClass("fancytree-ext-filter-dimm");}
this.visit(function(node){delete node.match;delete node.subMatch;});this.visit(function(node){if((!leavesOnly||node.children==null)&&filter(node)){count++;node.match=true;node.visitParents(function(p){p.subMatch=true;});if(branchMode){node.visit(function(p){p.match=true;});return "skip";}}});this.render();return count;};$.ui.fancytree._FancytreeClass.prototype.filterNodes=function(filter,leavesOnly){return this._applyFilterImpl(filter,false,leavesOnly);};$.ui.fancytree._FancytreeClass.prototype.applyFilter=function(filter){this.warn("Fancytree.applyFilter() is deprecated since 2014-05-10. Use .filterNodes() instead.");return this.filterNodes.apply(this,arguments);};$.ui.fancytree._FancytreeClass.prototype.filterBranches=function(filter){return this._applyFilterImpl(filter,true,null);};$.ui.fancytree._FancytreeClass.prototype.clearFilter=function(){this.visit(function(node){delete node.match;delete node.subMatch;});this.enableFilter=false;this.lastFilterArgs=null;this.$div.removeClass("fancytree-ext-filter fancytree-ext-filter-dimm fancytree-ext-filter-hide");this.render();};$.ui.fancytree.registerExtension({name:"filter",version:"0.3.0",options:{autoApply:true,mode:"dimm"},treeInit:function(ctx){this._super(ctx);},nodeLoadChildren:function(ctx,source){return this._super(ctx,source).done(function(){if(ctx.tree.enableFilter&&ctx.tree.lastFilterArgs&&ctx.options.filter.autoApply){ctx.tree._applyFilterImpl.apply(ctx.tree,ctx.tree.lastFilterArgs);}});},nodeRenderStatus:function(ctx){var res,node=ctx.node,tree=ctx.tree,$span=$(node[tree.statusClassPropName]);res=this._super(ctx);if(!$span.length||!tree.enableFilter){return res;}
$span.toggleClass("fancytree-match",!!node.match).toggleClass("fancytree-submatch",!!node.subMatch).toggleClass("fancytree-hide",!(node.match||node.subMatch));return res;}});}(jQuery,window,document));