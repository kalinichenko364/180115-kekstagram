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

var uploadOverlay = document.querySelector('.upload-overlay')
uploadOverlay.classList.add('hidden');
// 3.5

var galleryOverlay = document.querySelector('.gallery-overlay');
// galleryOverlay.classList.remove('hidden');

galleryOverlay.querySelector('.gallery-overlay-image').src = users[0].url;
galleryOverlay.querySelector('.likes-count').textContent = users[0].likes;
galleryOverlay.querySelector('.comments-count').textContent = users[0].comments.length;

// 4.1
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var btnClose = document.querySelector('.gallery-overlay-close');
var pictures = document.querySelectorAll('.picture');

var openGallery = function(evt) {
  galleryOverlay.classList.remove('hidden');
  document.addEventListener('keydown', escPress)
};

var closeGallery = function(evt) {
  galleryOverlay.classList.add('hidden');
  document.removeEventListener('keydown', escPress)
}

var enterPress = function(evt) {
  
  if (evt.keyCode === ENTER_KEYCODE) {
    if (evt.target == btnClose) {
      closeGallery();
    }
    if (galleryOverlay.classList.contains('hidden')) {
      openGallery();
    }
  }
}

var escPress = function(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeGallery();
  }
}

for ( var i =0; i < pictures.length; i++) {
  pictures[i].addEventListener('click', openGallery);
  pictures[i].addEventListener('keydown', enterPress);
}
btnClose.addEventListener('click', closeGallery);
btnClose.addEventListener('keydown', enterPress);





