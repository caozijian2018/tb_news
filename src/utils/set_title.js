export default ()=>{
    var title = location.href.match(/^(http|ftp|https):\/\/[\w_\-^\s:.]+/)[0];
    document.title=title
}
