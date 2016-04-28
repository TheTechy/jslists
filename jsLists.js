/*
 * jsLists v0.3.2
 * © 2016 George Duff
 *
 * Release date: 01/06/2016
 * The MIT License (MIT)
 * Copyright (c) 2016 George Duff
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
 
 /*
  * To do list:
  * 1. Add parameter validation i.e === "undefined" & !== "UL" etc
  * 2. Ability to traverse dom for all lists without id
  *	3. Add state object to track which nodes are open or closed
  * 4. methods to expand all collapse all

  // prevent text from being selected unintentionally
	if (lis[index].addEventListener){
	lis[index].addEventListener(
	'mousedown', function (e){ e.preventDefault(); }, false);
	}else{
	lis[index].attachEvent(
	'onselectstart', function(){ event.returnValue = false; });
	}
  */

(function(){
	'use strict';
	function define_jsLists(){
		var jsLists = {};

		//Tester function
		jsLists.greet = function(){
			console.log("** Welcome to jsLists **");
		};

		jsLists.checkNodes = function(){
		};

		var getUL = function(){ //Private method
			return document.getElementsByTagName("UL");
		};

		var getOl = function(){
			return document.getElementsByTagName("OL");
		};

		var getAllLists = function(){
			var olLists = Array.prototype.slice.call(document.getElementsByTagName("UL")),
				ulLists = Array.prototype.slice.call(document.getElementsByTagName("OL"))
			var gLists = olLists.concat(ulLists);
			return gLists;
		}

		jsLists.collapseAll = function(listId){
			var i, olLists = Array.prototype.slice.call(document.getElementsByTagName("UL")),
				ulLists = Array.prototype.slice.call(document.getElementsByTagName("OL"))
			var gLists = olLists.concat(ulLists);

			for(i=1; i<gLists.length; i++){
				gLists[i].setAttribute('class', 'jsl-collapsed');
			};
		};

		jsLists.openAll = function(listId){
			var i, olLists = Array.prototype.slice.call(document.getElementsByTagName("UL")),
				ulLists = Array.prototype.slice.call(document.getElementsByTagName("OL"))
			var gLists = olLists.concat(ulLists);

			for(i=1; i<gLists.length; i++){
				gLists[i].setAttribute('class', 'jsl-open');
			};
		};

		jsLists.generateCss = function(){
			// Insert required CSS
			var css = document.createElement('style');
			var styles = ".jsl-collapsed{display: none;}";
			styles += ".jsl-collapsed-arrow{padding: 0px 8px 0px 0px;float: left; clear: both; width: 11px; height: 1.2rem; cursor: pointer; background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAKJJREFUeNqEkc0JxCAQhUfRg7EJweN2IikoJWxBkm4EexCvur4gi4kuO/Dw532O48i89y8ieje5Jk5zlKaz6RAArbW7MYYYYxNZa+Uxxj2EcGVyALsxCdF9B5gj4wgopW7rfiNf1fgzxFAbaa2/xrZt15hznuHRwKERWmZ+dGEJF7RnNFNKN7jPCx54tj6SEIKklJOwDx8cMh9oeNPfH/wIMABbu2PPHYUsbQAAAABJRU5ErkJggg==') no-repeat;}";
			styles += ".jsl-open{display: block;}";
			styles += ".jsl-open-arrow{background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALBAMAAABbgmoVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACRQTFRFtLS0tLS0tLS0AAAAtLS019fX8/Pz9PT09fX19vb29/f3+Pj4NWr6kwAAAAN0Uk5TK7P9wooeBQAAAD9JREFUCNdjYFRxcVFkYBBdvXv3UgEGrVVAoMDgPXPmzNkOcKrZ2LgbSHV0dICo8vLyagcGrbS0tCwFmD6IKQDtKxlF/vrVqgAAAABJRU5ErkJggg==') no-repeat;}";
			styles += ".jsl-li{paddingLeft: 11px;}";
			if (css.styleSheet) css.styleSheet.cssText = styles;
			else css.appendChild(document.createTextNode(styles));
			document.getElementsByTagName("head")[0].appendChild(css);			
		};

		jsLists.generateList = function(listId){
			this.generateCss();
			document.getElementById(listId).style = "display:none;"
			var i, olLists = Array.prototype.slice.call(document.getElementsByTagName("UL")),
				ulLists = Array.prototype.slice.call(document.getElementsByTagName("OL"))
			var gLists = olLists.concat(ulLists);

			for(i=1; i<gLists.length; i++){
				gLists[i].setAttribute('class', 'jsl-collapsed');
				var tglDiv = document.createElement("div");
				tglDiv.setAttribute('class', 'jsl-collapsed-arrow');
				tglDiv.setAttribute("id", listId + i +'_tgl');
				gLists[i].parentElement.insertBefore(tglDiv, gLists[i]);

				document.getElementById(listId + i +'_tgl').addEventListener('click', function(e){
					document.getElementById(e.target.id).classList.toggle('jsl-open-arrow');
					document.getElementById(e.target.id).parentElement.lastElementChild.classList.toggle('jsl-open');
					e.stopPropagation();
				},true);
			}
			setTimeout(function(){
				document.getElementById(listId).style = "display:block;"
			},100);
		};

		jsLists.applyToList = function(listId, listType){
			if(listType === "undefined" || listType !== "UL" || listType !== "ul" || listType !== "OL" || listType !== "ul"){
				console.log('ERROR: Invalid list type'); //Still to do back out if no valid type
			}
			switch(listType){
				case "UL":
					this.generateList(listId, "UL");
					break;
				case "OL":
					this.generateList(listId, "OL");
					break;
				case "all":
					this.generateList(listId);
					break;
				default:
					break;
			}
		};
	return jsLists;
}
	//define the jsLists library globally if it doesn't already exist
	if(typeof(jsLists) === 'undefined'){
		window.jsLists = define_jsLists();
	}else{
		console.log("jsLists already defined.");
	}
})();