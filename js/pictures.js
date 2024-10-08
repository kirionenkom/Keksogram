import { getRequest } from './server-data.js';
import { loadErrored } from './upload-messages.js';
import { addPictureEventHandler } from './full-picture.js';

const pictureTemplate = document.querySelector('#picture').content;
const pictureItemTemplate = pictureTemplate.querySelector('.picture');
const picturesList = document.querySelector('.pictures');
const picturesItems = [];

const createPictureItem = (item) => {
  const newPicture = pictureItemTemplate.cloneNode(true);
  newPicture.querySelector('.picture__img').src = item.url;
  newPicture.querySelector('.picture__likes').textContent = item.likes;
  newPicture.querySelector('.picture__comments').textContent = item.comments.length;

  addPictureEventHandler(newPicture, item);

  return newPicture;
};

const deleteAllPictures = () => {
  const pictures = picturesList.querySelectorAll('.picture');
  pictures.forEach((picture) => {
    picturesList.removeChild(picture);
  });
};

const showPictures = (pictures) => {
  deleteAllPictures();
  const fragment = new DocumentFragment;
  pictures.forEach((picture) => fragment.appendChild(picture));
  picturesList.appendChild(fragment);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

const loadPictures = (pictures) => {
  pictures.forEach((picture) => picturesItems.push(createPictureItem(picture)));
  showPictures(picturesItems);
};

getRequest(loadPictures, loadErrored, 'GET')();

export { showPictures, picturesItems };
