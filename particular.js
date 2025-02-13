const activehamBtn = document.querySelector(".hamBtn")
activehamBtn.onclick = (e) => {
    if(wrap.classList.contains("isactive")) {
        wrap.classList.remove("isactive");
    }
    else {

        wrap.classList.add("isactive");
    }
}


const nickname = {
    nickname: "ming"
};

document.querySelector(".nickname").innerHTML = `${nickname.nickname}님 환영합니다`;

class Comment {
    constructor(content, nickname, rating) {
        this.content = content;
        this.nickname = nickname;
        this.rating = rating;
    }
}

const data = [
    { nickname: "Alice", content: "좋은 글이네요!", rating: 5 },
    { nickname: "Bob", content: "유익한 정보 감사합니다.", rating: 3 },
    { nickname: "Charlie", content: "조금 더 설명이 필요할 것 같아요.", rating: 4 }
];

let selectedRating = 0;
let editSelectedRating = null;

const createRatingInput = () => {
    const ratingContainer = document.createElement("div");
    ratingContainer.classList.add("rating-input-container");
    
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement("span");
        star.textContent = "★";
        star.classList.add("star");
        star.dataset.rating = i;
        star.onclick = () => {
            selectedRating = i;
            updateRatingInput(ratingContainer, i);
        };
        ratingContainer.appendChild(star);
    }
    return ratingContainer;
};

const updateRatingInput = (container, rating) => {
    Array.from(container.children).forEach(star => {
        star.classList.toggle("selected", star.dataset.rating <= rating);
    });
};

document.getElementById("text_btn").onclick = (e) => {
    e.preventDefault();
    const content = document.getElementById("text_value").value.trim();
    if ( selectedRating === 0) return;

    const newComment = new Comment(content, nickname.nickname, selectedRating);
    data.push(newComment);
    document.getElementById("text_value").value = "";
    selectedRating = 0;
    resetRatingInput();
    drawing();
};

const resetRatingInput = () => {
    const ratingContainer = document.querySelector(".rating-input-container");
    updateRatingInput(ratingContainer, 0);
};

const drawing = () => {
    const commentList = document.getElementById("comment_list");
    commentList.innerHTML = "";

    data.forEach((comment, index) => {
        const commentItem = document.createElement("div");
        commentItem.classList.add("comment-item");

        const nicknameSpan = document.createElement("span");
        nicknameSpan.classList.add("nickname");
        nicknameSpan.textContent = comment.nickname;

        const contentSpan = document.createElement("span");
        contentSpan.classList.add("content");
        contentSpan.textContent = comment.content;

        const ratingContainer = document.createElement("div");
        ratingContainer.classList.add("rating-container");
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement("span");
            star.textContent = "★";
            star.classList.add("star");
            star.dataset.rating = i;
            if (i <= comment.rating) {
                star.classList.add("selected");
            }
            star.onclick = () => {
                editSelectedRating = i;
                updateRatingInput(ratingContainer, i);
            };
            ratingContainer.appendChild(star);
        }

        if (comment.nickname === nickname.nickname) {
            const editButton = document.createElement("button");
            editButton.textContent = "수정";
            editButton.onclick = () => editComment(index);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "삭제";
            deleteButton.onclick = () => deleteComment(index);

            commentItem.append(nicknameSpan, contentSpan, editButton, deleteButton, ratingContainer);
        } else {
            commentItem.append(nicknameSpan, contentSpan, ratingContainer);
        }

        commentList.append(commentItem);
    });
    updateAverageRating();
};

const editComment = (index) => {
    const newContent = prompt("댓글을 수정하세요:", data[index].content);
    if (newContent !== null) {
        data[index].content = newContent;
        if (editSelectedRating !== null) {
            data[index].rating = editSelectedRating;
            editSelectedRating = null;
        }
        drawing();
    }
};

const deleteComment = (index) => {
    if (confirm("정말 삭제하시겠습니까?")) {
        data.splice(index, 1);
        drawing();
    }
};

const updateAverageRating = () => {
    const totalRatings = data.reduce((sum, comment) => sum + comment.rating, 0);
    const averageRating = totalRatings / data.length || 0;
    document.getElementById("top").querySelector("span").textContent = `평균 별점: ${averageRating.toFixed(1)} ★`;
};

document.getElementById("text_btn").before(createRatingInput());

document.addEventListener("DOMContentLoaded", drawing);
