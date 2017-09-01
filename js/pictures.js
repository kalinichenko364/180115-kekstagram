'use strict';

(function () {
  var photosQuantity = 25;

  // Получаем рандомное число от min до max
  function getRandomFromInterval(min, max) {
    var index = Math.floor(Math.random() * (max - min) + min);
    return index;
  }

  // Создаем массив фотографий с заполненными данными
  function generatePhotosArray(photoCount) {
    var photos = [];
    var comments = [
      'Всё отлично!',
      'В целом всё неплохо. Но не всё.',
      'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
      'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
      'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
    ];

    for (var i = 1; i <= photoCount; i++) {
      photos.push({
        url: 'photos/' + i + '.jpg',
        likes: getRandomFromInterval(15, 200),
        comments: comments[getRandomFromInterval(0, comments.length)]
      });
    }
    return photos;
  }

  // Создаем DOM-элементы для фотографий и заполняем их данными из ранее созданного массива
  function createPhotoElements(photoCount) {
    var photos = generatePhotosArray(photoCount);
    var pictureTemplate = document.querySelector('#picture-template').content;
    var fragment = document.createDocumentFragment();
    var photosListElement = document.querySelector('.pictures');

    for (var i = 0; i < photoCount; i++) {
      var photoElement = pictureTemplate.cloneNode(true);
      photoElement.querySelector('img').setAttribute('src', photos[i].url);
      photoElement.querySelector('.picture-likes').textContent = photos[i].likes;
      photoElement.querySelector('.picture-comments').textContent = photos[i].comments;
      fragment.appendChild(photoElement);
    }

    photosListElement.appendChild(fragment);
    document.querySelector('.upload-overlay').classList.remove('hidden');
  }

  function createGalleryOverlayElement(photoCount) {
    var photos = generatePhotosArray(photoCount);
    var galleryOverlay = document.querySelector('.gallery-overlay');

    galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', photos[0].url);
    galleryOverlay.querySelector('.likes-count').textContent = photos[0].likes;
    galleryOverlay.querySelector('.comments-count').textContent = photos[0].comments;

    galleryOverlay.classList.remove('hidden');

  }

  createPhotoElements(photosQuantity);
  createGalleryOverlayElement(photosQuantity);

})();
