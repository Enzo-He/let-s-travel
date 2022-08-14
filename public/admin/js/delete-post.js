{
    let articlesBlock = document.querySelector('.articles-list') //获取articlesBlock

    articlesBlock.addEventListener('click', function(e){
        if(e.target.classList.contains('remove-btn')){
            let id = e.target.parentNode.parentNode.querySelector('.id').value;
            fetch('http://localhost:3000/posts/' + id, {
                method: 'DELETE'
            }).then((response) => response.text())
            .then(()=> window.history.go())
        }
    })
}

/* 
上面加了大括号在最外侧
means： the visibility of this code is only within the pair of curly brackets. 
*/