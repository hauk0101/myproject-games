/**
 * Created by YaoQiao on 2016/5/26.
 */

!function(){
    var pageElement = {
        index:$("#index"),
        room:$("#room"),
        dialog:$("#dialog"),
        play:$("#startBtn"),
        soundBtn:$("#music_btn"),
        music:$(".music")
    };
    var ua = window.navigator.userAgent.toLowerCase();
    var isAndroid = /android/i.test(ua);
    var isIOS = /iphone|ipad|ipod/i.test(ua);
    var app = {
        init:function(){
            this.initEvent();
            this.loading();
            pageElement.music.get(0).play();
        },
        loading:function(){
            app.render();
        },
        render:function(){
            pageElement.room.hide();
            pageElement.index.hide();
            pageElement.dialog.hide();
            pageElement.index.show();

        },
        initEvent:function(){
            var clickEventType = "ontouchstart" in document.documentElement ? "touchstart":"click";
            var myApp = this;
            pageElement.play.on(clickEventType,function(){
                var type = $(this).data("type") || "color";
                pageElement.index.hide();
                Game.init(type,pageElement.room,myApp);
                API.btn.stopBtnShow();
            });
            pageElement.soundBtn.on(clickEventType,function(){
                if(pageElement.music.get(0).paused)
                {
                    pageElement.music.get(0).play();
                    pageElement.soundBtn.addClass("cur");
                }
                else
                {
                    pageElement.music.get(0).pause();
                    pageElement.soundBtn.removeClass("cur");
                }
            });



        }

    };
    app.init();
    window.API={};

}();
