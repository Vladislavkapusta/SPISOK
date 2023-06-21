// получаем все списки
const lists = document.querySelectorAll('.dragonball ul');

// проходимся по каждому списку и добавляем обработчик событий
lists.forEach(list => {
  // получаем ссылки внутри списка
  const links = list.previousElementSibling;
    
  // добавляем обработчик событий на клик по ссылке
  links.addEventListener('click', (e) => {
    e.preventDefault();

    // получаем следующий элемент после ссылки, который будет список
    const sublist = links.nextElementSibling;

    // проверяем, открыт ли уже список
    if(sublist.style.display === 'block') {
      sublist.style.display = 'none';
    } else {
      // закрываем все открытые списки
      closeAllLists();
      
      // открываем текущий список
      sublist.style.display = 'block';
      
      // получаем позицию и размеры текущего списка
      const rect = sublist.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // получаем позицию и размеры родительского элемента
      const parentRect = links.getBoundingClientRect();
      const parentWidth = parentRect.width;

      // вычисляем позицию для дочернего списка
      sublist.style.left = (parentWidth - 10) + 'px';
      sublist.style.top = (-1 * rect.top) + 'px';
      
      // проверяем, чтобы дочерний список не залез на нижестоящие элементы
      const maxHeight = window.innerHeight - parentRect.bottom - 20;
      if(height > maxHeight) {
        sublist.style.maxHeight = maxHeight + 'px';
      }
    }
  });
});

// функция для закрытия всех списков
function closeAllLists() {
  lists.forEach(list => {
    list.style.display = 'none';
  });
}