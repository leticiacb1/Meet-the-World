import './background.css'

function Background(){
    return (
        <>
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
        </>
    );
}

export default Background;