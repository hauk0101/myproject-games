/**
 * Created by YaoQiao on 2016/5/26.
 */
!function(){
    var box = $("#box");
    var startBtn = $(".start_btn");
    var shareBtn = $("#share_btn");
    var btnSound = $("#btn_sound");
    var span = "span";
    var urlBtn = [
            "images/start01.png",
            "images/start02.png",
            "images/share01.png",
            "images/share02.png"
        ];
    var startBtnFlg = 0;
    var shareBtnFlg = 2;
    var urlStr = {
        start:"images/pic",
        end:".png"
    };
    API.color = {
        render:function(lvMap,f){
            var url1;
            var url2 = urlStr.start + 0 + urlStr.end;

            var spanCount = lvMap * lvMap;
            for(var i = 0; i < spanCount; i ++) {
                url1 = urlStr.start + Math.floor(Math.random() * 4 + 1) + urlStr.end;
                box.find(span).eq(i).css({
                    "background":"url(" + url1 + ")",
                    "background-size":"cover"
                });
            }
            var h = Math.floor(Math.random() * spanCount);
            box.find(span).eq(h).css({
                "background":"url("+ url2 +")",
                "background-size":"cover"
            }).data("type","a");
        },
        getGameOverText:function(lv){
        }
    };
    API.btn = {
        startBtnShow:function(){
            this.startBtnTimer || (this.startBtnTimer = setInterval(_.bind(this.changeStartBtn),1000));
        },
        changeStartBtn:function(){
            startBtn.find("img").attr("src",urlBtn[startBtnFlg]);
            if(startBtnFlg == 0){
                startBtnFlg = 1;
            }
            else{
                startBtnFlg = 0;
            }
        },
        shareBtnShow:function(){
            this.shareBtnTimer || (this.shareBtnTimer = setInterval(_.bind(this.changeShareBtn),1000));
        },
        changeShareBtn:function(){
            shareBtn.find("img").attr("src",urlBtn[shareBtnFlg]);
            shareBtnFlg = shareBtnFlg == 3 ? 2 : 3;
        },
        stopBtnShow:function(){
            clearInterval(this.startBtnTimer);
            clearInterval(this.shareBtnTimer);
        },
        playBtnSound:function(){
            if(!btnSound.get(0).play())
            {
                btnSound.get(0).play();
            }
        }
    };

    API.btn.startBtnShow();
}();