window.onload=function()
{
                        var search=document.getElementById('search');
                        var searchCheck = document.getElementById("searchCheck");
                        var plaDate=new Date();
                        var oPromptBtn=document.getElementsByClassName('promptBtn')[0];
                        var oSearchBtn=document.getElementById('searchBtn');
                        var plaText=[

                        "随用随走的临时文件分享网站-奶牛快传",
                        "周末电影推荐-经典黑色喜剧《两杆大烟枪》",
                        "一键下载网页上的图片",
                        "白嫖百度Ai的图片识别文字功能",
                        "充电的好时机~京东自营图书满100减50活动",
                        "白嫖百度Ai的图片识别文字功能",
                        "时间留下了美丽和一片狼藉，庆幸我们还有运气唱歌",
                        "据说这个网站的人像照片都是ai生成的",
                        "卓别林《淘金记》，吃鞋那段没笑死我😂",
                        "点击上面这个大柠檬Logo即可开启资源快搜条新功能↑↑↑",
                        "textify-用你自定义的字符来构成图片"


                                    ]
                        var plaLink=[

                        "https://cowtransfer.com/",
                        "https://neets.cc/detail/U983GniuiuL8bkdmLz1siQ",
                        "https://imagecyborg.com/?00123",
                        "http://ai.baidu.com/tech/ocr/general",
                        "https://union-click.jd.com/jdc?e=&p=AyIGZRprFDJWWA1FBCVbV0IUWVALHFBXCE9ETlcNVQtHRUVQVxkAGQB1UGxhCHouZh1LQglGVUdDR1cAF1tgf3BjISsJC1Z2WDUFGnV6Wk9WeRBIX05aVWcdGQ4iB1YYXxQAGgZUHWsVAxMGUR1ZEwIRN2UbWiVJfAZlG10QBxICUxJTFTISA1EZWhUFEwBWGFMdMhUHXCsAQGwWD1dPXR1WRgUFSF1BMiIHVBpaFAMaBVAZaxYyIjdXK1slXVZaCCtZFAMWDg%3D%3D&t=W1dCFFlQCxxQVwhPRE5XDVULR0VFUFcZABkAdVBsYQh6LmYdS0IJRlVHQ0dXABdbYH9wYyE%3D",
                        "http://ai.baidu.com/tech/ocr/general",
                        "https://music.163.com/#/song?id=409302053",
                        "https://thispersondoesnotexist.com/",
                        "https://v.youku.com/v_show/id_XNzM0NTc1MTMy.html",
                        "https://www.moulem.com/t/t2019032400.html",
                        "http://textify.it/?fr=moulem.com"




                                    ]

                        var plaUpdatedMonth=3
                        var plaUpdatedDate=16
                        if (plaDate.getMonth()+1==plaUpdatedMonth&&plaText[plaDate.getDate()-plaUpdatedDate]){
                            search.placeholder=plaText[plaDate.getDate()-plaUpdatedDate];
                            oPromptBtn.style.display='block';
                            oSearchBtn.title="不填关键词试试";
                        }
                        else{
                            search.placeholder="某柠檬_柠檬味的导航";

                        }



                        searchCheck.addEventListener("submit",function(event) {
                            var wordCheck = document.getElementsByClassName("textb")[0];

                            if (wordCheck.value.length <= 0) {
                                if (plaLink[plaDate.getDate()-plaUpdatedDate]){
                                    window.open(plaLink[plaDate.getDate()-plaUpdatedDate]);
                                }
                                else{

                                }

                                event.preventDefault()
                                return false;
                            }

                        });
}