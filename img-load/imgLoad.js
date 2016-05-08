/*
* author:海子
*
*
* 依赖jquery 
* 参数
*  obj:在指定dom对象下寻找对应的图片
*  data-src：储存图片地址的自定义属性
*  bDefaultImg：是否有默认图片
*  
*/
function  fImgLoad(oJson){
	this.init.apply(this,arguments);
}

fImgLoad.prototype={
	init:function(oJson){
		var _option={
			dataSrc : 'data-src',
			obj : $('body'),
			bDefaultImg:false,
			sImgSrc:'loading.gif'
		};

		for(var key in oJson){
			_option[key] = oJson[key];
		};
		_option.imgArray = _option.obj.find('img['+_option.dataSrc+']');
		this.option = _option;
		if(this.option['bDefaultImg']){
			this.defaultImg();
		};
		this.loadImg();
		this.scrollRender();
	},
	defaultImg:function(){
		var _that=this;
		this.option['imgArray'].each(function(i){
			this.src=_that.option['sImgSrc'];
		})
	},
	loadImg:function(){
		var _opt = this.option,
			_img = _opt['imgArray'],
			_that = this;
		if(_img.length){
			for(var i = 0; i < _img.length; i++){
				var _this = _img[i];
				if(this.isLoad(_this)){
					_that.newImg($(_this),$(_this).attr(_opt['dataSrc']));
					$(_this).removeAttr(_opt.dataSrc);
					_that.option.imgArray = _opt.obj.find('img['+_opt.dataSrc+']');
				}
			}
		}else{
			$(window).off('scroll',_that.callLoadImg);
		}
		
	},
	newImg:function(obj,src){
		var oImg = new Image();
			oImg.onload=function(){
				obj.attr('src',src)
			};
			oImg.src = src;
	},
	isLoad:function(img){
		var _scrollTop = $(window).scrollTop(),
			_winHeight = $(window).height(),
			_imgTop = img.offsetTop,
			_height = img.offsetHeight;

		if(_scrollTop+_winHeight>=_imgTop && _imgTop+_height>=_scrollTop){
			return true;
		}
		return false;

	},
	scrollRender:function(){
		_that = this;
		
		$(window).on('scroll',_that.callLoadImg);
	},
	callLoadImg:function(){
		_that.loadImg.call(_that);
	}
}