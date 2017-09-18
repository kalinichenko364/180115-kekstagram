'use strict';

(function () {
  // Получаем рандомное число от min до max
  function getRandomFromInterval(min, max) {
    var index = Math.floor(Math.random() * (max - min) + min);
    return index;
  }

  // Получаем рандомные комментарии
  function getRandomComments() {
    var comments = [
      'Всё отлично!',
      'В целом всё неплохо. Но не всё.',
      'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
      'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
      'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
    ];
    var commentsArray = [];
    var commentsCount = getRandomFromInterval(15, 200);
    for (var i = 0; i < commentsCount; i++) {
      commentsArray[i] = comments[getRandomFromInterval(0, comments.length)];
    }
    return commentsArray;
  }

  // Создаем массив фотографий с заполненными данными
  function generatePhotosArray(photoCount) {
    var photos = [];

    for (var i = 1; i <= photoCount; i++) {
      photos.push({
        url: 'photos/' + i + '.jpg',
        likes: getRandomFromInterval(15, 200),
        comments: getRandomComments()
      });
    }
    return photos;
  }

  // Создаем DOM-элементы для фотографий и заполняем их данными из ранее созданного массива
  function createPhotoElements(photoCount, photos, photosListElement) {
    var pictureTemplate = document.querySelector('#picture-template').content;
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photoCount; i++) {
      var photoElement = pictureTemplate.cloneNode(true);
      photoElement.querySelector('img').setAttribute('src', photos[i].url);
      photoElement.querySelector('img').setAttribute('data-array-index', i);
      photoElement.querySelector('.picture').setAttribute('data-array-index', i);
      photoElement.querySelector('.picture-likes').textContent = photos[i].likes;
      photoElement.querySelector('.picture-comments').textContent = photos[i].comments.length;
      fragment.appendChild(photoElement);
    }

    photosListElement.appendChild(fragment);
  }

  // Заполняем элемент '.gallery-overlay' выбранной фотографией
  function createGalleryOverlayElement(evt, galleryOverlay, photos) {
    var index = evt.target.getAttribute('data-array-index');
    galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', photos[index].url);
    galleryOverlay.querySelector('.likes-count').textContent = photos[index].likes;
    galleryOverlay.querySelector('.comments-count').textContent = photos[index].comments.length;

    openGalleryOverlay();
  }

  var photosQuantity = 25;
  var photos = generatePhotosArray(photosQuantity);
  var photosList = document.querySelector('.pictures');
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayClose = document.querySelector('.gallery-overlay-close');

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  createPhotoElements(photosQuantity, photos, photosList);

  // document.querySelector('.upload-overlay').classList.remove('hidden');

  // Закрываем по нажатию на ESC галерею
  function onGalleryOverlayEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeGalleryOverlay();
    }
  }

  // Открываем галерею
  function openGalleryOverlay() {
    galleryOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onGalleryOverlayEscPress);
  }

  // Закрываем галерею
  function closeGalleryOverlay() {
    galleryOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onGalleryOverlayEscPress);
  }

  // Обработчик по клику на фотографию на фазе захвата
  photosList.addEventListener('click', function (evt) {
    evt.preventDefault(); // чтобы клик по ссылке не перезагружал страницу
    createGalleryOverlayElement(evt, galleryOverlay, photos);
  });

  // Обработчик по нажатию на ENTER, когда фотография в фокусе
  photosList.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      evt.preventDefault(); // чтобы клик по ссылке не перезагружал страницу
      createGalleryOverlayElement(evt, galleryOverlay, photos);
    }
  });

  // Обработчик по клику на крестик в галерее
  galleryOverlayClose.addEventListener('click', closeGalleryOverlay);

  // Обработчик по нажатию на ENTER, когда крестик в галерее в фокусе
  galleryOverlayClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closeGalleryOverlay();
    }
  });
})();