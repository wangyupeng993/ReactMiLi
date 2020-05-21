export default (() => {
    const pixclPatio = 1/window.devicePixelRatio;
    const html = document.getElementsByTagName('html')[0];
    const htmlLink:any = html.querySelectorAll('link')[0]
    const htmlMeta = document.createElement('meta')
    htmlMeta.setAttribute('name','viewport')
    htmlMeta.setAttribute('content',`width=device-width,initial-scale=${pixclPatio},minimum-scale=${pixclPatio},maximum-scale=${pixclPatio},user-scalable=no`)
    htmlLink.parentNode.insertBefore(htmlMeta,htmlLink)

    const htmlW = html.getBoundingClientRect().width;
    html.style.fontSize = htmlW /16 + 'px';
})()
