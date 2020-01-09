var VK = require('vk-call').VK;

// Указываем access_token (ключ доступа)
var token = '3b6a6459b0144c06ad43392f98dd7fe500994717e896b39f69a4f923e985523d4526da6c041a68e30aebd';

// Версию API
var version = '5.103';

// Создаем объект для работы с api используя данные выше
var vk = new VK({
    token,
    version,
    groupId: 179414514,
});

// Получаем ответ метода
vk.call('groups.getById', {
    // Здесь можно указать параметры запроса:
    // https://vk.com/dev/groups.getById
    // Например:
    fields: 'description',
}).then(function onResponse(response) {
    console.log(response);
}).catch(function onError(error) {
    console.log(error);
});

// Запускаем лонгполл
var longpoll = vk.persistentLongpoll();

// Ловим события лонгполла
longpoll.sink.on('data', (events) => {
    events.forEach((event) => {
        // Логируем новые события
        console.log(events);
        
        // Создаем переменную с данными сообщения
        var msg = event.object;
        
        // Фильтруем сообщения по тексту
        if (msg.text == 'ping') {
            vk.call('messages.send', {
                message: 'pong',      // Текст сообщения
                peer_id: msg.peer_id, // ID получателя (msg.from_id, если нужен ID пользователя)
                random_id: 0,         // Звщита от повторной отправки (0 - выключить)
            });
        }
    })
});