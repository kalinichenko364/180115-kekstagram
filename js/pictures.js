'use strict'

var users = [];

var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
]

comments[parseInt(Math.random()*comments.length)]
var tt = comments.slice()


function randomComment() {
var commentsRandom = comments.slice()
return commentsRandom;
}

for ( var i = 0; i < 25; i++ ) {
  
  users.push({
    url: 'photos/' + ++i + '.jpg',
    likes: parseInt(Math.random()*200),
    comments: randomComment()
  });
  
};
console.log(users)
// 3.2

var pictureTemplate = document.querySelector('#picture-template').content;
var pictures = document.querySelector('.pictures');

var renderPicrure = function(users) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('img').src = users.url;
  pictureElement.querySelector('.picture-likes').textContent = users.likes;
  pictureElement.querySelector('.picture-comments').textContent = users.likes;

  return pictureElement;
}

var fragment = document.createDocumentFragment();

for ( var i = 0; i < users.length; i++ ) {
  fragment.appendChild(renderPicrure(users[i]));
}

pictures.appendChild(fragment);

// 3.4

var uploadOverlay = document.querySelector('.upload-overlay').classList.add('hidden');

// 3.5

var galleryOverlay = document.querySelector('.gallery-overlay').classList.remove('hidden');


