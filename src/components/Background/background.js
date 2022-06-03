import './background.css'

function Background(){
    return (
        <div style = {{position:"absolute", top:"0", left:"0" , width:"100%", height:"100%", background:"linear-gradient(90deg,#1E90FF, #070e29)"}}>
        <div id="earth">
            <div class="halfShadow"></div>
            <div id="lands">
                <div class="land"></div>
                <div class="land"></div>
                <div class="land"></div>
                <div class="land"></div>
                <div class="land"></div>
            </div>
            <div id="clouds">
                <div class="cloud"></div>
                <div class="cloud"></div>
                <div class="cloud"></div>
                <div class="cloud"></div>
                <div class="cloud"></div>
            </div>
        </div>
        <div id="earthSignal">
            <div class="eSignal"></div>
            <div class="eSignal"></div>
            <div class="eSignal"></div>
        </div>
        <div id="earthText">
            <h1 class="eTitle">Random World</h1>
            <h4 class="eSubTitle">Explore and have fun</h4>
        </div>
        </div>
    );
}

export default Background;