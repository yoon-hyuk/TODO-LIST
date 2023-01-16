let getBackgroundImage = async () => {

    let clientId = 'VzkEWCerAWrLFqt9L8b09CBFokF0TaukIKBUyWy8Z0c';
    let url = 'https://api.unsplash.com/photos/random?';

    let params = {
        client_id:clientId,
        'orientation':'landscape',
        query:'landscape'
    }

    let res = await fetch(url + getQueryString(params));
    let imgData = res.json();
    return imgData;
}

let createUnsplashToken = async () => {
    let imgData = await getBackgroundImage();

    let imgURL = imgData.urls.regular;
    console.dir(imgData.location.name);
    let location = imgData.location.name?imgData.location.name:'with multicampus...';

    let expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate()+1);

    let unSplashToken = {
        url:imgURL,
        'location':location,
        expiresOn:expirationDate.getTime()
    }

    localStorage.setItem('unSplashToken', JSON.stringify(unSplashToken));
    return unSplashToken;
}

let getUnsplashToken = async () => {

    let token = JSON.parse(localStorage.getItem('unSplashToken'));

    // token이 있고 token 만료되지 않았으면 기존 token을 반환
    let now = new Date().getTime();
    if(token && token.expiresOn > now) return token;

    // token이 없거나 token이 만료되었으면 api호출을 통해 토큰을 생성
    return await createUnsplashToken();
}

(async () => {

    let unsplashToken = await getUnsplashToken();

    console.dir($('body'));
    $('body').style.backgroundImage = `url(${unsplashToken.url})`;
    let bgSpan = createElement('span', {text:unsplashToken.location});
    $('.bg-location').append(bgSpan);

})();