<template>
    <!-- 底部 -->
    <div class="ai-footer-cover">
        <div class="ai-footer-cover-inner">
            <div class="ai-footer-cover-column">
                <div class="ai-footer-cover-about">
                    <div class="ai-footer-cover-column-title">关于AI Studio</div>
                    <div class="ai-footer-cover-column-cnt normal">AI
                        Studio是基于百度深度学习平台飞桨的人工智能学习与实训社区，提供在线编程环境、免费GPU算力、海量开源算法和开放数据，帮助开发者快速创建和部署模型。</div>
                </div><a class="ai-footer-cover-more" href="" target="_blank"><span
                    class="ai-footer-cover-more-item">了解:&nbsp;&nbsp;</span><img
                    src="" alt=""
                    class="ai-footer-cover-more-item paddle-icon"></a>
            </div>
            <div class="ai-footer-cover-column">
                <div class="ai-footer-cover-column-title extra">相关资源</div><a
                    href="" target="_blank"
                    class="ai-footer-cover-column-cnt">用户指南</a><a href=""
                                                                  target="_blank" class="ai-footer-cover-column-cnt">常见问题</a>
            </div>
            <div class="ai-footer-cover-column">
                <div class="ai-footer-cover-column-title extra">教育专区</div><a
                    href="" target="_blank"
                    class="ai-footer-cover-column-cnt">教育版介绍</a><a
                    href="" target="_blank"
                    class="ai-footer-cover-column-cnt">教育版使用文档</a><a class="ai-footer-cover-column-cnt">教师开课申请</a>
            </div>
            <div class="ai-footer-cover-column">
                <div class="ai-footer-cover-column-title extra">联系我们</div><span class="ai-footer-cover-column-cnt">邮箱: <a
                    href="mailto:aistudio@baidu.com" class="ai-footer-cover-link">aistudio@baidu.com</a></span><span
                    class="ai-footer-cover-column-cnt">官方QQ: 580959619</span>
            </div>
            <div class="ai-footer-cover-column qrcode"><img
                    src="../assets/image/wx_th.jpg" alt=""
                    class="ai-footer-cover-paddle-qrcode">
                <div class="ai-footer-cover-column-cnt qrcode">AI微信服务号</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>
    /*底部CSS*/
    .ai-footer-cover {
        background-color: #1a1a1a;
    }
    .ai-footer-cover-inner {
        box-sizing: border-box;
        width: 1400px;
        margin: 0 auto;
        height: 365px;
        padding-top: 75px;
        color: #fff;
        font-size: 0;
        font-weight: 400;
        position: relative;
    }
    .ai-footer-cover-column {
        display: inline-block;
        vertical-align: top;
        margin-right: 82px;
        font-size: 14px;
    }
    * {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .ai-footer-cover-column-title {
        font-size: 18px;
        color: #fff;
        line-height: 18px;
        margin-bottom: 20px;
    }
    .ai-footer-cover-column-cnt.normal {
        max-width: 300px;
    }
    .ai-footer-cover-more {
        opacity: .75;
    }
    .ai-footer-cover-column-title.extra {
        margin-bottom: 30px;
    }
    .ai-footer-cover-column-cnt {
        display: block;
        text-decoration: none;
        color: hsla(0,0%,100%,.66);
        margin-bottom: 20px;
        max-width: 190px;
        word-break: break-word;
        line-height: 22px;
    }
    .ai-footer-cover-column:last-child {
        margin-right: 0;
    }
    .ai-footer-cover-column-cnt.qrcode {
        text-align: center;
        margin-top: 15px;
        max-width: 200px;
    }
    .ai-footer-baseline-contain {
        height: 60px;
        flex: 0 0 60px;
        background-color: #000;
        font-size: 0;
        width: 100%;
    }
    .ai-footer-cover-paddle-qrcode {
        width: 200px;
        height: 200px;
    }
</style>