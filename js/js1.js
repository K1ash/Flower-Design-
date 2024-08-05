const commentsPerPage = 4;
    let currentPage = 1;
    let comments = [];

    function loadComments() {
        if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
        showComments();
    }

    function saveComments() {
        localStorage.setItem('comments', JSON.stringify(comments));
    }

    function showComments() {
        let commentField = document.getElementById('comment-field');
        let out = '';
        const startIndex = (currentPage - 1) * commentsPerPage;
        const endIndex = startIndex + commentsPerPage;
        const commentsToShow = comments.slice(startIndex, endIndex);

        commentsToShow.forEach(function (item, index) {
            out += `<div class="comment-container">`;
            out += `<img src="${item.image}" alt="User Image" class="comment-image">`;
            out += `<div class="comment-content">`;
            out += `<p class="alert alert-success" role="alert">${item.body}</p>`;
            out += `<p class="text-right small"><em>${item.name} - ${timeConverter(item.time)}</em></p>`;
            out += `<button class="btn btn-danger" onclick="removeComment(${index})">Видалити</button>`;
            out += `</div>`; 
            out += `</div>`; 
        });

        commentField.innerHTML = out;
        document.getElementById('current-page').innerText = `Страница ${currentPage}`;
    }

    document.getElementById('comment-add').onclick = function () {
        let commentName = document.getElementById('comment-name');
        let commentBody = document.getElementById('comment-body');

        if (commentName.value.trim().length < 5 || commentBody.value.trim().length < 5) {
            alert('5 символов впишите');
            return;
        }

       

        let comment = {
            name: commentName.value,
            body: commentBody.value,
            image: 'path/to/reviews-photo2.png',
            time: Math.floor(Date.now() / 1000)
        };

        commentName.value = '';
        commentBody.value = '';

   
        comments.unshift(comment);
        saveComments();
        showComments();
    };

    

    function timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var time = date + '.'+ month + '.' + year;
        return time;
    }

    function removeComment(index) {
        comments.splice(index, 1);
        saveComments();
        showComments();
    }

    document.getElementById('prev-page1').onclick = function () {
        if (currentPage > 1) {
            currentPage--;
            showComments();
        }
    };

    document.getElementById('next-page1').onclick = function () {
        const maxPages = Math.ceil(comments.length / commentsPerPage);
        if (currentPage < maxPages) {
            currentPage++;
            showComments();
        }
    };

    loadComments();


    