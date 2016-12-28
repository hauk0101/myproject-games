/**
 * Created by YaoQiao on 2016/5/26.
 */
var _config = {
    color:{
        allTime:30,
        addTime:0,
        lvMap:[2,3,4,5,6,7,8]
    }
};

!function(){
    var box = $("#box");
    var pageElement = {
        lv:$("#room .lv em"),
        time:$("#room .time"),
        dialog:$("#dialog"),
        start:$("#dialog .btn-restart"),
        room:$("#room"),
        d_content:$("#dialog .content"),
        d_gameover:$("#dialog .gameover"),
        d_share:$("#public_account"),
        share_btn:$("#share_btn"),
        game_score:$("#dialog #score"),
        gameover_tip:$("#gameover_tip")
    };
    var gameObject = {
        target:1,
        finded:0,
        score:-1,
        init:function(type,el,parent){
            this.type = type;
            this.target = "color2" == type ? 2: 1;
            this.api = API[type];
            this.config = _config[type];
            this.reset();
            this.parent = parent;
            this.el = el;
            this.renderUI();
            this.inited || this.initEvent();
            this.inited = true;
            API.score  = {value:0};
            this.start();
        },
        renderUI:function(){
            var isLandscape = 90 == window.orientation || -90 == window.orientation;
            var width = isLandscape ? window.innerHeight : window.innerWidth;
            width -=20;
            width = Math.min(width,500);
            box.width(width).height(width);
            this.el.show();
        },
        initEvent:function(){
            var eventName = "ontouchstart" in document.documentElement?"touchend":"click";
            var myGame = this;
            myGame.renderUI();
            box.on(eventName,"span",function(){
                var type = $(this).data("type");
                if("a" == type){
                    $(this).css("background-color","#f00").data("type","").html("<em></em>");
                    myGame.finded++;
                    if(myGame.finded == myGame.target){
                        API.btn.playBtnSound();
                        myGame.nextLv.call(myGame);
                    };
                }
            });
            pageElement.start.on(eventName,function(){
                myGame.score = 0;
                pageElement.time.html(0);
                myGame.reset();
                myGame.start();
            });
            pageElement.share_btn.on(eventName,function(){
                pageElement.share_btn.fadeOut();
                pageElement.d_share.fadeIn();
                API.btn.stopBtnShow();
            });
        },
        start:function(){
            this.time > 10 && pageElement.time.removeClass("danger");
            this.finded = 0;
            pageElement.dialog.hide();
            pageElement.gameover_tip.hide();
            this.lv = "undefined" != typeof this.lv ? this.lv + 1:0;
            this.lvMap = this.config.lvMap[this.lv] || _.last(this.config.lvMap);
            this.renderMap();
            this.renderInfo();
            this.timer || (this.timer = setInterval(_.bind(this.tick,this),1000));
        },
        tick:function(){
            this.time --;
            this.time < 10 && pageElement.time.addClass("danger");
            if(this.time < 0){
                this.gameOver();
            }
            else{
                pageElement.time.text(parseInt(this.time));

            }
        },
        renderMap:function(){
            var n  = this.lvMap * this.lvMap;
            var c = "";
            var d = "lv" + this.lvMap;
            _(n).times(function(){
               c += "<span></span>"
            });
            box.attr("class",d).html(c);
            this.api.render(this.lvMap,this.lv);
        },
        renderInfo:function(){
            this.score +=1;
            pageElement.lv.text(this.score);
        },
        gameOver:function(){
            clearInterval(this.timer);
            var game_score = this.score;                               
            box.fadeOut(500);
            var tipTimer;
            function showGameOver(){
                clearTimeout(tipTimer);
                pageElement.gameover_tip.fadeOut(1000,function(){
                    pageElement.room.fadeOut(300);
                    pageElement.dialog.fadeIn(300);
                    pageElement.d_share.hide();
                    pageElement.game_score.text(game_score);
                    pageElement.d_gameover.show();
                    API.btn.shareBtnShow();
                });
            };
            pageElement.gameover_tip.fadeIn(500,function(){
                tipTimer =  setTimeout(showGameOver,2000);
            });

        },
        reset:function(){
            this.time = this.config.allTime;
            this.lv = -1;
        },
        nextLv:function(){
            if(this.time >= 0){
                pageElement.time.text(parseInt(this.time));
                this.start();
            }

        }
    };
    window.Game = gameObject;
}();