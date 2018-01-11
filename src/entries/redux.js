import { createStore } from 'redux';

const $form = document.getElementById('form');

$form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const data = new FormData($form);
  const title = data.get('title');
  console.log(title);
  store.dispatch({
    type: 'ADD_SONG',
    payload: {
      title,
    },
  });
}

const initialState = [
  {
    "title": "Digital Love",
  },
  {
    "title": "A Little Less Conversation"
  },
  {
    "title": "Imagine"
  }
];

const store = createStore(
  (state) => state,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

console.log(store.getState());

const $container = document.getElementById('playlist');
const playlist = store.getState();

playlist.forEach((item) => {
  const template = document.createElement('p');
  template.textContent = item.title;
  $container.appendChild(template);
})
