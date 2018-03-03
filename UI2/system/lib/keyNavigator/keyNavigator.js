define(function (require) {
	var $ = require('jquery');
    var Object = require("$UI/system/lib/base/object");
	var Observable = require("$UI/system/lib/base/observable");
	var layerManager = require("$UI/system/lib/base/layerManager");
	var Component = require("$UI/system/lib/base/component");
	var array = require("$UI/system/lib/base/array");
	var shell = require("$UI/system/lib/portal/shell");
	var windowWidth;
    var windowHeight;
    var isVisible = function (element) {
    	if (element.nodeType !== 1 || element.isEqualNode(document.body)) {
            return true;
        }
    	
        var computedStyle = window.getComputedStyle(element, null);
        
        if (computedStyle.getPropertyValue('display') !== 'none' && computedStyle.getPropertyValue('visibility') !== 'hidden') {
            return isVisible(element.parentNode);
        }
        return false;
    }
    
    var isVisibleInViewport = function(element){
    	var rect = element.getBoundingClientRect();
    	if(rect.width == 0 || rect.height == 0){
    		return false;
    	}
    	if(rect.left > windowWidth || rect.right < 0){
    		return false;
    	}
    	if(rect.top > windowHeight || rect.bottom < 0){
    		return false;
    	}
    	return isVisible(element);
    }
    
    var currentlyFocusedElement = "";
    var focusableElements = [];
    var domObserver;
    var keycodeMapping = {
        38 : 'up',
        40 : 'down',
        37 : 'left',
        39 : 'right',
        13 : 'enter'
    };
    
    var KeyNavigator = Object.extend({
		mixins:Observable,
		constructor: function(conf){
			Observable.prototype.constructor.call(this);
			this.mergeWeight = 1;
			this.cavarageWeight = 1;
			
			this.distanceWeight = 1;
			this.angleWeight = 1;
			
			this.focusedElement = null;
			this.focusableElements = [];
			this.autoFocusClass = 'x-autofocus'; 
			this.focusableSelector = '.x-focusable,.nav>li,.x-autofocus,.btn.btn-link,.x-modal-button';
			this.scope = document;
			this.focusedClass = "x-focused";
			this.enterSelectors = "a";
			this.keepSourceGroupXids = "",
			$.extend(this,conf);
			this.init();
		},
		//支持多次config的情况
		config:function(conf){
			$.extend(this,conf);
			this.initFocusableElements();
			this.autoFocus();
		},
		autoFocus:function(){
			var self = this;
			var autoFocusElement;
			$(this.focusableElements).each(function(index,element){
				if($(element).hasClass(self.autoFocusClass)){
					autoFocusElement = element;
					return false;
				}
			});
			if(autoFocusElement){
				this.focus(autoFocusElement);
			}else{
				autoFocusElement = this.focusableElements[0];
				this.focus(autoFocusElement);
			}
		},
		focus:function(element,eventData){
			$(element).trigger('keyNavigationFocus',eventData);
		},
		_focus:function(element){
			$(this.focusableElements).removeClass(this.focusedClass);
			this.focusedElement = element;
			$(element).addClass(this.focusedClass);
			if($(element).attr('auto-enter')){
				$(element).trigger('click');
				$(element).find(self.enterSelectors).trigger('click');
			}
		},
		
		init:function(){
			this.initFocusableElements();
			this.initKeepSourceGroup();
			this.initShellLayer();
			this.initFocusManager();
			this.initEvent();
			this.autoFocus();
			//this.initWatchMutations();
			this.initWatchLayerChange();
			
		},
		initShellLayer:function(){
			var self = this;
			shell.on("onPageInactive",function(event){
				layerManager.removeLayerIndex(event.container.$domNode);
			});
			shell.on("onPageActive",function(event){
				layerManager.setLayerIndex(event.container.$domNode);
			});
		},
		initFocusManager:function(){
			$(this.scope).on('keyNavigationFocus.keyNavigator',$.proxy(function(event){
				this._focus(event.target);
			},this));
		},
		initKeepSourceGroup:function(){
			var self = this;
			var xids = this.keepSourceGroupXids.split(',');
			$.each(xids,function(index,xid){
				var groupElement = $('[xid="'+xid+'"]').first();
				groupElement.on('keyNavigationFocus.keyNavigator',function(event,eventData){
					var component = Component.getComponent(event.currentTarget);
					//组内跳转
					if($(event.currentTarget).find(eventData.from).length){
						//组件情况
						if(component){
							if(component.componentName ==  "$model/UI2/system/components/justep/button/buttonGroup"){
								var xid  = $(event.target).attr('xid');
								component.select(xid);
								self._focus(event.target);
								event.stopPropagation();
							}else if(component.componentName ==  "$model/UI2/system/components/justep/tabs/tabs"){
								var xid  = $(event.target).attr('xid');
								component.setActiveTab(xid);
								self._focus(event.target);
								event.stopPropagation();
							}
						}
					//组外跳入	
					}else{
						if(component){
							if(component.componentName ==  "$model/UI2/system/components/justep/button/buttonGroup"){
								var activeElement = $(event.currentTarget).find('.active').get(0);
								if(activeElement){
									self._focus(activeElement);
									event.stopPropagation();
								}
							}else if(component.componentName ==  "$model/UI2/system/components/justep/tabs/tabs"){
								var activeElement = $(event.currentTarget).find('.active').get(0);
								if(activeElement){
									self._focus(activeElement);
									event.stopPropagation();
								}
							}
						}else{
							var activeElement = $(event.currentTarget).find('.active').get(0);
							if(activeElement){
								self._focus(activeElement);
								event.stopPropagation();
							}
						}
					}
				});
			});
		},
		initWatchLayerChange:function(){
			var self = this;
			layerManager.on('onLayerChange',function(event){
				var topmostLayer = event.topmostLayer;
				self.config({
					scope:topmostLayer.topmostElement
				});
				//等待非调试模式css加载完毕
				setTimeout(function(){
					self.config({
						scope:topmostLayer.topmostElement
					});
				},500);
				//等待调试模式css加载完毕
				setTimeout(function(){
					self.config({
						scope:topmostLayer.topmostElement
					});
				},1500);
			});
		},
		initFocusableElements:function(){
			windowWidth = $(window).width();
		    windowHeight = $(window).height();
			this.focusableElements = [];
			var self = this;
			$(this.scope).find(this.focusableSelector).each(function(index,element){
				self.addFocusableElement(element);
			});
		},
		initEvent:function(){
			var self = this;
			$('body').on('keydown.keyNavigator', function(event){
				var navDirection = keycodeMapping[event.keyCode];
				self.initFocusableElements();
				if(navDirection){
					if(self.focusedElement) {
						if(navDirection == "enter"){
							$(self.focusedElement).trigger('click');
							$(self.focusedElement).find(self.enterSelectors).trigger('click');
						}else{
							self.move(navDirection);
						}
						
			        } else {
			        	self.autoFocus();
			        }
					return false;
				}
			});
		},
		addFocusableElement:function(element){
			if(isVisibleInViewport(element)){
				if(!this.autoFocusSelector){
					this.autoFocusSelector = element;
				}
				$(element).attr('x-focusable',true);
				element.position = this.getPosition(element); 
				this.focusableElements.push(element);
			}
		},
		removeFocusableElement:function(element){
			array.remove(this.focusableElements,element);
		},
		getPosition:function(element){
			var rect = element.getBoundingClientRect(),
            centerX = Math.round(rect.left + (rect.width / 2)),
            centerY = Math.round(rect.top + (rect.height / 2));
	        return {
	            centerX : centerX,
	            centerY : centerY,
	            width:rect.width,
	            height:rect.height,
	            x : rect.left,
	            y : rect.top,
	            otx : centerX,
	            oty : rect.top,
	            obx : centerX,
	            oby : rect.bottom,
	            olx : rect.left,
	            oly : centerY,
	            orx : rect.right,
	            ory : centerY
	        };
		},
		
		/**
		 * 过滤方向正确的元素
		 */
		filterElementsByDirection:function(direction){
			var self = this;
			var currentPosition = this.focusedElement.position;
			return $(this.focusableElements).map(function(index,element){
				if(element != self.focusedElement){
					var position = element.position;
					if(direction == "up"){
						if(currentPosition.oty >= position.oby){
							return element;
						} 
					}else if(direction == "down"){
						if(currentPosition.oby <= position.oty){
							return element;
						};
					}else if(direction == "left"){
						if(currentPosition.olx >= position.orx){
							return element;
						};
					}else if(direction == "right"){
						if(currentPosition.orx <= position.olx){
							return element;
						};
					}
				}
			});
		},
		
		
		
		move:function(direction){
			var current = this.focusedElement;
			var filtedElementsByDirection = this.filterElementsByDirection(direction);
			if(filtedElementsByDirection.length == 0){
				this.fireEvent("reachEnd",{
					from:current,
					direction:direction
				});
				return;
			}
			var nearestElement = this.decisionElementByMergetAndCoverage(direction,current,filtedElementsByDirection);
			if(!nearestElement){
				console.log("采用第二算法");
				nearestElement = this.decisionElementByDistanceAndAngle(direction,current,filtedElementsByDirection);
			}
			var eventData = {
				from:current,
				to:nearestElement,
				direction:direction
			};
			this.focus(nearestElement,eventData);
		},
		/**
		 * 正投影算法确定跳转元素
		 */
		
		
		decisionElementByMergetAndCoverage:function(direction,current,filtedElementsByDirection){
			var maxMerge = 0;
			var self = this;
			var nearestElement;
			
			filtedElementsByDirection.map(function(index,other){
				if(direction == "up" || direction == "down"){
					if(!(current.olx > other.orx || current.orx < other.olx)){
						return other;
					}
				}else if(direction == "left" || direction == "right"){
					if(!(current.oty > other.oby || current.oby < other.oty)){
						return other;
					}
				}
			}).each(function(index,element){
				var result = self.getMergeAndCavarage(direction,current.position,element.position);
				element.mergeAndCavarageValue = result;
				if(result.merge > maxMerge){
					maxMerge = result.merge; 
				}
			}).each(function(index,element){
				if(!nearestElement){
					nearestElement = element;
				}
				var mergeAndCavarage = element.mergeAndCavarageValue;
				var relativeDistance = (self.mergeWeight * (mergeAndCavarage.merge == 0?0:(mergeAndCavarage.merge / maxMerge))) + (self.cavarageWeight* (1-mergeAndCavarage.cavarage))
				element.relativeDistance = relativeDistance;
				if(element.relativeDistance < nearestElement.relativeDistance){
					nearestElement = element; 
				}
			});
			return nearestElement;
		},
		getMergeAndCavarage:function(direction,current,other){
			var merge;
			var cavarage;
			if(direction == "up"){
				merge = current.oty - other.oby;
				var cavarageWidth = current.width + other.width - (Math.max(current.orx,other.orx) - Math.min(current.olx,other.olx))
				cavarage = cavarageWidth/Math.max(current.width,other.width);
			}else if(direction == "down"){
				merge = other.oty - current.oby;
				var cavarageWidth = current.width + other.width - (Math.max(current.orx,other.orx) - Math.min(current.olx,other.olx))
				cavarage = cavarageWidth/Math.max(current.width,other.width);
			}else if(direction == "left"){
				merge = current.olx - other.orx;
				var cavarageWidth = current.height + other.height - (Math.max(current.oby,other.oby) - Math.min(current.oty,other.oty))
				cavarage = cavarageWidth/Math.max(current.height,other.height);
				
			}else if(direction == "right"){
				merge = other.olx - current.orx;
				var cavarageWidth = current.height + other.height - (Math.max(current.oby,other.oby) - Math.min(current.oty,other.oty))
				cavarage = cavarageWidth/Math.max(current.height,other.height);
			}
	        return {
	            merge : merge,
	            cavarage : cavarage
	        };
		},
		/**
		 * 通过近边中心点距离和方向的夹角确定跳转元素
		 */
		decisionElementByDistanceAndAngle:function(direction,current,filtedElementsByDirection){
			var maxDistance = 0;
			var maxAngle = 0;
			var self = this;
			var nearestElement; 
			filtedElementsByDirection.each(function(index,element){
				var result = self.getDistanceAndAngle(direction,current.position,element.position);
				element.distanceAndAngleValue = result;
				if(result.distance > maxDistance){
					maxDistance = result.distance; 
				}
				if(result.angle > maxAngle){
					maxAngle = result.angle; 
				}
			}).each(function(index,element){
				if(!nearestElement){
					nearestElement = element;
				}
				var distanceAndAngle = element.distanceAndAngleValue;
				var relativeDistance = (self.distanceWeight * distanceAndAngle.distance / maxDistance) + (self.angleWeight * (maxAngle == 0?0:distanceAndAngle.angle / maxAngle)) 
				element.relativeDistance = relativeDistance;
				if(element.relativeDistance < nearestElement.relativeDistance){
					nearestElement = element; 
				}
			});
			return nearestElement;
		},
		
		
		getDistanceAndAngle:function(direction,current,other){
			var distance;
			var angle;
			var deltaX;
			var deltaY;
			if(direction == "up"){
				deltaY = current.oty - other.oby;
				if (current.centerX < other.centerX) {
					//右
					deltaX = other.obx - current.otx;
	            } else {
	            	//左
					deltaX = current.otx - other.obx;
	            }
				distance = Math.sqrt(Math.pow(deltaY, 2) + Math.pow(deltaX, 2));
				angle = Math.atan2(deltaY,deltaX) * 180 / Math.PI;
			}else if(direction == "down"){
				deltaY = other.oty - current.oby;
				if (current.centerX < other.centerX) {
					//右
					deltaX = other.otx - current.obx;
					
	            } else {
	            	//左
	            	deltaX = current.obx - other.otx;
	            }
				distance = Math.sqrt(Math.pow(deltaY, 2) + Math.pow(deltaX, 2));
				angle = Math.atan2(deltaY,deltaX) * 180 / Math.PI;
			}else if(direction == "left"){
				deltaX = current.olx - other.orx;
				if (current.centerY > other.centerY) {
					//上
					deltaY = current.oly - other.ory;
	            } else {
	            	//下
	            	deltaY = other.ory - current.oly;
	            }
				distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
				angle = Math.atan2(deltaX,deltaY) * 180 / Math.PI;
			}else if(direction == "right"){
				deltaX = current.olx - other.orx;
				if (current.centerY > other.centerY) {
					//上
					deltaY = current.ory - other.oly;
	            } else {
	            	//下
	            	deltaY = other.oly - current.ory;
	            }
				distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
				angle = Math.atan2(deltaX,deltaY) * 180 / Math.PI;
			}
	        return {
	            distance : distance,
	            angle : angle
	        };
		},
		getComputedResult:function(distance,angle,maxDistance,maxAngle){
			var result;
	        result = this.angleWeight * (angle / maxAngle) + this.distanceWeight * (distance / maxDistance);
	        return result;
		},
		
		//监控dom变化逻辑
		initWatchMutations:function(){
			var self = this;
			if(window.MutationObserver || window.WebKitMutationObserver) {
				if(this.mutationObserver){
					this.mutationObserver.disconnect();
					this.mutationObserver = null;
				}
	            this.mutationObserver = new MutationObserver(function(mutations) {
	            	setTimeout(function(){
	            		mutations.forEach(function(mutation) {
		                    if (mutation.addedNodes.length) {
		                        $.each(mutation.addedNodes, $.proxy(self._addNodeFromMutationEvent,self));
		                    }

		                    if (mutation.removedNodes.length) {
		                    	$.each(mutation.removedNodes, $.proxy(self._removeNodeFromMutationEvent,self));
		                    }
		                });
	            	},500);
	            });
	            this.mutationObserver.observe(this.scope, {
	                childList: true,
	                subtree : true
	            });
	        }
		},
		
		
		_addNodeFromMutationEvent:function(index,node) {
	        if(node.nodeType === 1 && node.nodeName !== '#comment') {
	        	var self = this;
				$(node).find(this.focusableSelector).each(function(index,element){
					self.addFocusableElement(element);
				});
	        	if($(node).parent().find(this.focusableSelector).index(node)){
	            	self.addFocusableElement(node);
	            }
	        }
	    },

	    _removeNodeFromMutationEvent:function(index,node) {
	        if(node.nodeType === 1 && node.nodeName !== '#comment') {
	        	var self = this;
	        	$(node).find(this.focusableSelector).each(function(index,element){
					self.removeFocusableElement(element);
				});
	        	if($(node).parent(this.focusableSelector).find().index(node)){
	        		self.removeFocusableElement(node);
	            }
	        }
	    }
	});
    return new KeyNavigator();
});